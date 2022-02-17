var flag = 0;
var sgVar = 0;
var x = 0;
var s;
var defaultTimeSystem = 24;
var defaultTransparency = 100;
var bodyElement = document.getElementsByTagName('body');
var clockElement = document.getElementsByTagName("div");

// 首次加载或修改属性时触发
window.wallpaperPropertyListener = {
  // 取得属性设置
  applyUserProperties: function (properties) {
    if (properties.timeSystem) {
      // 设置小时制
      defaultTimeSystem = properties.timeSystem.value;
    }
    if (properties.useDefaultWallpaper) {
      if (properties.useDefaultWallpaper.value) {
        // 默认全黑背景
        bodyElement[0].style.background = "#000000";
      }
    }
    if (properties.setWallpaper) {
      if (properties.setWallpaper.value) {
        // 手动设置壁纸
        bodyElement[0].style.backgroundImage = 'url(' + 'file:///' + properties.setWallpaper.value + ')';
      }
    }
    if (properties.wallpaperFillType) {
      // 设置图片填充方式
      bodyElement[0].style.backgroundSize = properties.wallpaperFillType.value;
    }
    if (properties.clockTransparency) {
      // 设置时钟透明度
      defaultTransparency = properties.clockTransparency.value;
      clockElement[0].style.filter = 'alpha(opacity=' + defaultTransparency + ')';
      clockElement[0].style.opacity = defaultTransparency / 100;
    }
    if (properties.unlockClockPosition) {
      if (properties.unlockClockPosition.value) {
        // 解除时钟位置锁定
        clockElement[0].onDrag = true;
      }
      else {
        // 锁定时钟位置
        clockElement[0].onDrag = false;
      }
    }
    if (properties.isClockCenter) {
      if (properties.isClockCenter.value) {
        // 解除时钟位置锁定
        clockElement[0].onDrag = true;
        // 时钟移动到左上角
        clockElement[0].style.left = 0;
        clockElement[0].style.top = 0;
        // 恢复默认外边距
        clockElement[0].style.margin = "auto";
      }
      else {
        // 时钟居中
        clockElement[0].style.margin = 0;
        // 锁定时钟位置
        clockElement[0].onDrag = false;
      }
    }
  }
}

function imgDragStart() { return false; }

window.onload = function () {
  for (i in document.images) document.images[i].ondragstart = imgDragStart;
  __drag(_$("clockDiv"));
  s = t();
  var date = new Date();
  var dateIntegralPoint = new Date();
  dateIntegralPoint.setHours(date.getHours() + 1);
  dateIntegralPoint.setMinutes(0);
  dateIntegralPoint.setSeconds(0);
  window.setTimeout(nextIntegralPointAfterLogin, dateIntegralPoint - date);
}

function nextIntegralPointAfterLogin() {
  clickClock();
  window.setInterval(clickClock, 60 * 60 * 1000);
}

function clickClock() {
  sgVar = (sgVar + 1) % 8;
  clearInterval(s);
  window.setTimeout(function () { s = t() }, 3000);
  ran();
}

function t() {
  var t = window.setInterval(tick, 1000);
  flag++;
  return t;
}
var obj1 = document.getElementsByTagName("img");
function toNum(num) {
  if (num < 10) { return '0' + num; }
  else { return "" + num; }

}
function tick() {
  var time = new Date();
  var time1;
  if (defaultTimeSystem == 12 && time.getHours() > 12) {
    time1 = toNum(time.getHours() - 12) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  else {
    time1 = toNum(time.getHours()) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  }
  var y = '1';
  x++;
  y = y + (x % 2 + 1);
  {
    obj1[0].src = './assets/images/' + time1[0] + '.png';
    obj1[1].src = './assets/images/' + time1[1] + '.png';
    obj1[2].src = './assets/images/' + y + '.png';
    obj1[3].src = './assets/images/' + time1[2] + '.png';
    obj1[4].src = './assets/images/' + time1[3] + '.png';
    obj1[5].src = './assets/images/' + y + '.png';
    obj1[6].src = './assets/images/' + time1[4] + '.png';
    obj1[7].src = './assets/images/' + time1[5] + '.png';
  }
}
function ran() {
  var sg = new Array(7);
  for (var i = 0; i < 7; i++) {
    sg[i] = 0;
  }
  var j = 1;
  var obj = document.getElementsByTagName("img");
  function img1() {
    obj[0].src = './assets/images/' + sg[0] + '.png';
    obj[1].src = './assets/images/' + '11.png';
    obj[2].src = './assets/images/' + sg[1] + '.png';
    obj[3].src = './assets/images/' + sg[2] + '.png';
    obj[4].src = './assets/images/' + sg[3] + '.png';
    obj[5].src = './assets/images/' + sg[4] + '.png';
    obj[6].src = './assets/images/' + sg[5] + '.png';
    obj[7].src = './assets/images/' + sg[6] + '.png';
  }
  function tick1() {
    for (var i = 0; i < 7; i++) {
      sg[i] = j++ % 10;
    }
    img1();
  }
  function isSteinsGate() {
    if (Math.floor(Math.random() * 8) == sgVar) {
      sg[0] = 1;
      sg[1] = 0;
      sg[2] = 4;
      sg[3] = 8;
      sg[4] = 5;
      sg[5] = 9;
      sg[6] = 6;
    }
    else {
      sg[0] = Math.floor(Math.random() * 2);
      for (var i = 1; i < 7; i++) {
        sg[i] = Math.floor(Math.random() * 10);
      }
    }
    img1();
  }
  var time1 = window.setInterval(tick1, 50);
  window.setTimeout(function () { clearInterval(time1) }, 2000);
  window.setTimeout(isSteinsGate, 2000);
}
