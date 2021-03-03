
import * as BABYLON from 'babylonjs';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
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

        console.debug(that.viewerState);
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

        const camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), that.scene);
        camera.minZ = 1;
        camera.maxZ = 4500;
        camera.keysUp += [87];
        camera.keysDown += [83];
        camera.keysLeft += [65];
        camera.keysRight += [68];
        camera.attachControl(canvas, true);
        camera.position = new BABYLON.Vector3(0, 750, 0);
        camera.cameraRotation = new BABYLON.Vector2(Math.PI * 0.495, 0);
        that.camera = camera;

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
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", that.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;

        /*
        let water = new BABYLON.WaterMaterial("water", that.scene, new BABYLON.Vector2(1024, 1024));
        water.backFaceCulling = true;
        water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);
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


}

export default SceneViewer;
