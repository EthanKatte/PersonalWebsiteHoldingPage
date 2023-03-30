import * as THREE from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Create the scene
const scene = new THREE.Scene()


//Create the geometry
const geometry = new THREE.SphereGeometry(1, 64, 64)

//Create the material to go on the geometry#FFD580"
const material = new THREE.MeshStandardMaterial(
  {
    color:"#FF0580",
  }
)

//creates the mesh that combines the geometry and the material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Illuminate the object
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)

//create the Camera
const camera = new THREE.PerspectiveCamera(45, 800/600)
camera.position.z = 10
scene.add(camera)


//renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})

//how big the canvas is and where to render it
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)



//Controls
const Controls = new OrbitControls(camera, canvas)
Controls.enableDamping = true
Controls.enablePan = false
Controls.enableZoom = false
Controls.autoRotate = true
Controls.autoRotateSpeed = 5


//resize
window.addEventListener("resize", () => {

  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)

})

const loop = () => {
  Controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()







