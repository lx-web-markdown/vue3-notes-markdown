export function dateFormatterStandard(time) {
  let res = '';
  const date = new Date(time);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const i = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  res = `${y}-${m}-${d} ${h}:${i}`;
  return res;
}
export function dateFormatterStandardYear() {
  let res = '';
  const date = new Date();
  const y = date.getFullYear();
  res = `${y}`;
  return res;
}
export function dateFormatterStandardMonth() {
  let res = '';
  const date = new Date();
  const m = date.getMonth() + 1;
  res = `${m}`;
  return res;
}

export function getClientWidth() {
  return document.body.clientWidth;
}
