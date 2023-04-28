/*
 * @FilePath: \vue2.7_Mars3D_template\src\service\Application.js
 * @Author: maggot-code
 * @Date: 2022-11-24 10:05:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 11:21:03
 * @Description:
 */
import axios from "axios";
import { defineService } from "~/service";
import { useTokenMiddleware } from "@/middleware/token.request";

const define = axios.create({
    baseURL: "",
    timeout: import.meta.env.DEV ? 0 : 30000,
});

function transResponse(response) {
    return get(response, "data.data", {});
}

const service = defineService(define, { transResponse });

useTokenMiddleware(define);

export function useService() {
    return defineService(define, { transResponse });
}

export default service;
