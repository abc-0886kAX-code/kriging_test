/*
 * @FilePath: \Furnace\src\extend\scroll.js
 * @Author: maggot-code
 * @Date: 2022-12-08 02:07:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-08 09:57:39
 * @Description: 
 */
import ScrollBar from 'vue2-scrollbar';

export function extendScroll(Vue) {
    Vue.component("FurnaceScrollBar", ScrollBar);
}

export default extendScroll;
