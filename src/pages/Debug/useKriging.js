import * as mars3d from "mars3d";
const { Cesium } = mars3d;

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

export function useKriging() {
    const lngs = shallowRef([]); //经度集合
    const lats = shallowRef([]); //纬度集合
    const siteValue = shallowRef([]); //站点数值集合
    const coords = shallowRef([]); //绘制面的所有点
    const ex = []; //绘制面的jeojson
    return {};
}
export default useKriging;
