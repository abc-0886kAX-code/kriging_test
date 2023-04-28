/*
 * @FilePath: \数字大厅\src\store\useUser.js
 * @Author: zhangyang
 * @Date: 2023-02-07 15:09:09
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-21 17:53:48
 * @Description:
 */
import { defineStore } from "pinia";
import { isEmptyString } from "~/shared/is";

const paths = ["token"];

export const Namespace = "useUser";

export const useUser = defineStore(Namespace, {
    state: () => ({
        token: "",
    }),

    getters: {
        tokenUnusable() {
            return isEmptyString(this.token);
        },
        tokenUsable() {
            return !this.tokenUnusable;
        },
    },

    actions: {
        setupToken(token) {
            this.token = token;
        },
        emptyUserInfo() {
            this.token = "";
        },
    },

    persist: {
        key: Namespace,
        paths,
    },
});

export function useUserStore() {
    return useUser();
}

export default {
    namespace: Namespace,
    store: useUser,
};
