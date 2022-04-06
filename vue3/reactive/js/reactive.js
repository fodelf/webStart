/*
 * @Description: 响应式api实现
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-03 10:04:48
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-05 12:16:01
 */
// 副作用函数缓存
let activeFu = () => {};
// 依赖收集缓存
let deps = new Set();
/**
 * @name: reactive
 * @description: 响应式对象
 * @param {type} {*}
 * @return {type} {*}
 */
export function reactive(target) {
  return new Proxy(target, {
    get: (target, key, receiver) => {
      // 依赖收集
      if (activeFu) {
        debugger;
        deps.add(activeFu);
      }
      return Reflect.get(target, key, receiver);
    },
    set: (target, key, value, receiver) => {
      // 先设值
      Reflect.set(target, key, value, receiver);
      // 触发副作用
      debugger;
      deps.forEach((item) => {
        item();
      });
      return true;
    },
  });
}
/**
 * @name: effect
 * @description: 副作用函数包装
 * @param {*} fu
 */
export function effect(fu) {
  debugger;
  // 函数缓存
  activeFu = fu;
  // 执行副作用函数
  fu();
  // 置空
  activeFu = null;
}
