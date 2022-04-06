/*
 * @Description: render函数
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-04 10:16:14
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-04 22:04:28
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
  if ("children" in vdom) {
    const children = vdom.children;
    if (Array.isArray(children)) {
      // 容器变化递归调用
      children.forEach((item) => {
        render(item, el);
      });
    } else if (typeof children == "string" || typeof children == "number") {
      el.innerHTML = children;
    }
  }
  /*
   *属性和事件绑定
   * props: {
   *  onClick: () => {
   *     console.log("hello word");
   *  },
   *},
   */
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
  // 标志位key提升diff效率
  // vdom["$key"] = new Date().getTime();
  // 挂载容器
  // vdom["$container"] = container;
}
/**
 * @name: isSimpleNode
 * @description: 是否是简单数据 文字或者数字
 * @param {*} node
 */
function isSimpleNode(node) {
  return typeof node == "string" || typeof node == "number";
}
/**
 * @name: patch
 * @description: 更新dom
 * @param {type} {*}
 * @return {type} {*}
 */
export function patch(oldVdom, newVdom) {
  if (oldVdom.tag == newVdom.tag) {
    const children = oldVdom.children;
    const newChildren = newVdom.children;
    // 两个都是数组
    if (Array.isArray(children) && Array.isArray(newChildren)) {
      // 这里涉及比较复杂的算法
      // 容器情况重新渲染
      oldVdom["$el"].innerHTML = "";
      newChildren.forEach((item) => {
        render(item, oldVdom["$el"]);
      });
      // // 子数组的长度是否一样，这里涉及比较复杂的算法
      // if (children.lenth == newVdom.children.lenth) {
      //   children.forEach((item, index) => {
      //     patch(item, newVdom.children[index]);
      //   });
      // }
    } else if (isSimpleNode(newChildren)) {
      // 旧数据是数组，新数据是字符串或者数组
      oldVdom.$el.innerHTML = newChildren;
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
export function h(tag, props, vdomList) {
  let children = [];
  // 如果children是数组
  if (Array.isArray(vdomList)) {
    for (let i = 0; i < vdomList.length; i++) {
      const child = vdomList[i];
      if (child.isComponent) {
        children.push(child.render());
      } else {
        children.push(child);
      }
    }
  } else {
    children = vdomList;
  }
  return {
    tag,
    props,
    children,
  };
}
