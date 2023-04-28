/*
 * @FilePath: \Furnace\src\extend\form.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-21 15:04:01
 * @Description: 
 */
// import MaggotForm from "maggot-form";
import MaggotForm from "maggot-form/lib/maggot-form.umd";
import "maggot-form/lib/maggot-form.css";

export function extendForm(Vue) {
    Vue.use(MaggotForm);
}

export default extendForm;
