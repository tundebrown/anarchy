// import * as THREE from "three";
// import { OrbitControls } from "OrbitControls";
// import { AdditiveBlending, Float32BufferAttribute } from "three";

const textureLoader = new THREE.TextureLoader();
const shape = textureLoader.load("./particleShape/1.png");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

{
  const color = 0x000000;
  const density = 0.1;
  scene.fog = new THREE.FogExp2(color, density);
}

// scene.background = bgTexture;
//Galaxy Generator

const parameters = {};

parameters.count = 50000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 8;
parameters.spin = 2.212;
parameters.randomness = 1;
parameters.randomnessPower = 5;
parameters.starColor = "#F705B8";
parameters.insideColor = "#F54918";
parameters.outsideColor = "#D07AE6";

//gALAXY GENerator
let geometry = null;
let material = null;
let points = null;

function generateGalaxy() {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    //Position
    const x = Math.random() * parameters.radius;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * 2 * Math.PI;
    const spinAngle = x * parameters.spin;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX;
    positions[i * 3 + 1] = randomY;
    positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ;

    //Color

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, x / parameters.radius);

    colors[i * 3 + 0] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    color: "white",
    size: parameters.size,
    depthWrite: false,
    sizeAttenuation: true,
    // blending: AdditiveBlending,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    alphaMap: shape,
  });

  points = new THREE.Points(geometry, material);
  //new THREE.Points(geometry, material)

  scene.add(points);
}

generateGalaxy();

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
camera.position.y = 1.5;
camera.position.z = 5;
camera.rotation.x = -0.5;

scene.add(camera);

// Controls
let windows_width = window.innerWidth;
console.log("windows width ==  " + windows_width);

if (windows_width > 961) {
  // const controls = new OrbitControls(camera, canvas);
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enabled = false;
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setClearColor(0x000000, 0); // the default

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update the camera
  points.rotation.y = elapsedTime * 0.3;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
