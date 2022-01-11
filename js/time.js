var clockVar = 0;
var myTime = 24;
var x = 1;
var alpha1 = 100;
var bodyElement = document.getElementsByTagName('body');
var imageElement1 = document.getElementsByTagName("div");
var obj1 = document.getElementsByTagName("img");
var s;

// Wallpaper Engine提供的全局对象，用户首次加载或更改墙纸的属性时触发
window.wallpaperPropertyListener = {
  // 传入project.json配置
  applyUserProperties: (properties) => {
    if (properties.timeSystem == 12) {
      myTime = properties.timeSystem.value;
    }
    if (properties.useDefaultWallpaper) {
      if (properties.useDefaultWallpaper.value) {
        bodyElement[0].style.background = "#000000";
        properties.setWallpaper.value = "";
      }
    }
    if (properties.setWallpaper) {
      if (properties.setWallpaper.value) {
        bodyElement[0].style.backgroundImage = 'url(' + 'file:///' + properties.setWallpaper.value + ')';
      }
    }
    if (properties.fillStyle) {
      bodyElement = properties.fillStyle.value;
      bodyElement[0].style.backgroundSize = bodyElement;
    }
    if (properties.transparency) {
      alpha1 = properties.transparency.value;
      imageElement1[0].style.filter = 'alpha(opacity=' + alpha1 + ')';
      imageElement1[0].style.opacity = alpha1 / 100;
    }
    if (properties.lockClock) {
      if (properties.lockClock.value) {
        imageElement1[0].onDrag = true;
      }
      else {
        imageElement1[0].onDrag = false;
        imageElement1[0].style.margin = 0;
      }
    }
    if (properties.clockIsCenter) {
      if (properties.clockIsCenter.value) {
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

// 加载完毕时执行此函数
window.onload = () => {
  var date = new Date();
  var dateIntegralPoint = new Date();
  for (i in document.images) document.images[i].ondragstart = imgDragStart;
  _drag(document.getElementById("clockDiv"));
  s = t();
  dateIntegralPoint.setHours(date.getHours() + 1);
  dateIntegralPoint.setMinutes(0);
  dateIntegralPoint.setSeconds(0);
  window.setTimeout(nextIntegralPointAfterLogin, dateIntegralPoint - date);
}

function imgDragStart() {
  return false;
}

// 下两个整点执行一次clickClock()
function nextIntegralPointAfterLogin() {
  clickClock();
  window.setInterval(clickClock, 3600000);
}


function clickClock() {
  clockVar = (clockVar + 1) % 8;
  clearInterval(s);
  window.setTimeout(() => { s = t() }, 3000);
  ran();
}

function t() {
  return window.setInterval(tick, 1000);
}

// 一位数时间时补全0
function toNum(num){
  if (num < 10) { return '0' + num; }
  else { return "" + num; }
}

function tick() {
  // 获取当前时间
  var time = new Date();
  var hourClock;
  if (myTime == 12 && time.getHours() > 12) {
    hourClock = toNum(time.getHours() - 12) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  else {
    hourClock = toNum(time.getHours()) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  var y = '1';
  x++;
  y = y + (x % 2 + 1);

  //获取时分秒
  {
    obj1[0].src = './images/' + hourClock[0] + '.png';
    obj1[1].src = './images/' + hourClock[1] + '.png';
    obj1[2].src = './images/' + y + '.png';
    obj1[3].src = './images/' + hourClock[2] + '.png';
    obj1[4].src = './images/' + hourClock[3] + '.png';
    obj1[5].src = './images/' + y + '.png';
    obj1[6].src = './images/' + hourClock[4] + '.png';
    obj1[7].src = './images/' + hourClock[5] + '.png';
  }
}

function ran() {
  // 创建7个0的数组
  var timeArray = new Array(7).fill(0)
  // 取得屏幕显示的8位数组
  var obj = document.getElementById("timeImg");
  var j = 1;
  function img1() {
    if (timeArray.length == obj.length) {
      obj[0].src = './images/' + timeArray[0] + '.png';
      obj[1].src = './images/' + '11.png';
      obj[2].src = './images/' + timeArray[1] + '.png';
      obj[3].src = './images/' + timeArray[2] + '.png';
      obj[4].src = './images/' + timeArray[3] + '.png';
      obj[5].src = './images/' + timeArray[4] + '.png';
      obj[6].src = './images/' + timeArray[5] + '.png';
      obj[7].src = './images/' + timeArray[6] + '.png';
    }
  }
  function tick1() {
    for (var i = 0; i < 7; i++) {
      timeArray[i] = j++ % 10;
    }
    img1();
  }
  function ran1() {
    // 如果clockVar为0-7的整数
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
  var timeSystem = window.setInterval(tick1, 50);
  window.setTimeout(() => { clearInterval(timeSystem) }, 2000);
  window.setTimeout(ran1, 2000);
}
