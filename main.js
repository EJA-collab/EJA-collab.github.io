import './style.css'

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { Scene, WireframeGeometry } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
// camera.position.setZ(30);

renderer.render( scene, camera );

const sphereTexture = new THREE.TextureLoader().load('earth_16k.jpg');

const geometry = new THREE.SphereGeometry( 17, 32, 32 );
const material = new THREE.MeshLambertMaterial( { map: sphereTexture } );
const sphere = new THREE.Mesh( geometry, material );

sphere.position.set(0,0,-40)
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

// const myFace = new THREE.TextureLoader().load(poopbutt.jpg);

// const Ethan = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial( {map: myFace} )
// );
// scene.add(Ethan);

Array(2000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('star-field.jpg');
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load('moonmap.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial( {map: moonTexture} )
);
moon.position.set(1000,2.7,-90)

scene.add(moon)

var r = 50;
var theta = 0;
var dTheta = 2 * Math.PI / 7000;

function animate() {
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  sphere.rotation.y += 0.001;
  sphere.rotation.z += 0.000001;

  moon.rotation.y -=0.0008;
  // moon.rotation.z +=0.0005;
  theta += dTheta;
  moon.position.x = r * Math.cos(theta);
  moon.position.z = r * Math.sin(theta);
  renderer.render( scene, camera );
}

animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.2;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera