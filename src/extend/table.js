/*
 * @FilePath: \Furnace\src\extend\table.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-21 15:03:50
 * @Description: 
 */
// import MaggotTable from "maggot-table";
import MaggotTable from "maggot-table/lib/maggot-table.umd";
import "maggot-table/lib/maggot-table.css";

export function extendTable(Vue) {
    Vue.use(MaggotTable);
}

export default extendTable;
