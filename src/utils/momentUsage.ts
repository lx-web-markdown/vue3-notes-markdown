import moment from "moment";

// 获取指定年份第一季度的时间范围
export function getQuarterRange(quart: number) {
  let start = moment();
  let end = moment();
  const year = start.year(); // 获取当前年份  
  switch (quart) {
    case 1:
      // 第一季度
      start = moment(`${year}-01-01 00:00:00`);
      end = moment(`${year}-04-01 00:00:00`);
      break;
    case 2:
      start = moment(`${year}-04-01 00:00:00`); 
      end = moment(`${year}-07-01 00:00:00`); 
      break;
    case 3:
      start = moment(`${year}-07-01 00:00:00`);
      end = moment(`${year}-10-01 00:00:00`);
      break;
    case 4:
      start = moment(`${year}-10-01 00:00:00`);
      end = moment(`${year+1}-01-01 00:00:00`);
      break;
  }
  return { start: start.format(`MM-DD HH:mm:ss`), end: end.format(`MM-DD HH:mm:ss`) };
}

/** 
 * 获取某年某月的最后一天
 * 输出: 2025-02-28
 */
export function getLastDayOfMonth(year: string, month: string) {
  const lastDay = moment(`${year}-${month}`, "YYYY-MM").endOf('month');
  return lastDay.format("YYYY-MM-DD");
}

