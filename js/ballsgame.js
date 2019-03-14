////////////////////////////////////////////////////////////////////////////////////
// 1 准备Three系统

//屏幕尺寸
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var screenWHRatio = screenWidth / screenHeight;
var devicePixelRatio = window.devicePixelRatio;
console.log("screenWidth=", screenWidth, "screenHeight=", screenHeight);

//正交相机参数
var cameraHalfWidth = screenWidth / 2;
var cameraHalfHeight = screenHeight / 2;
var cameraHalfDeep = Math.min(cameraHalfWidth, cameraHalfHeight) / 2;

//场景
var scene = new THREE.Scene();

//正交相机
//left, right, top, bottom - 分别是红色点距离左右上下边框的距离，对应图中XY轴的值；
//near - 场景开始渲染并可以显示的起点，对应图中Z轴坐标的值，通常为负；
//far - 场景结束渲染的终点，对应图中Z轴坐标的值，通常为正；
var camera = new THREE.OrthographicCamera(-cameraHalfWidth, cameraHalfWidth, cameraHalfHeight, -cameraHalfHeight, -cameraHalfDeep, cameraHalfDeep)

//渲染器
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild( renderer.domElement );

//背景
renderer.setClearColor(0x000000, 1.0);
//渲染
renderer.render(scene, camera);

////////////////////////////////////////////////////////////////////////////////////
// 2 准备模拟系统

//实例化模拟系统
var SBS = new SOMEBALLS.BallsSystem();

//设置模拟系统的常数
SBS.gravityConstant = 6.678 * 10 ** -11; //万有引力常数
SBS.timeStepLength = 3600 * 24;
SBS.canvasSize = Math.min(screenWidth, screenHeight); //画布大小

//使用内置数据，也可以使用自定义数据
var BALLS = new SOMEBALLS.Balls();

//把数据转换成需要的Ball格式			
var balls = BALLS.toBalls(BALLS.sunAndHisChildren);

//指定moon的主星是earth
balls.moon.lord = "earth";

//向balls添加mesh
addMeshesToBalls(balls);

//把balls赋值给模拟系统
SBS.setBalls(balls);

//动量修正，消除系统性的动量偏差
SBS.correctMomentum();

//相机的实时控制参数
//不要使用上边的半宽、半高，这样更灵活，否则很难偏移相机中心
var cameraLeft = camera.left;
var cameraRight = camera.right;
var cameraTop = camera.top;
var cameraBottom = camera.bottom;

////////////////////////////////////////////////////////////////////////////////////
// 3 主循环

var newBalls = [];
var x = 0;
var n = 0;
var lastRatio = 1;
function animate() {
  x += Math.PI / 180;
  n += 1;
  var targetRatio = Math.cos(x) + 1.1;  
  var newRatio = targetRatio / lastRatio;
  //scaleCamera(newRatio);
  lastRatio = targetRatio;
  
  SBS.runStep(false);

  var balls = SBS.particles;
  showPositions(balls);
  renderer.render(scene, camera);
  if ( n % 45 == 0 ) {
    //var newBall = getTestBallByScreen();
    //newBalls.push(newBall);
    //console.log(newBalls);
    //测试
    
    //testPoint();
    //testPress();
    //testSwipe();
    //testPinch1()
    //testPinch2();
    //testGlid();
    //testPressAndSwipe();
  }
  //添加新球
  addNewBalls();
  //动量修正，消除系统性的动量偏差
  SBS.correctMomentum();
  //要求循环
  if(n<100){
    //requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
animate();

////////////////////////////////////////////////////////////////////////////////////
// 4 设备适配函数

//判断设备种类
function isPhone() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      return true;
    }
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////////
// 5 可视化与交互

//显示球的位置
function showPositions(balls) {
  //console.log("showPositions", balls);
  //处理碰撞
  disposeCollision(balls);
  for (var key in balls) {
    var ball = balls[key];    
    var position = ball.showPosition;
    var radius = ball.showRadius;
    ball = scaleMesh(ball);
    ball = apllyAxisAngleToMesh(ball);
    ball = apllyRotationToMesh(ball);
    var mesh = ball.mesh;
    var x = position.x;
    var y = position.y;
    var z = position.z;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
  }
}

//处理碰撞
function disposeCollision(balls){
  //console.log("disposeCollision");
  var n = 0;
  for(var key in balls){
    var ball = balls[key];
    //console.log("disposeCollision", key, ball.key, ball.collision);
    if(ball.collision && ball.user){
      var mesh = ball.mesh;
      mesh.geometry.dispose();
      mesh.material.dispose();
      scene.remove(mesh);
      SBS.removeBall(key);
      n += 1;
    }
  }
  if(n>0){
    wx.showToast({ title: '湮灭+' + n, icon: 'none', duration: 2000 });
  }
}

//下面三个缩放、旋转函数，ball内有相同功能的实现
//为了兼容babylon，ball内部的函数已禁用
//应该使用此处的函数

//缩放mesh，使mesh的大小适合展示
function scaleMesh(ball){
  var meshRadius = ball.mesh.geometry.parameters.radius;
  var scale = ball.showRadius / meshRadius;
  ball.mesh.scale.set(scale, scale, scale);
  return ball;
}

//把轴倾角应用到mesh，模拟自转轴倾角
function apllyAxisAngleToMesh(ball){
  if (ball.mesh && ball.axisAngle) {
    ball.mesh.rotation.x = axisAngle;
  }
  return ball;
}

//把旋转应用到mesh，模拟星球自转
function apllyRotationToMesh(ball){
  var angleVelocity = ball.angleVelocity;
  var angleOffset = ball.angleOffset;
  if (SBS.timeStepLength) {
    var time = SBS.timeStepLength;
  } else {
    var time = 0;
  }
  var rotation = angleVelocity * time + angleOffset;
  ball.mesh.rotation.y = rotation;
  return ball;
}

//模拟通过屏幕添加球，根据屏幕和相机
function getTestBallByScreenAndCamera() {
  var ball = {
    "start": {
      "x": screenWidth * 4 / 5 - screenWidth / 2,
      "y": screenHeight - screenHeight * 3 / 6 - screenHeight / 2,
    },
    "end": {
      "x": screenWidth * 3 / 4 - screenWidth / 2,
      "y": screenHeight - screenHeight * 1 / 5 - screenHeight / 2,
    },
    "presstime": 1000,
    "swipetime": 300,
    "angleOffsetX": camera.rotation.x,
    "angleoffsetY": camera.rotation.x
  };
  return ball;
}

//模拟通过屏幕添加球，根据屏幕
function getTestBallByScreen(){
  var ball = { 
    "position": new SOMEBALLS.Vector3(200, -200, 0), 
    "velocity": new SOMEBALLS.Vector3(0, 1200, 0),
    "presstime": 1000, 
    "swipetime": 300 
  };
  return ball;
}

//添加新球
function addNewBalls() {
  if (newBalls.length > 0) {
    var newBall = newBalls[0];
    newBalls.splice(0, 1);
    if(newBall.start){
      var userBall = SBS.generateUserBallByScreenCoordinate(newBall);
    }else if(newBall.position){
      var userBall = SBS.generateUserBallByScreenVector(newBall);
    }
    addMeshToBall(userBall);
    SBS.addUserBall(userBall);
  }
}

//向balls添加mesh
function addMeshesToBalls(balls) {
  for (var key in balls) {
    var ball = balls[key];
    balls[key] = addMeshToBall(ball);
  }
  return balls;
}

function addMeshToBall(ball){
  if (!ball.mesh) {
    if (ball.color) {
      var color = ball.color;
    } else {
      var color = 0x00ff00;
    }
    var mesh = generateMesh(color);
    ball.mesh = mesh;
    return ball;
  }
}

//生成mesh
function generateMesh(Color) {
  var radius = 1;
  if (Color) {
    var color = Color;
  } else {
    var color = 0x00ff00;
  }
  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshBasicMaterial({ color: color });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  scene.add(mesh);
  return mesh;
}

////////////////////////////////////////////////////////////////////////////////////
// 6 游戏操作

//为了确定星星的发射位置，需要记录相机的所有操作，以便把屏幕空间与宇宙空间建立联系
var CameraOperations = [];

//把屏幕向量按照相机记录进行逆反操作
//反向旋转
function reverseRotation(vector, log){
  var newVector = vector.rotateByX(-log.x).rotateByY(-log.y).rotateByZ(-log.z);
  return newVector;
}
//反向滑移
function reverseGlid(vector, log){
  var newVector = vector.add(log);
  return newVector;
}
//反向缩放
function reverseScale(vector, log){
  var newVector = vector.multiplyScalar(1/log);
  return newVector;
}
//反向操作多步
function reverseOperations(vector){
  for (var i = CameraOperations - 1; i >= 0; i--){
    var log = CameraOperations[i];
    switch(log.key){
      case "rotation": {
        vector = reverseRotation(vector, log);
        break;
      }
      case "glid": {
        vector = reverseGlid(vector, log);
        break;
      }
      case "scale": {
        vector = reverseScale(vector, log);
        break;
      }
    }
  }
  return vector;
}
//反向旋转多步
function reverseRotations(vector) {
  for (var i = CameraOperations - 1; i >= 0; i--) {
    if ("rotation" == log.key ) {
      vector = reverseRotation(vector, log);        
    }
  }
  return vector;
}

//恢复相机
function recoverCamera(){
  console.log("recoverCamera");
  CameraOperations = [];
  camera.left = cameraLeft;
  camera.right = cameraRight;
  camera.top = cameraTop;
  camera.bottom = cameraBottom;
  camera.updateProjectionMatrix();
  camera.rotation.x = 0;
  camera.rotation.y = 0;
  camera.rotation.z = 0;
}

//旋转相机
function rotationCamera(vector) {
  console.log("rotationCamera", vector);
  camera.rotation.y -= vector.x / 360 * Math.PI;
  camera.rotation.x -= vector.y / 360 * Math.PI;
  CameraOperations.push({"operate": "rotation", "data": vector});
}

//缩放相机
function scaleCamera(ratio) {
  console.log("scaleCamera", ratio);
  var newLeft = camera.left * ratio;
  var newRight = camera.right * ratio;
  var newTop = camera.top * ratio;
  var newBottom = camera.bottom * ratio;
  camera.left = newLeft;
  camera.right = newRight;
  camera.top = newTop;
  camera.bottom = newBottom;
  camera.updateProjectionMatrix();
  CameraOperations.push({ "operate": "scale", "data": ratio });
}

//滑移相机
function glidCamera(vector) {
  console.log("glidCamera", vector);
  var newLeft = camera.left + vector.x;
  var newRight = camera.right + vector.x;
  var newTop = camera.top + vector.y;
  var newBottom = camera.bottom + vector.y;
  camera.left = newLeft;
  camera.right = newRight;
  camera.top = newTop;
  camera.bottom = newBottom;
  camera.updateProjectionMatrix();
  CameraOperations.push({ "operate": "glid", "data": vector });
}

//发射球，根据位置
function launchBallByPosition(data){
  console.log("launchBallByPosition", data);
  var x = data.x;
  var y = data.y;
  if(data.time){
    var time = data.time;
  }else{
    var time = 1000 * Math.tanh(6* Math.random());    
  }
  var presstime = time;
  var positionOnScreen = new SOMEBALLS.Vector3(x, y, 0);
  var positionReverse = reverseOperations(positionOnScreen);
  var velocityOnScreen = positionOnScreen.rotateByZ(Math.PI/2).normalize().multiplyScalar(1000);
  var velocityReverse = reverseRotations(velocityOnScreen);
  var ball = { "position": positionReverse, "velocity": velocityReverse, "presstime": presstime };
  //把数据放入数组，等待主循环从数组中取数据，调用SBS内部函数向模拟系统添加球
  newBalls.push(ball);
}

//发射球，根据屏幕向量
function launchBallByScreenVector(data) {
  console.log("launchBallByScreenVector", data);
  var start = transPoint(data.start);
  var end = transPoint(data.end);
  var x1 = start.x;
  var y1 = start.y;
  var x2 = end.x;
  var y2 = end.y;
  var presstime = data.presstime;
  var swipetime = data.swipetime;
  var positionOnScreen = new SOMEBALLS.Vector3( x1, y1, 0 );
  var positionReverse = reverseOperations( positionOnScreen );
  var displacement = new SOMEBALLS.Vector3( x2 - x1, y2 - y1, 0 );
  var velocityOnScreen = displacement.multiplyScalar( 1/swipetime );
  var velocityReverse = reverseRotations( velocityOnScreen );
  var ball = { "position": positionReverse, "velocity": velocityReverse, "presstime": presstime };
  console.log("launchBallByScreenVector", ball);
  //把数据放入数组，等待主循环从数组中取数据，调用SBS内部函数向模拟系统添加球
  newBalls.push(ball);
}

//发射球，根据屏幕坐标
function launchBallByScreenCoordinate(data) {
  console.log("launchBallByScreenCoordinate", data);
  //获取数据，并向其中添加相机参数
  var ball = {
    "start": {
      "x": data.start.x - screenWidth / 2,
      "y": screenHeight - data.start.y - screenHeight / 2
    },
    "end": {
      "x": data.end.x - screenWidth / 2,
      "y": screenHeight - data.end.y - screenHeight / 2
    },
    "presstime": data.presstime,
    "swipetime": data.swipetime,
  };
  //把数据放入数组，等待主循环从数组中取数据，调用SBS内部函数向模拟系统添加球
  newBalls.push(ball);
}

//坐标转换，以屏幕中心为原点，y轴向上
function transPoint(point){
  point.x = point.x - screenWidth / 2;
  point.y = screenHeight - point.y - screenHeight / 2;
  return point;
}

////////////////////////////////////////////////////////////////////////////////////
// 7 监听用户操作
// 未完待续
