// 绑定func到element的eventName事件上
function bindEvent(element, eventName, func) {
  if (element.attachEvent) {
    if (eventName.indexOf('on')) {
      eventName = 'on' + eventName
    }
    element.attachEvent(eventName, func);
  }
  else {
    if (!eventName.indexOf('on')) {
      eventName = eventName.substring(2, eventName.length)
    }
    element.addEventListener(eventName, func, false);
  }
  return func;
}

// 取消绑定func到element的eventName事件
function removeEvent(element, eventName, func) {
  if (element.detachEvent) {
    if (eventName.indexOf('on')) {
      eventName = 'on' + eventName
    }
    element.detachEvent(eventName, func);
  }
  else {
    if (!eventName.indexOf('on')) {
      eventName = eventName.substring(2, eventName.length);
    }
    element.removeEventListener(eventName, func, false);
  }
}

//创建接口
function _drag(dragger) {
  var drag = bindEvent(dragger, 'onmousedown', function (e) {
    e = e || event;
    var mouseX = e.clientX || e.pageX;
    var mouseY = e.clientY || e.pageY;
    var objStyle = dragger.currentStyle || window.getComputedStyle(dragger, null);
    var objX = parseInt(objStyle.left) || 0;
    var objY = parseInt(objStyle.top) || 0;
    var limitX = mouseX - objX;
    var limitY = mouseY - objY;
    var screenBodyWide = document.body.clientWidth - 800;
    var screenBodyHeight = document.body.clientHeight - 242.22;

    if (!dragger.onDrag) {
      dragger.onDrag = bindEvent(document, 'onmousemove', function (e) {

        e = e || event;
        dragger.style.left = (e.clientX || e.pageX) - limitX + 'px';
        dragger.style.top = (e.clientY || e.pageY) - limitY + 'px';
        if (parseInt(dragger.style.left) < 0) {
          dragger.style.left = 0 + "px";
        }
        if (parseInt(dragger.style.left) > screenBodyWide) {
          dragger.style.left = screenBodyWide + "px";
        }
        if (parseInt(dragger.style.top) > screenBodyHeight) {
          dragger.style.top = screenBodyHeight + "px";
        }
        if (parseInt(dragger.style.top) < 0) {
          dragger.style.top = 0 + "px";
        }
      });
      dragger.onDragEnd = bindEvent(document, 'onmouseup', function () {
        removeEvent(document, 'onmousemove', dragger.onDrag);
        removeEvent(document, 'onmouseup', dragger.onDragEnd);
        try {
          delete dragger.onDrag;
          delete dragger.onDragEnd;
        } catch (e) {
          dragger.removeAttribute('onDrag');
          dragger.removeAttribute('onDragEnd');
        }
      })
    }
  })
}
