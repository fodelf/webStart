/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2022-04-08 10:20:40
 * @LastEditors: 吴文周
 * @LastEditTime: 2022-04-08 11:18:23
 */
interface Fu<T> {}
export function filter<T>(event: T): Fu<T>;
export function filter<T, R>(
  event: Fu<T | R>,
  filter: (e: T | R) => e is R
): Fu<R>;
export function filter<T, R>(event: Fu<T | R>): Fu<R> {
  return event;
}

filter(1);
