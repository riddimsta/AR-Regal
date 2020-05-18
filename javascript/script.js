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
        detectionMode: 'color_and_matrix',

    });

    // copy projection matrix to camera when initialization complete
    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    ////////////////////////////////////////////////////////////
    // setup markerRoots
    ////////////////////////////////////////////////////////////

    // build markerControls
    markerRoot = new THREE.Group();
    scene.add(markerRoot);
    let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: "assets/marker/pattern-weg (2).patt",
        smooth: true,
        // number of matrices to smooth tracking over, more = smoother but slower follow
        smoothCount: 20,
        // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
        smoothTolerance: 0.01,
        // threshold for smoothing, will keep still unless enough matrices are over tolerance
        smoothThreshold: 2,
    });

    var glbLoader = new THREE.GLTFLoader();
    glbLoader.load("assets/model/weg.glb", function (gltf) {

            var model = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            model.position.y = -5;
            model.position.z = 3;
            model.position.x = 0.5;

            model.rotation.x = -Math.PI / 2;
            model.scale.set(2, 2, 2);
            markerRoot.add(model);
        }
    );

    markerRoot1 = new THREE.Group();
    scene.add(markerRoot1);
    let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
        type: 'pattern',
        patternUrl: "assets/marker/pattern-luft (1).patt",
        smooth: true,
        // number of matrices to smooth tracking over, more = smoother but slower follow
        smoothCount: 15,
        // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
        smoothTolerance: 0.01,
        // threshold for smoothing, will keep still unless enough matrices are over tolerance
        smoothThreshold: 2,
    });

    var glbLoader1 = new THREE.GLTFLoader();
    glbLoader1.load("assets/model/luft.glb", function (gltf) {

            var model = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            model.position.y = -5;
            model.position.z = 3;
            model.position.x = 0.5;

            model.rotation.x = -Math.PI / 2;
            model.scale.set(2, 2, 2);
            markerRoot1.add(model);

        }
    );

    markerRoot2 = new THREE.Group();
    scene.add(markerRoot2);
    let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {
        type: 'pattern',
        patternUrl: "assets/marker/pattern-mahnmal (2).patt",
        smooth: true,
        // number of matrices to smooth tracking over, more = smoother but slower follow
        smoothCount: 15,
        // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
        smoothTolerance: 0.01,
        // threshold for smoothing, will keep still unless enough matrices are over tolerance
        smoothThreshold: 2,
    });

    var glbLoader2 = new THREE.GLTFLoader();
    glbLoader2.load("assets/model/mahnmal.glb", function (gltf) {

            var model = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            model.position.y = -5;
            model.position.z = 3;
            model.position.x = 0.5;

            model.rotation.x = -Math.PI / 2;
            model.scale.set(2, 2, 2);
            markerRoot2.add(model);

        }
    );

    markerRoot3 = new THREE.Group();
    scene.add(markerRoot3);
    let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {
        type: 'pattern',
        patternUrl: "assets/marker/pattern-kinder.patt",
        smooth: true,
        // number of matrices to smooth tracking over, more = smoother but slower follow
        smoothCount: 15,
        // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
        smoothTolerance: 0.01,
        // threshold for smoothing, will keep still unless enough matrices are over tolerance
        smoothThreshold: 2,
    });

    var glbLoader3 = new THREE.GLTFLoader();
    glbLoader3.load("assets/model/kinder.glb", function (gltf) {

            var model = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            model.position.y = -5;
            model.position.z = 2;
            model.position.x = 0.5;

            model.rotation.x = -Math.PI / 2;
            model.scale.set(2, 2, 2);
            markerRoot3.add(model);

        }
    );

    markerRoot4 = new THREE.Group();
    scene.add(markerRoot4);
    let markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {
        type: 'pattern',
        patternUrl: "assets/marker/pattern-mauerreste (3).patt",
        smooth: true,
        // number of matrices to smooth tracking over, more = smoother but slower follow
        smoothCount: 15,
        // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
        smoothTolerance: 0.01,
        // threshold for smoothing, will keep still unless enough matrices are over tolerance
        smoothThreshold: 2,
    });

    var glbLoader4 = new THREE.GLTFLoader();
    glbLoader4.load("assets/model/mauerreste.glb", function (gltf) {

            var model = gltf.scene;
            /*                    o3.traverse(function (child) {
                if (child.isMesh)
                   // child.material = faceMaterial;
                console.log(child.name);
                //child.layers.set(2);
            });*/
            model.position.y = -5;
            model.position.z = 3;
            model.position.x = 0.5;

            model.rotation.x = -Math.PI / 2;
            model.scale.set(2, 2, 2);
            markerRoot4.add(model);

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
