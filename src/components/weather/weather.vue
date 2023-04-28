<!--
 * @Author: yjl
 * @Date: 2021-04-30 17:36:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-30 13:15:42
 * @Description: 天气接口: https://www.yiketianqi.com
-->
<template>
    <div class="nd-weather" v-if="weatherData !== null">
        <div class="nd-weather__info">
            <span class="temperature">{{ tem }}</span>
            <span class="wea">{{ weatherData.wea }}</span>
            <span class="wea_day">{{ weatherData.wea_day }}</span>
            <ul class="other">
                <!-- <li class="other__item round">
                    {{ weatherData.air }} {{ weatherData.air_level }}
                </li> -->
                <li class="other__item">
                    {{ weatherData.win
                    }}<span class="color__y">{{ weatherData.win_speed }}</span>
                </li>
                <li class="other__item">
                    相对湿度<span class="color__b">{{
                            weatherData.humidity
                    }}</span>
                </li>
            </ul>
        </div>
        <p class="nd-weather-time">
            最近刷新日期：<a>{{ newestDate }}</a>
        </p>
        <div class="nd-weather__warn">
            <!-- <div class="left__img">
                <img src="@/assets/images/default/yj.png" alt="" srcset="">
            </div> -->
            {{ alarm }}
        </div>
    </div>
</template>

<script>
import { getWeather } from "./api/other";
import { tempStorage } from "@/shared/storage";
import { EXPIRATION_TIME } from "@/config/constant";
import { isNil } from "lodash-es";
export default {
    name: "weather",
    data() {
        return {
            weather: null,
        };
    },
    computed: {
        weatherData() {
            return this.weather;
        },
        tem() {
            let tem = "";
            if (this.weatherData) {
                tem = this.weatherData.tem ? `${this.weatherData.tem}°C` : "";
            }
            return `${tem}`;
        },
        alarm() {
            if (this.weatherData.alarm) {
                return `${this.weatherData.alarm}${this.weatherData.alarm.alarm_level}预警`;
            }
            return "";
        },
        newestDate() {
            if (isNil(this.weather)) return "";

            const { date, update_time } = this.weather;

            return `${date} ${update_time}`;
        },
    },
    methods: {
        getWeatherJson() {
            getWeather()
                .then((res) => {
                    const { data, status } = res;
                    if (status === 200) {
                        this.weather = data;
                        tempStorage.set("weather", data, EXPIRATION_TIME);
                    }
                })
                .catch((err) => { });
        },
    },
    mounted() {
        let json = tempStorage.get("weather");
        if (json) {
            this.weather = json;
        } else {
            this.getWeatherJson();
        }
    },
};
</script>

<style lang="scss" scoped>
.nd-weather {
    position: absolute;
    left: 20px;
    top: 0;
    display: flex;
    padding-left: 19px;
    // margin-top: 15px;
    color: #fff;

    .nd-weather__info {
        display: flex;
        align-items: center;
        padding-right: 10px;

        .temperature {
            font-size: 20px;
            color: #02c1f3;
        }

        .wea,
        .wea_day {
            padding-left: 8px;
        }

        .other {
            font-size: 15px;
            padding-left: 5px;
            font-family: "SimHei";
            width: 100px;

            &__item {
                line-height: 20px;
                transform: scale(0.85);
            }

            &__item.round {
                border: 1px solid #97d4f8;
                border-radius: 40px;
                padding: 0px 10px;
            }

            .color__y {
                color: #f3bd02;
            }

            .color__b {
                color: #00ffd2;
            }
        }
    }

    .nd-weather__warn {
        display: flex;
        align-items: center;
        padding-left: 23px;
        font-size: 16px;

        .left__img {
            display: inline-block;
            width: 38px;
            height: 33px;
            margin-right: 7px;
            border-radius: 5px;
            overflow: hidden;

            &>img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.nd-weather-time {
    margin-top: 18px;
    font-size: 14px;
}

.nd-weather-time a {
    color: #02c1f3;
}
</style>
