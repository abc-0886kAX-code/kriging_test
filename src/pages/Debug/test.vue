<script setup>
import { useMars3d } from "@/biz/Mars3D/usecase/useMars3D";
import { useKrigingGrid } from "./useKrigingGrid.js";
import Data from "./test.json";
const props = defineProps({
    type: String,
});

const type = computed(() => props.type);

const layer = ref(null);
const { mapview } = useMars3d();
const { setupShape, getCanvasRatio } = useKrigingGrid(unref(type));

function executeQuery() {
    clear();
    layer.value = setupShape(Data);
    unref(layer).addTo(unref(mapview));
    unref(layer).flyTo({ scale: 1.5 });
}
function clear() {
    if (unref(layer)) {
        unref(mapview).removeLayer(unref(layer), true);
        layer.value = null;
    }
}

function exportParams() {
    const params = getCanvasRatio();
    console.log(params);
}

watch(
    type,
    (type) => {
        executeQuery();
    },
    {
        immediate: true,
    }
);

onBeforeUnmount(() => {
    clear();
});
</script>

<template>
    <div class="test">
        <el-button @click="exportParams">导出</el-button>
        <el-button @click="clear">销毁</el-button>
    </div>
</template>

<style scoped lang="scss">
.test {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 302;
}
</style>
