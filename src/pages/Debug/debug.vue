<!--
 * @FilePath: \kriging_test\src\pages\Debug\debug.vue
 * @Author: zhangxin
 * @Date: 2023-04-28 15:22:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-05-04 16:41:07
 * @Description: https://blog.csdn.net/qq_34520411/article/details/124446536
-->
<script setup>
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
import TEST from "./test.vue";
const layers = [
    {
        type: "image",
        name: "SoilGeoJsonLayer",
        zIndex: 101,
    },
];
const config = setupMars3DConfig(3);

function handlerMapReady(mapview) {}
</script>

<template>
    <mars3d-container class="debug" :config="config" :layers="layers" @onReady="handlerMapReady">
        <TEST></TEST>
    </mars3d-container>
</template>

<style scoped lang="scss">
.debug {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
