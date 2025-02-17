// 统一返回格式类型
export type ResType<T> = {
  // 状态码
  code: string
  // 状态消息
  message: string
  // 返回数据
  result: T
}
