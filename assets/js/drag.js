// 用于绑定事件的工具函数
function bindEvent(element, eventType, callback) {
  if (element.attachEvent) {
    if (eventType.indexOf('on')) {
      eventType = 'on' + eventType;
    }
    element.attachEvent(eventType, callback);
  }else{
    if(!eventType.indexOf('on')){
      eventType = eventType.substring(2, eventType.length);
    }
    element.addEventListener(eventType,callback,false);
  }
  return callback;
}

// 用于移除事件的工具函数
function removeEvent(element, eventType, callback){
  if (element.detachEvent) {
    if (eventType.indexOf('on')) {
      eventType = 'on' + eventType;
    }
    element.detachEvent(eventType, callback);
  }else{
    if(!eventType.indexOf('on')){
      eventType = eventType.substring(2, eventType.length);
    }
    element.removeEventListener(eventType,callback,false);
  }
}

// 拖拽函数
function __drag(dragger){
  var drag = bindEvent(dragger, 'onmousedown', (e) => {
    e = e || event;
    var mouseX = e.clientX || e.pageX;
    var mouseY = e.clientY || e.pageY;
    var objStyle = dragger.currentStyle || window.getComputedStyle(dragger,null);
    var objX = parseInt(objStyle.left) || 0;
    var objY = parseInt(objStyle.top) || 0;
    var limitX = mouseX - objX ;
    var limitY = mouseY - objY ;
    var screenBodyWidth = document.body.clientWidth - 800;
    var screenBodyHeight = document.body.clientHeight - 242.22;

    if(!dragger.onDrag){
      dragger.onDrag = bindEvent(document, 'onmousemove', (e) => {
        e = e || event;
        dragger.style.left = (e.clientX || e.pageX) - limitX + 'px';
        dragger.style.top = (e.clientY || e.pageY) - limitY + 'px';
        if(parseInt(dragger.style.left)<0){
          dragger.style.left=0+"px";
        }
        if(parseInt(dragger.style.left)>screenBodyWidth){
          dragger.style.left=screenBodyWidth+"px";
        }
        if(parseInt(dragger.style.top)>screenBodyHeight){
          dragger.style.top=screenBodyHeight+"px";
        }
        if(parseInt(dragger.style.top)<0){
          dragger.style.top=0+"px";
        }
      });
      dragger.onDragEnd = bindEvent(document, 'onmouseup', () => {

        removeEvent(document,'onmousemove',dragger.onDrag);
        removeEvent(document,'onmouseup',dragger.onDragEnd);
        try{
          delete dragger.onDrag;
          delete dragger.onDragEnd;
        }catch(e){
          dragger.removeAttribute('onDrag');
          dragger.removeAttribute('onDragEnd');
        }
      })
    }
  })
}
