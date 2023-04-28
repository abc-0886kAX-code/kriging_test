/*
 * @FilePath: \Furnace\src\extend\pinia.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-21 15:01:58
 * @Description:
 */
import { createPinia, PiniaVuePlugin } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const pinia = createPinia();

pinia.use(createPersistedState({
    debug: import.meta.env.DEV,
    storage: sessionStorage
}));

export function extendPinia(Vue) {
    Vue.use(PiniaVuePlugin);

    return pinia;
}

export default extendPinia;
