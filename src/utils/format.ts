export function ellipsis(text: string, showLength: number = 4): string {
  if (text.length <= showLength * 2) {
    // 如果字符串长度小于等于显示长度的两倍，则直接返回原字符串
    return text;
  }
  return `${text.slice(0, showLength)}***${text.slice(-showLength)}`;
}
