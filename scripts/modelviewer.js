var H5P = H5P || {};
 
H5P.ModelViewer = (function ($, THREE) {
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
    $container.append('<div id="stl_cont"></div>');

    var filepath = H5P.getPath(this.options.modelFile.path, this.id);

    // var stl_viewer = new StlViewer(document.getElementById("stl_cont"), { models: [ {id:0, filename:filepath} ] });

    var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();

    



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
})(H5P.jQuery, H5P.ThreeJS);