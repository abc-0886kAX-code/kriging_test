/*
 * @Author: zhangyang
 * @Date: 2022-04-25 10:30:17
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 14:50:38
 * @Description: file content
 */
import { Mars3dSymbolName } from "../share/context";

export function useMars3d() {
    const mapviewRef = inject(Mars3dSymbolName, shallowRef(null));

    const mapview = computed(() => {
        return mapviewRef.value.view;
    });

    return {
        mapview,
    };
}
