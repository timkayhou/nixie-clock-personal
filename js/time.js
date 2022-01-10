var flag, clockVar = 0;
var myTime = 24;
var x = 1;
var alpha1 = 100;
var bgSize, imageElement = document.getElementsByTagName('body');
var imageElement1 = document.getElementsByTagName("div");
var obj1 = document.getElementsByTagName("img");
var s;

// Wallpaper Engine提供的全局对象，用户首次加载或更改墙纸的属性时触发
window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    if (properties.time1) {
      myTime = properties.time1.value;
    }
    if (properties.aBool) {
      if (properties.aBool.value) {
        imageElement[0].style.background = "#000000";
        properties.bImage.value = "";
      }
    }
    if (properties.bImage) {
      if (properties.bImage.value) {
        imageElement[0].style.backgroundImage = 'url(' + 'file:///' + properties.bImage.value + ')';
      }
    }
    if (properties.combo) {
      bgSize = properties.combo.value;
      imageElement[0].style.backgroundSize = bgSize;
    }
    if (properties.bAlpha) {
      alpha1 = properties.bAlpha.value;
      imageElement1[0].style.filter = 'alpha(opacity=' + alpha1 + ')';
      imageElement1[0].style.opacity = alpha1 / 100;
    }
    if (properties.Drag) {
      if (properties.Drag.value) {
        imageElement1[0].onDrag = true;
      }
      else {
        imageElement1[0].onDrag = false;
        imageElement1[0].style.margin = 0;
      }
    }
    if (properties.CPosition) {
      if (properties.CPosition.value) {
        imageElement1[0].onDrag = true;
        imageElement1[0].style.left = 0;
        imageElement1[0].style.top = 0;
        imageElement1[0].style.margin = "auto";
      }
      else {
        imageElement1[0].style.margin = 0;
        imageElement1[0].onDrag = false;
      }
    }
  }
}

function imgDragStart() {
  return false;
}

// 加载完毕时执行此函数
window.onload = () => {
  for (i in document.images) document.images[i].ondragstart = imgDragStart;
  _drag(document.getElementById("clockDiv"));
  s = t();
  var date = new Date();
  var dateIntegralPoint = new Date();
  dateIntegralPoint.setHours(date.getHours() + 1);
  dateIntegralPoint.setMinutes(0);
  dateIntegralPoint.setSeconds(0);
  window.setTimeout(nextIntegralPointAfterLogin, dateIntegralPoint - date);
}

// 登录之后的下一个整点
function nextIntegralPointAfterLogin() {
  clickClock();
  window.setInterval(clickClock, 60 * 60 * 1000);
}


function clickClock() {
  clockVar = (clockVar + 1) % 8;
  clearInterval(s);
  window.setTimeout(() => { s = t() }, 3000);
  ran();
}

function t() {
  flag++;
  return window.setInterval(tick, 1000);
}

// 一位数时间时补全0
function toNum(num){
  if (num < 10) { return '0' + num; }
  else { return "" + num; }
}

function tick() {
  var time = new Date();
  var time1;
  if (myTime == 12 && time.getHours() > 12) {
    time1 = toNum(time.getHours() - 12) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  else {
    time1 = toNum(time.getHours()) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  var y = '1';
  x++;
  y = y + (x % 2 + 1);

  //获取时分秒
  {
    obj1[0].src = './images/' + time1[0] + '.png';
    obj1[1].src = './images/' + time1[1] + '.png';
    obj1[2].src = './images/' + y + '.png';
    obj1[3].src = './images/' + time1[2] + '.png';
    obj1[4].src = './images/' + time1[3] + '.png';
    obj1[5].src = './images/' + y + '.png';
    obj1[6].src = './images/' + time1[4] + '.png';
    obj1[7].src = './images/' + time1[5] + '.png';
  }
}

function ran() {
  var timeArray = new Array(7);
  for (var i = 0; i < 7; i++) {
    timeArray[i] = 0;
  }
  var j = 1;
  var obj = document.getElementsByTagName("img");
  function img1() {
    obj[0].src = './images/' + timeArray[0] + '.png';
    obj[1].src = './images/' + '11.png';
    obj[2].src = './images/' + timeArray[1] + '.png';
    obj[3].src = './images/' + timeArray[2] + '.png';
    obj[4].src = './images/' + timeArray[3] + '.png';
    obj[5].src = './images/' + timeArray[4] + '.png';
    obj[6].src = './images/' + timeArray[5] + '.png';
    obj[7].src = './images/' + timeArray[6] + '.png';
  }
  function tick1() {
    for (var i = 0; i < 7; i++) {
      timeArray[i] = j++ % 10;
    }
    img1();
  }
  function ran1() {
    if (Math.floor(Math.random() * 8) == clockVar) {
      timeArray[0] = 1;
      timeArray[1] = 0;
      timeArray[2] = 4;
      timeArray[3] = 8;
      timeArray[4] = 5;
      timeArray[5] = 9;
      timeArray[6] = 6;
    }
    else {
      timeArray[0] = Math.floor(Math.random() * 2);
      for (var i = 1; i < 7; i++) {
        timeArray[i] = Math.floor(Math.random() * 10);
      }
    }
    img1();
  }
  var time1 = window.setInterval(tick1, 50);
  window.setTimeout(() => { clearInterval(time1) }, 2000);
  window.setTimeout(ran1, 2000);
}
