<template>
  <div id="three" style="flex: 1;"></div>
</template>

<script setup>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {onMounted} from 'vue'


//创建一个三维场景
const scene = new THREE.Scene()

//添加光源
const ambient = new THREE.AmbientLight(0xffffff, 0.5),
    light1 = new THREE.PointLight(0xffffff, 0.4),
    light2 = new THREE.PointLight(0xffffff, 0.4);

scene.add(ambient);

light1.position.set(200, 300, 400);
scene.add(light1);

light2.position.set(-200, -300, -400);
scene.add(light2);

//创建一个透视相机
const width = window.innerWidth - 240,
    height = window.innerHeight,
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 50000);

//设置相机位置
camera.position.set(1000, 1000, 1000)

//设置相机方向
camera.lookAt(0, 0, 0)

// 创建加载管理器
// const manager = new THREE.LoadingManager();
// manager.onStart = function (url, itemsLoaded, itemsTotal) {
//   console.log('已开始加载文件：' + url + '.\n加载 ' + itemsLoaded + '/' + itemsTotal + ' 文件.');
// };
// manager.onLoad = function () {
//   console.log('加载完成！');
// };
// manager.onProgress = function (url, itemsLoaded, itemsTotal) {
//   console.log('正在加载文件: ' + url + '.\n加载 ' + itemsLoaded + '/' + itemsTotal + ' 文件.');
// };
// manager.onError = function (url) {
//   console.log('加载时出错 ' + url);
// };
// const loader = new GLTFLoader(manager);


// 创建 GLTFLoader
const loader = new GLTFLoader();
// 加载 glb 文件
loader.load('../model/building2.glb', (gltf) => {

  gltf.scene.scale.x = 0.8
  gltf.scene.scale.y = 0.8
  gltf.scene.scale.z = 0.8

  scene.add(gltf.scene);

}, undefined, (error) => {
  console.error(error);
});





// 创建一个辉光效果
const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {
    glowColor: { value: new THREE.Color(0xffff00) },
    viewVector: { value: camera.position }
  },
  vertexShader: `
    uniform vec3 viewVector;
    uniform vec3 cameraPosition;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(abs(dot(vNormal, vNormel)), 8.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying float intensity;
    void main() {
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4(glow, 1.0);
    }
  `,
  side: THREE.FrontSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

console.log(loader)

// 创建一个辉光效果的外壳
// const glowCube = new THREE.Mesh(glowMaterial);
// glowCube.position.set(0, 0, 0);
// glowCube.scale.multiplyScalar(1.2);
// scene.add(glowCube);







//创建一个WebGL渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)


// 创建网格辅助对象
let gridHelper = new THREE.GridHelper(5000, 30, 0x2C2C2C, 0x888888);
gridHelper.position.y = -10;
scene.add(gridHelper);


// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)


//创建辅助坐标轴
const axesHelper = new THREE.AxesHelper(4000)
axesHelper.position.y = -50;
scene.add(axesHelper)

controls.addEventListener('change', () => {
  renderer.render(scene, camera)
})


function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);


  controls.update();
}


onMounted(() => {
  document.getElementById('three')?.appendChild(renderer.domElement)
  animate()
})


</script>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
