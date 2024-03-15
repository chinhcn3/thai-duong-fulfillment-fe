/* eslint-disable global-require */
import { message } from "antd";

export function messageFn() {
  message.config({
    duration: 5,
    maxCount: 3,
  });
  const [messageApi] = message.useMessage();
  return messageApi;
}
