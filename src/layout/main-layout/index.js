/*
 * @Author: zhangyang
 * @Date: 2021-05-11 16:26:09
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-11 16:29:06
 * @Description: file content
 */
import MainLayout from './main-layout.vue';

/* istanbul ignore next */
MainLayout.install = function (Vue) {
    Vue.component(MainLayout.name, MainLayout);
};

export default MainLayout;