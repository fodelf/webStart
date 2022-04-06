/*
 * @Description: 404模块
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 20:51:37
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-04 21:56:40
 */
import { h } from "./utils/vdom.js";
export const NotFound = {
  isComponent: true,
  render: () => {
    return h("div", null, "没找到404");
  },
};
