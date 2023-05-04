<!--
 * @FilePath: \kriging_test\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-28 15:22:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-04 16:09:22
 * @Description: https://blog.csdn.net/qq_34520411/article/details/124446536
-->
<script setup>
kriging.getColor = function (colors, z) {
    var l = colors.length;
    for (var i = 0; i < l; i++) {
        if (z >= colors[i].min && z < colors[i].max) return colors[i].color;
    }
    if (z < 0) {
        return colors[0].color;
    }
};
kriging.plot = function (canvas, grid, xlim, ylim, colors) {
    // Clear screen
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Starting boundaries
    let range = [xlim[1] - xlim[0], ylim[1] - ylim[0], grid.zlim[1] - grid.zlim[0]];
    let i, j, x, y, z;
    let n = grid.length;
    let m = grid[0].length;
    let wx = Math.ceil((grid.width * canvas.width) / (xlim[1] - xlim[0]));
    let wy = Math.ceil((grid.width * canvas.height) / (ylim[1] - ylim[0]));
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            if (grid[i][j] == undefined) continue;
            x = (canvas.width * (i * grid.width + grid.xlim[0] - xlim[0])) / range[0];
            y = canvas.height * (1 - (j * grid.width + grid.ylim[0] - ylim[0]) / range[1]);
            z = (grid[i][j] - grid.zlim[0]) / range[2];
            if (z < 0.0) z = 0.0;
            if (z > 1.0) z = 1.0;
            ctx.fillStyle = kriging.getColor(colors, grid[i][j]);
            ctx.fillRect(Math.round(x - wx / 2), Math.round(y - wy / 2), wx, wy);
        }
    }
};
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import * as mars3d from "mars3d";
import BJGeoJson from "./BJGeoJson.json";
import Data from "./test.json";
const { Cesium } = mars3d;
var lngs = []; //经度集合
var lats = []; //纬度集合
var siteValue = []; //站点数值集合
var coords = []; //绘制面的所有点
var ex = []; //绘制面的jeojson
lngs = Data.data.map((item) => item.longitude);
lats = Data.data.map((item) => item.latitude);
siteValue = Data.data.map((item) => item.value);
ex = BJGeoJson.features.map((item) => {
    return item.geometry.coordinates[0][0];
});
coords = ex.flat(3);

const polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(coords)),
});

let extent = Cesium.PolygonGeometry.computeRectangle({
    polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(coords)),
});

let minx = Cesium.Math.toDegrees(extent.west); //转换为经纬度
let miny = Cesium.Math.toDegrees(extent.south);
let maxx = Cesium.Math.toDegrees(extent.east);
let maxy = Cesium.Math.toDegrees(extent.north);
function getCanvas() {
    //1.用克里金训练一个variogram对象
    //exponential
    let variogram = kriging.train(siteValue, lngs, lats, "spherical", 0, 100);
    //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
    let grid = kriging.grid(ex, variogram, (maxy - miny) / 1000);
    let canvas = null;
    canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    canvas.style.display = "block";
    canvas.getContext("2d").globalAlpha = 1; //设置透明度
    //3.将得到的格网预测值渲染到canvas画布上
    kriging.plot(canvas, grid, [minx, maxx], [miny, maxy], Data.legend);
    return canvas;
}

const layers = [];
const config = setupMars3DConfig(3);

// 将颜色值映射到 0-255 的范围内
function mapColorValue(value, oldMin, oldMax, newMin, newMax) {
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

function handlerMapReady(mapview) {
    const canvas = getCanvas();
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const colorMap = new Map();
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        if (a > 0) {
            // 将颜色值映射到 0-255 的范围内
            const mappedR = mapColorValue(r, 0, 255, 0, 255);
            const mappedG = mapColorValue(g, 0, 255, 0, 255);
            const mappedB = mapColorValue(b, 0, 255, 0, 255);
            const color = `rgba(${mappedR},${mappedG},${mappedB},${a})`;

            if (colorMap.has(color)) {
                colorMap.set(color, colorMap.get(color) + 1);
            } else {
                colorMap.set(color, 1);
            }
        }
    }

    const totalPixels = canvas.width * canvas.height;
    let allCount = 0;
    for (const [color, count] of colorMap.entries()) {
        const percentage = count / totalPixels;
        allCount = allCount + percentage;
    }
    // 占比传参
    let params = {};
    Data.legend.map((item) => {
        for (const [color, count] of colorMap.entries()) {
            const percentage = count / totalPixels;
            if (color === item.color) {
                params[item.field] = (percentage / allCount) * 100;
            }
        }
    });
    const image = canvas.toDataURL("image/png");
    const imageLayer = new mars3d.layer.ImageLayer({
        url: image,
        rectangle: {
            xmin: minx,
            xmax: maxx,
            ymin: miny,
            ymax: maxy,
        },
        alpha: 1,
    });
    mapview.addLayer(imageLayer);
}
</script>

<template>
    <mars3d-container class="debug" :config="config" :layers="layers" @onReady="handlerMapReady"> </mars3d-container>
</template>

<style scoped lang="scss">
.debug {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
