/*
 * @FilePath: \kriging_test\src\pages\Debug\loadkriging.js
 * @Author: zhangxin
 * @Date: 2023-04-28 17:44:34
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-04 10:04:41
 * @Description:
 */
import * as mars3d from "mars3d";

// 根据 克里金法 插值绘制图片
export function loadkriging(tempture, bounds, colors) {
    // let canvas = document.createElement("canvas")
    const canvas = mars3d.DomUtil.create("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    console.log(tempture);
    const t = [];
    const x = [];
    const y = [];
    for (let i = 0, len = tempture.features.length; i < len; i++) {
        t.push(tempture.features[i].properties.Temperatur); // 权重值
        x.push(tempture.features[i].geometry.coordinates[0]); // x
        y.push(tempture.features[i].geometry.coordinates[1]); // y
    }
    console.log(t, x, y);
    // 1.用克里金训练一个variogram对象

    const variogram = kriging.train(t, x, y, "exponential", 0, 100);

    // 2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
    // bounds:普通的geojson格式的面的格式的coordinates。

    const grid = kriging.grid(bounds, variogram, 0.05);
    // 3.将得到的格网预测值渲染到canvas画布上

    kriging.plot(canvas, grid, [73.4766, 135.088], [18.1055, 53.5693], colors);

    const image = canvas.toDataURL("image/png");
    return image;
}
