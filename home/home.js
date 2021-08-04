import "./style.css";
import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { FirstPersonControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/FirstPersonControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//texture
const loader = new THREE.TextureLoader();
const star = loader.load("bluestar.png");
// Objects
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 2);

for (let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

// Materials
const particlesMaterial = new THREE.PointsMaterial({
  map: star,
  size: 0.2,
  //  shininess: 10,
  transparent: true,
  blending: THREE.AdditiveBlending,
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//
// renderer.setClearColor(new THREE.Color('#000'), )

// Controls
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 500;
//controls.lookSpeed = 0.1;
// controls.domElement = canvas;
controls.rollSpeed = Math.PI / 6;
// controls.autoForward = true;
// controls.dragToLook = true;

/**
 * Animate
 */

document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

function render() {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime() * 10;
  const posArray = new Float32Array(particlesCnt * 2);

  for (let i = 0; i < particlesCnt * 4; i++) {
    posArray[i] = (Math.random() - 0.5 + (time + i)) * 40;
  }

  posArray.needsUpdate = true;
  controls.update(delta);
  renderer.render(scene, camera);
}
function animateParticles(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

}

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  particlesMesh.rotation.z = 0.1 * elapsedTime;

  particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008);
  particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008);
  // Update Orbital Controls
  // controls.update()

  //changing stats

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

};

tick();
