<script setup>
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useKrigingGrid } from "./useKrigingGrid.js";
import Data from "./test.json";
const layer = ref(null);
const { mapview } = useMars3d();
const { setupShape, getCanvasRatio } = useKrigingGrid();

function executeQuery() {
    clear();
    layer.value = setupShape(Data);
    unref(layer).addTo(unref(mapview));
    unref(layer).flyTo({ scale: 1.5 });
}
function clear() {
    if (unref(layer)) {
        unref(mapview).removeLayer(layer, true);
        layer.value = null;
    }
}

function exportParams() {
    const params = getCanvasRatio();
    console.log(params);
}

onMounted(() => {
    executeQuery();
});

onBeforeUnmount(() => {
    clear();
});
</script>

<template>
    <div class="test">
        <el-button @click="exportParams">导出</el-button>
    </div>
</template>

<style scoped lang="scss">
.test {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 302;
}
</style>
