import BJGeoJson from "./BJGeoJson.json";
import { Cesium, layer } from "mars3d";
const { ImageLayer } = layer;

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

// 将颜色值映射到 0-255 的范围内
function mapColorValue(value, oldMin, oldMax, newMin, newMax) {
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

export function useKrigingGrid() {
    const canvas = ref(null);
    const result = ref({});

    const ex = computed(() => {
        // 判断是北京范围还是山区范围
        return BJGeoJson.features.map((item) => {
            return item.geometry.coordinates[0][0];
        });
    });

    const coords = computed(() => unref(ex).flat(3));

    function setupCanvas(minx, miny, maxx, maxy) {
        const lngs = unref(result).data.map((item) => item.longitude);
        const lats = unref(result).data.map((item) => item.latitude);
        const siteValue = unref(result).data.map((item) => item.value);

        //1.用克里金训练一个variogram对象
        //exponential
        const variogram = kriging.train(siteValue, lngs, lats, "spherical", 0, 100);
        //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
        const grid = kriging.grid(unref(ex), variogram, (maxy - miny) / 1000);
        canvas.value = document.createElement("canvas");
        canvas.value.width = 1000;
        canvas.value.height = 1000;
        canvas.value.style.display = "block";
        canvas.value.getContext("2d").globalAlpha = 1; //设置透明度
        //3.将得到的格网预测值渲染到canvas画布上
        kriging.plot(unref(canvas), grid, [minx, maxx], [miny, maxy], unref(result).legend);
    }

    function setupShape(data) {
        result.value = data;

        const extent = Cesium.PolygonGeometry.computeRectangle({
            polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(unref(coords))),
        });

        const minx = Cesium.Math.toDegrees(extent.west); //转换为经纬度
        const miny = Cesium.Math.toDegrees(extent.south);
        const maxx = Cesium.Math.toDegrees(extent.east);
        const maxy = Cesium.Math.toDegrees(extent.north);

        setupCanvas(minx, miny, maxx, maxy);

        const image = unref(canvas).toDataURL("image/png");

        return new ImageLayer({
            url: image,
            rectangle: {
                xmin: minx,
                xmax: maxx,
                ymin: miny,
                ymax: maxy,
            },
            alpha: 1,
        });
    }

    function getCanvasRatio() {
        const context = unref(canvas).getContext("2d");
        const imageData = context.getImageData(0, 0, unref(canvas).width, unref(canvas).height);

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
        let allCount = 0;
        let params = {};
        const totalPixels = unref(canvas).width * unref(canvas).height;
        for (const [color, count] of colorMap.entries()) {
            const percentage = count / totalPixels;
            allCount = allCount + percentage;
        }
        // 占比传参
        unref(result).legend.map((item) => {
            for (const [color, count] of colorMap.entries()) {
                const percentage = count / totalPixels;
                if (color === item.color) {
                    params[item.field] = (percentage / allCount) * 100;
                }
            }
        });

        return params;
    }

    return {
        canvas,
        setupShape,
        getCanvasRatio,
    };
}
export default useKrigingGrid;
