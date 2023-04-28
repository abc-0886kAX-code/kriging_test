/*
 * @Author: yjl
 * @Date: 2021-06-08 15:43:53
 * @LastEditors: zhangyang
 * @LastEditTime: 2023-02-23 13:09:30
 * @Description: file content
 */
import axios from 'axios'

// 过期时间2小时
const EXPIRE_TIME = 4 * 60 * 60 * 1000;
const CACHE_KEY = "yiketianqi";

function sendRequest() {
    return axios.request({
        url: 'https://v0.yiketianqi.com/free/day',
        method: 'GET',
        params: {
            // version: "v61",
            appid: "75588717",
            appsecret: "a36EhJyo",
            city: "滁州"
        }
    })
}

// 天气接口
export async function getWeather() {
    const cache = localStorage.getItem(CACHE_KEY);
    const cacheData = JSON.parse(cache);
    const now = new Date().getTime();
    if (cacheData && cacheData.time && now - cacheData.time < EXPIRE_TIME) return Promise.resolve(cacheData);

    const res = await sendRequest();
    const data = res.data;
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        time: now,
        data
    }));
    return Promise.resolve({ data });
}
