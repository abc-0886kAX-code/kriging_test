<script setup>
import { default as setupMars3DConfig } from "@/config/mars3d.conf/index";
const layers = [];
const config = setupMars3DConfig(3);
function handlerMapReady(mapview) {}
</script>

<template>
    <mars3d-container class="home" :config="config" :layers="layers" @onReady="handlerMapReady"> </mars3d-container>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
