var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;

var object;

initialize();
animate();

function initialize() {
    scene = new THREE.Scene();

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
    hemiLight.position.set(0, 300, 0);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(75, 300, -75);
    scene.add(dirLight);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        logarithmicDepthBuffer: true,
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2;
    document.body.appendChild(renderer.domElement);


    ////////////////////////////////////////////////////////////
    // setup arToolkitSource
    ////////////////////////////////////////////////////////////

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize(el) {

        //camera.aspect = window.innerWidth / window.innerHeight;

        //renderer.setSize( window.innerWidth, window.innerHeight );

        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
        }
        //camera.updateProjectionMatrix();
    }

    arToolkitSource.init(function onReady() {
        onResize()
    });

    // handle resize event
    window.addEventListener('resize', onResize);

    ////////////////////////////////////////////////////////////
    // setup arToolkitContext
    ////////////////////////////////////////////////////////////

    // create atToolkitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'camera_para.dat',
        detectionMode: 'mono',

    });

    // copy projection matrix to camera when initialization complete
    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    ////////////////////////////////////////////////////////////
    // setup markerRoots
    ////////////////////////////////////////////////////////////

    // build markerControls
    let markerRoot = new THREE.Group();
    scene.add(markerRoot);
    let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern', patternUrl: "assets/marker/pattern-luft.patt"
    });

    var glbLoader = new THREE.GLTFLoader();
    glbLoader.load("assets/model/luft1.glb", function (gltf) {

            o3 = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            o3.position.y = -5;
            o3.position.z = 3;
        o3.position.x = 0.5;

        o3.rotation.x = -Math.PI/2;
            o3.scale.set(2,2,2);
            markerRoot.add(o3);
        }
    );

    let markerRoot1 = new THREE.Group();
    scene.add(markerRoot1);
    let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
        type: 'pattern', patternUrl: "assets/marker/pattern-FotoKinderSkulpturLidice1.patt"
    });

    var glbLoader1 = new THREE.GLTFLoader();
    glbLoader1.load("assets/model/kinder.glb", function (gltf) {

            o4 = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            o4.position.y = -5;

        o4.scale.set(1.5, 1.5, 1.5);
            markerRoot1.add(o4);
        }
    );

    let markerRoot2 = new THREE.Group();
    scene.add(markerRoot2);
    let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
        type: 'pattern', patternUrl: "assets/marker/pattern-lidice_heute (2).patt"
    });

    var glbLoader2 = new THREE.GLTFLoader();
    glbLoader2.load("assets/model/weg.glb", function (gltf) {

            o5 = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            o5.position.y = -5;
        //o5.rotation.y = -Math.PI;

        o5.scale.set(1.5, 1.5, 1.5);
            markerRoot2.add(o5);
        }
    );

    let markerRoot3 = new THREE.Group();
    scene.add(markerRoot3);
    let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {
        type: 'pattern', patternUrl: "assets/marker/pattern-mauerreste.patt"
    });

    var glbLoader3 = new THREE.GLTFLoader();
    glbLoader3.load("assets/model/mauerreste.glb", function (gltf) {

            o6 = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            o6.position.y = -5;
            //o5.rotation.y = -Math.PI;

            o6.scale.set(1.5, 1.5, 1.5);
            markerRoot3.add(o6);
        }
    );


   /* let glbArray = ["assets/model/weg", "assets/model/kinder", "assets/model/mauerreste"];

    let patternArray = ["assets/marker/pattern-weg", "assets/marker/pattern-FotoKinderSkulpturLidice1", "assets/marker/pattern-mauerreste"];

    for (let i = 0; i < 2; i++) {
        let markerRoot = new THREE.Group();
        scene.add(markerRoot);
        let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
            type: 'pattern', patternUrl: patternArray[i] + ".patt",
        });

        var glbLoader1 = new THREE.GLTFLoader();
        glbLoader1.load(glbArray[i] + ".glb", function (gltf) {

                o3 = gltf.scene;
                /!*                    o3.traverse(function (child) {
                    if (child.isMesh)
                       // child.material = faceMaterial;
                    console.log(child.name);
                    //child.layers.set(2);
                });*!/
                o3.position.y = -5;
                o3.scale.set(1.5, 1.5, 1.5);
                markerRoot.add(o3);
            }
        );*/



    }


function update() {

    // update artoolkit on every frame
    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);

}

function render() {
    requestAnimationFrame(render);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    update();
    render();
}
