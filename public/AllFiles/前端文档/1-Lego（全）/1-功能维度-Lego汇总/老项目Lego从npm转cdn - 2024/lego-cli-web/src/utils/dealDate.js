// 2020-04-03  =>  4-3
export function standard2simpleDate(date) {
  const sim = date.slice(5, 10);
  const arr = sim.split('-');
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = Number(arr[i]) < 10 ? arr[i].slice(1, 2) : arr[i];
  }
  return arr.join('-');
}
export function standardGetForYearAndMonth(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const mm = m > 10 ? m : `0${m}`;
  return `${y}-${mm}`;
}

// 判断一个时间是否在一段时间范围内 [{start: '2020-03-04 00:00:00', end: '2020-03-05 00:00:00']
export function rangeTime(arr, time) {
  if (!Array.isArray(arr)) return false;
  let isRange = false;
  const t = new Date(time).getTime();
  for (let i = 0; i < arr.length; i += 1) {
    const s = new Date(`${arr[i].start} 00:00:00`).getTime();
    const e = new Date(`${arr[i].end} 23:59:59`).getTime();
    if (t > s && t < e) {
      isRange = true;
    }
  }
  return isRange;
}
