
import * as BABYLON from 'babylonjs';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import proj4 from 'proj4';
//import {register} from 'ol/proj/proj4';
import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';

import LayerManager from '@/dddviewer/layers/LayerManager.js';


/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

class SceneViewer {

    constructor(viewerState) {

        this.viewerState = viewerState;

        this.engine = null;
        this.scene = null;

        this.camera = null;

        this.highlightMeshes = [];
        this.materialHighlight = null;

        this.shadowsEnabled = false;

        this.layerManager = new LayerManager(this);

        this.originShiftWGS84 = [0, 0];
        this.projection = null;

        this.tileGrid = createXYZ({
            extent: extentFromProjection('EPSG:3857'),
            //maxResolution: options.maxResolution,
            //maxZoom: options.maxZoom,
            //minZoom: options.minZoom,
            //tileSize: options.tileSize,
        });

    }

    initialize(canvas) {

        const that = this;

        // Get the canvas element from the DOM.
        //const canvas = that.$el.querySelector('.ddd-scene');
        //const canvas = document.getElementById("renderCanvas");

        //console.debug(that.viewerState);
        let coords = that.viewerState.positionWGS84;
        //that.loadTileForCoords(coords);

        that.registerProjectionForCoords(coords);


        // Associate a Babylon Engine to it.
        let engine = new BABYLON.Engine(canvas, true, { stencil: true });
        that.engine = engine;

        that.scene = new BABYLON.Scene(engine);
        //that.scene = createScene(engine, canvas);

        //that.highlightLayer = new BABYLON.HighlightLayer("hl1", that.scene);

        /*
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2-0.5, 500, BABYLON.Vector3.Zero(), that.scene);
        camera.attachControl(canvas, true);
        camera.minZ = 1;
        //camera.maxZ = 2500;  // Automatic? see focusOn()
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 1000;
        camera.upperBetaLimit = Math.PI/2;
        camera.panningSensibility = 2;
        */

        this.selectCameraFree();

        //that.lightHemi = new BABYLON.HemisphericLight("lightHemi", new BABYLON.Vector3(-Math.PI * 0.25, 1, Math.PI), that.scene);
        that.light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.5, -0.5, 0.5), that.scene);
        that.light.intensity = 0.75;
        that.light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-0.5, -0.3, -0.5), that.scene);
        that.light2.intensity = 0.6;

        that.shadowGenerator = null;
        if (that.shadowsEnabled) {
            that.shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, that.light);
        }

        //var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', that.scene, 0.75);

        that.materialHighlight = new BABYLON.StandardMaterial("materialHighlight", that.scene);
        that.materialHighlight.diffuseColor = new BABYLON.Color3(1, 1, 1);
        //that.materialHighlight.specularColor = new BABYLON.Color3(1, 1, 1);
        that.materialHighlight.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.);
        that.materialHighlight.wireframe = true;
        that.materialHighlight.disableLighting = true;
        that.materialHighlight.backFaceCulling = true;

        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        //BABYLON.SceneLoader.ImportMesh('', '', https://models.babylonjs.com/', 'alien.glb', that.scene, function (newMeshes) {
        //    console.debug("Preparing model.");
        //    that.scene.createDefaultCameraOrLight(true);
        //    that.scene.activeCamera.attachControl(canvas, false);
        //    that.scene.activeCamera.alpha += Math.PI; // camera +180°
        //});

        // Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:3000.0}, that.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", that.scene);
        skyboxMaterial.backFaceCulling = false;
        //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/skybox", that.scene);
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/TropicalSunnyDay", that.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;

        /*
        let water = new BABYLON.WaterMaterial("water", that.scene, new BABYLON.Vector2(1024, 1024));
        water.backFaceCulling = true;
        water.bumpTexture = new BABYLON.Texture("/textures/waterbump.png", scene);
        water.windForce = -5;
        water.waveHeight = 1.5;
        water.bumpHeight = 0.5;
        water.waveLength = 1.1;
        water.colorBlendFactor = 0.2;
        water.addToRenderList(skybox);
        water.addToRenderList(ground);
        waterMesh.material = water;
        */

        /*
        that.materialGrass = new BABYLON.StandardMaterial("bawl", that.scene);
        that.textureGrass = new BABYLON.GrassProceduralTexture("textbawl", 256, that.scene);
        that.materialGrass.ambientTexture = that.textureGrass;
        */


        // Show BabylonJS Inspector
        //that.scene.debugLayer.show();

        // Render every frame
        engine.runRenderLoop(() => {
            if (! that.scene) { return; }
            that.update();
            that.scene.render();
        });

    }

    dispose() {
        if (this.scene) {
            console.debug("Disposing SceneViewer scene.");
            this.scene.dispose();
            this.scene = null;
        }
        if (this.engine) {
        console.debug("Disposing SceneViewer 3D engine (BabylonJS).");
            this.engine.dispose();
            this.engine = null;
        }
    }

    update() {

        let positionWGS84 = this.positionWGS84();
        if (positionWGS84) {
            this.viewerState.positionWGS84 = positionWGS84;

            this.viewerState.positionTileZoomLevel = 17;
            if (this.viewerState.positionGroundHeight !== null && this.viewerState.positionGroundHeight < 50) {
                this.viewerState.positionTileZoomLevel = 18;
            }

            if (this.camera.alpha) {
                let heading = -90 + (-this.camera.alpha * (180.0 / Math.PI));
                heading = (heading % 360 + 360) % 360;
                this.viewerState.positionHeading = heading;

                let tilt = this.camera.beta * (180.0 / 3.14159265359);
                this.viewerState.positionTilt = tilt;
            } else if (this.camera.rotation) {

                let heading = (this.camera.rotation.y * (180.0 / Math.PI));
                heading = (heading % 360 + 360) % 360;
                this.viewerState.positionHeading = heading;

                let yaw = this.camera.rotation.x * (180.0 / 3.14159265359);
                this.viewerState.positionTilt = 90.0 - yaw;

            }
        }

        let positionScene = this.camera.position.asArray();
        this.viewerState.positionScene = positionScene;

        this.layerManager.update();
    }

    sceneToWGS84(coords) {
        //let wgs84Pos = this.originShiftWGS84;
        //const point = olProj.transform([coords[0], coords[2]], this.projection, 'EPSG:4326');
        const point = this.projection.inverse([coords[0], coords[2]]);
        return [point[0], point[1], coords[1]];
    }

    wgs84ToScene(coords) {
        //const point = olProj.transform(coords, 'EPSG:4326', this.projection);
        const point = this.projection.forward(coords);

        return [point[0], coords[2], point[1]];
    }

    positionWGS84() {
      const scenePos = this.camera.position.asArray();
      const wgs84Pos = this.sceneToWGS84(scenePos);
      return wgs84Pos;
      /*
      const extent = this.map.getView().calculateExtent(this.map.getSize());
      let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
      */
    }

    positionString() {
        // /@43.2505933,5.3736631,126a,35y,20.08h,56.42t/
        const point = this.positionWGS84();
        //const zoom = this.map.getView().getZoom();

        //let heading = (this.camera.rotation.y * (180.0 / 3.14159265359));
        //heading = (heading % 360 + 360) % 360;
        let heading = this.viewerState.positionHeading;

        //let yaw = this.camera.rotation.x * (180.0 / 3.14159265359);
        let tilt = this.viewerState.positionTilt;

        //let height = this.camera.position.y;
        let groundHeight = this.positionGroundHeight();
        if (groundHeight === null) { return this.camera.position.y; }

        let posString = "@" + point[1].toFixed(7) + "," + point[0].toFixed(7);

        if (false) {
            posString = posString + "," + parseInt(groundHeight) + "m";   // If heading and yaw is 0, GM uses 'm' (seem MSL m or Ground m)
        } else {
            posString = posString + "," + parseInt(groundHeight) + "a";	// seems Ground M  ... (not WGS84 height (with EGM))
            posString = posString + "," + parseInt(35) + "y";	// ?
            posString = posString + "," + heading.toFixed(1) + "h"; // Heading
            posString = posString + "," + tilt.toFixed(2) + "t";	// Yaw (0 is vertical, 90 horizontal)
        }
        return posString;
    }

    positionGroundHeight() {
        const ray = new BABYLON.Ray(this.camera.position, new BABYLON.Vector3(0, -1, 0));
        const pickResult = this.scene.pickWithRay(ray);
        if (pickResult) {
            return pickResult.distance;
        } else {
            return null;
        }
    }

    registerProjectionForCoords(coords) {

        console.debug("Setting Scene Geo transform for coords: " + coords);

        // Get tile grid coordinates
        const coordsUtm = olProj.transform(coords, 'EPSG:4326', 'EPSG:3857');
        const tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);

        let tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
        let tileCenter = extent.getCenter(tileExtent);
        const tileCenterWGS84 = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');

        // Using coords of tile center for custom projection as DDD does
        this.projection = proj4(
            '+proj=tmerc +lat_0=' + tileCenterWGS84[1] + ' +lon_0=' + tileCenterWGS84[0] + ' +k_0=1 ' +
            '+x_0=0. +y_0=0. +datum=WGS84 +ellps=WGS84 ' +
            '+towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

    }

    deselectMesh() {
        if (this.viewerState.selectedMesh) {
            //this.viewerState.selectedMesh.showBoundingBox = false;

            for (var mesh of this.highlightMeshes) {
                  mesh.dispose();
            }
            this.highlightMeshes = [];
        }
    }

    selectMesh(mesh) {

        this.deselectMesh();

        if (mesh) {
            this.viewerState.selectedMesh = mesh;
            //this.viewerState.selectedMesh.showBoundingBox = true;
            //console.debug(this.viewerState.selectedMesh.metadata.gltf.extras);

            // Highlight
            //that.highlightLayer.addMesh(pickResult.pickedMesh, BABYLON.Color3.White()); // , true);
            //pickResult.pickedMesh.material = that.materialHighlight;
            //pickResult.pickedMesh.material = that.materialGrass;

            // Prepare the wireframe mesh
            // To disable depth test check rendering groups:  https://forum.babylonjs.com/t/how-do-i-disable-depth-testing-on-a-mesh/1159
            let highlightClone = mesh.clone();

            // Iterate clone recursively to set highlight material to all submeshes
            let that = this;
            const setHighlightRecursively = function(submesh) {
                submesh.material = that.materialHighlight;
                for (let mc of submesh.getChildren()) {
                    setHighlightRecursively(mc);
                }
            }
            setHighlightRecursively(highlightClone);

            //highlightClone.material = this.materialHighlight;
            highlightClone.parent = mesh.parent;
            this.highlightMeshes.push(highlightClone);

        }
    }

    selectCameraFree() {
         if (this.camera) {
            this.camera.detachControl();
            this.camera.dispose();
        }
        console.debug("Creating free camera.");

        const camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), this.scene);
        camera.minZ = 1;
        camera.maxZ = 4500;
        //camera.touchMoveSensibility = 0.01;
        camera.touchAngularSensibility = 1000.0;
        camera.keysUp += [87];
        camera.keysDown += [83];
        camera.keysLeft += [65];
        camera.keysRight += [68];
        camera.keysUpward += [81];
        camera.keysDownward += [69];
        camera.attachControl(this.engine.getRenderingCanvas(), true);
        camera.fov = 35.0 * (Math.PI / 180.0);  // 35.0 might be GM, 45.8... is default
        let positionScene = this.wgs84ToScene(this.viewerState.positionWGS84);
        camera.position = new BABYLON.Vector3(positionScene[0], this.viewerState.positionGroundHeight, positionScene[2]);
        camera.rotation = new BABYLON.Vector3((90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0), this.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
        //camera.cameraRotation = new BABYLON.Vector2(/* (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0) */ 0, this.viewerState.positionHeading * (Math.PI / 180.0));
        this.camera = camera;
    }

    getBoundsRecursively(node, bounds) {
        if (!bounds) {
            bounds = {minimumWorld: {x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY},
                      maximumWorld: {x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY, z: Number.NEGATIVE_INFINITY}}
        }
        if (node.getBoundingInfo) {
            let minWorld = node.getBoundingInfo().boundingBox.minimumWorld;
            let maxWorld = node.getBoundingInfo().boundingBox.maximumWorld;
            if (bounds.minimumWorld.x > minWorld.x) {bounds.minimumWorld.x = minWorld.x;}
            if (bounds.minimumWorld.y > minWorld.y) {bounds.minimumWorld.y = minWorld.y;}
            if (bounds.minimumWorld.z > minWorld.z) {bounds.minimumWorld.z = minWorld.z;}
            if (bounds.maximumWorld.x < maxWorld.x) {bounds.maximumWorld.x = maxWorld.x;}
            if (bounds.maximumWorld.y < maxWorld.y) {bounds.maximumWorld.y = maxWorld.y;}
            if (bounds.maximumWorld.z < maxWorld.z) {bounds.maximumWorld.z = maxWorld.z;}
        }

        for (let c of node.getChildren()) {
            bounds = this.getBoundsRecursively(c, bounds);
        }
        return bounds;
    }

    /*
    * Find a node within a scene or node recursively.
    * Criteria is a dictionary of key=value pairs. An object will match if any of the pairs matches object's metadata.
    */
    findNode(node, criteria) {
        //console.debug(node);
        if (criteria['_node_name']) {
            let name = node.id.split("/").pop().replaceAll('#', '_');
            if (name === criteria['_node_name']) {
                return node;
            }
        }
        if (node.metadata && node.metadata.gltf && node.metadata.gltf.extras) {
            let metadata = node.metadata.gltf.extras;
            for (let key in criteria) {
                if (metadata[key] === criteria[key]) {
                    return node;
                }
            }
        }
        for (let sn of node.getChildren()) {
            let result = this.findNode(sn, criteria);
            if (result) { return result; }
        }
        return null;
    }

    selectCameraOrbit() {

        let targetCoords = BABYLON.Vector3.Zero();
        if (this.viewerState.selectedMesh) {
            let boundingBox = this.getBoundsRecursively(this.viewerState.selectedMesh);
            //targetCoords = this.viewerState.selectedMesh.absolutePosition;
            let minWorld = boundingBox.minimumWorld;
            let maxWorld = boundingBox.maximumWorld;
            targetCoords = new BABYLON.Vector3((minWorld.x + maxWorld.x) / 2, (minWorld.y + maxWorld.y) / 2, (minWorld.z + maxWorld.z) / 2);
        }

        let distance = 75.0;
        if (this.camera) {
            distance = BABYLON.Vector3.Distance(this.camera.position, targetCoords);

            this.camera.detachControl();
            this.camera.dispose();
        }

        console.debug("Creating orbit camera pointing to: " + targetCoords);

        const camera = new BABYLON.ArcRotateCamera("Camera", -(90 + this.viewerState.positionHeading) * Math.PI / 180.0, this.viewerState.positionTilt * Math.PI / 180.0, distance, targetCoords, this.scene);
        camera.attachControl(this.engine.getRenderingCanvas(), true);
        camera.minZ = 1;
        //camera.maxZ = 2500;  // Automatic? see focusOn()
        camera.lowerRadiusLimit = 15;
        camera.upperRadiusLimit = 1000;
        camera.upperBetaLimit = Math.PI; // /2; // Math.PI / 2 = limit to flat view
        camera.panningSensibility = 1000.0; // 0.5;
        camera.multiTouchPanning = false;
        camera.multiTouchPanAndZoom = false;
        camera.pinchZoom = true;
        camera.useNaturalPinchZoom = true;
        this.camera = camera;
    }


}

export default SceneViewer;
