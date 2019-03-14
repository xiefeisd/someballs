(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = global || self, factory(global.XFTOUCH = {}));
}(this, function (exports) {
  'use strict';

  /**
	 * @name Vector2
	 * @description 自定义的二维向量，用于支持向量计算
	 * @author xiefeisd / 342752420@qq.com
	 */

  class Vector2 {

    constructor(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
    };

    dot(vector) {
      var x = this.x * vector.x;
      var y = this.y * vector.y;
      var result = x + y;
      return result;
    };

    multiplyScalar(s) {
      var x = this.x * s;
      var y = this.y * s;
      return new Vector2(x, y);
    };

    add(vector) {
      var x = this.x + vector.x;
      var y = this.y + vector.y;
      return new Vector2(x, y);
    };

    subtract(vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;
      return new Vector2(x, y);
    };

    multiply(vector) {
      var x = this.y * vector.z - this.z * vector.y;
      var y = this.z * vector.x - this.x * vector.z;
      return new Vector2(x, y);
    };

    reverse() {
      var x = -this.x;
      var y = -this.y;
      return new Vector2(x, y);
    };

    length() {
      return Math.sqrt(this.lengthSquare());
    };

    lengthSquare() {
      return this.x ** 2 + this.y ** 2;
    };

    normalize() {
      var len = this.length();
      if (len) {
        var x = this.x / len;
        var y = this.y / len;
      }
      return new Vector2(x, y);
    };

    compare(vector) {
      return this.length() > vector.length();
    };

    rotate(angle) {
      var length = this.length();
      var angle0 = this.angle();
      var totalAngle = angle0 + angle;
      var sin = Math.sin(totalAngle);
      var cos = Math.cos(totalAngle);
      var x = length * cos;
      var y = length * sin;
      return new Vector2(x, y);
    };

    angle() {
      var tan = this.y / this.x;
      var ang = Math.atan(tan);
      return ang;
    };

    angleWith(vector) {
      var ang1 = this.angle();
      var ang2 = vector.angle();
      var ang = ang1 - ang2;
      return ang;
    };

    toString() {
      return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3)  + ' )';
    };

  }

  /**
   * @name TouchOperation
	 * @description 触摸操作，把微信提供的触摸接口封装成触摸动作
	 * @author xiefeisd / 342752420@qq.com
	 */

  class TouchOperation{
    
    constructor(point, press, swipe, pinch, glid, pressAndSwipe, other) {
      this.point = point || {};
      this.press = press || {};
      this.swipe = swipe || {};
      this.pinch = pinch || {};
      this.glid = glid || {};
      this.pressAndSwipe = pressAndSwipe || {};
      this.other = other || {};
      this.lastTouch = {};
      this.pressing = false;
      this.pressed = false;
      this.pinching = false;
      this.gliding = false;
      this.pinched = false;
      this.glided = false;
      this.touches = [];
    }

    //设置回call函数
    setPoint(calback) {
      this.point = callback;
    }
    setPress(calback) {
      this.press = callback;
    }
    setSwipe(calback) {
      this.swipe = callback;
    }
    setPinch(calback) {
      this.pinch = callback;
    }
    setGlid(calback) {
      this.glid = callback;
    }
    setPressAndSwipe(calback) {
      this.pressAndSwipe = callback;
    }
    setOther(calback) {
      this.other = callback;
    }

    //处理触摸操作
    operate(touch) {
      var discard = false; // 标志，用于标记本步touch是否抛弃
      if (this.isStart(touch)) {
        //什么都不做
      } else if (this.isMove(touch)) {
        var time = touch.timeStamp - this.lastTouch.timeStamp;
        console.log("触摸点=", touch.changedTouches.length, "time=", time);
        if (1 == touch.changedTouches.length) { //1个触摸点
          if (time > 600) {
            //长压后
            //设置长按标记，保存长按始终的状态
            this.pressed = true;
            this.touches.push(this.lastTouch);
            this.touches.push(touch);
          }
          console.log("pressed=",this.pressed);
          if (!this.pressed) {//没有长按            
            //滑
            //优化：2根手指不同步，2指操作的尾部会被误认为单指滑动，解决方案：2指操作之后加一个锁。此处对锁判断。
            //再次优化：点按手指不稳，识别为滑动，用距离来容差
            var x1 = this.lastTouch.changedTouches[0].pageX;
            var y1 = this.lastTouch.changedTouches[0].pageY;
            var x2 = touch.changedTouches[0].pageX;
            var y2 = touch.changedTouches[0].pageY;
            var length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            console.log("length=", length);
            if (this.isSwipe(touch)){
              if (length > 2) { // 够距离才认为是滑动
                this.swipe({ "start": { "x": x1, "y": y1 }, "end": { "x": x2, "y": y2 }, "time": time });
              }else{ //距离不够，抛弃之
                discard = true;
              }
            }

          } else {//有长按
            //长按后滑动，此处不处理
          }
        } else if (2 == touch.changedTouches.length ) {
          console.log("进入2点");
          //2个触摸点，根据两个点的运动方向，判断是捏合、反捏合、平移，触发不同动作
          if (1 == this.lastTouch.changedTouches.length){ // 上一个触摸只有1个触摸点（解决两根手指不同步导致的下标溢出）
            //什么都不做
            console.log("上次1点");
          }else{
            console.log("上次2点");
            var aFingerX1 = this.lastTouch.changedTouches[0].pageX;
            var aFingerY1 = this.lastTouch.changedTouches[0].pageY;
            var aFingerX2 = touch.changedTouches[0].pageX;
            var aFingerY2 = touch.changedTouches[0].pageY;
            var bFingerX1 = this.lastTouch.changedTouches[1].pageX;
            var bFingerY1 = this.lastTouch.changedTouches[1].pageY;
            var bFingerX2 = touch.changedTouches[1].pageX;
            var bFingerY2 = touch.changedTouches[1].pageY;
            var points = { 
              "fingerA": {
                "start": { "x": aFingerX1, "y": aFingerY1 },
                "end": { "x": aFingerX2, "y": aFingerY2 }
              },
              "fingerB": {
                "start": { "x": bFingerX1, "y": bFingerY1 },
                "end": { "x": bFingerX2, "y": bFingerY2}
              }
            };
            var vec1 = new Vector2(aFingerX2 - aFingerX1, aFingerY2 - aFingerY1);
            var vec2 = new Vector2(bFingerX2 - bFingerX1, bFingerY2 - bFingerY1);
            var angle = vec1.angle(vec2);
            if (angle >  Math.PI*0.028 ) { //角度大于5度，为pinch
              if(this.isPinch(touch)){
                this.pinching = touch; //锁，解决pinch与glid的干扰
                this.pinch({ "points": points, "time": time });
                this.pinching = false;
                this.pinched = touch; //锁，解决2指不同步带来的拖尾
              }
            }else{ //角度小于5度，两指滑移
              if (this.isGlid(touch)) {
                this.gliding = touch; //锁，解决pinch与glid的干扰
                this.glid({ "points": points, "time": time });
                this.gliding = false;
                this.glided = touch; //锁，解决2指不同步带来的拖尾
              }
            } 
          }
        }else{ // 2点以上
          var points = [];
          for(var i = 0; i < touch.changedTouches.length; i++){
            var changedTouch = touch.changedTouches[i];
            var x = changedTouch.pageX;
            var y = changedTouch.pageY;
            var point = {"x": x, "y": y};
            points.push(point);
          }
          this.other({"points": points});
        }
      } else if (this.isEnd(touch)) {
        var time = touch.timeStamp - this.lastTouch.timeStamp;
        if (1 == touch.changedTouches.length) { //1个触摸点
          if (this.isStart(this.lastTouch)) { //上一个是start，规避滑动的结束        
            if (time < 300) {
              //点
              var x = touch.changedTouches[0].pageX;
              var y = touch.changedTouches[0].pageY;
              this.point({ "x": x, "y": y });
            } else if (time > 600) {
              //压
              var x = touch.changedTouches[0].pageX;
              var y = touch.changedTouches[0].pageY;
              this.press({ "x": x, "y": y, "time": time });
            }
          } else if (this.pressed) { //滑动后结束，滑动前有长按
            //长按后滑动
            //优化：两根手指结束不同步，导致误判，解决方法：根据滑动时间判断。            
            var pressStart = this.touches[0];
            var pressEnd = this.touches[1];
            var swipeEnd = touch;
            var time1 = pressEnd.timeStamp - pressStart.timeStamp;
            var time2 = swipeEnd.timeStamp - pressEnd.timeStamp;
            var x1 = pressEnd.changedTouches[0].pageX;
            var y1 = pressEnd.changedTouches[0].pageY;
            var x2 = swipeEnd.changedTouches[0].pageX;
            var y2 = swipeEnd.changedTouches[0].pageY; 
            if(time2 > 300 ){ 
              // 长按后滑动                         
              this.pressAndSwipe({ "start": { "x": x1, "y": y1 }, "end": { "x": x2, "y": y2 }, "presstime": time1, "swipetime": time2 });
              this.pressed = false;
              this.touches = [];
            }else{
              //压
              this.press({ "x": x1, "y": y1, "time": time1 });
            }
          }
        }
      }
      if (! discard){ this.lastTouch = touch; }
    }

    //判断touch是否属于swipe
    isSwipe(touch) {
      if (!this.isMove(touch)) { return false; }
      if (1 !== touch.changedTouches.length) { return false; }
      if (null !== this.pinched) {
        if (touch.timeStamp - this.pinched.timeStamp < 100) {
          return false;
        }
      }
      if (null !== this.glided) {
        if (touch.timeStamp - this.glided.timeStamp < 100) {
          return false;
        }
      }
      return true;
    }

    //判断touch是否属于pinch
    isPinch(touch) {
      if (!this.isMove(touch)) { return false; }
      if (2 !== touch.changedTouches.length) { return false; }
      if (null !== this.gliding) {
        if (null !== this.glided) {
          if (this.glided.timeStamp - this.gliding.timeStamp <= 0) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }

    //判断touch是否属于glid
    isGlid(touch) {
      if (!this.isMove(touch)) { return false; }
      if (2 !== touch.changedTouches.length) { return false; }
      if (null !== this.pinching) {
        if (null !== this.pinched) {
          if (this.pinched.timeStamp - this.pinching.timeStamp <= 0) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }

    //返回触摸事件的类型
    getTouchType(touch) {
      return touch.type;
    }

    //判断事件是否触摸开始
    isStart(touch) {
      return "touchstart" == touch.type;
    }

    //判断事件是否触摸移动
    isMove(touch) {
      return "touchmove" == touch.type;
    }

    //判断事件是否触摸结束
    isEnd(touch) {
      return "touchend" == touch.type;
    }

  }

  exports.TouchOperation = TouchOperation;
  exports.Vector2 = Vector2;

}));