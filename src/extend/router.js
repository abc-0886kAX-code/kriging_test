/*
 * @FilePath: \明湖数字大厅\src\extend\router.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-30 13:16:25
 * @Description:
 */
import router from '@/router/useRouter';
export function extendRouter(Vue) {
    router.use(Vue);
    return router.core;
}

export default extendRouter;
