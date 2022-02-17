var sgVar = 0;
// 时钟执行或清零
var clockStatus;
// 用于时钟内每秒左右闪烁的点的图片的切换
var parityCheckFlag = 0;
// 默认24小时制
var defaultTimeSystem = 24;
// 默认不透明
var defaultTransparency = 100;
// 网页主体元素
var bodyElement = document.getElementsByTagName('body');
// 钟表块元素
var clockElement = document.getElementById("clockDiv");
// 表盘数字元素
var imageElements = document.getElementsByTagName("img");

// 首次加载或修改属性时触发
window.wallpaperPropertyListener = {
  // 取得属性设置
  applyUserProperties: (properties) => {
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

// 网页加载完毕后立刻执行
window.onload = () => {
  // 获取当前时间
  var date = new Date();
  var dateIntegralPoint = new Date();
  //
  for (i in document.images) {
    document.images[i].ondragstart = imageDragStart;
  }
  __drag(_$("clockDiv"));
  clockStatus = setClockEverySecond();
  dateIntegralPoint.setHours(date.getHours() + 1);
  dateIntegralPoint.setMinutes(0);
  dateIntegralPoint.setSeconds(0);
  window.setTimeout(nextIntegralPointAfterLogin, dateIntegralPoint - date);
}

// 图片开始拖拽
function imageDragStart() { return false; }

function setClockEverySecond() {
  // 每秒更新一次时间图片
  return window.setInterval(setTimeImages, 1000);
}

// 根据当前时间设置时钟图片
function setTimeImages() {
  // 获取当前时间
  var time = new Date();
  // 获取当前十分秒的六位数字
  var nowTimeNumbers = toNum(time.getHours()) + toNum(time.getMinutes()) + toNum(time.getSeconds());
  // 当设置为12小时制且当前时间为下午时
  if (defaultTimeSystem == 12 && time.getHours() > 12) {
    // 将当前时间转换为12小时制
    nowTimeNumbers -= 120000;
  }
  parityCheckFlag++;
  var dotImageFileName = '1';
  // 点的图片文件名为'11'或'12'
  dotImageFileName = dotImageFileName + (parityCheckFlag % 2 + 1);
  {
    imageElements[0].src = './assets/images/' + nowTimeNumbers[0] + '.png';
    imageElements[1].src = './assets/images/' + nowTimeNumbers[1] + '.png';
    imageElements[2].src = './assets/images/' + dotImageFileName + '.png';
    imageElements[3].src = './assets/images/' + nowTimeNumbers[2] + '.png';
    imageElements[4].src = './assets/images/' + nowTimeNumbers[3] + '.png';
    imageElements[5].src = './assets/images/' + dotImageFileName + '.png';
    imageElements[6].src = './assets/images/' + nowTimeNumbers[4] + '.png';
    imageElements[7].src = './assets/images/' + nowTimeNumbers[5] + '.png';
  }
}
function nextIntegralPointAfterLogin() {
  clickClock();
  // 一小时之后再次触发
  window.setInterval(clickClock, 60 * 60 * 1000);
}

function toNum(num) {
  if (num < 10) { return '0' + num; }
  else { return "" + num; }

}

function clickClock() {
  sgVar = (sgVar + 1) % 8;
  // 停止时钟
  clearInterval(clockStatus);
  // 3秒之后开始时钟
  window.setTimeout(() => { clockStatus = setClockEverySecond() }, 3000);
  ran();
}

function ran() {
  var steinsGateArray = new Array(7);
  for (var i = 0; i < 7; i++) {
    steinsGateArray[i] = 0;
  }
  var j = 1;
  var obj = document.getElementsByTagName("img");
  var time1 = window.setInterval(tick1, 50);
  window.setTimeout(() => { clearInterval(time1) }, 2000);
  window.setTimeout(isSteinsGate, 2000);
  function tick1() {
    for (var i = 0; i < 7; i++) {
      steinsGateArray[i] = j++ % 10;
    }
    // 设置图片路径
    setImagePath();
  }
  // 设置图片路径
  function setImagePath() {
    obj[0].src = './assets/images/' + steinsGateArray[0] + '.png';
    obj[1].src = './assets/images/' + '11.png';
    obj[2].src = './assets/images/' + steinsGateArray[1] + '.png';
    obj[3].src = './assets/images/' + steinsGateArray[2] + '.png';
    obj[4].src = './assets/images/' + steinsGateArray[3] + '.png';
    obj[5].src = './assets/images/' + steinsGateArray[4] + '.png';
    obj[6].src = './assets/images/' + steinsGateArray[5] + '.png';
    obj[7].src = './assets/images/' + steinsGateArray[6] + '.png';
  }
  function isSteinsGate() {
    // 随机数乘8取整
    if (Math.floor(Math.random() * 8) == sgVar) {
      steinsGateArray[0] = 1;
      steinsGateArray[1] = 0;
      steinsGateArray[2] = 4;
      steinsGateArray[3] = 8;
      steinsGateArray[4] = 5;
      steinsGateArray[5] = 9;
      steinsGateArray[6] = 6;
    }
    else {
      steinsGateArray[0] = Math.floor(Math.random() * 2);
      for (var i = 1; i < 7; i++) {
        steinsGateArray[i] = Math.floor(Math.random() * 10);
      }
    }
    // 设置图片路径
    setImagePath();
  }
}
