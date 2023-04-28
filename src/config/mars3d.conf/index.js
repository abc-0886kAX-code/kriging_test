/*
 * @Author: zhangxin
 * @Date: 2022-07-18 16:21:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-04-12 11:37:29
 * @Description:
 */
const { MODE } = import.meta.env;
import setupConfigDev from "./config.dev";
import setupConfigPro from "./config.pro";
import { mergeObject } from "~/shared/merge";

const isDEV = MODE === "development";

export default (mode = 3) => {
    if (isNumber(mode)) return isDEV ? setupConfigDev(mode) : setupConfigPro(mode);

    // 不知道该怎么写了，暂时这样
    // mode 可能是扩展配置对象
    // 如果是扩展对象的话，就合并配置
    return mergeObject(isDEV ? setupConfigDev(mode.mode) : setupConfigPro(mode.mode), mode);
};
