var sgVar = 0;
// 时钟执行或清零
var clockStatus;
// 用于时钟内每秒左右闪烁的点的图片的切换
var parityCheckFlag = 0;
// 默认24小时制
var defaultTimeSystem = 24;
// 默认不透明
var defaultTransparency = 100;
// 网页主体body元素
const bodyElement = document.getElementsByTagName('body')[0];
// 钟表块数组对象
const clockElementArray = document.getElementsByTagName("div");
// 表盘数字数组对象
const imageElementArray = document.getElementsByTagName("img");
// 图片路径
const imagePath = './assets/images/';
// 图片格式
const imageType = '.png';

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
        bodyElement.style.background = "#000000";
      }
    }
    if (properties.setWallpaper) {
      if (properties.setWallpaper.value) {
        // 手动设置壁纸
        bodyElement.style.backgroundImage = 'url(' + 'file:///' + properties.setWallpaper.value + ')';
      }
    }
    if (properties.wallpaperFillType) {
      // 设置图片填充方式
      bodyElement.style.backgroundSize = properties.wallpaperFillType.value;
    }
    if (properties.clockTransparency) {
      // 设置时钟透明度
      defaultTransparency = properties.clockTransparency.value;
      clockElementArray[0].style.filter = 'alpha(opacity=' + defaultTransparency + ')';
      clockElementArray[0].style.opacity = defaultTransparency / 100;
    }
    if (properties.unlockClockPosition) {
      if (properties.unlockClockPosition.value) {
        // 解除时钟位置锁定
        clockElementArray[0].onDrag = true;
      }
      else {
        // 锁定时钟位置
        clockElementArray[0].onDrag = false;
      }
    }
    if (properties.isClockCenter) {
      if (properties.isClockCenter.value) {
        // 解除时钟位置锁定
        clockElementArray[0].onDrag = true;
        // 时钟移动到左上角
        clockElementArray[0].style.left = 0;
        clockElementArray[0].style.top = 0;
        // 恢复默认外边距
        clockElementArray[0].style.margin = "auto";
      }
      else {
        // 时钟居中
        clockElementArray[0].style.margin = 0;
        // 锁定时钟位置
        clockElementArray[0].onDrag = false;
      }
    }
  }
}

// 网页加载完毕后立刻执行
window.onload = () => {
  // 获取当前时间
  var date = new Date();
  var dateIntegralPoint = new Date();
  // 加载完毕后开始监测世界线变动率
  worldLineChangeRate();
  __drag(clockElementArray[0]);
  clockStatus = setClockEverySecond();
  // 取得下个小时的整点时间
  dateIntegralPoint.setHours(date.getHours() + 1);
  dateIntegralPoint.setMinutes(0);
  dateIntegralPoint.setSeconds(0);
  window.setTimeout(nextIntegralPointAfterLogin, dateIntegralPoint - date);
}

// 每秒更新一次时间图片
function setClockEverySecond() {
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
    imageElementArray[0].src = imagePath + nowTimeNumbers[0] + imageType;
    imageElementArray[1].src = imagePath + nowTimeNumbers[1] + imageType;
    imageElementArray[2].src = imagePath + dotImageFileName + imageType;
    imageElementArray[3].src = imagePath + nowTimeNumbers[2] + imageType;
    imageElementArray[4].src = imagePath + nowTimeNumbers[3] + imageType;
    imageElementArray[5].src = imagePath + dotImageFileName + imageType;
    imageElementArray[6].src = imagePath + nowTimeNumbers[4] + imageType;
    imageElementArray[7].src = imagePath + nowTimeNumbers[5] + imageType;
  }
}

function nextIntegralPointAfterLogin() {
  clickClock();
  // 一小时之后再次触发
  window.setInterval(clickClock, 60 * 60 * 1000);
}

// 将时间数字转化为两位数字符串
function toNum(num) {
  if (num < 10) {
    // 一位数字补零
    return '0' + num;
  } else {
    // 两位数字转化为字符串
    return "" + num;
  }

}

function clickClock() {
  // 1到7之间递增
  sgVar = (sgVar + 1) % 8;
  // 停止时钟
  clearInterval(clockStatus);
  // 3秒之后开始时钟
  window.setTimeout(() => { clockStatus = setClockEverySecond() }, 3000);
  worldLineChangeRate();
}

// 开始监测世界线变动率
function worldLineChangeRate() {
  // 随机数用的7位全0数组
  var steinsGateArray = new Array(7).fill(0);
  var j = 1;
  var time1 = window.setInterval(tick1, 50);
  window.setTimeout(() => { clearInterval(time1) }, 2000);
  window.setTimeout(isSteinsGate, 2000);
  function tick1() {
    // 遍历7位数组
    for (var i = 0; i < steinsGateArray.length; i++) {
      // 1到9之间递增
      steinsGateArray[i] = j++ % 10;
    }
    // 设置图片路径
    setImagePath();
  }
  // 设置图片路径
  function setImagePath() {
    imageElementArray[0].src = imagePath + steinsGateArray[0] + imageType;
    imageElementArray[1].src = imagePath + '11' + imageType;
    imageElementArray[2].src = imagePath + steinsGateArray[1] + imageType;
    imageElementArray[3].src = imagePath + steinsGateArray[2] + imageType;
    imageElementArray[4].src = imagePath + steinsGateArray[3] + imageType;
    imageElementArray[5].src = imagePath + steinsGateArray[4] + imageType;
    imageElementArray[6].src = imagePath + steinsGateArray[5] + imageType;
    imageElementArray[7].src = imagePath + steinsGateArray[6] + imageType;
  }

  function isSteinsGate() {
    // 0到8的随机数
    if (Math.floor(Math.random() * 8) == sgVar) {
      steinsGateArray = [1, 0, 4, 8, 5, 9, 6];
    }
    else {
      // 0或1的随机数
      steinsGateArray[0] = Math.floor(Math.random() * 2);
      for (var i = 1; i < 7; i++) {
        steinsGateArray[i] = Math.floor(Math.random() * 10);
      }
    }
    // 设置图片路径
    setImagePath();
  }
}
