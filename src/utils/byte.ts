export function bytesToGB(bytes = 0): number {
  // 1 GB = 1024 * 1024 * 1024 Bytes
  const conversionFactor = 1024 * 1024 * 1024;

  // 对浮点数进行处理，四舍五入到两位小数
  return Math.round(bytes / conversionFactor);
}

export function kbToGB(bytes = 0): number {
  // 1 GB = 1024 * 1024 * 1024 Bytes
  const conversionFactor = 1024 * 1024;

  // 对浮点数进行处理，四舍五入到两位小数
  return Math.round(bytes / conversionFactor);
}
