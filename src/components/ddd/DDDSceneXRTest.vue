<template>

    <div style="width: 100%; left: 0; right: 0; top: 0; bottom: -5; position: absolute; z-index: 0;">
        <canvas class="ddd-scene" id="ddd-scene" style="width: 100%; outline:none;">
        </canvas>
    </div>

</template>

<script>

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

import * as earcut from "earcut"
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

//import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience';
//import { WebXRHitTestLegacy } from "@babylonjs/XR/features/webXRHitTestLegacy";
//import { WebXRHitTest } from 'babylonjs/XR/features/webXRHitTest';
//import { WebXRPlaneDetector } from 'babylonjs/XR/features/webXRPlaneDetector';
//import { WebXRAnchorSystem } from 'babylonjs/XR/features/webXRAnchorSystem';


/**
 * WebXR ar demo using hit-test, anchors, and plane detection.
 *
 * Every press on the screen will add a figure in the requested position (if the ring is displayed). Those meshes will be kept in place by the AR system you are using.
 *
 * Working (at the moment) on android devices and the latest chrome.
 *
 * Created by Raanan Weber (@RaananW)
 */
var createScene = async function (engine, canvas) {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    var hitTest = null;

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -5), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var dirLight = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -1, -0.5), scene);
    dirLight.position = new BABYLON.Vector3(0, 5, -5);

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
    /*
    */

    var dummy = new BABYLON.Mesh("dummy", scene);
    //const model = await BABYLON.SceneLoader.ImportMeshAsync("", "./scenes/", "dummy3.babylon", scene);
    let model = await BABYLON.SceneLoader.ImportMeshAsync("", "./scenes/", "ddd-model.glb", scene);
    //const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
    //const model = await BABYLON.SceneLoader.ImportMeshAsync("", "", glb, scene);

    model.isVisible = false;

    let b = model.meshes[0];
    //let b = BABYLON.CylinderBuilder.CreateCylinder('cylinder', { diameterBottom: 0.2, diameterTop: 0.4, height: 0.5 });
    b.rotationQuaternion = new BABYLON.Quaternion();
    b.scale = new BABYLON.Vector3(0.001, 0.001, 0.001);
    b.position.y = -100;
    b.bakeCurrentTransformIntoVertices();

    //dummy.addChild(model);
    //b = model.meshes[0];

    //let b = model.meshes[0];
    //let b = dummy;
    b.isVisible = false;
    b.setEnabled(false);

    //shadowGenerator.addShadowCaster(b, true);

    const marker = BABYLON.MeshBuilder.CreateTorus('marker', { diameter: 0.15, thickness: 0.05 }, scene);
    //const marker = BABYLON.SphereBuilder.CreateSphere('marker', { diameter: 1.0 });
    marker.isVisible = false;
    marker.rotationQuaternion = new BABYLON.Quaternion();


    console.debug("Creating XR environment.");
    var xr = await scene.createDefaultXRExperienceAsync	({
        uiOptions: {
            sessionMode: "immersive-ar",
            referenceSpaceType: "local-floor"    // "viewer", "local",  "local-floor", "bounded-floor",  "unbounded"
        },
        optionalFeatures: true
    });

    const fm = xr.baseExperience.featuresManager;

    const xrTest = fm.enableFeature(BABYLON.WebXRHitTest.Name, "latest");
    const xrPlanes = fm.enableFeature(BABYLON.WebXRPlaneDetector.Name, "latest");
    const anchors = fm.enableFeature(BABYLON.WebXRAnchorSystem.Name, 'latest');
    const xrBackgroundRemover = fm.enableFeature(BABYLON.WebXRBackgroundRemover.Name, "latest", { environmentHelperRemovalFlags: { skyBox: true, ground: false } });


    /*
    // ROBOT
    var skeleton = model.skeletons[0];
    skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    skeleton.animationPropertiesOverride.enableBlending = true;
    skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
    skeleton.animationPropertiesOverride.loopMode = 1;

    var idleRange = skeleton.getAnimationRange("YBot_Idle");
    var walkRange = skeleton.getAnimationRange("YBot_Walk");
    var runRange = skeleton.getAnimationRange("YBot_Run");
    var leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
    var rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");
    scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
    */

    var placementActive = true;
    //setTimeout(() => { placementActive = true;}, 2000.0);

    b.isVisible = false;

    xrTest.onHitTestResultObservable.add((results) => {
        if (results.length) {
            marker.isVisible = true;
            hitTest = results[0];
            //hitTest.transformationMatrix.decompose(undefined, b.rotationQuaternion, b.position);
            //hitTest.transformationMatrix.decompose(undefined, undefined, b.position);
            hitTest.transformationMatrix.decompose(undefined, marker.rotationQuaternion, marker.position);
        } else {
            marker.isVisible = false;
            hitTest = undefined;
        }
    });
    const mat1 = new BABYLON.StandardMaterial('1', scene);
    mat1.diffuseColor = BABYLON.Color3.Red();
    const mat2 = new BABYLON.StandardMaterial('1', scene);
    mat2.diffuseColor = BABYLON.Color3.Blue();

    const planes = [];

    if (anchors) {
        console.log('anchors attached');
        anchors.onAnchorAddedObservable.add(anchor => {

            console.log('attaching', anchor);
            b.isVisible = true;
            b.setEnabled(true);
            anchor.attachedNode = b.clone("AnchorClone"); // .clone(); //"mensch");
            //scene.addChild(b.clone("AnchorClone"));
            //anchor.attachedNode.skeleton = skeleton.clone('skelet');
            //shadowGenerator.addShadowCaster(anchor.attachedNode, true);
            //scene.beginAnimation(anchor.attachedNode.skeleton, idleRange.from, idleRange.to, true);
            //anchor.attachedNode.parent = scene;
            b.isVisible = false;
            b.setEnabled(false);
            //b.scale = new BABYLON.Vector3(0.00005, 0.00005, 0.00005);
            //b.parent.isVisible = false
            placementActive = false;

            /*
            foreach (let plane in planes) {
                plane.dispose();
            }
            planes = [];
            */
        })

        anchors.onAnchorRemovedObservable.add(anchor => {
            console.log('disposing', anchor);
            if (anchor) {
                anchor.attachedNode.isVisible = false;
                anchor.attachedNode.dispose();
            }
        });
    }

    scene.onPointerDown = (evt, pickInfo) => {
        //if (!placementActive) { return; }
        if (hitTest && anchors) {  //  && xr.baseExperience.state === BABYLON.WebXRState.IN_XR) {
            anchors.addAnchorPointUsingHitTestResultAsync(hitTest);
        }
    }

    xrPlanes.onPlaneAddedObservable.add(plane => {

        //if (!placementActive) { plane.mesh.dispose(false, false); return; }
        //if (!placementActive) { return; }

        plane.polygonDefinition.push(plane.polygonDefinition[0]);
        var polygon_triangulation = new BABYLON.PolygonMeshBuilder("name", plane.polygonDefinition.map((p) => new BABYLON.Vector2(p.x, p.z)), scene, earcut);
        var polygon = polygon_triangulation.build(false, 0.01);
        plane.mesh = polygon;

        planes[plane.id] = (plane.mesh);
        const mat = new BABYLON.StandardMaterial("mat", scene);
        mat.alpha = 0.5;
        mat.diffuseColor = BABYLON.Color3.Random();
        polygon.createNormals();
        // polygon.receiveShadows = true;
        plane.mesh.material = mat;

        plane.mesh.rotationQuaternion = new BABYLON.Quaternion();
        plane.transformationMatrix.decompose(plane.mesh.scaling, plane.mesh.rotationQuaternion, plane.mesh.position);
        /*
        */
    });

    xrPlanes.onPlaneUpdatedObservable.add(plane => {
        let mat;
        if (plane.mesh) {
            mat = plane.mesh.material;
            plane.mesh.dispose(false, false);
        }
        const some = plane.polygonDefinition.some(p => !p);
        if (some) {
            return;
        }
        plane.polygonDefinition.push(plane.polygonDefinition[0]);
        var polygon_triangulation = new BABYLON.PolygonMeshBuilder("name", plane.polygonDefinition.map((p) => new BABYLON.Vector2(p.x, p.z)), scene, earcut);
        var polygon = polygon_triangulation.build(false, 0.01);
        polygon.createNormals();
        plane.mesh = polygon;
        planes[plane.id] = (plane.mesh);
        plane.mesh.material = mat;
        plane.mesh.rotationQuaternion = new BABYLON.Quaternion();
        plane.transformationMatrix.decompose(plane.mesh.scaling, plane.mesh.rotationQuaternion, plane.mesh.position);
        //plane.mesh.receiveShadows = true;
    })

    xrPlanes.onPlaneRemovedObservable.add(plane => {
        if (plane && planes[plane.id]) {
            planes[plane.id].dispose()
        }
    })
    /*
    */

    /*
    */
    xr.baseExperience.sessionManager.onXRSessionInit.add(() => {
        planes.forEach(plane => plane.dispose());
        while (planes.pop()) { }
    });

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });

    return scene;

};

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.debug('Creating 3D scene.');

    const that = this;

    setTimeout(() => {


        // Get the canvas element from the DOM.
        const canvas = document.getElementById('ddd-scene');
        //const canvas = that.$el.querySelector('.ddd-scene');
        //const canvas = document.getElementById("renderCanvas");

        const height = window.innerHeight - 40;
        //console.debug("Resizing 3D canvas: " + height);
        this.$el.querySelector('.ddd-scene').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        //this.map.updateSize();

        // Associate a Babylon Engine to it.
        const engine = new BABYLON.Engine(canvas);

        //that.scene = new BABYLON.Scene(engine);
        that.scene = createScene(engine, canvas);


        /*
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2-0.5, 500, BABYLON.Vector3.Zero(), that.scene);
        camera.attachControl(canvas, true);
        camera.minZ = 1;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 1000;
        camera.upperBetaLimit = Math.PI/2;
        camera.panningSensibility = 3

        that.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), that.scene);

        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        //BABYLON.SceneLoader.ImportMesh('', '', https://models.babylonjs.com/', 'alien.glb', that.scene, function (newMeshes) {
        //    console.debug("Preparing model.");
        //    that.scene.createDefaultCameraOrLight(true);
        //    that.scene.activeCamera.attachControl(canvas, false);
        //    that.scene.activeCamera.alpha += Math.PI; // camera +180°
        //});

        const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
        //const glb = "https://www.yourcityracing.com/static/game/larochelle_150r_-1.153,46.155.glb";
        //const glb = new File([""], "scene.glb", {type: "application/octect-stream"})

        BABYLON.SceneLoader.ImportMesh('', '', glb, that.scene,
            // onSuccess
            function(newMeshes) {
                console.log("GLB loaded",newMeshes);
                newMeshes.forEach((mesh, i) => {
                    //if(mesh.material) {
                    //    mesh.overrideMaterialSideOrientation = BABYLON.Mesh.DOUBLESIDE;
                    //    mesh.updateMeshPositions();
                    //}
                });

            },

            // onProgress
            function(event) {
                console.log("glb loading: ", (event.loaded) )
            },
            // onError
            function(event) {
                console.log("glb loading onError: ", event)
            }
        );
        */


    }, 0);

  }
}
</script>
