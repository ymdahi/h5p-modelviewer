var H5P = H5P || {};
 
H5P.ModelViewer = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    // Extend defaults with provided options
    this.options = $.extend(true, {}, {
      modelDescription: 'Hello world!',
      modelFile: null
    }, options);
    // Keep provided id.
    this.id = id;
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    // Set class on container to identify it as a model viewer
    // container.  Allows for styling later.
    $container.addClass("h5p-modelviewer");
    // Add model if provided.
    if (this.options.modelFile && this.options.modelFile.path) {
      $container.append('<div class="modelviewer-file" data-filepath="' + H5P.getPath(this.options.modelFile.path, this.id) + '"><p>Path: ' + H5P.getPath(this.options.modelFile.path, this.id) + '</p></div>');
    }
    // Add model description.
    $container.append('<p class="modelviewer-description">' + this.options.modelDescription + '</p>');

    // Add model viewer region
    $container.append('<div id="modelviewer-viewer"></div>');

    import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/examples/jsm/controls/OrbitControls.js';
    import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r108/examples/jsm/loaders/OBJLoader2.js';

    function main() {
      const canvas = document.querySelector('#modelviewer-viewer');
      const renderer = new THREE.WebGLRenderer({canvas});
    
      const fov = 45;
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 10, 20);
    
      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 5, 0);
      controls.update();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('black');

      {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
      }
      {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
      }
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
      }
      {
        const objLoader = new OBJLoader2();
        objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
          scene.add(root);
        });
      }
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      function render() {

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);
    }
    
  main();



    // // three.js gltf viewer
    
    // // create the threejs scene
    // scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xdddddd);
    // camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
    // camera.rotation.y = 45/180*Math.PI;
    // camera.position.x = 800;
    // camera.position.y = 100;
    // camera.position.z = 1000;
    // renderer = new THREE.WebGLRenderer({antialias:true});
    // renderer.setSize(window.innerWidth,window.innerHeight);
    // document.getElementById("modelviewer-viewer").appendChild(renderer.domElement);

    // // add lighting to the scene
    // hlight = new THREE.AmbientLight (0x404040,100);
    // scene.add(hlight);
    // directionalLight = new THREE.DirectionalLight(0xffffff,100);
    // directionalLight.position.set(0,1,0);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);
    // light = new THREE.PointLight(0xc4c4c4,10);
    // light.position.set(0,300,500);
    // scene.add(light);
    // light2 = new THREE.PointLight(0xc4c4c4,10);
    // light2.position.set(500,100,0);
    // scene.add(light2);
    // light3 = new THREE.PointLight(0xc4c4c4,10);
    // light3.position.set(0,100,-500);
    // scene.add(light3);
    // light4 = new THREE.PointLight(0xc4c4c4,10);
    // light4.position.set(-500,300,500);
    // scene.add(light4);

    // // load the model
    // let loader = new THREE.GLTFLoader();
    // loader.load('scene.gltf', function(gltf){
    //   car = gltf.scene.children[0];
    //   car.scale.set(0.5,0.5,0.5);
    //   scene.add(gltf.scene);
    //   animate();
    // });

  };
 
  return C;
})(H5P.jQuery);