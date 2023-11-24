// import * as THREE from "three";
// import { OrbitControls } from "OrbitControls";
// import { GLTFLoader } from "GLTFLoader";
// import { DRACOLoader } from "DRACOLoader";

var camera, scene, renderer, sphere, light1, light2, light3, light4;
let mixer;
init();

animate();

/* Init Three.js Scene */
function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  /* Move camera 'cause element is 0,0,0 */
  camera.position.z = 100;

  scene = new THREE.Scene();

  drawing(scene);

  renderer = new THREE.WebGLRenderer({
    precision: "highp",
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6);
  // let canvas = document.body.appendChild( renderer.domElement );
  let canvas = document
    .getElementById("ai_bot")
    .appendChild(renderer.domElement);

  // Controls
  // const controls = new OrbitControls(camera, canvas);
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enable = false;
  controls.enableRotate = true;
  controls.minPolarAngle = 1.3;
  controls.maxPolarAngle = 1.3;
  controls.enableZoom = false;

  let windows_width = window.innerWidth;
  if (windows_width < 960) {
    controls.enabled = false;
  }
}

/* Drawing scene */
function drawing(scene) {
  // const loader = new GLTFLoader();
  const loader = new THREE.GLTFLoader();

  // const dracoLoader = new THREE.DRACOLoader();
  // dracoLoader.setDecoderPath(
  //   "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
  // );

  // loader.setDRACOLoader(dracoLoader);

  let object;
  var models = {};

  function loadModel(url, a, b, c, d, e, f, g, h) {
    if (models[url]) {
      return models[url].then((o) => o.clone());
    }

    return (models[url] = new Promise((resolve, reject) => {
      loader.load(
        url,
        function (gltf) {
          resolve((object = gltf.scene));
          object.scale.set(a, b, c);
          object.rotation.y = d;
          object.rotation.z = e;
          object.rotation.x = f;
          object.position.y = g;
          object.position.x = h;
          object.traverse(function (obj) {
            obj.frustumCulled = false;
          });
          mixer = new THREE.AnimationMixer(object);
          mixer.setDuration = 10; // add this
          mixer.clipAction(gltf.animations[0]).play();
        },
        undefined,
        reject
      );
    }));
  }

  // loadModel('./model/break.glb', 300, 300, 300, 0,0,-26,0).then( ( object ) => scene.add( object ) );
  let add;

  loadModel(
    "/model/ai.glb",
    39,
    39,
    39,
    0,
    0,
    0,
    -27,
    -1
  ).then((object) => scene.add(object));

  /* Sphere */
  var geometry = new THREE.SphereGeometry(10, 32, 32);
  var material = new THREE.MeshPhongMaterial({
    color: 0x003b6f,
    specular: 0x111111,
    shininess: 60,
  });
  sphere = new THREE.Mesh(object, material);
  sphere.position.set(0, 200, 0);

  var sphericalLight = new THREE.SphereGeometry(0.7, 16, 8);

  /* Light */
  light1 = new THREE.PointLight(0xff0040, 2, 100);
  light1.add(
    new THREE.Mesh(
      sphericalLight,
      new THREE.MeshBasicMaterial({ color: 0xd07ae6 })
    )
  );

  light2 = new THREE.PointLight(0x0040ff, 2, 100);
  light2.add(
    new THREE.Mesh(
      sphericalLight,
      new THREE.MeshBasicMaterial({ color: 0xf54918 })
    )
  );

  light3 = new THREE.PointLight(0x80ff80, 2, 100);
  light3.add(
    new THREE.Mesh(
      sphericalLight,
      new THREE.MeshBasicMaterial({ color: 0xd07ae6 })
    )
  );

  light4 = new THREE.PointLight(0xffaa00, 2, 100);
  light4.add(
    new THREE.Mesh(
      sphericalLight,
      new THREE.MeshBasicMaterial({ color: 0xf54918 })
    )
  );

  scene.add(sphere);
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);
  scene.add(light4);
  const light = new THREE.AmbientLight(); // soft white light
  light.intensity = 1;
  scene.add(light);
}

const clock = new THREE.Clock();

/* Animate */
function animate() {
  if (mixer) mixer.update(clock.getDelta());
  requestAnimationFrame(animate);

  render();
}

/* Render */
function render() {
  var time = Date.now() * 0.0005;

  sphere.rotation.x += 0.05;

  light1.position.x = Math.sin(time + 0.5) * 15;
  light1.position.y = Math.cos(time + 0.5) * 37;
  light1.position.z = Math.cos(time + 0.5) * 15;
  light2.position.x = Math.cos(time * 0.3) * 15;
  light2.position.y = Math.sin(time * 0.5) * 37;
  light2.position.z = Math.sin(time * 0.7) * 15;
  light3.position.x = Math.sin(time * 0.7) * 15;
  light3.position.y = Math.cos(time * 0.3) * 37;
  light3.position.z = Math.sin(time * 0.7) * 15;
  light4.position.x = Math.sin(time * 0.2) * 15;
  light4.position.y = Math.cos(time) * 37;
  light4.position.z = Math.sin(time) * 15;

  renderer.render(scene, camera);
}
