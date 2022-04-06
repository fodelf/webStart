/*
 * @Description: 详情模块
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 20:36:22
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-05 22:05:41
 */
import { h } from "./utils/vdom.js";
import { state } from "./store.js";
export const Detail = {
  isComponent: true,
  render() {
    return h("div", null, [
      h("h1", null, "皮蛋瘦肉粥"),
      h("h2", null, "商品详情ss："),
      h("div", null, "商品描述： 皮蛋瘦肉粥，荷包蛋，油条"),
      h("div", null, "原料： 其他"),
      h("div", null, "分量: 一人份"),
      h(
        "button",
        {
          onClick: () => {
            state.count = 1;
          },
        },
        "加入购物车"
      ),
      h("div", null, [
        h("span", null, "已经购买了"),
        h("span", null, state.count),
        h("span", null, "份"),
      ]),
    ]);
  },
};
