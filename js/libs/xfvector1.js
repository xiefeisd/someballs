(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.XFVECTOR = {}));
}(this, function (exports) { 'use strict';
	//上边的头抄的three.js的，不懂啥意思
	//下边开始自己的函数定义

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
      var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      var y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
      return new Vector2(x, y);
    };

    angle(vector) {
      var cos = this.dot(vector) / (this.length() * vector.length());
      var ang = Math.acos(cos);
      return ang;
    };

    toString() {
      return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3) + ' )';
    };

  }

	/**
	 * @name Vector3
	 * @description 自定义的三维向量，用于支持向量计算
	 * @author xiefeisd / 342752420@qq.com
	 */

    class Vector3{

        constructor(x, y, z){
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        };

		dot(vector) {
			var x = this.x * vector.x;
			var y = this.y * vector.y;
			var z = this.z * vector.z;
			var result = x + y + z;
			return result;
		};

        multiplyScalar(s) {
			var x = this.x * s;
			var y = this.y * s;
			var z = this.z * s;
			return new Vector3(x, y, z);
		};

		add(vector) {
			var x = this.x + vector.x;
			var y = this.y + vector.y;
			var z = this.z + vector.z;
			return new Vector3(x, y, z);
		};

		subtract(vector) {
			var x = this.x - vector.x;
			var y = this.y - vector.y;
			var z = this.z - vector.z;
			return new Vector3(x, y, z);
		};

		multiply(vector) {
			var x = this.y * vector.z - this.z * vector.y;
			var y = this.z * vector.x - this.x * vector.z;
			var z = this.x * vector.y - this.y * vector.x;
			return new Vector3(x, y, z);
		};

		reverse() {
			var x = -this.x;
			var y = -this.y;
			var z = -this.z;
			return new Vector3(x, y, z);
		};

		length() {
			return Math.sqrt(this.lengthSquare());
		};

		lengthSquare() {
			return this.x ** 2 + this.y ** 2 + this.z ** 2;
		};

		normalize() {
			var len = this.length();
			if (len) {
				var x = this.x / len;
				var y = this.y / len;
				var z = this.z / len;
			}
			return new Vector3(x, y, z);
		};

		compare(vector){
			return this.length() > vector.length();
		};

    rotateByX(angle) {
      var vector = new Vector2(this.y, this.z);
      var vector = vector.rotate(angle);
      var x = this.x;
      var y = vector.x;
      var z = vector.y;
      return new Vector3(x, y, z);
    };

    rotateByY(angle) {
      var vector = new Vector2(this.z, this.x);
      var vector = vector.rotate(angle);
      var x = vector.y;
      var y = this.y;
      var z = vector.x;
      return new Vector3(x, y, z);
    };

		rotateByZ(angle) {
      var vector = new Vector2(this.x, this.y);
      var vector = vector.rotate(angle);
      var x = vector.x;
      var y = vector.y;
			var z = this.z;
			return new Vector3(x , y, z);
		};

		toString() {
			return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3) + ' , ' + this.z.toFixed(3) + ' )';
		};
		
	}   
    
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;

}));