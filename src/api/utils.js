import md5 from 'js-md5'

// 生成签名
let SECRETKEY = 'zdW9Y2ZWEUZ-Jr8wuehrERPiITg-oGtjzpD6dfZv';
export function createSign(params) {
  let dataString = '';
  if (typeof params === 'object') {
    Object.keys(params).sort().forEach(function (ele, index) {
      let value = params[ele];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      dataString += ele + '=' + value;
    })
  }
  return md5(dataString + SECRETKEY)
}
export function leftTimer(enddate,status) {
  let dt;
  if(status==5){
    dt=48*3600*1000
  }else if(status==6||status==7){
    dt=240*3600*1000
  }
  var leftTime = (new Date(enddate)) - new Date()+dt; //计算剩余的毫秒数
  var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
  var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
  days = checkTime(days);
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
  window.clearInterval(_ordertimer);
  _ordertimer = null;
  }
 }
 function checkTime(i) { //将0-9的数字前面加上0，例1变为01
  if (i < 10) {
  i = "0" + i;
  }
  return i;
 }
