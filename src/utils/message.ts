import { ElMessage } from "element-plus";
import type { MessageOptions } from "element-plus/es/components";

export function message(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option });
}
export function warningMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "warning" });
}
export function errorMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "error" });
}
export function infoMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "info" });
}
