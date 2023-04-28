/*
 * @FilePath: \明湖数字大厅\src\router\defineRouter.js
 * @Author: maggot-code
 * @Date: 2022-11-03 09:41:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-30 16:05:22
 * @Description:
 */
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

export function setupRouter(routes) {
    return new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0, }),
        mode: "hash",
        routes: Array.isArray(routes) ? routes : []
    })
}

export function defineRouter(routes) {
    const core = setupRouter(routes);

    function reset() {
        const router = setupRouter(routes);
        core.matcher = router.matcher;
    }
    function use(Vue) {
        Vue.use(VueRouter);
    }

    return {
        core,
        reset,
        use
    }
}

export default defineRouter;
