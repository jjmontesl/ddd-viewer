
import * as BABYLON from 'babylonjs';
import {WaterMaterial} from 'babylonjs-materials';
import 'babylonjs-materials';
import '@babylonjs/core/Animations/animatable';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import proj4 from 'proj4';
//import {register} from 'ol/proj/proj4';
import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';

/// <reference types="suncalc" />
import * as SunCalc from 'suncalc';

import TerrainMaterialWrapper from '@/dddviewer/render/TerrainMaterial.js';
import SkyMaterialWrapper from '@/dddviewer/render/SkyboxMaterial.js';


import LayerManager from '@/dddviewer/layers/LayerManager.js';
import QueueLoader from '@/dddviewer/loading/QueueLoader.js';
import ViewerSequencer from '@/dddviewer/seq/ViewerSequencer.js';


/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

class SceneViewer {

    constructor(viewerState) {

        this.viewerState = viewerState;

        this.engine = null;
        this.scene = null;

        this.camera = null;
        this.walkMode = false;

        this.highlightMeshes = [];
        this.materialHighlight = null;

        this.useSplatMap = true;

        this.layerManager = new LayerManager(this);
        this.queueLoader = new QueueLoader(this);

        this.originShiftWGS84 = [0, 0];
        this.projection = null;

        this.tileGrid = createXYZ({
            extent: extentFromProjection('EPSG:3857'),
            //maxResolution: options.maxResolution,
            //maxZoom: options.maxZoom,
            //minZoom: options.minZoom,
            //tileSize: options.tileSize,
        });

        this.catalog = {};
        this.catalog_materials = {};
        this.instanceRoots = {};

        // Dependencies to not yet loaded objects, in order to process them
        this.depends = [];

        this.ambientColorNight = new BABYLON.Color3(0, 0, 0.3);
        this.ambientColorDay = new BABYLON.Color3(0.70, 0.70, 0.7);

        this.lastDateUpdate = new Date().getTime();

        // TODO: Sequencer would better belong to the app
        this.sequencer = new ViewerSequencer(this);

        this._previousLampPatOn = null;

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

        // Associate a Babylon Engine to it (engine:  canvas, antialiasing, options, adaptToDeviceRatio)
        let engine = new BABYLON.Engine(canvas, true); // , null, true); // , { stencil: true });
        this.engine = engine;

        this.scene = new BABYLON.Scene(engine,  {
            'useGeometryIdsMap': true
        });
        //that.scene = createScene(engine, canvas);

        //this.sceneInstru = null;
        this.sceneInstru = new BABYLON.SceneInstrumentation(that.scene);


        //that.highlightLayer = new BABYLON.HighlightLayer("hl1", that.scene);


        let water = new WaterMaterial("water", that.scene, new BABYLON.Vector2(512, 512));
        //water.backFaceCulling = true;
        //water.bumpTexture = new BABYLON.Texture("/textures/waterbump.png", that.scene);
        water.windForce = 5;
        water.waveHeight = 0.1;
        water.waveSpeed = 100.0;
        water.bumpHeight = 0.1;
        water.waveLength = 0.25;

        water.alpha = 0.7;
        water.transparencyMode = 2;  // ALPHA_BLEND
        water.useSpecularOverAlpha = true;
        water.useReflectionOverAlpha = true;

        water.colorBlendFactor = 0.2;
        //water.addToRenderList(ground);
        this.materialWater = water;

        /*
        that.materialGrass = new BABYLON.StandardMaterial("bawl", that.scene);
        that.textureGrass = new BABYLON.GrassProceduralTexture("textbawl", 256, that.scene);
        that.materialGrass.ambientTexture = that.textureGrass;
        */


        // Environment
        this.envReflectionProbe = null;
        if (this.viewerState.sceneEnvironmentProbe !== null) {
            this.envReflectionProbe = new BABYLON.ReflectionProbe("envReflectionProbe", this.viewerState.sceneEnvironmentProbe, this.scene, true, true, true);
            this.envReflectionProbe.refreshRate = 6;
            this.envReflectionProbe.position = new BABYLON.Vector3(0, 0, 0);

            var pbr = new BABYLON.PBRMaterial('envReflectionTestMaterial', this.scene);
            pbr.reflectionTexture = this.envReflectionProbe.cubeTexture;
            // Force PBR material udpate and show for debugging
            //var sphere = BABYLON.Mesh.CreateSphere("envReflectionTestSphere", 16, 5, this.scene);
            //sphere.position.y = 150;
            //sphere.material = pbr;

            // Note that material needs to be added to the camera custom render targets to be updated

            this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;

        } else {
            //this.scene.createDefaultEnvironment();
            //var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/environment.env", this.scene);
            var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/country.env", this.scene);
            this.scene.environmentTexture = hdrTexture;
        }

        // Skybox
        this.loadSkybox(this.viewerState.sceneSkybox);


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

        // Camera
        this.selectCameraFree();
        //this.selectCameraWalk();
        //this.selectCameraOrbit();


        /*
        // Fog
        //this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        //this.scene.fogDensity = 0.005;  // default is 0.1
        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        this.scene.fogStart = 250.0;
        this.scene.fogEnd = 500.0;
        this.scene.fogColor = new BABYLON.Color3(0.75, 0.75, 0.85);
        */
        /*
        pixels = rp.cubeTexture.readPixels(0,0)
        // i take the first pixel of the reflection probe texture for fog color.
        // since pixels are stored as buffer array, first pixel are first 4 values of array [r,g,b,a....]
        scene.fogColor = new Color3(pixels[0]/255, pixels[1]/255, pixels[2]/255)
        */


        //this.scene.ambientColor = this.ambientColorDay.clone();
        this.scene.ambientColor = new BABYLON.Color3(0, 0, 0);
        //this.scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        /*
        that.lightHemi = new BABYLON.HemisphericLight("lightHemi", new BABYLON.Vector3(-0.5, 1, -1), that.scene);
        that.lightHemi.intensity = 1.15;
        that.lightHemi.diffuse = new BABYLON.Color3(0.95, 0.95, 1);
        that.lightHemi.specular = new BABYLON.Color3(1, 1, 0.95);
        that.lightHemi.groundColor = new BABYLON.Color3(0.95, 1, 0.95);
        */
        that.light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.3, -0.5, 0.5).normalizeToNew(), that.scene);
        that.light.diffuse = new BABYLON.Color3(0.95, 0.95, 1.00);
        that.light.specular = new BABYLON.Color3(1, 1, 0.95);
        that.light.intensity = 2.5;

        /*
        that.light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-0.3, -0.5, -0.5).normalizeToNew(), that.scene);
        that.light.diffuse = new BABYLON.Color3(223 / 255, 242 / 255, 196 / 255);
        that.light.specular = new BABYLON.Color3(1, 1, 0.95);
        that.light2.intensity = 1.5;
        */


        that.shadowGenerator = null;
        if (that.viewerState.sceneShadowsEnabled) {
            that.shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, that.light);
            //that.shadowGenerator.debug = true;
            that.shadowGenerator.shadowMaxZ = 500;
            that.shadowGenerator.autoCalcDepthBounds = true;
            that.shadowGenerator.penumbraDarkness = 0.8;
            that.shadowGenerator.lambda = 0.5;
            //that.shadowGenerator.depthClamp = false;
            //that.shadowGenerator.freezeShadowCastersBoundingInfo = true;
            that.shadowGenerator.splitFrustum();
        }


        this.lensFlareEmitter = new BABYLON.Mesh("lensFlareEmitter", that.scene);
        this.lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", this.lensFlareEmitter, that.scene);
        const flareScale = 0.5;
        var flare00 = new BABYLON.LensFlare(flareScale * 0.2, 0, new BABYLON.Color3(1, 1, 1), "/textures/Flare2.png", this.lensFlareSystem);
        var flare01 = new BABYLON.LensFlare(flareScale * 0.5, 0.2, new BABYLON.Color3(0.5, 0.5, 1), "/textures/flare3.png", this.lensFlareSystem);
        var flare02 = new BABYLON.LensFlare(flareScale * 0.2, 1.0, new BABYLON.Color3(1, 1, 1), "/textures/flare3.png", this.lensFlareSystem);
        var flare03 = new BABYLON.LensFlare(flareScale * 0.4, 0.4, new BABYLON.Color3(1, 0.5, 1), "/textures/flare.png", this.lensFlareSystem);
        var flare04 = new BABYLON.LensFlare(flareScale * 0.1, 0.6, new BABYLON.Color3(1, 1, 1), "/textures/flare3.png", this.lensFlareSystem);
        var flare05 = new BABYLON.LensFlare(flareScale * 0.3, 0.8, new BABYLON.Color3(1, 1, 1), "/textures/Flare2.png", this.lensFlareSystem);

        // Setup lighting, flares, etc.
        this.lightSetupFromDatePos();

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

        this.textureDetailSurfaceImp = new BABYLON.Texture("/textures/SurfaceImperfections12_ddd.png", this.scene);

        this.loadCatalog('/assets/catalog.glb', false);

        this.loadTextures();

        // Show BabylonJS Inspector
        //that.scene.debugLayer.show();

        // Render every frame
        engine.runRenderLoop(() => {
            if (! that.scene) { return; }
            that.update(that.engine.getDeltaTime() / 1000.0);
            that.scene.render();
        });

        // Shaders
        /*
        BABYLON.Effect.ShadersStore["customVertexShader"]= `
            precision highp float;

            // Attributes
            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;

            // Uniforms
            uniform mat4 worldViewProjection;
            uniform float time;

            // Varying
            //varying vec2 vUV;

            void main(void) {
                vec3 p = position;
                p.x = p.x + sin(2.0 * position.y + time);
                p.y = p.y + sin(time + 4.0);
                gl_Position = worldViewProjection * vec4(p, 1.0);

                //vUV = uv;
        }`;
        */

        this.splatmapAtlasTexture = new BABYLON.Texture("/assets/splatmap-textures-atlas-512.png", this.scene,  false, true, BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR); // , BABYLON.Texture.NEAREST_SAMPLINGMODE);
        //this.splatmapAtlasTexture = new BABYLON.Texture("https://raw.githubusercontent.com/RaggarDK/Baby/baby/atlas3.jpg", this.scene);
        //this.splatmapAtlasNormalsTexture = new BABYLON.Texture("/assets/splatmap-textures-atlas-normals-256-fake.png", this.scene);
        this.splatmapAtlasNormalsTexture = new BABYLON.Texture("/assets/splatmap-textures-atlas-normals-512.png", this.scene);


        // Performance
        // Avoid clear calls, as there's always a skybox
        this.scene.autoClear = false; // Color buffer
        this.scene.autoClearDepthAndStencil = false; // Depth and stencil
        this.scene.blockMaterialDirtyMechanism = true;

    }

    loadSkybox(baseUrl) {
        // Remove skybox
        if (this.skybox) {

            this.materialWater.getRenderList.lengh = 0;
            if (this.viewerState.sceneEnvironmentProbe) {
                this.envReflectionProbe.renderList.length = 0;
            }

            this.skybox.dispose();
            this.skybox = null;
        }

        // Set skybox
        if (baseUrl === "@dynamic")  {
            var skybox = BABYLON.Mesh.CreateSphere('skyBox', 30, 3000, this.scene);
            var skyboxMaterial = new SkyMaterialWrapper(this.scene).material;

            skybox.material = skyboxMaterial;
            skybox.infiniteDistance = true;
            skybox.applyFog = false;
            this.skybox = skybox;

        } else if (baseUrl !== null) {

            var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:3000.0}, this.scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(baseUrl, this.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

            skybox.material = skyboxMaterial;
            skybox.infiniteDistance = true;
            skybox.applyFog = false;
            this.skybox = skybox;
        }

        if (this.skybox) {
            this.envReflectionProbe.renderList.push(this.skybox);
            this.materialWater.addToRenderList(this.skybox);
        }

    }

    showFullScreen() {
        this.engine.switchFullscreen(true);
    }

    showDebugView() {
        this.scene.debugLayer.show();
    }

    loadCatalog(filename, loadMaterials) {
        console.debug("Loading catalog.");
        const that = this;
        BABYLON.SceneLoader.ImportMesh(null, filename, '', this.scene, //this.scene,
          // onSuccess
          function(newMeshes, particleSystems, skeletons) {
              //console.log("GLB loaded", newMeshes);
              that.loadCatalogFromMesh(newMeshes[0], loadMaterials);
              newMeshes[0].setParent(null);
              newMeshes[0].setEnabled(false);
              //newMeshes[0].isVisible = false;
              //newMeshes[0].dispose();

              that.processDepends();
          },
          function(event) {
          },
          function(scene, msg, ex) {
              console.debug("Could not load scene catalog: " + filename, ex);
          }
        );
    }

    processDepends() {
        //console.debug("Processing dependencies");
        let dependsCopy = [...this.depends];
        for (let dep of dependsCopy) {
            this.depends = this.depends.filter(item => item !== dep);
            this.processMesh(dep, dep);
        }
    }

    loadCatalogFromMesh(mesh, loadMaterials) {

        if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
            let metadata = mesh.metadata.gltf.extras;

            if (metadata['ddd:instance:key']) {
                this.addMeshToCatalog(metadata['ddd:instance:key'], mesh);
            }

            if (loadMaterials && metadata['ddd:material']) {
                try {
                    this.addMaterialToCatalog(metadata['ddd:material'], mesh);
                } catch (e) {
                    console.debug("Error adding material to catalog: ", mesh, e);
                }
            }
        }

        for (let child of mesh.getChildren()) {
            this.loadCatalogFromMesh(child, loadMaterials);
        }
    }

    addMaterialToCatalog(key, mesh) {
        if (mesh.material) {
            //console.debug(mesh.material);
            if (this.catalog_materials[key]) {
                console.debug("Material already in catalog: " + key)
            } else {
                console.debug("Adding material to catalog: " + key);
                this.catalog_materials[key] = mesh.material;
                let metadata = mesh.metadata.gltf.extras;

                if (metadata['ddd:material'] === 'WaterBasicDaytime') {
                    /*
                    mesh.material.alpha = 0.7;
                    mesh.material.transparencyMode = 2;  // ALPHA_BLEND
                    mesh.material.useSpecularOverAlpha = true;
                    mesh.material.useReflectionOverAlpha = true;
                    mesh.material.bumpTexture = new BABYLON.Texture("/textures/waterbump.png", this.scene);
                    */
                    this.catalog_materials[key] = this.materialWater;

                } else if (metadata['ddd:material'] === 'Water4Advanced') {
                    /*
                    mesh.material.alpha = 0.8;
                    mesh.material.transparencyMode = 2;  // ALPHA_BLEND
                    mesh.material.useSpecularOverAlpha = true;
                    mesh.material.useReflectionOverAlpha = true;
                    mesh.material.bumpTexture = new BABYLON.Texture("/textures/waterbump.png", this.scene);
                    */
                    this.catalog_materials[key] = this.materialWater;

                } else if (mesh.material.albedoTexture) {

                    //mesh.material.specularColor = BABYLON.Color3.Lerp(mesh.material.albedoColor, BABYLON.Color3.White(), 0.2);
                    //mesh.material.albedoColor = BABYLON.Color3.Lerp(mesh.material.albedoColor, BABYLON.Color3.White(), 0.5);
                    //mesh.material.albedoColor = BABYLON.Color3.FromHexString(mesh.metadata.gltf.extras['ddd:material:color']).toLinearSpace();
                    //mesh.material.albedoColor = BABYLON.Color3.FromHexString(mesh.material.albedoColor).toLinearSpace();

                    var uvScale = 0.25;

                    if ((metadata['ddd:material'] === 'Roadline') ||
                        (metadata['ddd:material'] === 'Fence') ||
                        (metadata['ddd:material'] === 'TrafficSigns') ||
                        (metadata['ddd:material'] === 'RoadRailway') ||
                        (metadata['ddd:material'] === 'Flowers Blue') ||
                        (metadata['ddd:material'] === 'Flowers Roses') ||
                        (metadata['ddd:material'] === 'Grass Blade')) {
                        uvScale = 1.0;
                    }
                    if ((metadata['ddd:material'] === 'Fence')) {
                        uvScale = 0.5;
                    }

                    if (uvScale !== 1.0) {
                        mesh.material.albedoTexture.uScale = uvScale;
                        mesh.material.albedoTexture.vScale = uvScale;
                        if (mesh.material.bumpTexture) {
                            mesh.material.bumpTexture.uScale = uvScale;
                            mesh.material.bumpTexture.vScale = uvScale;
                        }
                    }

                    /*
                    if ((metadata['ddd:material'] !== 'Flo') &&
                        (metadata['ddd:material'] !== 'TrafficSigns') &&
                        (metadata['ddd:material'] !== 'RoadRailway') &&
                        (metadata['ddd:material'] !== 'Flowers Blue') &&
                        (metadata['ddd:material'] !== 'Flowers Roses') &&
                        (metadata['ddd:material'] !== 'Grass Blade')) {
                        mesh.material.albedoTexture.uScale = 0.25;
                        mesh.material.albedoTexture.vScale = 0.25;
                        if (mesh.material.bumpTexture) {
                            mesh.material.bumpTexture.uScale = 0.25;
                            mesh.material.bumpTexture.vScale = 0.25;
                        }
                    }
                    */

                    mesh.material.detailMap.texture = this.textureDetailSurfaceImp;
                    mesh.material.detailMap.texture.uScale = 1 / 256;
                    mesh.material.detailMap.texture.vScale = 1 / 256;
                    mesh.material.detailMap.isEnabled = true;
                    mesh.material.detailMap.diffuseBlendLevel = 0.2; // between 0 and 1
                    //mesh.material.detailMap.bumpLevel = 1; // between 0 and 1
                    //mesh.material.detailMap.roughnessBlendLevel = 0.05; // between 0 and 1

                    //mesh.material.environmentIntensity = 0.2;  // This one is needed to avoid saturation due to env

                    mesh.material.freeze();  // Careful: may prevent environment texture change (?)
                }

                if (metadata['zoffset']) {
                    mesh.material.zOffset = metadata['zoffset'];
                }

                //mesh.material.ambientColor = mesh.material.albedoColor; // new BABYLON.Color3(1, 1, 1);

            }
        } else {
            console.debug("No material found in mesh: " + mesh.id + " (key=" + key + ")");
        }
    }

    addMeshToCatalog(key, mesh) {
        if (this.catalog[key]) {
            console.debug("Mesh already in catalog: " + key)
        } else {
            //console.debug("Adding mesh to catalog: " + key);
            this.catalog[key] = mesh;
            mesh.setEnabled(false);
            mesh.parent = null;
        }
    }

    processMesh(root, mesh) {
        //console.debug("Processing mesh: " + mesh.id)

        let rootmd = root.metadata.tileInfo;

        if (!('_splatmapMaterial' in root) && this.useSplatMap) {
            if (('metadata' in mesh) && ('tileCoords' in mesh.metadata)) {
                let coords = root.metadata['tileCoords'];
                console.debug("Creating splat material for: ", coords);

                var splatmapUrl = "http://localhost:8000/cache/ddd_http/17/" + coords[1] + "/" + coords[2] + ".splatmap-16chan-0_15-256.png";
                var splatmapTexture = new BABYLON.Texture(splatmapUrl, this.scene);

                var matwrapper = new TerrainMaterialWrapper(this.scene, splatmapTexture, this.splatmapAtlasTexture, this.splatmapAtlasNormalsTexture);
                root._splatmapMaterial = matwrapper.material;


                let uvScale = [225, 225]; //[225, 225]; // [113.36293971960356 * 2, 112.94475604662343 * 2];
                let bounds = rootmd ? rootmd['tile:bounds_m'] : null;
                if (!!bounds) {
                    //console.debug("Bounds: ", bounds);
                    uvScale = [bounds[2] - bounds[0], bounds[3] - bounds[1]];
                }

                // Seems to work well (+1 +1 / +1 -1)
                root._splatmapMaterial.albedoTexture.uScale = ((1.0 / (uvScale[0])) * (127/128)) ; // + 1
                root._splatmapMaterial.albedoTexture.vScale = ((1.0 / (uvScale[1])) * (127/128)) ; // + 1
                root._splatmapMaterial.albedoTexture.uOffset = 0.5; //  + (1 / uvScale[0]);
                root._splatmapMaterial.albedoTexture.vOffset = 0.5 - (0.5/128); // 1 / root._splatmapMaterial.albedoTexture.getSize().height);
                /*if (mesh.material.bumpTexture) {
                    mesh.material.bumpTexture.uScale = 1.0 / uvScale[0];
                    mesh.material.bumpTexture.vScale = 1.0 / uvScale[1];
                    mesh.material.bumpTexture.uOffset = 0.5;
                    mesh.material.bumpTexture.vOffset = 0.5;
                }*/

                root._splatmapMaterial.freeze();

            }
        }

        var replaced = false;
        if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {

            let metadata = mesh.metadata.gltf.extras;

            mesh.isBlocker = true;

            if (metadata['ddd:material'] && !('ddd:text' in metadata)) {
                let key = metadata['ddd:material'];
                let mat = this.catalog_materials[key];

                if (this.useSplatMap && metadata['ddd:layer'] === "0" &&
                    (metadata['ddd:material'] === 'Park' || metadata['ddd:material'] === 'Grass' || metadata['ddd:material'] === 'Terrain' ||
                     metadata['ddd:material'] === 'Ground' || metadata['ddd:material'] === 'Dirt' || metadata['ddd:material'] === 'Garden' ||
                     metadata['ddd:material'] === 'Forest' || metadata['ddd:material'] === 'Sand' || metadata['ddd:material'] === 'Rock' ||
                     (metadata['ddd:material'] === 'WayPedestrian' && metadata['ddd:area:type'] !== 'stairs') ||
                     metadata['ddd:material'] === 'Asphalt')) {

                    mesh.material = root._splatmapMaterial;

                } else if (mat) {

                    if (mesh.material && mesh.material !== mat) {
                        mesh.material.dispose();
                    }
                    mesh.material = mat;

                } else {
                    //console.debug("Material not found in catalog: " + key);
                    // TODO: Will never happen if not showing materials (dependencies should be to the particular instance or material)
                    this.depends.push(root);
                }
            }


            if (metadata['ddd:light:color']) {
                replaced = true;
                /*
                var light = new BABYLON.PointLight("light_" + mesh.id, mesh.position, this.scene);
                light.parent = mesh.parent;
                light.position = mesh.position;
                light.position.y = light.position.z + 1;
                light.intensity = 20;
                light.diffuse = new BABYLON.Color3(1, 0, 0);
                light.specular = new BABYLON.Color3(0, 1, 0);
                */

                mesh.dispose();

            } else if (metadata['ddd:text']) {

                let newMesh = null;
                /*
                // TODO: requires fixing Marker export form DDD. Also reuse materials.
                newMesh = BABYLON.MeshBuilder.CreatePlane('text_' + mesh.id, { size: 2.4, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, this.scene);
                newMesh.parent = null;
                newMesh.parent = mesh.parent; // .parent;
                newMesh.scaling = mesh.scaling.clone();
                newMesh.rotationQuaternion = mesh.rotationQuaternion.clone();
                newMesh.position = mesh.position.clone();

                newMesh.rotate(BABYLON.Vector3.Right(), Math.PI / 2.0, BABYLON.Space.LOCAL);
                newMesh.scaling.y *= 0.35;

                //Create dynamic texture
                var texture = new BABYLON.DynamicTexture("dynamicTexture_text_" + mesh.id , {width:256, height:128}, this.scene);
                //var textureContext = texture.getContext();
                var font = "bold 18px serif";
                let text = metadata['ddd:text'];
                texture.drawText(text, 128.0 - (text.length * 3), 60, font, "blue", "transparent", true, true);

                var material = new BABYLON.StandardMaterial("Mat" + mesh.id, this.scene);
                material.diffuseTexture = texture;
                material.diffuseTexture.hasAlpha = true;
                material.useAlphaFromDiffuseTexture = true;
                material.transparencyMode = 1;  // ALPHA_TEST
                newMesh.material = material;

                newMesh.isPickable = false;
                //newMesh.metadata = {gltf: {extras: metadata}};  // Doesn't seem to work and/or freezes the app
                //delete newMesh.metadata['ddd:text'];
                */

                mesh.dispose();
                mesh = newMesh;

            } else if (metadata['ddd:instance:key']) {
                replaced = true;
                let key = metadata['ddd:instance:key'];
                if (this.catalog[key]) {

                    //this.instanceAsNode(root, key, mesh);
                    this.instanceAsThinInstance(root, key, mesh);

                } else {
                    // Instance not found. Mark this root for re processing and exit.
                    //console.debug("Instance key not found in catalog: : " + key);
                    this.depends.push(root);
                    return;
                }
            }
        }

        //mesh.occlusionType = BABYLON.AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;

        if (mesh) {  // && !replaced

            mesh.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
            mesh.freezeWorldMatrix();
            //if (mesh.material) { mesh.material.needDepthPrePass = true; }  // causes some objects with textures to show black

            for (let children of mesh.getChildren()) {
                this.processMesh(root, children);
            }
        }
    }

    instanceAsThinInstance(root, key, node) {

        let instance = this.catalog[key];
        let meshes = instance.getChildMeshes();

        for (let mesh of meshes) {

            if (mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
                let metadata = mesh.metadata.gltf.extras;
                if (metadata['ddd:light:color']) {
                    // TODO: include the child instance
                    continue;
                }
            }

            // Get root
            let instanceRootKey = root.id + "_" + key + "_" + mesh.id; // root.id + "_" +  // TODO! do not clone but keep groups!
            let meshInstanceRoot = this.instanceRoots[instanceRootKey];
            if (!meshInstanceRoot) {
                //console.debug("Creating instanceroot for: " + instanceRootKey);
                instance.setEnabled(true);
                meshInstanceRoot = mesh.clone(instanceRootKey, null, true);
                meshInstanceRoot = meshInstanceRoot.makeGeometryUnique();  // Can we do this without cloning geometry? do thin instances work that way?
                //meshInstanceRoot.metadata.gltf.extras['ddd:instance:key'] = "_MESH_INSTANCE_ROOT";  // WARN:seems this extras are being shared among instances
                meshInstanceRoot.toLeftHanded();
                //meshInstanceRoot.rotate(BABYLON.Vector3.Up(), Math.PI / 2);
                //meshInstanceRoot.scaling = new BABYLON.Vector3(1, 1, -1);
                this.instanceRoots[instanceRootKey] = meshInstanceRoot;
                meshInstanceRoot.parent = root;
                //meshInstanceRoot.position = root.computeWorldMatrix(true);  // Seems to cause problems, but should not :? (freezing may be involved)

                this.processMesh(meshInstanceRoot, meshInstanceRoot);

                // Enable shadows for the instances if shadows are set
                if (this.shadowGenerator) {
                    this.shadowGenerator.getShadowMap().renderList.push(meshInstanceRoot);
                }

                //meshInstanceRoot.setEnabled(false);
                meshInstanceRoot.addLODLevel(200, null);



                instance.setEnabled(false);
                //instance.dispose();
            }

            // Transform
            /*
            let localPos = mesh.position;
            let localRot = mesh.rotationQuaternion;
            let localScaling = mesh.scaling;
            localScaling.x = -1 * localScaling.x;
            var meshMatrix = BABYLON.Matrix.Compose(localScaling, localRot, localPos);
            */

            //var adaptMatrix = BABYLON.Matrix.Compose(new BABYLON.Vector3(1, 1, -1), [0, 1, 0, 0], [0, 0, 0]);

            let scaleMatrix = BABYLON.Matrix.Compose(new BABYLON.Vector3(1, 1, -1), new BABYLON.Quaternion(0, 0, 0, 0), new BABYLON.Vector3(0, 0, 0)); //BABYLON.Matrix.Scaling(-1, 1, 1);

            let nodeMatrix = node.computeWorldMatrix(true);
            let meshInstanceRootMatrix = meshInstanceRoot.computeWorldMatrix(true);
            //let matrix = adaptMatrix.multiply(nodeMatrix); // meshMatrix.multiply(nodeMatrix);
            let matrix = scaleMatrix.multiply(nodeMatrix);
            matrix = matrix.multiply(BABYLON.Matrix.Invert(meshInstanceRootMatrix));
            //console.debug("Creating instance: " + meshInstanceRoot.id);
            var idx = meshInstanceRoot.thinInstanceAdd(matrix);

            //let tmpcopy = meshInstanceRoot.clone();
            //tmpcopy.position = localPos;
            //tmpcopy.rotationQuaternion = localRot;
            //tmpcopy.parent = meshInstanceRoot;

        }

        node.dispose();

    }

    instanceAsNode(root, key, mesh) {
        //console.debug("Replacing mesh: " + key);
        let newMesh = new BABYLON.TransformNode(mesh.id + "_instance", this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
        //let newMesh = mesh;
        //newMesh.geometry = null;
        newMesh.parent = mesh.parent;
        newMesh.position = mesh.position;
        newMesh.rotationQuaternion = mesh.rotationQuaternion;
        newMesh.scaling = mesh.scaling;
        //newMesh.absoluteScaling = mesh.absoluteScaling;
        /*for (let cc of mesh.getChildren()) {
            cc.parent = null;
            cc.dispose();
        }*/
        if (!newMesh.metadata) { newMesh.metadata = {}; }
        if (mesh.metadata && mesh.metadata.gltf) {
            newMesh.metadata.gltf = mesh.metadata.gltf;
            //newMesh.metadata.gltf.extras['ddd:instance:key'] = null;
        }
        mesh.dispose();
        this.catalog[key].setEnabled(true);
        const instance = this.catalog[key].clone(); // createInstance(mesh.id + "_instanced");
        this.catalog[key].setEnabled(false);
        instance.metadata.gltf.extras['ddd:instance:key'] = null;
        instance.id = mesh.id + "_clone";
        //instance.isVisible = true;
        instance.parent = newMesh;
        newMesh.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2, BABYLON.Space.LOCAL);
        instance.setEnabled(true);
        mesh = newMesh;
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

    update(deltaTime) {

        let positionWGS84 = this.positionWGS84();
        if (positionWGS84) {
            this.viewerState.positionWGS84 = positionWGS84;

            this.viewerState.positionTileZoomLevel = 17;
            if (this.viewerState.positionGroundHeight !== null && this.viewerState.positionGroundHeight < 50) {
                this.viewerState.positionTileZoomLevel = 18;
            }

            this.updateElevation();
            const terrainElevation = this.viewerState.positionTerrainElevation;

            // Fix viewer to floor
            if (this.walkMode) {
                if (terrainElevation !== null) {
                    this.camera.position.y = terrainElevation + 3.0; // 3.0;
                }
            } else {
                if (terrainElevation && this.camera.position.y < (terrainElevation + 1.0)) {
                    this.camera.position.y = terrainElevation + 1.0;
                }
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
        positionScene = [positionScene[0], positionScene[1], positionScene[2]];  // Copy array
        this.viewerState.positionScene = positionScene;

        this.sequencer.update(deltaTime);
        this.layerManager.update(deltaTime);

        this.viewerState.sceneFPS = this.engine.getFps().toFixed(1);
        this.viewerState.sceneDrawCalls = this.sceneInstru ? this.sceneInstru.drawCallsCounter.current.toString() : null;

        // Run time
        // TODO: this currently requires a minimum elapsed time so Date.setSeconds work. This approach accumulates error.
        const updateInterval = 100; // 5000;
        const maxUpdateElapsed = 2000;  // 2 sec
        if (true) {
            var currentDateUpdate = new Date().getTime();

            if ((currentDateUpdate - this.lastDateUpdate) > updateInterval) {
                var updateElapsed = (currentDateUpdate - this.lastDateUpdate);
                if (updateElapsed > maxUpdateElapsed) { updateElapsed = maxUpdateElapsed; }
                var scaledElapsed = (updateElapsed / 1000) * (24 * 2);  // 24 * 2 = 48x faster (1 day = 30 min)
                if (this.viewerState.positionDate.getHours() < 5) { scaledElapsed *= 3; }  // Faster pace at night
                this.viewerState.positionDate.setSeconds(this.viewerState.positionDate.getSeconds() + scaledElapsed);

                this.lastDateUpdate = currentDateUpdate;
                this.lightSetupFromDatePos();
            }

        }

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
      let scenePos = this.camera.position.asArray();
      let wgs84Pos = this.sceneToWGS84([scenePos[0], scenePos[1], scenePos[2]]);
      return wgs84Pos;
      /*
      const extent = this.map.getView().calculateExtent(this.map.getSize());
      let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
      */
    }

    parsePositionString(posString) {
        //console.debug("Parsing: " + posString);

        let result = {};

        try {
            // Parse at location
            //http://localhost:8080/maps/@42.1354407,-0.4126472,17.0z
            let href = posString;
            const regexp = /.*@([0-9.\-]+),([0-9.\-]+)((,(([0-9.\-]+)[ayhtz]))*).*/;
            let matches = href.match(regexp);
            //console.debug(matches);

            if (matches.length >= 3) {
                result.positionWGS84 = [parseFloat(matches[2]),parseFloat(matches[1])];
            }
            if (matches.length >= 4) {
                for (let match of matches[3].split(",")) {
                    if (match === "") { continue; }
                    let value = parseFloat(match.slice(0, -1));
                    let code = match.slice(-1);
                    if (code === 'z') {
                        result.positionTileZoomLevel = value;
                    } else if (code === 'a') {
                        result.positionGroundHeight = value;
                    } else if (code === 'h') {
                        result.positionHeading = value;
                    } else if (code === 't') {
                        result.positionTilt = value;
                    }
                    //console.debug(value, code);
                }
            }
        } catch(e) {
            console.debug("Error parsing location from href: " + e);
        }

        //let positionWgs84 = this.getViewerState().positionWGS84;
        return result;
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
        let groundHeight = this.viewerState.positionGroundHeight;
        if (groundHeight === null) {
            //return this.camera.position.y;
            return null;
        }

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

   updateElevation() {

        //const ray = new BABYLON.Ray(this.camera.position, new BABYLON.Vector3(0, -1, 0));
        const ray = new BABYLON.Ray(new BABYLON.Vector3(this.camera.position.x, -100.0, this.camera.position.z), new BABYLON.Vector3(0, 1, 0), 3000.0);
        const pickResult = this.scene.pickWithRay(ray);
        if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {

            if (pickResult.pickedMesh.metadata && pickResult.pickedMesh.metadata.gltf && pickResult.pickedMesh.metadata.gltf.extras && pickResult.pickedMesh.metadata.gltf.extras['osm:name']) {
                this.viewerState.positionName = pickResult.pickedMesh.metadata.gltf.extras['osm:name'];
            } else {
                this.viewerState.positionName = null;
            }

            let terrainElevation = (pickResult.distance - 100.0);
            this.viewerState.positionTerrainElevation = terrainElevation;
            this.viewerState.positionGroundHeight = this.camera.position.y - terrainElevation;
        } else {
            //this.viewerState.positionTerrainElevation = null;
        }

    }

    /*
    positionGroundHeight() {
        //const ray = new BABYLON.Ray(this.camera.position, new BABYLON.Vector3(0, -1, 0));
        const ray = new BABYLON.Ray(new BABYLON.Vector3(this.camera.position.x, -100.0, this.camera.position.z), new BABYLON.Vector3(0, 1, 0), 3000.0);
        const pickResult = this.scene.pickWithRay(ray);
        if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {
            //console.debug(pickResult.pickedMesh.id);
            return this.camera.position.y - (pickResult.distance - 100.0);
        } else {
            return null;
        }
    }

    positionTerrainElevation() {
        //const ray = new BABYLON.Ray(this.camera.position, new BABYLON.Vector3(0, -1, 0));
        const ray = new BABYLON.Ray(new BABYLON.Vector3(this.camera.position.x, -100.0, this.camera.position.z), new BABYLON.Vector3(0, 1, 0), 3000.0);
        const pickResult = this.scene.pickWithRay(ray);
        if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {

            if (pickResult.pickedMesh.metadata && pickResult.pickedMesh.metadata.gltf && pickResult.pickedMesh.metadata.gltf.extras && pickResult.pickedMesh.metadata.gltf.extras['osm:name']) {
                this.viewerState.positionName = pickResult.pickedMesh.metadata.gltf.extras['osm:name'];
            } else {
                this.viewerState.positionName = null;
            }

            return (pickResult.distance - 100.0);
        } else {
            return null;
        }
    }
    */

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
            this.viewerState.sceneSelectedMeshId = null;
        }
    }

    selectMesh(mesh) {

        this.deselectMesh();

        if (mesh) {
            this.viewerState.selectedMesh = mesh;
            this.viewerState.sceneSelectedMeshId = mesh.id;
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
        if (criteria['_node_name'] && node.id) {
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

    selectCameraFree() {
        if (this.camera) {
            this.camera.customRenderTargets = [];
            this.camera.detachControl();
            this.camera.dispose();
        }

        //console.debug("Creating free camera.");
        this.walkMode = false;

        const camera = new BABYLON.UniversalCamera("Camera", BABYLON.Vector3.Zero(), this.scene);
        camera.minZ = 1;
        camera.maxZ = 4500;
        //camera.touchMoveSensibility = 0.01;
        camera.touchAngularSensibility = 500.0;
        camera.angularSensibility = 500.0;
        //camera.inertia = 0.10;
        camera.inertia = 0.5;
        camera.keysUp += [87];
        camera.keysDown += [83];
        camera.keysLeft += [65];
        camera.keysRight += [68];
        camera.keysUpward += [81];
        camera.keysDownward += [69];
        camera.attachControl(this.engine.getRenderingCanvas(), true);
        camera.fov = 40.0 * (Math.PI / 180.0);  // 35.0 might be GM, 45.8... is default  // 35
        let positionScene = this.wgs84ToScene(this.viewerState.positionWGS84);
        camera.position = new BABYLON.Vector3(positionScene[0], this.viewerState.positionGroundHeight + this.viewerState.positionTerrainElevation + 1, positionScene[2]);
        camera.rotation = new BABYLON.Vector3((90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0), this.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
        //camera.cameraRotation = new BABYLON.Vector2(/* (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0) */ 0, this.viewerState.positionHeading * (Math.PI / 180.0));
        this.camera = camera;
        this.setMoveSpeed(this.viewerState.sceneMoveSpeed);

        // Postprocess
        /*
        // The default pipeline applies other settings, we'd better off using Bloom independently if possible
        // Also note this is tied to the camera, and thus if used, this should be updated when the camera changes
        var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, this.scene, [this.camera]);
        defaultPipeline.bloomEnabled = true;
        defaultPipeline.fxaaEnabled = true;
        defaultPipeline.bloomWeight = 0.5;
        defaultPipeline.cameraFov = camera.fov;
        defaultPipeline.imageProcessing.toneMappingEnabled = true;
        */


        //var postProcessHighlights = new BABYLON.HighlightsPostProcess("highlights", 0.1, camera);
        //var postProcessTonemap = new BABYLON.TonemapPostProcess("tonemap", BABYLON.TonemappingOperator.Hable, 1.2, camera);

        // See: https://doc.babylonjs.com/divingDeeper/postProcesses/postProcessRenderPipeline
        //var effectBloom = new BABYLON.BloomEffect("bloom", 1.0, 0.5, 5.0, 1.2);
        //var effectDepthOfField =

        /*
        var curve = new BABYLON.ColorCurves();
        curve.globalHue = 0;
        curve.globalDensity = 80;
        curve.globalSaturation = 5;
        curve.highlightsHue 0;
        curve.highlightsDensity = 80;
        curve.highlightsSaturation = 40;
        curve.shadowsHue = 0;
        curve.shadowsDensity = 80;
        curve.shadowsSaturation = 40;
        this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
        this.scene.imageProcessingConfiguration.colorCurves = curve;
        var postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera);
        */

        this.updateRenderTargets();
    }

    selectCameraWalk() {
        this.selectCameraFree();
        this.walkMode = true;
        this.camera.inertia = 0.0;
        this.setMoveSpeed(this.viewerState.sceneMoveSpeed);
    }

    selectCameraOrbit() {

        this.walkMode = false;

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

            this.camera.customRenderTargets = [];

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
        camera.panningSensibility = 50.0; // 0.5;
        camera.angularSensibility = 50.0;
        //camera.inertia = 0.10;
        camera.multiTouchPanning = false;
        camera.multiTouchPanAndZoom = false;
        camera.pinchZoom = true;
        camera.useNaturalPinchZoom = true;
        camera.fov = 35.0 * (Math.PI / 180.0);
        this.camera = camera;

        this.updateRenderTargets();
    }


    updateRenderTargets() {
        if (this.envReflectionProbe) {
            this.camera.customRenderTargets.push(this.envReflectionProbe.cubeTexture);
        }
    }

    groundTextureLayerSetKey(key) {

          this.viewerState.sceneGroundTextureOverride = key;

          let url = null;
          const layers = {
              'osm': {text: 'OpenStreetMap', url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"},
              'es-pnoa': {text: 'ES - PNOA (Orthophotos)', url: "http://localhost:8090/wmts/ign_ortho/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg"},
          }
          if (layers[key]) {
              url = layers[key].url;
          }
          this.layerManager.layers['ddd-osm-3d'].groundTextureLayerSetUrl(url);
      }

    setMoveSpeed(speed) {
        this.viewerState.sceneMoveSpeed = speed;
        this.camera.speed = speed;
    }

    cycleMoveSpeed() {
          if (this.viewerState.sceneMoveSpeed < 5.0) {
              this.setMoveSpeed(5.0);
          } else if (this.viewerState.sceneMoveSpeed < 10.0) {
              this.setMoveSpeed(10.0);
          } else {
              this.setMoveSpeed(2.0);
          }
    }

    lightSetupFromDatePos() {

        //this.envReflectionProbe.update(); // = new BABYLON.ReflectionProbe("envReflectionProbe", 128, this.scene, true, true, true)
        //this.envReflectionProbe.renderList.push(this.skyBox);
        //this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;

        //console.debug(this.envReflectionProbe.cubeTexture.readPixels(0, 0));

        var times = SunCalc.getTimes(this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);

        var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
        var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

        // get position of the sun (azimuth and altitude) at today's sunrise
        /*
        var sunrisePos = SunCalc.getPosition(times.sunrise, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
        var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;

        var sunsetSunPos = SunCalc.getPosition(times.sunset, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
        var sunsetAzimuth = sunsetPos.azimuth * 180 / Math.PI;
        */

        var currentSunPos = SunCalc.getPosition(this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0], this.viewerState.positionScene[1]);
        var currentMoonPos = SunCalc.getMoonPosition(this.viewerState.positionDate, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
        //var crrentMoonIlum = SunCalc.getMoonIllumination(this.viewerState.positionDate);

        //var currentPos = currentSunPos.altitude > 0 ? currentSunPos : currentMoonPos;

        //var currentElevation = currentPos.altitude * 180 / Math.PI;
        //var currentAzimuth = currentPos.azimuth * 180 / Math.PI;
        //console.debug("Sun azimuth: " + currentAzimuth + " ele: " + currentElevation + " Date: " + this.viewerState.positionDate + " Sunrise: " + sunriseStr + " azimuth: " + sunriseAzimuth + " Sunset: " + sunsetStr + " azimuth: " + sunsetAzimuth);

        let altitudeLessHorizonAtmAprox = (currentSunPos.altitude + 0.25) / (Math.PI + 0.25) * Math.PI; // 0.25~15rad
        var sunlightAmountNorm = Math.sin(altitudeLessHorizonAtmAprox);
        if (sunlightAmountNorm < 0) { sunlightAmountNorm = 0; }
        sunlightAmountNorm = 1 - Math.pow(1 - sunlightAmountNorm, 4);

        //let lightAltitude = altitudeLessHorizonAtmAprox >= 0 && altitudeLessHorizonAtmAprox < Math.PI ? altitudeLessHorizonAtmAprox : Math.PI - altitudeLessHorizonAtmAprox;
        var lightRot = BABYLON.Quaternion.FromEulerAngles(currentSunPos.altitude, currentSunPos.azimuth, 0);  // Use moon
        var lightSunAndFlareRot = BABYLON.Quaternion.FromEulerAngles(currentSunPos.altitude, currentSunPos.azimuth, 0);

        //this.light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.3, -0.5, 0.5).normalizeToNew(), this.scene);
        //this.light.diffuse = new BABYLON.Color3(0.95, 0.95, 1.00);
        //this.light.specular = new BABYLON.Color3(1, 1, 0.95);
        const minLightDay = 0.0;
        const maxLightDay = 3.0;

        // Set light dir and intensity
        BABYLON.Vector3.Forward().rotateByQuaternionToRef(lightRot, this.light.direction);
        var lightIntensity = minLightDay + (maxLightDay - minLightDay) * sunlightAmountNorm;
        //console.debug("Sunlight amount norm: " + sunlightAmountNorm + " lightIntensity: " + lightIntensity);
        this.light.intensity = lightIntensity;


        //this.scene.environmentTexture.level = 0; // 0.1 + sunlightAmountNorm; // = hdrTexture;
        //BABYLON.Color3.LerpToRef(this.ambientColorNight, this.ambientColorDay, sunlightAmountNorm, this.scene.ambientColor);

        if (this.skybox && this.skybox.material && this.skybox.material.reflectionTexture) {
            this.skybox.material.reflectionTexture.level = 0.1 + sunlightAmountNorm;
            this.skybox.rotation.y = currentSunPos.azimuth - (19 * (Math.PI / 180.0));
        }

        if (this.skybox) {
            var shaderMaterial = this.scene.getMaterialByName("skyShader");
            if (shaderMaterial) {
                shaderMaterial.setFloat("time", (this.viewerState.positionDate.getTime() % (100000000.0)) / 500000.0);
                if (currentSunPos.altitude > 0) {
                    shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
                } else if (currentMoonPos.altitude > 0) {
                    //shaderMaterial.setFloat("suny", -Math.sin(currentMoonPos.altitude));
                    shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
                } else {
                    //shaderMaterial.setFloat("suny", 0);
                    shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
                }
                shaderMaterial.setFloat("sunx", (currentSunPos.azimuth - (Math.PI / 2.0)) / Math.PI);
            }
        }


        BABYLON.Vector3.Forward().rotateByQuaternionToRef(lightSunAndFlareRot, this.lensFlareEmitter.position);
        this.lensFlareEmitter.position.scaleInPlace(-1400.0);
        this.lensFlareEmitter.position.addInPlace(this.camera.position);
        this.lensFlareSystem.setEmitter(this.lensFlareEmitter);

        var flareEnabled = currentSunPos.altitude > 0;
        if (this.lensFlareSystem.isEnabled !== flareEnabled) {
            this.lensFlareSystem.isEnabled = flareEnabled;
        }

        //console.debug(this.scene.ambientColor);

        // Lamps
        if ('LightLampOff' in this.catalog_materials) {
            let lampMatOn = sunlightAmountNorm > 0.2;  // 0.2 is more logical, 0.1 exagerates the change
            let lampMat = this.catalog_materials['LightLampOff'];
            if (lampMatOn !== this._previousLampPatOn) {
                this._previousLampPatOn = lampMatOn;
                lampMat.unfreeze();
                if (lampMatOn) {
                    lampMat.emissiveColor = BABYLON.Color3.Black();
                } else {
                    lampMat.emissiveColor = new BABYLON.Color3(250 / 255, 244 / 255, 192 / 255);
                }
                //lampMat.freeze();
            }

        }


    }

    sceneShadowsSetEnabled(value) {
        this.viewerState.sceneShadowsEnabled = value;
        localStorage.setItem('dddSceneShadowsEnabled', value);
        alert('Reload the viewer for changes to take effect.');
    }

    /**
    */
    loadTextures() {
        if (this.viewerState.sceneTextureSet !== null) {
            this.loadCatalog('/assets/catalog_materials-' + this.viewerState.sceneTextureSet + '.glb', true);
        }
    }

    sceneTextureSet(value) {
        this.viewerState.sceneTextureSet = value;
        localStorage.setItem('dddSceneTextureSet', JSON.stringify(value));

        if (value !== null) {
            this.loadTextures();
        }
        alert('Changes will apply when the app is reloaded.');
    }

}

export default SceneViewer;
