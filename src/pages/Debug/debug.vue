<!--
 * @FilePath: \kriging_test\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-28 15:22:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-28 17:56:50
 * @Description: https://blog.csdn.net/qq_34520411/article/details/124446536
-->
<script setup>
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import { loadkriging } from "./loadkriging";
import * as mars3d from "mars3d";
import geojson from "./geojson.json";
import kriging_bounds from "./kriging_bounds.json";
import kriging_colors from "./kriging_colors.json";

const layers = [];
const config = setupMars3DConfig(3);
function handlerMapReady(mapview) {
    const image = loadkriging(geojson, kriging_bounds, kriging_colors);

    const imageLayer = new mars3d.layer.ImageLayer({
        url: image,
        rectangle: {
            xmin: 73.4766,
            xmax: 135.088,
            ymin: 18.1055,
            ymax: 53.5693,
        },
        alpha: 0.4,
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
