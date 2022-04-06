/*
 * @Description: render函数
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 10:16:14
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-05 14:57:10
 */
/**
 * @name: render
 * @description: 渲染函数
 * @param {type} {*}
 * @return {type} {*}
 * @param {*} vdom
 * @param {*} container
 */
export function render(vdom, container) {
  const el = document.createElement(vdom.tag);
  // 子元素添加
  if ("children" in vdom) {
    const children = vdom.children;
    if (Array.isArray(children)) {
      //递归调用
      children.forEach((item) => {
        render(item, el);
      });
    } else if (typeof children == "string" || typeof children == "number") {
      el.innerHTML = children;
    }
  }
  //属性和事件绑定
  if ("props" in vdom) {
    for (let k in vdom.props) {
      // 绑定事件
      if (k.startsWith("on")) {
        const eventName = k.substring(2).toLocaleLowerCase();
        el.addEventListener(eventName, vdom.props[k]);
        // 绑定属性
      } else {
        el.setAttribute(k, vdom.props[k]);
      }
    }
  }
  // 将元素添加到容器中
  container.appendChild(el);
  // 将dom挂载在虚拟dom上面diff算法时有用
  vdom["$el"] = el;
}

/**
 * @name: patch
 * @description: 更新dom
 * @param {type} {*}
 * @return {type} {*}
 */
export function patch(oldVdom, newVdom) {
  // 里面很多种
  if (oldVdom.tag == newVdom.tag) {
    const children = oldVdom.children;
    if (Array.isArray(children)) {
      // 子数组的长度是否一样，这里涉及比较复杂的算法
      if (children.lenth == newVdom.children.lenth) {
        children.forEach((item, index) => {
          patch(item, newVdom.children[index]);
        });
      }
    } else if (typeof children == "string" || typeof children == "number") {
      // 数据不一致更新dom
      if (children != newVdom.children) {
        oldVdom.$el.innerHTML = newVdom.children;
      }
    }
  }
  newVdom["$el"] = oldVdom["$el"];
}

/**
 * @name: h
 * @description: 返回虚拟dom
 * @param {type} {*}
 * @return {type} {*}
 */
export function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}
