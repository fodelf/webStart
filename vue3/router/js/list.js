/*
 * @Description: 首页列表模块
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 20:35:41
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-05 22:04:50
 */
import { h } from "./utils/vdom.js";
import { state } from "./store.js";
// food 组件
const Food = {
  isComponent: true,
  render() {
    return h("div", null, [
      h("label", null, "皮蛋瘦肉sssdssdsd粥:"),
      h("span", null, "40元每一份"),
      h("div", null, state.count),
      h(
        "button",
        {
          onClick: () => {
            state.count = 1;
          },
        },
        "增加"
      ),
    ]);
  },
};
// 计算金额 组件
const CountMoney = {
  isComponent: true,
  render() {
    return h("div", null, [
      h("label", null, "总计:"),
      h("span", null, state.count * 40),
    ]);
  },
};
export const List = {
  isComponent: true,
  render: () => {
    return h("div", null, [Food, CountMoney]);
  },
};
