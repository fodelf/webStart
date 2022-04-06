/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 20:38:33
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-05 22:04:24
 */
import { reactive } from "./utils/reactive.js";
// 全局状态
export let state = reactive({
  count: 0, // 外卖份数
  url: location.hash.substring(1) || "", //当前路由
});
