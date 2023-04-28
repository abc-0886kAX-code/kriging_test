<!--
 * @Author: zhangyang
 * @Date: 2022-04-24 18:12:18
 * @LastEditors: zhangyang
 * @LastEditTime: 2023-03-09 13:17:50
 * @Description: file content
-->
<template>
    <div class="mars3d-container" ref="mapbox" v-loading="loading" v-bind="loadStyle">
        <FloatWindowView :visable.sync="floatWindowVisible" v-bind="floatWindowBind"></FloatWindowView>
        <div class="mars3d-container-cover"></div>
        <slot v-if="isMounted"></slot>
    </div>
</template>

<script>
import FloatWindowView from "@/components/float-window/float-window.vue";

import { useMars3dSetup } from "@/biz/Mars3d/usecase/useMars3dSetup";
import { useLayerSetup } from "@/biz/Mars3D/usecase/useLayerSetup";
import { useFloatWindow } from "@/hooks/useFloatWindow";

export default {
    name: "mars3d-container",
    mixins: [],
    components: { FloatWindowView },
    props: {
        config: {
            type: Object,
            default: () => ({}),
        },
        layers: {
            type: Array,
            default: () => [],
        },
    },
    emit: ["onReady"],
    setup(props, ctx) {
        const { isMounted, loading, loadStyle, mapbox, mapview } =
            useMars3dSetup(props, ctx);
        useLayerSetup(props, mapview);
        const float = useFloatWindow();

        provide("Mars3dFloat", float);
        // useDialog();

        return {
            isMounted,
            loading,
            loadStyle,
            mapbox,
            mapview,
            ...float
        };
    },
};
</script>
<style lang="scss" scoped>
@import "./mars3d-container.scss";
</style>
