import Weather from './weather.vue';

/* istanbul ignore next */
Weather.install = function (Vue) {
    Vue.component(Weather.name, Weather);
};

export default Weather;