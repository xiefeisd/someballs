'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.SOMEBALLS = {}));
})(undefined, function (exports) {
	'use strict';
	//上边的头抄的three.js的，不懂啥意思
	//下边开始自己的函数定义

	/**
  * @name Vector2
  * @description 二维向量
  * @author xiefeisd / 342752420@qq.com
  */

	var Vector2 = function () {
		function Vector2(x, y, z) {
			_classCallCheck(this, Vector2);

			this.x = x || 0;
			this.y = y || 0;
		}

		_createClass(Vector2, [{
			key: 'dot',
			value: function dot(vector) {
				var x = this.x * vector.x;
				var y = this.y * vector.y;
				var result = x + y;
				return result;
			}
		}, {
			key: 'multiplyScalar',
			value: function multiplyScalar(s) {
				var x = this.x * s;
				var y = this.y * s;
				return new Vector2(x, y);
			}
		}, {
			key: 'add',
			value: function add(vector) {
				var x = this.x + vector.x;
				var y = this.y + vector.y;
				return new Vector2(x, y);
			}
		}, {
			key: 'subtract',
			value: function subtract(vector) {
				var x = this.x - vector.x;
				var y = this.y - vector.y;
				return new Vector2(x, y);
			}
		}, {
			key: 'multiply',
			value: function multiply(vector) {
				var x = this.y * vector.z - this.z * vector.y;
				var y = this.z * vector.x - this.x * vector.z;
				return new Vector2(x, y);
			}
		}, {
			key: 'reverse',
			value: function reverse() {
				var x = -this.x;
				var y = -this.y;
				return new Vector2(x, y);
			}
		}, {
			key: 'length',
			value: function length() {
				return Math.sqrt(this.lengthSquare());
			}
		}, {
			key: 'lengthSquare',
			value: function lengthSquare() {
				return Math.pow(this.x, 2) + Math.pow(this.y, 2);
			}
		}, {
			key: 'normalize',
			value: function normalize() {
				var len = this.length();
				if (len) {
					var x = this.x / len;
					var y = this.y / len;
				}
				return new Vector2(x, y);
			}
		}, {
			key: 'compare',
			value: function compare(vector) {
				return this.length() > vector.length();
			}
		}, {
			key: 'rotate',
			value: function rotate(angle) {
				var length = this.length();
				var angle0 = this.angle();
				var totalAngle = angle0 + angle;
				var sin = Math.sin(totalAngle);
				var cos = Math.cos(totalAngle);
				var x = length * cos;
				var y = length * sin;
				return new Vector2(x, y);
			}
		}, {
			key: 'angle',
			value: function angle() {
				var tan = this.y / this.x;
				var ang = Math.atan(tan);
				return ang;
			}
		}, {
			key: 'angleWith',
			value: function angleWith(vector) {
				var ang1 = this.angle();
				var ang2 = vector.angle();
				var ang = ang1 - ang2;
				return ang;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3) + ' )';
			}
		}]);

		return Vector2;
	}();

	/**
  * @name Vector3
  * @description 三维向量
  * @author xiefeisd / 342752420@qq.com
  */

	var Vector3 = function () {
		function Vector3(x, y, z) {
			_classCallCheck(this, Vector3);

			this.x = x || 0;
			this.y = y || 0;
			this.z = z || 0;
		}

		_createClass(Vector3, [{
			key: 'dot',
			value: function dot(vector) {
				var x = this.x * vector.x;
				var y = this.y * vector.y;
				var z = this.z * vector.z;
				var result = x + y + z;
				return result;
			}
		}, {
			key: 'multiplyScalar',
			value: function multiplyScalar(s) {
				var x = this.x * s;
				var y = this.y * s;
				var z = this.z * s;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'add',
			value: function add(vector) {
				var x = this.x + vector.x;
				var y = this.y + vector.y;
				var z = this.z + vector.z;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'subtract',
			value: function subtract(vector) {
				var x = this.x - vector.x;
				var y = this.y - vector.y;
				var z = this.z - vector.z;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'multiply',
			value: function multiply(vector) {
				var x = this.y * vector.z - this.z * vector.y;
				var y = this.z * vector.x - this.x * vector.z;
				var z = this.x * vector.y - this.y * vector.x;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'reverse',
			value: function reverse() {
				var x = -this.x;
				var y = -this.y;
				var z = -this.z;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'length',
			value: function length() {
				return Math.sqrt(this.lengthSquare());
			}
		}, {
			key: 'lengthSquare',
			value: function lengthSquare() {
				return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
			}
		}, {
			key: 'normalize',
			value: function normalize() {
				var len = this.length();
				if (len) {
					var x = this.x / len;
					var y = this.y / len;
					var z = this.z / len;
				}
				return new Vector3(x, y, z);
			}
		}, {
			key: 'compare',
			value: function compare(vector) {
				return this.length() > vector.length();
			}
		}, {
			key: 'rotateByX',
			value: function rotateByX(angle) {
				var vector = new Vector2(this.y, this.z);
				var vector = vector.rotate(angle);
				var x = this.x;
				var y = vector.x;
				var z = vector.y;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'rotateByY',
			value: function rotateByY(angle) {
				var vector = new Vector2(this.z, this.x);
				var vector = vector.rotate(angle);
				var x = vector.y;
				var y = this.y;
				var z = vector.x;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'rotateByZ',
			value: function rotateByZ(angle) {
				var vector = new Vector2(this.x, this.y);
				var vector = vector.rotate(angle);
				var x = vector.x;
				var y = vector.y;
				var z = this.z;
				return new Vector3(x, y, z);
			}
		}, {
			key: 'angleAtXY',
			value: function angleAtXY() {
				var vector = new Vector2(this.x, this.y);
				var ang = vector.angle();
				return ang;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3) + ' , ' + this.z.toFixed(3) + ' )';
			}
		}]);

		return Vector3;
	}();

	/**
  * @name Particle
  * @description 质点，用来模拟运动的行星
  * @author xiefeisd / 342752420@qq.com
  */

	var Particle = function () {
		function Particle(mass, position, velocity) {
			_classCallCheck(this, Particle);

			this.mass = mass || 0;
			this.position = this.toVector3(position) || new Vector3(0, 0, 0);
			this.velocity = this.toVector3(velocity) || new Vector3(0, 0, 0);
			this.positions = [];
			this.velocities = [];
			this.master = "";
		}

		_createClass(Particle, [{
			key: 'pushDataIntoArray',


			//把质点的数据计入数组
			value: function pushDataIntoArray() {
				this.positions.push(this.position);
				this.velocities.push(this.velocity);
			}
		}, {
			key: 'pullDataFromArray',


			//从数组中取出数据
			value: function pullDataFromArray() {
				this.position = this.positions[this.positions.length - 1];
				this.velocity = this.velocities[this.velocities.length - 1];
			}
		}, {
			key: 'getPositionScalar',


			//获取位置标量
			value: function getPositionScalar() {
				return this.position.length();
			}
		}, {
			key: 'getVelocityScalar',


			//获取速度标量
			value: function getVelocityScalar() {
				return this.velocity.length();
			}
		}, {
			key: 'getMaxPositionScalar',


			//获取最大位置标量
			value: function getMaxPositionScalar() {
				var max = this.getPositionScalar();
				for (var vector in this.positons) {
					var scalar = vector.length();
					max = Math.max(max, scalar);
				}
				return max;
			}
		}, {
			key: 'getMaxVelocityScalar',


			//获取最大速度标量
			value: function getMaxVelocityScalar() {
				var max = this.getVelocityScalar();
				for (var vector in this.velocities) {
					var scalar = vector.length();
					max = Math.max(max, scalar);
				}
				return max;
			}
		}, {
			key: 'toVector3',


			//把其它类型的向量转成内置向量
			value: function toVector3(other) {
				if (other.isVector3) {
					return other;
				} else {
					var x = 0;
					var y = 0;
					var z = 0;
					if (other.x) {
						x = other.x;
					}
					if (other.y) {
						y = other.y;
					}
					if (other.z) {
						z = other.z;
					}
					var vector = new Vector3(x, y, z);
					return vector;
				}
			}
		}]);

		return Particle;
	}();

	/**
 * @name ParticlesSystem
 * @description 质点系统，用来模拟行星绕恒星的运动。
 * @author xiefeisd / 342752420@qq.com
 */

	var ParticlesSystem = function () {
		function ParticlesSystem(gravityConstant, timeStepLength, particles) {
			_classCallCheck(this, ParticlesSystem);

			this.gravityConstant = gravityConstant || 6.67 * Math.pow(10, -11);
			this.timeStepLength = timeStepLength || 1;
			this.particles = particles || null;
		}

		_createClass(ParticlesSystem, [{
			key: 'runStep',


			//运行一步
			value: function runStep(log) {
				var newData = [];
				for (var key in this.particles) {
					//当前质点
					var particle = this.particles[key];
					//质量
					var mass = particle.mass;
					//上一个位置
					var lastPosition = particle.position;
					//上一个速度
					var lastVelocity = particle.velocity;
					//总引力
					var gravityForce = this.getTotalGravityForce(key);
					//加速度
					var acceleration = this.getAcceleration(mass, gravityForce);
					//新速度
					var newVelocity = this.getNewVelocity(lastVelocity, acceleration);
					//新位置
					var newPosition = this.getNewPosition(lastPosition, newVelocity);
					//数据暂存
					var datum = { "position": newPosition, "velocity": newVelocity };
					newData[key] = datum;
				}
				this.updateParticlesData(newData, log);
			}
		}, {
			key: 'updateParticlesData',


			//更新数据
			value: function updateParticlesData(data, log) {
				for (var key in data) {
					if (this.particles[key]) {
						this.particles[key].position = data[key].position;
						this.particles[key].velocity = data[key].velocity;
						if (log) {
							particle.pushDataIntoArray();
						}
					}
				}
			}
		}, {
			key: 'run',


			//运行
			value: function run(stepCount, log) {
				for (var i = 0; i < stepCount; i++) {
					this.runStep(log);
				}
			}
		}, {
			key: 'addParticle',


			/////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//数据存取
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////

			//添加一个质点，已存在则跳过
			value: function addParticle(key, particle) {
				if (!this.particles[key]) {
					this.particles[key] = particle;
				}
			}
		}, {
			key: 'addParticleByCover',


			//强制添加一个质点，已存在则覆盖
			value: function addParticleByCover(key, particle) {
				this.particles[key] = particle;
			}
		}, {
			key: 'removeParticle',


			//移除一个质点
			value: function removeParticle(key) {
				if (this.getKeys().indexOf(key) > 0) {
					delete this.particles[key];
				}
			}
		}, {
			key: 'addParticles',


			//添加质点
			value: function addParticles(particles) {
				for (var key in particles) {
					var particle = particles[key];
					this.addParticle(key, particle);
				}
			}
		}, {
			key: 'addParticlesByCover',


			//添加质点，已存在则覆盖
			value: function addParticlesByCover(particles) {
				for (var key in particles) {
					var particle = particles[key];
					this.addParticleByCover(key, particle);
				}
			}
		}, {
			key: 'setParticles',


			//设置particles的初始数据
			value: function setParticles(particles) {
				this.particles = {};
				this.addParticles(particles);
			}
		}, {
			key: 'setGravityConstant',


			//设置万有引力常数
			value: function setGravityConstant(gravityConstant) {
				this.gravityConstant = gravityConstant;
			}
		}, {
			key: 'setTimeStepLength',


			//设置时间步长常数
			value: function setTimeStepLength(timeStepLength) {
				this.timeStepLength = timeStepLength;
			}
		}, {
			key: 'setMaster',


			//设置master
			value: function setMaster(master) {
				this.master = master;
			}
		}, {
			key: 'pushDataIntoArray',


			//把数据添加到数组
			value: function pushDataIntoArray() {
				for (var key in this.particles) {
					var particle = this.particles[key];
					particle.pushDataIntoArray();
				}
			}
		}, {
			key: 'pullDataFromArray',


			//把数据从数组中取出
			value: function pullDataFromArray() {
				for (var key in this.particles) {
					var particle = this.particles[key];
					particle.pullDataFromArray();
				}
			}
		}, {
			key: 'getMaxPositionScalarKey',


			//获取位置标量最大的键
			value: function getMaxPositionScalarKey() {
				var max = 0;
				var maxKey = "";
				for (var key in this.particles) {
					var particle = this.particles[key];
					var scalar = particle.getPositionScalar();
					if (scalar > max) {
						max = scalar;
						maxKey = key;
					}
				}
				return maxKey;
			}
		}, {
			key: 'getMaxPositionScalar',


			//获取最大位置标量
			value: function getMaxPositionScalar() {
				var key = this.getMaxPositionScalarKey();
				var particle = this.particles[key];
				var scalar = particle.getPositionScalar();
				return scalar;
			}
		}, {
			key: 'getMaxVelocityScalarKey',


			//获取最大速度标量的键
			value: function getMaxVelocityScalarKey() {
				var max = 0;
				var maxKey = "";
				for (var key in this.particles) {
					var particle = this.particles[key];
					var scalar = particle.getVelocityScalar();
					if (scalar > max) {
						max = scalar;
						maxKey = key;
					}
				}
				return maxKey;
			}
		}, {
			key: 'getMaxVelocityScalar',


			//获取最大速度标量
			value: function getMaxVelocityScalar() {
				var key = this.getMaxVelocityScalarKey();
				var particle = this.particles[key];
				var scalar = particle.getVelocityScalar();
				return scalar;
			}
		}, {
			key: 'getMaxPositionScalarKeyAtAll',


			//获取全部位置上最大位置标量的键
			value: function getMaxPositionScalarKeyAtAll() {
				var max = 0;
				var maxKey = "";
				for (var key in this.particles) {
					var particle = this.particles[key];
					var scalar = particle.getMaxPositionScalar();
					if (scalar > max) {
						max = scalar;
						maxKey = key;
					}
				}
				return maxKey;
			}
		}, {
			key: 'getMaxPositionScalarAtAll',


			//获取全部位置上最大位置标量
			value: function getMaxPositionScalarAtAll() {
				var key = this.getMaxPositionScalarKeyAtAll();
				var particle = this.particles[key];
				var scalar = particle.getMaxPositionScalar();
				return scalar;
			}
		}, {
			key: 'getMaxVelocityScalarKeyAtAll',


			//获取全部位置上最大速度标量的键
			value: function getMaxVelocityScalarKeyAtAll() {
				var max = 0;
				var maxKey = "";
				for (var key in this.particles) {
					var particle = this.particles[key];
					var scalar = particle.getMaxVelocityScalar();
					if (scalar > max) {
						max = scalar;
						maxKey = key;
					}
				}
				return maxKey;
			}
		}, {
			key: 'getMaxVelocityScalarAtAll',


			//获取全部位置上最大速度标量
			value: function getMaxVelocityScalarAtAll() {
				var key = this.getMaxVelocityScalarKeyAtAll();
				var particle = this.particles[key];
				var scalar = particle.getMaxVelocityScalar();
				return scalar;
			}
		}, {
			key: 'getMaxMassKey',


			//获取最大质量的键
			value: function getMaxMassKey() {
				var max = 0;
				var maxKey = "";
				for (var key in this.particles) {
					var particle = this.particles[key];
					var scalar = particle.mass;
					if (scalar > max) {
						max = scalar;
						maxKey = key;
					}
				}
				return maxKey;
			}
		}, {
			key: 'getMaxMass',


			//获取最大质量
			value: function getMaxMass() {
				var key = this.getMaxMassKey();
				var particle = this.particles[key];
				var scalar = particle.mass;
				return scalar;
			}
		}, {
			key: 'getKeys',


			//获取所有key
			value: function getKeys() {
				var list = [];
				for (var key in this.particles) {
					list.push(key);
				}
				return list;
			}
		}, {
			key: 'getDistance',


			/////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//动力计算
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////

			//计算距离
			value: function getDistance(vec1, vec2) {
				return vec1.subtract(vec2).length();
			}
		}, {
			key: 'getDistanceVector',


			//计算距离向量
			value: function getDistanceVector(vec1, vec2) {
				return vec1.subtract(vec2);
			}
		}, {
			key: 'getGravityForceScalar',


			//计算引力
			value: function getGravityForceScalar(mass1, mass2, distance) {
				var gravityForce = this.gravityConstant * mass1 * mass2 / Math.pow(distance, 2);
				return gravityForce;
			}
		}, {
			key: 'getGravityForceOnParticle1ByParticle2',


			//引力向量
			value: function getGravityForceOnParticle1ByParticle2(particle1mass, particle2mass, particle1Position, particle2Position) {
				var distance = this.getDistance(particle1Position, particle2Position);
				var gravityForceScalar = this.getGravityForceScalar(particle1mass, particle2mass, distance);
				var gravityForceVector = particle2Position.subtract(particle1Position).normalize().multiplyScalar(gravityForceScalar);
				return gravityForceVector;
			}
		}, {
			key: 'getTotalGravityForce',


			//总引力
			value: function getTotalGravityForce(Key) {
				var particle1 = this.particles[Key];
				var particle1mass = particle1.mass;
				var particle1Position = particle1.position;
				var total = new Vector3(0, 0, 0);
				for (var key in this.particles) {
					if (key !== Key) {
						var particle2 = this.particles[key];
						var particle2mass = particle2.mass;
						var particle2Position = particle2.position;
						var gravityForce = this.getGravityForceOnParticle1ByParticle2(particle1mass, particle2mass, particle1Position, particle2Position);
						total = total.add(gravityForce);
					}
				}
				return total;
			}
		}, {
			key: 'getAcceleration',


			//加速度
			value: function getAcceleration(mass, gravityForce) {
				var accelerateSpeed = gravityForce.multiplyScalar(1 / mass);
				return accelerateSpeed;
			}
		}, {
			key: 'getVelocityIncrement',


			//速度增量
			value: function getVelocityIncrement(acceleration) {
				var increment = acceleration.multiplyScalar(this.timeStepLength);
				return increment;
			}
		}, {
			key: 'getNewVelocity',


			//新速度
			value: function getNewVelocity(lastVelocity, acceleration) {
				var increment = this.getVelocityIncrement(acceleration);
				var velocity = lastVelocity.add(increment);
				return velocity;
			}
		}, {
			key: 'getAverageVelocity',


			//平均速度
			value: function getAverageVelocity(lastVelocity, newVelocity) {
				var size = lastVelocity.length();
				var direction = lastVelocity.add(newVelocity).normalize();
				var velocity = direction.multiplyScalar(size);
				return velocity;
			}
		}, {
			key: 'getNewPosition',


			//新位置
			value: function getNewPosition(lastPosition, velocity) {
				var positionIncrement = velocity.multiplyScalar(this.timeStepLength);
				var position = lastPosition.add(positionIncrement);
				return position;
			}
		}, {
			key: 'correctMomentum',


			//动量修正
			value: function correctMomentum() {
				var Key = this.getMaxMassKey();
				var totalMomentum = new Vector3(0, 0, 0);
				var target = this.particles[Key];
				for (var key in this.particles) {
					if (key !== Key) {
						var particle = this.particles[key];
						var mass = particle.mass;
						var velocity = particle.velocity;
						var momentum = velocity.multiplyScalar(mass);
						totalMomentum.add(momentum);
					}
				}
				target.velocity = totalMomentum.reverse().multiplyScalar(1 / target.mass);
			}
		}]);

		return ParticlesSystem;
	}();

	/**
  * @name Ball
  * @description 球，扩展了质点，用于处理星球的可视性适配
  * @author xiefeisd / 342752420@qq.com
  */

	var Ball = function (_Particle) {
		_inherits(Ball, _Particle);

		function Ball(mass, position, velocity, radius, axisAngle, angleVelocity, angleOffset, color, mesh) {
			_classCallCheck(this, Ball);

			var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, mass, position, velocity));

			_this.radius = radius || 0.1;
			_this.axisAngle = axisAngle || 0;
			_this.angleVelocity = angleVelocity || 0;
			_this.angleOffset = angleOffset || 0;
			_this.color = color || null;
			_this.mesh = mesh || null;

			_this.lord = null; //供用户指定主星，用户指定的主星比计算的优先
			_this.master = null; //如果是行星，用来保存主星的key，用引力判断是不是卫星
			_this.hasSecondary = null; //是否有卫星
			_this.collision = false; //记录碰撞
			_this.showPosition = null; //用来保存显示坐标，由上级系统动态确定
			_this.showRadius = 0.1; //可视化半径，由上级系统动态确定
			_this.interactions = {}; //用于记录所有其它ball对当前ball的相互作用，包括引力、位置等
			_this.keys = []; //保存其它ball的key，用于排序

			_this.key = ""; //= balls.key, 由balls从外部设置

			_this.user = null; //用来标记玩家添加的星体

			return _this;
		}

		_createClass(Ball, [{
			key: 'scaleMesh',


			//下面这三个对mesh的操作，依赖于three.js，为了兼容babylon，应该在调用方实现相同的逻辑，而非此处
			//内部函数定义保留备查，不再调用执行

			//缩放mesh，使mesh的大小适合展示
			value: function scaleMesh() {
				var meshRadius = this.mesh.geometry.parameters.radius;
				var scale = this.showRadius / meshRadius;
				this.mesh.scale.set(scale, scale, scale);
			}
		}, {
			key: 'apllyAxisAngleToMesh',


			//把轴倾角应用到mesh，模拟自转轴倾角
			value: function apllyAxisAngleToMesh() {
				if (this.mesh && this.axisAngle) {
					this.mesh.rotation.x = axisAngle;
				}
			}
		}, {
			key: 'apllyRotationToMesh',


			//把旋转应用到mesh，模拟星球自转
			value: function apllyRotationToMesh(timeLength) {
				var angleVelocity = this.angleVelocity;
				var angleOffset = this.angleOffset;
				if (timeLength) {
					var time = timeLength;
				} else {
					var time = 0;
				}
				var rotation = angleVelocity * time + angleOffset;
				this.mesh.rotation.y = rotation;
			}
		}, {
			key: 'getRelativePosition',


			/////////////////////////////////////////////////////////////////////////////////////////////////////////////
			//动力计算
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////

			//获取其它ball相对当前ball的位置
			value: function getRelativePosition(ball) {
				return ball.position.subtract(this.position);
			}
		}, {
			key: 'getRelativeDistance',


			//获取其它ball相对当前ball的距离
			value: function getRelativeDistance(ball) {
				return this.getRelativePosition(ball).length();
			}
		}, {
			key: 'getRelativeDirection',


			//获取其它ball相对当前ball的方向
			value: function getRelativeDirection(ball) {
				return this.getRelativePosition(ball).normalize();
			}
		}, {
			key: 'calculateGravityForceScalar',


			//计算引力大小
			value: function calculateGravityForceScalar(mass1, mass2, distance, gravityConstant) {
				var gravityForce = gravityConstant * mass1 * mass2 / Math.pow(distance, 2);
				return gravityForce;
			}
		}, {
			key: 'getRelativeGravityForce',


			//获取其它ball对当前ball的引力
			value: function getRelativeGravityForce(ball, gravityConstant) {
				//console.log("getRelativeGravityForce", gravityConstant, ball);
				var gravityForceScalar = this.calculateGravityForceScalar(this.mass, ball.mass, this.getRelativeDistance(ball), gravityConstant);
				var relativePosition = this.getRelativePosition(ball);
				var gravityForce = relativePosition.normalize().multiplyScalar(gravityForceScalar);
				return gravityForce;
			}
		}, {
			key: 'calculateInteractions',


			//计算所有其他ball与当前ball的相互作用
			value: function calculateInteractions(balls, gravityConstant) {
				//console.log("calculateInteractions", this.key);
				//console.log("calculateInteractions", this.key, this.keys);
				this.interactions = {};
				this.keys = [];
				for (var key in balls) {
					var ball = balls[key];
					if (this !== ball) {
						var position = this.getRelativePosition(ball);
						var gravityForce = this.getRelativeGravityForce(ball, gravityConstant);
						var distance = position.length();
						var force = gravityForce.length();
						var direction = gravityForce.normalize();
						var interaction = { "ball": ball, "distance": distance, "force": force, "direction": direction, "position": position, "gravityForce": gravityForce };
						this.keys.push(key);
						this.interactions[key] = interaction;
						//console.log("calculateInteractions", force, distance );
					}
				}
				//console.log("calculateInteractions2", this.key, this.keys);
				return this.interactions;
			}
		}, {
			key: 'sortOtherBalls',


			//把其它ball按排序
			value: function sortOtherBalls(property, option) {
				var length = this.keys.length;
				for (var i = 0; i < length - 1; i++) {
					for (var j = 0; j < length - 1; j++) {
						var key1 = this.keys[j];
						var key2 = this.keys[j + 1];
						switch (option) {
							case "asc":
								{
									var sign = 1;break;
								}
							case "des":
								{
									var sign = -1;break;
								}
						}
						if (sign * this.interactions[key1][property] - sign * this.interactions[key2][property] > 0) {
							this.keys[j] = key2;
							this.keys[j + 1] = key1;
						}
					}
				}
				return this.keys;
			}
		}, {
			key: 'sortOtherBallsByDistanceAsc',


			//把其它ball按距离升序排序
			value: function sortOtherBallsByDistanceAsc() {
				return this.sortOtherBalls("distance", "asc");
			}
		}, {
			key: 'sortOtherBallsByForceDes',


			//把其它ball按引力降序排序
			value: function sortOtherBallsByForceDes() {
				return this.sortOtherBalls("force", "des");
			}
		}, {
			key: 'testCollision',


			//检测碰撞
			value: function testCollision() {
				this.sortOtherBallsByDistanceAsc();
				var key = this.keys[0];
				var distance = this.interactions[key].distance;
				var radius1 = this.radius;
				var radius2 = this.interactions[key].ball.radius;
				if (radius1 + radius2 >= distance) {
					this.collision = key;
				}
			}
		}, {
			key: 'testMaster',


			//检测主星
			value: function testMaster(balls) {
				this.sortOtherBallsByForceDes();
				var key = this.keys[0];
				if (this.lord) {
					var masterKey = this.lord;
				} else {
					var masterKey = key;
				}
				var mate = balls[masterKey];
				var mateMasterKey = mate.master;
				if (mateMasterKey !== this.key) {
					this.master = masterKey;
					balls[masterKey].hasSecondary = true;
				}
			}
		}, {
			key: 'getTotalGravityForce',


			//获取总引力
			value: function getTotalGravityForce() {
				var total = new Vector3(0, 0, 0);
				for (var key in this.interactions) {
					var interaction = this.interactions[key];
					total = total.add(interaction.gravityForce);
				}
				return total;
			}
		}, {
			key: 'calculateNewProperties',


			//计算新属性
			value: function calculateNewProperties(timeStepLength) {
				//总引力
				var totalGravityForce = this.getTotalGravityForce();
				//加速度
				var acceleration = totalGravityForce.multiplyScalar(1 / this.mass);
				//速度增量
				var velocityIncrement = acceleration.multiplyScalar(timeStepLength);
				//新速度
				var velocity = this.velocity.add(velocityIncrement);
				//位置增量
				var positionIncrement = velocity.multiplyScalar(timeStepLength);
				//新位置
				var position = this.position.add(positionIncrement);

				if (this.key == "user0") {}
				//console.log(this.key, position.length(), velocity.length(), position.angleAtXY() / 180 * Math.PI, velocity.angleAtXY() / 180 * Math.PI );

				//返回属性
				//不可以直接设置到本对象属性中，这会导致全局不同步
				//也许真实世界就是异步的？引力传播速度取决于上帝的计算速度？
				return { "position": position, "velocity": velocity };
				//this.velocity = velocity;
				//this.position = position;
			}
		}, {
			key: 'calculate',


			//综合计算
			value: function calculate(balls, gravityConstant, timeStepLength) {
				this.calculateInteractions(balls, gravityConstant);
				this.testCollision();
				this.testMaster(balls);
				var newProperties = this.calculateNewProperties(timeStepLength);
				return newProperties;
			}
		}]);

		return Ball;
	}(Particle);

	/**
 * @name BallsSystem
 * @description 球系统，扩展了质点系统，用来处理行星运动的可视性适配。
 * @author xiefeisd / 342752420@qq.com
 */

	var BallsSystem = function (_ParticlesSystem) {
		_inherits(BallsSystem, _ParticlesSystem);

		function BallsSystem(gravityConstant, timeStepLength, balls, canvasSize) {
			_classCallCheck(this, BallsSystem);

			var _this2 = _possibleConstructorReturn(this, (BallsSystem.__proto__ || Object.getPrototypeOf(BallsSystem)).call(this, gravityConstant, timeStepLength));

			_this2.canvasSize = canvasSize || 1000; //画布尺寸

			_this2.showOrbitCount = 5; //可视化轨道数量

			_this2.showOrbitRadiusOffset = 0; //可视化轨道半径偏移，用于修正log值偏移，一般是负值
			_this2.showBallRadiusOffset = 0; //可视化球体半径偏移，用于修正log值偏移，一般是负值
			_this2.showOrbitRadiusRatio = 1; //可视化轨道半径倍率，用于修正log值倍数，正数
			_this2.showBallRadiusRatio = 1; //可视化球体半径倍率，用于修正log值倍数，正数
			//可视化轨道宽度
			_this2.showOrbitWidth = _this2.canvasSize / 2 / (_this2.showOrbitCount + 1);

			_this2.userBallNumber = 0;

			if (balls) {
				_this2.setBalls(balls);
			}

			_this2.colors = [0xFFFF99, 0xFFFF66, 0xFFFF33, 0xFFFF00, 0xFFCCFF, 0xFFCCCC, 0xFFCC99, 0xFFCC66, 0xFFCC33, 0xFFCC00, 0xFF99FF, 0xFF99CC, 0xFF9999, 0xFF9966, 0xFF9933, 0xFF9900, 0xFF66FF, 0xFF66CC, 0xFF6699, 0xFF6666, 0xFF6633, 0xFF6600, 0xFF33FF, 0xFF33CC, 0xFF3399, 0xFF3366, 0xFF3333, 0xFF3300, 0xFF00FF, 0xFF00CC, 0xFF0099, 0xFF0066, 0xFF0033, 0xFF0000, 0x66FFFF, 0x66FFCC, 0x66FF99, 0x66FF66, 0x66FF33, 0x66FF00, 0x66CCFF, 0x66CCCC, 0x66CC99, 0x66CC66, 0x66CC33, 0x66CC00, 0x6699FF, 0x6699CC, 0x669999, 0x669966, 0x669933, 0x669900, 0x6666FF, 0x6666CC, 0x666699, 0x666666, 0x666633, 0x666600, 0x6633FF, 0x6633CC, 0x663399, 0x663366, 0x6600FF, 0x6600CC, 0x660099, 0x660066, 0xCCFFFF, 0xCCFFCC, 0xCCFF99, 0xCCFF66, 0xCCFF33, 0xCCFF00, 0xCCCCFF, 0xCCCCCC, 0xCCCC99, 0xCCCC66, 0xCCCC33, 0xCCCC00, 0xCC99FF, 0xCC99CC, 0xCC9999, 0xCC9966, 0xCC9933, 0xCC9900, 0xCC66FF, 0xCC66CC, 0xCC6699, 0xCC6666, 0xCC6633, 0xCC6600, 0xCC33FF, 0xCC33CC, 0xCC3399, 0xCC3366, 0xCC3333, 0xCC3300, 0xCC00FF, 0xCC00CC, 0xCC0099, 0xCC0066, 0xCC0033, 0xCC0000, 0x33FFFF, 0x33FFCC, 0x33FF99, 0x33FF66, 0x33FF33, 0x33FF00, 0x33CCFF, 0x33CCCC, 0x33CC99, 0x33CC66, 0x33CC33, 0x33CC00, 0x3399FF, 0x3399CC, 0x339999, 0x339966, 0x339933, 0x339900, 0x3366FF, 0x3366CC, 0x336699, 0x336666, 0x336633, 0x336600, 0x3333FF, 0x3333CC, 0x333399, 0x3300FF, 0x3300CC, 0x99FFFF, 0x99FFCC, 0x99FF99, 0x99FF66, 0x99FF33, 0x99FF00, 0x99CCFF, 0x99CCCC, 0x99CC99, 0x99CC66, 0x99CC33, 0x99CC00, 0x9999FF, 0x9999CC, 0x999999, 0x999966, 0x999933, 0x999900, 0x9966FF, 0x9966CC, 0x996699, 0x996666, 0x996633, 0x996600, 0x9933FF, 0x9933CC, 0x993399, 0x993366, 0x993333, 0x993300, 0x9900FF, 0x9900CC, 0x990099, 0x990066, 0x990033, 0x990000, 0x00FFFF, 0x00FFCC, 0x00FF99, 0x00FF66, 0x00FF33, 0x00FF00, 0x00CCFF, 0x00CCCC, 0x00CC99, 0x00CC66, 0x00CC33, 0x00CC00, 0x0099FF, 0x0099CC, 0x009999, 0x009966, 0x009933, 0x009900, 0x0066FF, 0x0066CC, 0x006699, 0x006666, 0x006633, 0x006600, 0x0033FF, 0x0033CC, 0x003399, 0x0000FF, 0x0000CC];

			return _this2;
		}

		_createClass(BallsSystem, [{
			key: 'runStep',


			//运行一步
			value: function runStep(log) {
				var newData = [];
				for (var key in this.particles) {
					//调用ball内部计算
					var ball = this.particles[key];
					ball.calculateInteractions(this.particles, this.gravityConstant);
					ball.testCollision();
					ball.testMaster(this.particles);

					var newProperties = ball.calculateNewProperties(this.timeStepLength);

					//新速度
					var newVelocity = newProperties.velocity;
					//新位置
					var newPosition = newProperties.position;

					//数据暂存
					var datum = { "position": newPosition, "velocity": newVelocity };
					newData[key] = datum;
				}
				this.updateParticlesData(newData, log);
				this.fitForShow();
			}
		}, {
			key: 'removeBall',
			value: function removeBall(key) {
				this.removeParticle(key);
			}
		}, {
			key: 'setBalls',


			//设置balls的初始数据
			value: function setBalls(balls) {
				this.setParticles(balls);
				this.master = this.getMaxMassKey();
				this.initializeBalls();
				this.setParametersForShow();
			}
		}, {
			key: 'setParametersForShow',


			//设置可视化参数
			value: function setParametersForShow() {

				//行星个数，不计master和用户创建的星体
				var planetCount = this.getCountWithoutMasterWithoutUser();

				//最小轨道
				var minPositionKey = this.getMinPositionScalarKeyWithoutMasterWithoutUser();
				//最大轨道
				var maxPositionKey = this.getMaxPositionScalarKeyWithoutMasterWithoutUser();
				//最小球
				var minRadiusKey = this.getMinRadiusKeyWithoutMasterWithoutUser();
				//最大球
				var maxRadiusKey = this.getMaxRadiusKeyWithoutMasterWithoutUser();

				//最小轨道
				var minPosition = this.getPositionScalarByKey(minPositionKey);
				//最大轨道
				var maxPosition = this.getPositionScalarByKey(maxPositionKey);
				//最小球
				var minRadius = this.getRadiusByKey(minRadiusKey);
				//最大球
				var maxRadius = this.getRadiusByKey(maxRadiusKey);

				//轨道偏移
				var showOrbitRadiusOffset = 0.2 - Math.log(minPosition) / Math.log(10);
				//球径偏移
				var showBallRadiusOffset = 1 - Math.log(minRadius) / Math.log(10);
				//轨道倍率
				var showOrbitRadiusRatio = 0.9 * this.canvasSize / 2 / (Math.log(maxPosition) / Math.log(10) + showOrbitRadiusOffset);
				//球径倍率
				var showBallRadiusRatio = 0.01 * this.canvasSize / (Math.log(maxRadius) / Math.log(10) + showBallRadiusOffset);

				//轨道个数
				this.showOrbitCount = planetCount;
				//轨道偏移
				this.showOrbitRadiusOffset = showOrbitRadiusOffset;
				//轨道倍率
				this.showBallRadiusOffset = showBallRadiusOffset;
				//球径偏移
				this.showOrbitRadiusRatio = showOrbitRadiusRatio;
				//球径倍率
				this.showBallRadiusRatio = showBallRadiusRatio;
				//轨道宽度
				this.showOrbitWidth = this.canvasSize / 2 / (this.showOrbitCount + 1);
			}
		}, {
			key: 'getBalls',
			value: function getBalls() {
				return this.particles;
			}
		}, {
			key: 'isMaster',


			//判断星体性质
			value: function isMaster(key) {
				return this.master == key;
			}
		}, {
			key: 'isPlanet',
			value: function isPlanet(key) {
				if (!this.getMaster(key)) {
					this.particles[key].master = this.master;
				}
				if (this.getMaster(key) == this.master) {
					return true;
				} else {
					var mateKey = this.particles[key].master;
					var mate = this.particles[mateKey];
					var mateMass = mate.mass;
					var selfMass = this.particles[key].mass;
					if (selfMass > mateMass) {
						return true;
					}
				}
			}
		}, {
			key: 'isSecondary',
			value: function isSecondary(key) {
				return !this.isMaster(key) && !this.isPlanet(key);
			}
		}, {
			key: 'getMaster',
			value: function getMaster(key) {
				return this.particles[key].master;
			}
		}, {
			key: 'hasSecondary',
			value: function hasSecondary(key) {
				return this.particles[key].hasSecondary;
			}
		}, {
			key: 'getMinPositionScalarKeyWithoutMasterWithoutUser',


			//获取位置标量最小的键，不包括master和用户创建的星
			value: function getMinPositionScalarKeyWithoutMasterWithoutUser() {
				var value = 0;
				var Key = "";
				for (var key in this.particles) {
					if (key !== this.master) {
						var particle = this.particles[key];
						if (!particle.user) {
							var scalar = particle.getPositionScalar();
							if ("" == Key) {
								value = scalar;
								Key = key;
							}
							if (scalar < value) {
								value = scalar;
								Key = key;
							}
						}
					}
				}
				return Key;
			}
		}, {
			key: 'getMaxPositionScalarKeyWithoutMasterWithoutUser',


			//获取位置标量最大的键，不包括master和用户创建的星
			value: function getMaxPositionScalarKeyWithoutMasterWithoutUser() {
				var value = 0;
				var Key = "";
				for (var key in this.particles) {
					if (key !== this.master) {
						var particle = this.particles[key];
						if (!particle.user) {
							var scalar = particle.getPositionScalar();
							if (scalar > value) {
								value = scalar;
								Key = key;
							}
						}
					}
				}
				return Key;
			}
		}, {
			key: 'getPositionScalarByKey',


			//根据key获取位置标量
			value: function getPositionScalarByKey(key) {
				var particle = this.particles[key];
				var scalar = particle.getPositionScalar();
				return scalar;
			}
		}, {
			key: 'getMinRadiusKeyWithoutMasterWithoutUser',


			//获取半径最小的键，不包括master和用户创建的星
			value: function getMinRadiusKeyWithoutMasterWithoutUser() {
				var value = 0;
				var Key = "";
				for (var key in this.particles) {
					if (key !== this.master) {
						var particle = this.particles[key];
						if (!particle.user) {
							var scalar = particle.Radius;
							if ("" == Key) {
								value = scalar;
								Key = key;
							}
							if (scalar < value) {
								value = scalar;
								Key = key;
							}
						}
					}
				}
				return Key;
			}
		}, {
			key: 'getMaxRadiusKeyWithoutMasterWithoutUser',


			//获取半径最大的键，不包括master和用户创建的星
			value: function getMaxRadiusKeyWithoutMasterWithoutUser() {
				var value = 0;
				var Key = "";
				for (var key in this.particles) {
					if (key !== this.master) {
						var particle = this.particles[key];
						if (!particle.user) {
							var scalar = particle.radius;
							if (scalar > value) {
								value = scalar;
								Key = key;
							}
						}
					}
				}
				return Key;
			}
		}, {
			key: 'getRadiusByKey',


			//根据key获取半径
			value: function getRadiusByKey(key) {
				var particle = this.particles[key];
				var scalar = particle.radius;
				return scalar;
			}
		}, {
			key: 'getCountWithoutMasterWithoutUser',


			//获取排除master和用户创建的星以外的行星个数
			value: function getCountWithoutMasterWithoutUser() {
				var value = 0;
				for (var key in this.particles) {
					if (key !== this.master) {
						var particle = this.particles[key];
						if (!particle.user) {
							if (this.isPlanet(key)) {
								value += 1;
							}
						}
					}
				}
				return value;
			}
		}, {
			key: 'getGeneralShowOrbitPosition',


			//获取一般可视化轨道位置
			value: function getGeneralShowOrbitPosition(vector) {
				var length = vector.length();
				var direction = vector.normalize();
				var log = Math.log(length) / Math.log(10);
				var offseted = log + this.showOrbitRadiusOffset;
				var calculatedLength = offseted * this.showOrbitRadiusRatio;
				var showLength = Math.max(0, calculatedLength);
				var showPosition = direction.multiplyScalar(showLength);
				return showPosition;
			}
		}, {
			key: 'getGeneralShowBallRadius',


			//获取一般可视化球半径
			value: function getGeneralShowBallRadius(decimal) {
				var log = Math.log(decimal) / Math.log(10);
				var offseted = log + this.showBallRadiusOffset;
				var calculated = offseted * this.showBallRadiusRatio;
				var modified = Math.max(1, calculated);
				return modified;
			}
		}, {
			key: 'getCompressedShowBallRadius',


			//获取压缩的可视化半径
			value: function getCompressedShowBallRadius(decimal) {
				var general = this.getGeneralShowBallRadius(decimal);
				var compressed = general * this.showOrbitWidth / this.canvasSize;
				compressed = Math.max(1, compressed);
				return compressed;
			}
		}, {
			key: 'getPlanetShowPosition',


			//获取行星的可视化位置
			value: function getPlanetShowPosition(key) {
				var planet = this.particles[key];
				var position = planet.position;
				var showPosition = this.getGeneralShowOrbitPosition(position);
				return showPosition;
			}
		}, {
			key: 'getPlanetShowRadius',


			//获取行星的可视化半径
			value: function getPlanetShowRadius(key) {
				var planet = this.particles[key];
				var radius = planet.radius;
				var showRadius = this.getGeneralShowBallRadius(radius);
				return showRadius;
			}
		}, {
			key: 'getPlanetCompressedShowRadius',


			//获取行星的压缩的可视化半径
			value: function getPlanetCompressedShowRadius(key) {
				var generalShowRadius = this.getPlanetShowRadius(key);
				var compressedSowRadius = this.getCompressedShowBallRadius(generalShowRadius);
				return compressedSowRadius;
			}
		}, {
			key: 'getMasterShowPosition',


			//获取恒星的可视化位置
			value: function getMasterShowPosition() {
				var key = this.master;
				var showPosition = this.getPlanetShowPosition(key);
				return showPosition;
			}
		}, {
			key: 'getMasterShowRadius',


			//获取恒星的可视化半径
			value: function getMasterShowRadius() {
				var key = this.master;
				var showRadius = this.getPlanetShowRadius(key);
				return showRadius;
			}
		}, {
			key: 'getSecondaryShowPosition',


			//获取卫星的可视化位置
			value: function getSecondaryShowPosition(key) {
				//主星
				var master = this.particles[key].master;
				//主星的可视化位置
				var masterShowPosition = this.getPlanetShowPosition(master);
				//卫星的可视化位置
				var seconderyShowPosition = this.getPlanetShowPosition(key);
				//相对位置
				var relativePosition = seconderyShowPosition.subtract(masterShowPosition);
				//相对距离
				var ralativeLength = relativePosition.length();
				//相对方向
				var relativeDirection = relativePosition.normalize();
				//主星可视化半径
				var masterRadius = this.getPlanetShowRadius(master);
				//卫星可视化半径
				var seconderyRadius = this.getPlanetShowRadius(key);
				//可视化距离
				var showDistance = masterRadius + seconderyRadius * 10;
				//可视化相对位置
				var showRelativePosition = relativeDirection.multiplyScalar(showDistance);
				//可视化位置
				var showPosition = masterShowPosition.add(showRelativePosition);
				return showPosition;
			}
		}, {
			key: 'getSecondaryShowRadius',


			//获取卫星的可视化半径
			value: function getSecondaryShowRadius(key) {
				var generalShowRadius = this.getPlanetShowRadius(key);
				var compressedSowRadius = this.getCompressedShowBallRadius(generalShowRadius);
				return compressedSowRadius;
			}
		}, {
			key: 'fitForShow',


			//可视化适配
			value: function fitForShow() {
				for (var key in this.particles) {
					if (this.isMaster(key)) {
						//恒星
						var showPosition = this.getMasterShowPosition();
						var showRadius = this.getMasterShowRadius();
					} else if (this.isSecondary(key)) {
						// 卫星
						var showPosition = this.getSecondaryShowPosition(key);
						var showRadius = this.getSecondaryShowRadius(key);
					} else if (this.isPlanet(key)) {
						//行星
						var showPosition = this.getPlanetShowPosition(key);
						if (this.hasSecondary(key)) {
							//有卫星
							var showRadius = this.getPlanetShowRadius(key);
						} else {
							//没卫星
							var showRadius = this.getPlanetShowRadius(key);
						}
					}
					this.particles[key].showPosition = showPosition;
					this.particles[key].showRadius = showRadius;
					//这三个函数依赖于three.js，为了保持引擎中立性，不再使用，改从调用方实现相同的功能
					//this.particles[key].scaleMesh();
					//this.particles[key].apllyAxisAngleToMesh();
					//this.particles[key].apllyRotationToMesh(this.timeStepLength);
				}
			}
		}, {
			key: 'initializeBalls',


			//初始化balls
			value: function initializeBalls() {
				for (var key in this.particles) {
					var ball = this.particles[key];
					ball.key = key;
					ball.calculateInteractions(this.particles, this.gravityConstant);
					ball.testCollision();
					ball.testMaster(this.particles);
				}
			}
		}, {
			key: 'addBall',


			//添加球
			value: function addBall(key, ball) {
				this.addParticle(key, ball);
			}
		}, {
			key: 'addUserBall',


			//添加用户球
			value: function addUserBall(ball) {
				//key
				var key = "user" + this.userBallNumber;
				this.userBallNumber += 1;

				//添加
				ball.key = key;
				this.addBall(key, ball);
			}
		}, {
			key: 'generateUserBallByScreenCoordinate',


			//生成用户球，根据屏幕坐标
			value: function generateUserBallByScreenCoordinate(e) {
				//data = { "start": { "x": x1, "y": y1 }, "end": { "x": x2, "y": y2 }, "presstime": time1, "swipetime": time2 };

				//解析数据

				//创造时间
				var createTime = e.presstime;
				//发射时间
				var launchTime = e.swipetime;
				//屏幕上的位置
				var positionOnScreen = new Vector3(e.start.x, e.start.y, 0);
				//屏幕上的运动向量
				var motionVectorOnScreen = new Vector3(e.end.x - e.start.x, e.end.y - e.start.y, 0);
				//屏幕上的速度
				var velocityOnScreen = motionVectorOnScreen.multiplyScalar(1 / launchTime);
				//生成球
				var data = { "position": positionOnScreen, "velocity": velocityOnScreen, "presstime": createTime };
				var ball = this.generateUserBallByScreenVector(data);
				return ball;
			}
		}, {
			key: 'generateUserBallByScreenVector',


			//生成用户球，根据屏幕向量
			value: function generateUserBallByScreenVector(data) {

				//解析数据

				//创造时间
				var createTime = data.presstime;
				//屏幕上的位置
				var positionOnScreen = data.position;
				//屏幕上的速度
				var velocityOnScreen = data.velocity;

				//质量和半径

				//基础质量
				var randomMass = Math.pow(10, 10);
				var maxBasicMass = Math.pow(10, 24);
				//质量
				//var mass = Math.tanh(createTime / 10 ** 3) * maxBasicMass + randomMass * Math.random();
				var mass = Math.tanh(createTime / 10000) * maxBasicMass;

				//密度
				var density = 5000;
				//体积
				var volume = mass / density;
				//半径
				var radius = Math.pow(volume * 3 / 4 / Math.PI, 1 / 3);

				//位置

				//屏幕上的位置标量
				var positionOnScreenScalar = positionOnScreen.length();
				//屏幕上的位置方向
				var positionOnScreenDirection = positionOnScreen.normalize();
				//位置标量
				var positionScalar = Math.pow(10, positionOnScreenScalar / this.showOrbitRadiusRatio - this.showOrbitRadiusOffset);
				//位置
				var position = positionOnScreenDirection.multiplyScalar(positionScalar);

				//速度

				//宇宙速度
				var firstUniversalVelocity = 7900;
				var secondUniversalVelocity = 11200;
				var thirdUniversalVelocity = 16700;
				//屏幕上的速度标量
				var velocityOnScreenScalar = velocityOnScreen.length();
				//屏幕上的速度方向
				var velocityOnScreenDirection = velocityOnScreen.normalize();
				//速度标量
				var velocityScalar = Math.tanh(velocityOnScreenScalar / 1000) * firstUniversalVelocity + secondUniversalVelocity;
				//速度
				var velocity = velocityOnScreenDirection.multiplyScalar(velocityScalar);

				//其他参数
				var axisAngle = 0;
				var angleVelocity = 0;
				var angleOffset = 0;

				//颜色
				var random = Math.random();
				var index = Math.round(random * (this.colors.length - 1));
				var color = this.colors[index];

				//生成球
				var ball = new Ball(mass, position, velocity, radius, axisAngle, angleVelocity, angleOffset, color);
				ball.user = true;
				//console.log("generateUserBallByScreenVector", ball);
				return ball;
			}
		}]);

		return BallsSystem;
	}(ParticlesSystem);

	/**
  * @name Balls
  * @description 提供一些常见的星系数据。
  * @author xiefeisd / 342752420@qq.com
  */

	var Balls = function () {
		function Balls() {
			_classCallCheck(this, Balls);

			this.sunAndHisChildren = {
				"sun": { "mass": 1.9891 * Math.pow(10, 30), "diameter": 1.392 * Math.pow(10, 9), "orbitRdius": 0, "velocity": 0, "orbitAngleOffset": 0, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0xffff00 },
				//水
				"mercury": { "mass": 3.3022 * Math.pow(10, 23), "diameter": 4.878 * Math.pow(10, 6), "orbitRdius": 5.79091 * Math.pow(10, 10), "velocity": 47870, "orbitAngleOffset": Math.PI / 4, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0x00ff00 },
				//金
				"venus": { "mass": 4.869 * Math.pow(10, 24), "diameter": 1.21036 * Math.pow(10, 7), "orbitRdius": 1.0820893 * Math.pow(10, 11), "velocity": 35030, "orbitAngleOffset": Math.PI * 3 / 4, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0xffff00 },
				//地
				"earth": { "mass": 5.965 * Math.pow(10, 24), "diameter": 1.2756 * Math.pow(10, 7), "orbitRdius": 1.495978707 * Math.pow(10, 11), "velocity": 29800, "orbitAngleOffset": 0, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0x0033ff },
				//火
				"mars": { "mass": 6.4219 * Math.pow(10, 23), "diameter": 6.794 * Math.pow(10, 6), "orbitRdius": 2.27925 * Math.pow(10, 11), "velocity": 24130, "orbitAngleOffset": Math.PI * 7 / 4, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0xff0000 },
				//木
				"jupiter": { "mass": 1.90 * Math.pow(10, 27), "diameter": 1.42984 * Math.pow(10, 8), "orbitRdius": 7.785472 * Math.pow(10, 11), "velocity": 13070, "orbitAngleOffset": Math.PI / 2, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0xcc9900 },
				//土
				"saturn": { "mass": 5.6846 * Math.pow(10, 26), "diameter": 1.2054 * Math.pow(10, 8), "orbitRdius": 1.43344937 * Math.pow(10, 12), "velocity": 9690, "orbitAngleOffset": Math.PI, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0x009966 },
				//天王
				"uranus": { "mass": 8.6810 * Math.pow(10, 25), "diameter": 5.1118 * Math.pow(10, 7), "orbitRdius": 2.876679082 * Math.pow(10, 12), "velocity": 6810, "orbitAngleOffset": Math.PI * 3 / 2, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0x66ff00 },
				//海王
				"neptune": { "mass": 1.0247 * Math.pow(10, 26), "diameter": 4.9532 * Math.pow(10, 7), "orbitRdius": 4.503443661 * Math.pow(10, 12), "velocity": 5430, "orbitAngleOffset": 0, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0xff00ff },
				//月亮
				"moon": { "mass": 7.349 * Math.pow(10, 22), "diameter": 3.47628 * Math.pow(10, 3), "orbitRdius": 1.495978707 * Math.pow(10, 11) + 3.84403 * Math.pow(10, 8), "velocity": 29800 + 1023, "orbitAngleOffset": 0, "axisAngle": 0, "period": 0, "angleOffset": 0, "color": 0x00ff00 }
			};
		}

		_createClass(Balls, [{
			key: 'toBalls',
			value: function toBalls(data) {
				var balls = {};
				for (var key in data) {
					var datum = data[key];
					//质量
					var mass = datum.mass;
					//位置
					var position = new Vector3(datum.orbitRdius, 0, 0).rotateByZ(datum.orbitAngleOffset);
					//速度
					var velocity = new Vector3(0, datum.velocity, 0).rotateByZ(datum.orbitAngleOffset);
					//半径
					var radius = datum.diameter / 2;
					//轴倾角
					var axisAngle = datum.axisAngle;
					//自转角速度				
					var angleVelocity = datum.period == 0 ? 0 : Math.PI / datum.period;
					//自转角偏置
					var angleOffset = datum.angleOffset;
					//颜色
					var color = datum.color;

					var ball = new Ball(mass, position, velocity, radius, axisAngle, angleVelocity, angleOffset, color);

					balls[key] = ball;
				}
				return balls;
			}
		}]);

		return Balls;
	}();

	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.ParticlesSystem = ParticlesSystem;
	exports.Particle = Particle;
	exports.Ball = Ball;
	exports.BallsSystem = BallsSystem;
	exports.Balls = Balls;
});
