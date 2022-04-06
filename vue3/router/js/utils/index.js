/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 20:40:04
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-04 21:11:26
 */
import { effect } from "./reactive.js";
import { render, patch } from "./vdom.js";
/**
 * @name: createApp
 * @description: 创建应用
 * @param {*} App 组件
 * @param {*} container 挂载容器
 */
export function createApp(App, container) {
  // 判断是否渲染过
  let isMounted = false;
  // 旧的虚拟dom缓存
  let oldVdom = null;
  // 新的虚拟dom对象
  let newVdom = null;
  effect(() => {
    if (!isMounted) {
      newVdom = App.render();
      render(newVdom, container);
      isMounted = true;
    } else {
      newVdom = App.render();
      patch(oldVdom, newVdom);
    }
    oldVdom = newVdom;
  });
}
