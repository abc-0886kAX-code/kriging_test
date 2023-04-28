/*
 * @FilePath: \vue2.7_Mars3D_template\src\permission.js
 * @Author: zhangxin
 * @Date: 2022-11-11 12:26:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 11:22:30
 * @Description:
 */
import { useRouter } from "@/router/useRouter";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { useUserStore } from "@/store/useUser";
// TODO: 解决BUG 2023-03-21 张鑫
import Vue from "vue";
import { extendPinia } from "@/extend/pinia";
const pinia = extendPinia(Vue);

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist
const noNeedToken = ["/debug", "/singleLogin"]; // 不需要校验token的路由

const router = useRouter();

router.beforeEach((to, from, next) => {
    const user = useUserStore(pinia);

    // start progress bar
    NProgress.start();

    // set page title
    document.title = to.meta.title ?? "vue2.7-mars3d-template";

    if (
        noNeedToken.findIndex((item) => {
            return to.path.indexOf(item) !== -1;
        }) !== -1
    ) {
        // in the free login whitelist, go directly
        next();
        NProgress.done();
    } else {
        // determine whether the user has logged in
        if (user.tokenUsable) {
            if (to.path === "/login") {
                // if is logged in, redirect to the home page
                next({
                    path: "/",
                });
                NProgress.done();
            } else {
                next();
                NProgress.done();
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next();
            } else {
                next("/login");
                NProgress.done();
            }
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
