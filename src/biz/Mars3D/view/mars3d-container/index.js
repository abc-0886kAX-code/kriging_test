/*
 * @Author: zhangyang
 * @Date: 2022-04-24 18:12:44
 * @LastEditors: zhangyang
 * @LastEditTime: 2022-04-24 18:12:44
 * @Description: file content
 */
import Mars3DContainer from './mars3d-container.vue';

/* istanbul ignore next */
Mars3DContainer.install = function (Vue) {
    Vue.component(Mars3DContainer.name, Mars3DContainer);
};

export default Mars3DContainer;