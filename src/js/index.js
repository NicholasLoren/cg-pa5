import * as THREE from 'three'
import { OrbitControls } from 'https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js'

// Set up scene, camera, and renderer
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)

// Set up lighting
const ambientLight = new THREE.AmbientLight(0x404040) // Soft white light
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 0) // Intense white light
pointLight.position.set(0, 100, 10)
pointLight.castShadow = true
scene.add(pointLight)

// Create the molecule container
const molecule = new THREE.Object3D()

// Create materials for atoms and bonds
const hydrogenMaterial = new THREE.MeshPhongMaterial({
  color: 0x038dff,
  emissive: 0x000033,
})

const carbonMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  emissive: 0x330000,
})

const bondMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  emissive: 0x111111,
})

// Create carbon atom
const carbonGeometry = new THREE.SphereGeometry(20, 32, 32)
const carbon = new THREE.Mesh(carbonGeometry, carbonMaterial)
carbon.castShadow = true
carbon.receiveShadow = true
molecule.add(carbon)

// Create hydrogen atom and bond geometries
const hydrogenGeometry = new THREE.SphereGeometry(7, 16, 16)
hydrogenGeometry.translate(0, 30, 0)

const hydrogen = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial)
hydrogen.castShadow = true
hydrogen.receiveShadow = true

const bondGeometry = new THREE.CylinderGeometry(3, 3, 30, 16)
bondGeometry.translate(0, 15, 0)

const bond = new THREE.Mesh(bondGeometry, bondMaterial)
bond.castShadow = true
bond.receiveShadow = true

// Combine hydrogen and bond into an atom-bond object
const atomBond = new THREE.Object3D()
atomBond.add(hydrogen)
atomBond.add(bond)

// Create and position hydrogen atoms around the carbon atom
const h1 = atomBond.clone()
h1.position.setY(15)
molecule.add(h1)

// Create and position hydrogen atoms around the carbon atom
const h2 = atomBond.clone()
h2.position.setX(10)
h2.position.setY(-10)
h2.position.setZ(-10)
h2.rotateZ((Math.PI * 4) / 3)
h2.rotateX((Math.PI * 7) / 4)
molecule.add(h2)

const h3 = atomBond.clone()
h3.position.setY(-12)
h3.position.setZ(12)
h3.rotateX((Math.PI * 3) / 4)
molecule.add(h3)

const h4 = atomBond.clone()
h4.rotateZ((Math.PI * 2) / 3)
h4.rotateX((Math.PI * 7) / 4)
h4.position.setX(-10)
h4.position.setZ(-10)
h4.position.setY(-10)
molecule.add(h4)

// Add the entire molecule to the scene
scene.add(molecule)

// Create and add a plane to the scene
const planeGeometry = new THREE.PlaneGeometry(300, 300, 32, 32)
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0, -60, 0)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
scene.add(plane)

// Position the camera
camera.position.z = 250

// Animation function
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
  //rotate the molecule around
  molecule.rotation.y += 0.005
  molecule.rotation.x += 0.005
  molecule.rotation.z += 0.005
}

// Start animation
animate()

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
