// 验证特殊字符
export function stripscript(s) {
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#%￥……&*（）&;—|{ }【】‘；：”“'。，、？]");
  let rs = '';
  for (let i = 0; i < s.length; i++) {
    rs += s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
// 验证邮箱
export function checkEmail(value) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value);
}
// 验证密码
export function checkPassword(value) {
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(value);
}
// 验证验证码
export function checkVerification(value) {
  const reg = /^[a-z0-9]{6}$/;
  return reg.test(value);
}
