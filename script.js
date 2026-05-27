import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// cupcake
(function() {
    const canvas = document.querySelector('#cupcake-canvas');
    const cupcakeScene = new THREE.Scene();
    const cupcakeCamera = new THREE.PerspectiveCamera(44, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    cupcakeCamera.position.set(0, 1, 4);
    cupcakeCamera.lookAt(0, 0.5, 0);

    const cupcakeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    cupcakeRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    cupcakeRenderer.setPixelRatio(window.devicePixelRatio);
    cupcakeRenderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    cupcakeScene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(2, 3, 4);
    cupcakeScene.add(dirLight);

    let cupcakeModel = null;
    const loader = new GLTFLoader();
    loader.load('/cupcake.glb', (gltf) => {
        cupcakeModel = gltf.scene;
        
        // Center and scale model
        const box = new THREE.Box3().setFromObject(cupcakeModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        cupcakeModel.scale.setScalar(scale);
        cupcakeModel.position.sub(center.multiplyScalar(scale));

        cupcakeScene.add(cupcakeModel);
    });

    function animateCupcake() {
        requestAnimationFrame(animateCupcake);
        if (cupcakeModel) {
            cupcakeModel.rotation.y += 0.01;
        }
        cupcakeRenderer.render(cupcakeScene, cupcakeCamera);
    }
    animateCupcake();

    // Handle resize
    window.addEventListener('resize', () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        cupcakeRenderer.setSize(w, h);
        cupcakeCamera.aspect = w / h;
        cupcakeCamera.updateProjectionMatrix();
    });

    
    const cupcakeSection = document.querySelector('.cupcake-text');
    const cupcakeContainer = document.querySelector('#cupcake-container');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    cupcakeContainer.classList.add('visible');
                } else {
                    cupcakeContainer.classList.remove('visible');
                }
            });
        },
        { threshold: 0.15 }
    );
    observer.observe(cupcakeSection);
})();

// popcorn
(function() {
    const canvas = document.querySelector('#popcorn-canvas');
    const popcornScene = new THREE.Scene();
    const popcornCamera = new THREE.PerspectiveCamera(44, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    popcornCamera.position.set(0, 1, 4);
    popcornCamera.lookAt(0, 0.5, 0);

    const popcornRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    popcornRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    popcornRenderer.setPixelRatio(window.devicePixelRatio);
    popcornRenderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    popcornScene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(2, 3, 4);
    popcornScene.add(dirLight);

    let popcornModel = null;
    const loader = new GLTFLoader();
    loader.load('/popcorn.glb', (gltf) => {
        popcornModel = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(popcornModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        popcornModel.scale.setScalar(scale);
        popcornModel.position.sub(center.multiplyScalar(scale));

        popcornScene.add(popcornModel);
    });

    function animatePopcorn() {
        requestAnimationFrame(animatePopcorn);
        if (popcornModel) {
            popcornModel.rotation.y += 0.01;
        }
        popcornRenderer.render(popcornScene, popcornCamera);
    }
    animatePopcorn();

    // Handle resize
    window.addEventListener('resize', () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        popcornRenderer.setSize(w, h);
        popcornCamera.aspect = w / h;
        popcornCamera.updateProjectionMatrix();
    });

    // Intersection Observer for reveal animation
    const popcornSection = document.querySelector('.popcorn-text');
    const popcornContainer = document.querySelector('#popcorn-container');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    popcornContainer.classList.add('visible');
                } else {
                    popcornContainer.classList.remove('visible');
                }
            });
        },
        { threshold: 0.15 }
    );
    observer.observe(popcornSection);
})();



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop(animate);

renderer.render(scene, camera);
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = new THREE.TextureLoader().load('/missy.jpg');
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new THREE.MeshBasicMaterial({color: 0xffffff });
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);

camera.position.z = 45;

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0000;
    camera.rotation.y = t * -0.0000;

}

function animate() {

  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  renderer.render( scene, camera );

}

function add_star() {
    const star_geometry = new THREE.SphereGeometry(0.25,24,24);
    const star_material = new THREE.MeshBasicMaterial({color: 0xffffff })
    const star = new THREE.Mesh(star_geometry, star_material);

    const [x,y,z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x,y,z);
    scene.add(star)
}
Array(200).fill().forEach(add_star);

animate();

document.body.onscroll = moveCamera;
moveCamera();

const startDate = new Date("September 28, 2025 23:00:00").getTime();
function updateCounter(){
    const now = new Date().getTime();
    const difference = now - startDate;

    // Time calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("counter").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;


}

setInterval(updateCounter, 1000);
updateCounter();