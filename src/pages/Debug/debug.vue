<!--
 * @FilePath: \kriging_test\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-28 15:22:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-04 17:47:08
 * @Description: https://blog.csdn.net/qq_34520411/article/details/124446536
-->
<script setup>
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import TEST from "./test.vue";
// import SQ from "./SQ.json";

// function object2Geojson(data) {
//     var featureCollection = {
//         type: "FeatureCollection",
//         features: [
//             {
//                 type: "Feature",
//                 geometry: {
//                     type: "MultiPolygon",
//                     coordinates: [[[]]],
//                 },
//             },
//         ],
//     };
//     for (let i = 0; i < data.length; i++) {
//         featureCollection.features[0].geometry.coordinates[0][0].push([data[i].longitude, data[i].latitude]);
//     }
//     return featureCollection;
// }

// console.log(object2Geojson(SQ));
const layers = [
    {
        type: "image",
        name: "SoilGeoJsonLayer",
        zIndex: 101,
    },
];
const config = setupMars3DConfig(3);

function handlerMapReady(mapview) {}

const type = ref("QS");
const key = ref(+new Date());
function switchLayer(params) {
    if (unref(type) === params) return;
    type.value = params;
    key.value = +new Date();
}
</script>

<template>
    <mars3d-container class="debug" :config="config" :layers="layers" @onReady="handlerMapReady">
        <el-button-group class="debug-btn-group">
            <el-button type="primary" @click="switchLayer('QS')">北京全市</el-button>
            <el-button type="primary" @click="switchLayer('SQ')">北京山区</el-button>
        </el-button-group>
        <TEST :key="key" :type="type"></TEST>
    </mars3d-container>
</template>

<style scoped lang="scss">
.debug {
    width: 100%;
    height: 100%;
    position: relative;
    &-btn-group {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 302;
    }
}
</style>
