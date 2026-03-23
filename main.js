import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);
scene.fog = new THREE.Fog(0x0a0a0f, 30, 80);

// Camera
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(8, 6, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Orbit Controls (pan + rotate)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Grid
const grid = new THREE.GridHelper(20, 20, 0x444466, 0x222233);
scene.add(grid);

// Axes (X=red, Y=green, Z=blue)
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// Axis Labels
function makeLabel(text, position, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = 'bold 48px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(text, 64, 50);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  sprite.position.copy(position);
  sprite.scale.set(0.6, 0.3, 1);
  scene.add(sprite);
}

makeLabel('+X', new THREE.Vector3(5.6, 0.2, 0),  '#ff4444');
makeLabel('+Y', new THREE.Vector3(0.2, 5.6, 0),  '#44ff44');
makeLabel('+Z', new THREE.Vector3(0,   0.2, 5.6), '#4488ff');

// Resize
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();