/*
 * @Author: zhangyang
 * @Date: 2022-04-25 09:18:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-24 14:21:37
 * @Description: file content
 */
import { EventType } from "mars3d";

import { Load } from "@/biz/share/entify/Load";
import { Mapview } from "../entity/Mapview";
import { Mars3dSymbolName } from "../share/context";
import { useAttach } from "./useAttach";

export function useMars3dSetup(props, ctx) {
    const { loading, loadStyle, setupLoading } = Load();

    const isMounted = ref(false);

    const mapbox = ref(null);

    const mapview = new Mapview(props.config);

    const mapviewRef = useAttach(mapview, mapbox);

    provide(Mars3dSymbolName, mapviewRef);

    onMounted(() => {
        mapview.onReady(() => {
            ctx.emit("onReady", mapview.view);
            setupLoading(false);
            isMounted.value = true;
        });
    });

    onUnmounted(() => {
        isMounted.value = false;
    });

    return {
        isMounted,
        loading,
        loadStyle,
        mapbox,
        mapview,
        setupLoading,
    };
}
