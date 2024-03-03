export const isExpired = (
  millisecondTimestamp: number,
  milliseconds: number
) => {
  const currentTime = Date.now();
  const t = currentTime - millisecondTimestamp;
  return t > milliseconds;
};

export const wait = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

enum LunarMonth {
  '一月' = 1,
  '二月' = 2,
  '三月' = 3,
  '四月' = 4,
  '五月' = 5,
  '六月' = 6,
  '七月' = 7,
  '八月' = 8,
  '九月' = 9,
  '十月' = 10,
  '冬月' = 11, // 对于部分传统农历会有“冬月”表示十一月
  '腊月' = 12, // 腊月通常指十二月
  '十一月' = 11,
  '十二月' = 12,
  '未知' = 13,
}

export function lunarMonthToNumber(
  lunarMonth: keyof typeof LunarMonth
): number {
  return LunarMonth[lunarMonth];
}
