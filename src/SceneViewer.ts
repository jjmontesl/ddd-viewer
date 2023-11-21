/*
 * DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
 * Copyright 2021 Jose Juan Montes and Contributors
 * MIT License (see LICENSE file)
 */

/* eslint-disable @typescript-eslint/no-inferrable-types */

//import { GLTF2 } from "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/glTF";

import {
    AbstractMesh,
    ArcRotateCamera,
    BaseTexture,
    BloomEffect,
    BoundingInfo,
    Camera,
    CascadedShadowGenerator,
    Color3,
    ColorCurves,
    CubeTexture,
    DefaultRenderingPipeline,
    DirectionalLight,
    DynamicTexture,
    Engine,
    FloatArray,
    ImageProcessingPostProcess,
    IndicesArray,
    LensFlare,
    LensFlareSystem,
    LensRenderingPipeline,
    Material,
    Matrix,
    Mesh,
    MeshBuilder,
    NodeMaterial,
    PBRBaseMaterial,
    PBRMaterial,
    PickingInfo,
    PointLight,
    PostProcessRenderEffect,
    PostProcessRenderPipeline,
    Quaternion,
    Ray,
    ReflectionProbe,
    Scene,
    SceneInstrumentation,
    SceneLoader,
    SceneOptions,
    ScreenSpaceReflectionPostProcess,
    ShaderMaterial,
    Space,
    StandardMaterial,
    TargetCamera,
    Texture,
    TransformNode,
    UniversalCamera,
    Vector2,
    Vector3,
    Vector4,
    VertexBuffer,
} from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials";

import { Coordinate } from "ol/coordinate";
import * as extent from "ol/extent";
import { createXYZ, extentFromProjection } from "ol/tilegrid";
import TileGrid from "ol/tilegrid/TileGrid";
//import {register} from 'ol/proj/proj4';
import { transform } from "ol/proj";

import * as proj4 from "proj4";
import SunCalc from "suncalc";

import { LayerManager } from "./layers/LayerManager";
import { QueueLoader } from "./loading/QueueLoader";
import { ViewerProcessManager } from "./process/ViewerProcessManager";
import { SkyMaterialWrapper } from "./render/materials/SkyboxMaterial";
import { TerrainMaterialWrapper } from "./render/materials/TerrainMaterial";
import { TextMaterialWrapper } from "./render/materials/TextMaterial";
import { ScenePosition } from "./core/ScenePosition";
import { ViewerSequencer } from "./process/sequencer/ViewerSequencer";
import { ViewerState } from "./ViewerState";
import { DDDViewerConfig } from "./DDDViewerConfig";
import { GeoTile3DLayer } from "./layers/GeoTile3DLayer";
import { DDDObjectRef } from "./core/DDDObjectRef";
import { BaseCameraController } from "./camera/BaseCameraController";
import { FreeCameraController } from "./camera/FreeCameraController";

/**
 * This is the main DDDViewer library entry point. Represents a DDDViewer instance.
 */
class SceneViewer {
    viewerState: ViewerState;

    engine: Engine;
    scene: Scene;
    camera: Camera;
    sceneInstru: SceneInstrumentation | null = null;

    canvas: HTMLCanvasElement;
    element: HTMLElement;

    cameraController: BaseCameraController | null = null;

    sequencer: ViewerSequencer;
    processes: ViewerProcessManager;

    highlightMeshes: Mesh[] = [];
    //materialHighlight: Material | null = null;
    materialHighlight: StandardMaterial | null = null;

    //walkMode: boolean = false;

    useSplatMap: boolean = false;

    layerManager: LayerManager;
    queueLoader: QueueLoader;

    originShiftWGS84: number[];
    //projection: proj4.InterfaceProjection;
    projection: proj4.Converter;

    tileGrid: TileGrid;

    catalog: { [key: string]: Mesh };
    catalog_materials: { [key: string]: Material };
    instanceRoots: { [key: string]: Mesh };
    depends: Mesh[];

    ambientColorNight: Color3 = new Color3(0, 0, 0.1);
    ambientColorDay: Color3 = new Color3(0.7, 0.7, 0.7);

    colorLightLamp: Color3 = new Color3(250 / 255, 244 / 255, 192 / 255);
    colorLightRed: Color3 = new Color3(512 / 255, 0 / 255, 0 / 255);
    colorLightGreen: Color3 = new Color3(50 / 255, 512 / 255, 50 / 255);
    colorLightOrange: Color3 = new Color3(255 / 255, 157 / 255, 0 / 255);

    lastDateUpdate: number = new Date().getTime();

    selectedMesh: Mesh | null = null;
    sceneSelectedMeshId: string | null = null;
    selectedObject: DDDObjectRef | null = null;

    materialWater: Material | null = null; // WaterMaterial | null = null;
    materialOcean: NodeMaterial | null = null;
    materialText: Material | null = null;
    materialFlare: Material | null = null;

    baseEnvironmentIntensity: number = 1.0;

    envReflectionProbe: ReflectionProbe | null = null;
    light: DirectionalLight | null = null;
    shadowGenerator: CascadedShadowGenerator | null = null;
    lensFlareSystem: LensFlareSystem | null = null;
    textureDetailSurfaceImp: Texture | null = null;
    skybox: Mesh | null = null;

    splatmapAtlasTexture: Texture | null = null;
    splatmapAtlasNormalsTexture: Texture | null = null;

    _previousLampPatOn: boolean | null = null;
    _geolocationWatchId: string | null = null;
    _decimator: number = 0;

    /**
   * Constructs a new DDDViewer instance, and mounts it on the given HTMLCanvasElement.
   * @param canvas
   * @param viewerState
   */
    constructor(
        canvas: HTMLCanvasElement,
        dddConfig: DDDViewerConfig | null = null,
    ) {
    /*
        // Accept selector for canvas
        if (canvas instanceof String) {
            canvas = document.getElementById('ddd-scene');
        }
        */

        // Resolve default properties
        if (dddConfig == null) {
            dddConfig = new DDDViewerConfig();
        } else {
            dddConfig = Object.assign(new DDDViewerConfig(), dddConfig);
        }

        this.viewerState = new ViewerState(dddConfig);

        this.canvas = canvas;
        this.element = canvas.parentElement!;

        this.layerManager = new LayerManager(this);
        this.queueLoader = new QueueLoader(this);

        this.originShiftWGS84 = [ 0, 0 ];
        this.projection = proj4.default("EPSG:4326");

        this.tileGrid = createXYZ({
            extent: extentFromProjection("EPSG:3857"),
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

        this.lastDateUpdate = new Date().getTime();

        this.processes = new ViewerProcessManager(this);
        this.sequencer = new ViewerSequencer(this);

        // Associate a Babylon Engine to it (engine:  canvas, antialiasing, options, adaptToDeviceRatio)
        this.engine = new Engine(canvas, true); // , null, true); // , { stencil: true });

        // Note: useGeometryIdsMap=true seems to help only when there are already too many objects, but performance is (slightly) better without it if object count is low
        this.scene = new Scene(this.engine, {
            useGeometryIdsMap: true,
        } as SceneOptions);
        this.camera = this.initCamera();

        //that.scene = createScene(engine, canvas);
        //this.scene.freezeActiveMeshes(true);  // affects too many things, causes wrong behavior (skybox, etc)
        //this.octree = null;

        this.initialize();
    }

    private initialize(): void {
    // Initialize scene projection for WGS84 coordinates
        const coords = this.viewerState.positionWGS84;
        this.registerProjectionForCoords(coords);

        this.scene.pointerMovePredicate = function () {
            return false;
        };
        this.scene.pointerDownPredicate = function () {
            return false;
        };

        //this.sceneInstru = null;
        this.sceneInstru = new SceneInstrumentation(this.scene);

        //that.highlightLayer = new HighlightLayer("hl1", that.scene);

        // Initialize camera controller
        this.cameraController = new FreeCameraController(this);

        // Materials
        this.initializeMaterials();

        // Environment
        this.envReflectionProbe = null;
        if (this.viewerState.sceneEnvironmentProbe !== null) {
            //console.debug("Creating reflection probe.");
            this.envReflectionProbe = new ReflectionProbe(
                "envReflectionProbe",
                this.viewerState.sceneEnvironmentProbe,
                this.scene,
                true,
                true,
            );
            this.envReflectionProbe.refreshRate = 6;
            this.envReflectionProbe.position = new Vector3(0, 0, 0);

            // Assign to a material to see it
            //var pbr = new PBRMaterial('envReflectionTestMaterial', this.scene);
            //pbr.reflectionTexture = this.envReflectionProbe.cubeTexture;

            // Note that material needs to be added to the camera custom render targets to be updated
            this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;
        } else {
            //this.scene.createDefaultEnvironment();
            //var hdrTexture = new CubeTexture.CreateFromPrefilteredData("/textures/environment.env", this.scene);
            const hdrTexture = CubeTexture.CreateFromPrefilteredData(
                "/textures/country.env",
                this.scene,
            );
            this.scene.environmentTexture = hdrTexture;
        }

        // Skybox
        this.loadSkybox(this.viewerState.sceneSkybox);

        // Load fonts (after environment, or the call to add to catalog will miss PBR environment texture)
        //const fontAtlasTexture = (<PBRMaterial>mesh.material).albedoTexture;
        const atlasTextureUrl =
      this.viewerState.dddConfig.assetsUrlbase +
      "/dddfonts_01_64.greyscale.png";
        const fontAtlasTexture = new Texture(
            atlasTextureUrl,
            this.scene,
            false,
            false,
        );
        const tmw = new TextMaterialWrapper(this, fontAtlasTexture, null);
        tmw.material.zOffset = -10;
        this.materialText = tmw.material;
        this.addMaterialToCatalog(
            "DDDFonts-01-64",
            this.materialText,
            { zoffset: -10 },
            false,
        );

        // Render Pipeline config and Postprocessing
        /*
        this.initRenderPipeline();
        this.updateRenderPipeline();
        */

        // Lighting

        //this.scene.ambientColor = this.ambientColorDay.clone();
        //this.scene.ambientColor = new Color3(0, 0, 0);
        this.scene.ambientColor = new Color3(0.3, 0.3, 0.3);
        /*
        that.lightHemi = new HemisphericLight("lightHemi", new Vector3(-0.5, 1, -1), that.scene);
        that.lightHemi.intensity = 1.15;
        that.lightHemi.diffuse = new Color3(0.95, 0.95, 1);
        that.lightHemi.specular = new Color3(1, 1, 0.95);
        that.lightHemi.groundColor = new Color3(0.95, 1, 0.95);
        */
        this.light = new DirectionalLight(
            "light",
            new Vector3(0.3, -0.5, 0.5).normalizeToNew(),
            this.scene,
        );
        this.light.diffuse = new Color3(0.95, 0.95, 1.0);
        this.light.specular = new Color3(1, 1, 0.95);
        this.light.intensity = 2.8;

        /*
        that.light2 = new DirectionalLight("light2", new Vector3(-0.3, -0.5, -0.5).normalizeToNew(), that.scene);
        that.light.diffuse = new Color3(223 / 255, 242 / 255, 196 / 255);
        that.light.specular = new Color3(1, 1, 0.95);
        that.light2.intensity = 1.5;
        */

        this.shadowGenerator = null;
        if (this.viewerState.sceneShadowsEnabled) {
            this.shadowGenerator = new CascadedShadowGenerator(1024, this.light);
            this.shadowGenerator.bias = 0.0015; // 0.002 Makes grass appear slightly floating but prevents the full scene ground to be self-shadowed  0.001 avoid the gap but already produces self-shadowing
            //that.shadowGenerator.debug = true;
            this.shadowGenerator.shadowMaxZ = 500;
            //this.shadowGenerator.autoCalcDepthBounds = true;  // Enabling it causes shadow artifacts after switching cameras (?)
            this.shadowGenerator.penumbraDarkness = 0.8;
            this.shadowGenerator.lambda = 1.0;
            //that.shadowGenerator.depthClamp = false;
            //that.shadowGenerator.freezeShadowCastersBoundingInfo = true;

            // Rendering backfaces for shadows for under-terrain shadows, and reduces the need for bias
            // TODO: Shall be needed only for terrain if possible
            // TODO: Make a setting
            this.shadowGenerator.forceBackFacesOnly = true;

            this.shadowGenerator.splitFrustum();
        }

        const lensFlareEmitter: Mesh = new Mesh("lensFlareEmitter", this.scene);
        this.lensFlareSystem = new LensFlareSystem(
            "lensFlareSystem",
            lensFlareEmitter,
            this.scene,
        );
        const flareScale = 0.5;
        new LensFlare(
            flareScale * 0.2,
            0,
            new Color3(1, 1, 1),
            "/textures/Flare2.png",
            this.lensFlareSystem,
        );
        new LensFlare(
            flareScale * 0.5,
            0.2,
            new Color3(0.5, 0.5, 1),
            "/textures/flare3.png",
            this.lensFlareSystem,
        );
        new LensFlare(
            flareScale * 0.2,
            1.0,
            new Color3(1, 1, 1),
            "/textures/flare3.png",
            this.lensFlareSystem,
        );
        new LensFlare(
            flareScale * 0.4,
            0.4,
            new Color3(1, 0.5, 1),
            "/textures/flare.png",
            this.lensFlareSystem,
        );
        new LensFlare(
            flareScale * 0.1,
            0.6,
            new Color3(1, 1, 1),
            "/textures/flare3.png",
            this.lensFlareSystem,
        );
        new LensFlare(
            flareScale * 0.3,
            0.8,
            new Color3(1, 1, 1),
            "/textures/Flare2.png",
            this.lensFlareSystem,
        );

        // Setup lighting, flares, etc.
        this.lightSetupFromDatePos();

        //var ssao = new SSAORenderingPipeline('ssaopipeline', that.scene, 0.75);

        this.loadCatalog(
            this.viewerState.dddConfig.assetsUrlbase + "/catalog.glb",
            false,
        );

        this.loadTextures();

        // Render every frame
        this.engine.runRenderLoop(() => {
            if (!this.scene) {
                return;
            }
            const deltaTime = this.engine!.getDeltaTime() / 1000.0;
            this.update(deltaTime);
            this.scene.render();
        });

        // Performance
        // Avoid clear calls, as there's always a skybox
        this.scene.autoClear = false; // Color buffer
        this.scene.autoClearDepthAndStencil = false; // Depth and stencil
        this.scene.blockMaterialDirtyMechanism = true;

        this.scene.setRenderingAutoClearDepthStencil(1, false, false, false); // For objects in front of layer 0 (buildings and instances)
    }

    private initializeMaterials(): void {
    // Some hard-coded materials used by DDD

        /*
        const water = new StandardMaterial("water", this.scene);
        water.specularTexture = new Texture("/textures/reflectivity.png", this.scene);
        //water.ambientColor = new Color3(0.0, 0.0, 1.0);
        water.diffuseColor = new Color3(0.0, 0.0, 1.0);
        water.specularColor = new Color3(0.0, 0.0, 1.0);
        //water.alphaMode = Material.MATERIAL_ALPHABLEND;
        //water.transparencyMode = Material.MATERIAL_ALPHABLEND;
        //water.alpha = 0.6;
        */

        const water = new WaterMaterial("water", this.scene, new Vector2(512, 512));
        water.bumpTexture = new Texture("/textures/waterbump.png", this.scene);
        water.waveLength = 15.0; // def: 0.1
        water.waveHeight = 0.04; // def: 0.4
        water.waveSpeed = 50.0; // def: 1
        water.windForce = 1.0; // def: 6
        //water.waveCount = 1.0;        // def: 20
        water.windDirection = new Vector2(0.75, 1.3);
        water.bumpHeight = 0.4; // def: 0.4
        water.alpha = 0.5;
        water.transparencyMode = 2; // 2  ALPHA_BLEND  3;  // ALPHA_TEST_AND_BLEND
        water.bumpAffectsReflection = true; // true;
        //water.bumpSuperimpose = true;
        //water.fresnelSeparate = true;
        //water.waterColor = new Color3( 0.0, 0.0, 0.0 );   // def: 0.1 0.1 0.6
        //water.waterColor2 = new Color3( 0.0, 0.0, 0.0 );  // def: 0.1 0.1 0.6
        water.colorBlendFactor = 0.7; // def: 0.2
        water.colorBlendFactor2 = 0.7; // def: 0.2
        water.backFaceCulling = false;
        //water.specularPower = 0.05;      // def: 64
        water.specularColor = new Color3(0.1, 0.1, 0.05); // def: 0,0,0
        water.diffuseColor = new Color3(0.2, 0.2, 0.2); // def: 1,1,1
        this.scene.setRenderingAutoClearDepthStencil(1, false, false, false);
        this.scene.setRenderingAutoClearDepthStencil(2, false, false, false);
        //this.scene.setRenderingAutoClearDepthStencil(3, false, false, false);
        //water.addToRenderList(ground);
        //let waterOcean = createOceanMaterial(this.scene);

        this.materialWater = water;

        // Load flare texture and apply it
        /*
        const flareMaterial = new StandardMaterial("lightFlare", this.scene);
        //flareMaterial.specularTexture = new Texture("/textures/flare3.png", this.scene);
        flareMaterial.diffuseTexture = new Texture("/textures/flare.png", this.scene);
        flareMaterial.diffuseTexture.hasAlpha = true;
        flareMaterial.useAlphaFromDiffuseTexture = true;
        //water.ambientColor = new Color3(0.0, 0.0, 1.0);
        flareMaterial.diffuseColor = new Color3(1.0, 1.0, 1.0);
        //flareMaterial.specularColor = new Color3(1.0, 1.0, 1.0);
        flareMaterial.alphaMode = 1;  // ALPHA_ADD
        flareMaterial.alpha = 0.30;
        flareMaterial.emissiveColor = new Color3(1.0, 1.0, 1.0);
        flareMaterial.transparencyMode = Material.MATERIAL_ALPHABLEND;  // ALPHA_TEST
        //flareMaterial.backFaceCulling = false;
        flareMaterial.disableLighting = true;
        //flareMaterial.disableDepthWrite = true;
        
        this.materialFlare = flareMaterial;
        */

        /*
        NodeMaterial.ParseFromSnippetAsync("#3FU5FG#1", this.scene).then((mat) => {
            //ground.material = mat;
            //window.mat = mat;
            this.materialOcean = mat;
        });
        */

        /*
        that.materialGrass = new StandardMaterial("bawl", that.scene);
        that.textureGrass = new GrassProceduralTexture("textbawl", 256, that.scene);
        that.materialGrass.ambientTexture = that.textureGrass;
        */

        this.materialHighlight = new StandardMaterial(
            "materialHighlight",
            this.scene,
        );
        this.materialHighlight.diffuseColor = new Color3(1, 0, 1);
        //that.materialHighlight.specularColor = new Color3(1, 1, 1);
        this.materialHighlight.emissiveColor = new Color3(1.0, 1.0, 1);
        this.materialHighlight.wireframe = true;
        this.materialHighlight.disableLighting = true;
        this.materialHighlight.backFaceCulling = true;

        this.textureDetailSurfaceImp = new Texture(
            "/textures/SurfaceImperfections12_ddd.png",
            this.scene,
        );

        // Shader
    /*
        Effect.ShadersStore["customVertexShader"]= `
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
    }

    loadSkybox(baseUrl: string): void {
        // Remove skybox
        if (this.skybox) {
            if ("getRenderList" in this.materialWater!) {
                (<WaterMaterial>this.materialWater!).getRenderList()!.length = 0;
            }
            if (this.viewerState.sceneEnvironmentProbe) {
                this.envReflectionProbe!.renderList!.length = 0;
            }

            this.skybox.dispose();
            this.skybox = null;
        }

        // Set skybox
        if (baseUrl === "@dynamic") {
            const skybox = Mesh.CreateSphere("skyBox", 30, 3000, <Scene>this.scene);

            const skyboxMaterial = new SkyMaterialWrapper(this.scene).material;
            skyboxMaterial.disableDepthWrite = true;

            skybox.material = skyboxMaterial;
            skybox.infiniteDistance = true;
            skybox.applyFog = false;
            this.skybox = skybox;
        } else if (baseUrl !== null) {
            const skybox = MeshBuilder.CreateBox(
                "skyBox",
                { size: 3000.0 },
                this.scene,
            );
            const skyboxMaterial = new StandardMaterial("skyBox", <Scene>this.scene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new CubeTexture(
                baseUrl,
                <Scene>this.scene,
            );
            skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
            skyboxMaterial.specularColor = new Color3(0, 0, 0);
            skyboxMaterial.disableDepthWrite = true;

            skybox.material = skyboxMaterial;
            skybox.infiniteDistance = true;
            skybox.applyFog = false;
            this.skybox = skybox;
        }

        console.debug("Adding skybox env");
        if (this.skybox) {
            this.skybox.renderingGroupId = 1; //Ideally in group 1, after meshes (to avoid overdraw), but... Seems is rendered in group 0 for it to be applied to the reflections on water and objects, but it hsould be the enviornment :??
            //this.skybox.renderingGroupId = 3;  //
            //this.scene.setRenderingAutoClearDepthStencil(3, false, false, false);

            //let skyboxReflection = this.skybox; // .clone();
            //skyboxReflection.renderingGroupId = 0;
            this.envReflectionProbe!.renderList!.push(this.skybox);

            if ("getRenderList" in this.materialWater!) {
                //let skyboxWater = this.skybox.clone();

                /*
                        const skyboxWater = MeshBuilder.CreateBox( "skyBox", { size: 3000.0 }, this.scene );
                        const skyboxProbeMaterial = new StandardMaterial( "skyBox", <Scene> this.scene );
                        skyboxProbeMaterial.backFaceCulling = false;
                        if (this.envReflectionProbe != null) {
                            skyboxProbeMaterial.reflectionTexture = this.envReflectionProbe?.cubeTexture; //
                            skyboxProbeMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
                        }
                        skyboxProbeMaterial.diffuseColor = new Color3( 0, 0, 0 );
                        skyboxProbeMaterial.specularColor = new Color3( 0, 0, 0 );
                        skyboxProbeMaterial.disableDepthWrite = true;
                        skyboxWater.material = skyboxProbeMaterial;
                        
                        skyboxWater.renderingGroupId = 2;

                        (<WaterMaterial> this.materialWater!).addToRenderList(skyboxWater); 
                        */
                //(<WaterMaterial> this.materialWater!).addToRenderList(this.skybox);

                (<WaterMaterial>this.materialWater!).markDirty();
            }
        }
    }

    showFullScreen(): void {
        if (this.engine) {
            this.engine.switchFullscreen(true);
        }
    }

    /*
    showDebugView(): void {
        // Show BabylonJS Inspector
        this.scene!.debugLayer.show({ overlay: true });
    }
    */

    loadCatalog(filename: string, loadMaterials: boolean): void {
        console.debug("Loading catalog: " + filename);
        SceneLoader.ImportMesh(
            null,
            filename,
            "",
            this.scene, //this.scene,
            // onSuccess
            (newMeshes: AbstractMesh[], _particleSystems: any, _skeletons: any) => {
                //console.log("GLB loaded", newMeshes);
                this.loadCatalogFromMesh(<Mesh>newMeshes[0], loadMaterials);
                newMeshes[0].setParent(null);
                newMeshes[0].setEnabled(false);
                //newMeshes[0].isVisible = false;
                //newMeshes[0].dispose();

                this.processDepends();
            },
            (_event) => {},
            (_scene, _msg, ex) => {
                console.debug("Could not load scene catalog: " + filename, ex);
            },
        );
    }

    processDepends(): void {
    //console.debug( "Processing dependencies: ", this.depends);
        const dependsCopy = [ ...this.depends ];
        for (const dep of dependsCopy) {
            this.depends = this.depends.filter((item) => item !== dep);
            this.processMesh(dep, dep);
        }
    }

    loadCatalogFromMesh(mesh: Mesh, loadMaterials: boolean): void {
        if (
            mesh &&
      mesh.metadata &&
      mesh.metadata.gltf &&
      mesh.metadata.gltf.extras
        ) {
            const metadata = mesh.metadata.gltf.extras;

            // Add color material
            /*
            let key = metadata['ddd:material'];
            let mat = this.catalog_materials[key];
            if (key && key.startsWith("Color") && mesh.material && !mat) {
                console.debug("Adding color material " + mesh.material + " to catalog: " + key);
                mat = mesh.material;
                mat.name = key;
                this.catalog_materials[key] = mat;
                //mesh.material = mat;
            } else if (key && mat) {
                //mesh.material.dispose();
                //mesh.material = mat;
            }
            */

            if (metadata["ddd:instance:key"]) {
                //this.processMesh(mesh, mesh);
                this.addMeshToCatalog(metadata["ddd:instance:key"], mesh);
            }

            if (
                metadata["ddd:material"] &&
        (loadMaterials || !(metadata["ddd:material"] in this.catalog_materials))
            ) {
                try {
                    this.addMaterialToCatalog(
                        metadata["ddd:material"],
            mesh.material!,
            mesh.metadata.gltf.extras,
            true,
                    );
                } catch (e) {
                    console.debug("Error adding material to catalog: ", mesh, e);
                }
            }
        }

        for (const child of mesh.getChildren()) {
            this.loadCatalogFromMesh(<Mesh>child, loadMaterials);
        }
    }

    addMaterialToCatalog(
        key: string,
        material: Material,
        metadata: any,
        force: boolean = false,
    ): void {
        if (material) {
            //console.debug(mesh.material);
            //mesh.material.id = key;
            material.name = key;

            if (this.catalog_materials[key] && !force) {
                console.debug("Material already in catalog: " + key);
            } else {
                //console.debug("Adding material to catalog: " + key);
                this.catalog_materials[key] = material;

                let dontFreeze = false;

                if (metadata["ddd:material"] === "WaterBasicDaytime") {
                    /*
                    mesh.material.alpha = 0.7;
                    mesh.material.transparencyMode = 2;  // ALPHA_BLEND
                    mesh.material.useSpecularOverAlpha = true;
                    mesh.material.useReflectionOverAlpha = true;
                    mesh.material.bumpTexture = new Texture("/textures/waterbump.png", this.scene);
                    */

                    // This "WaterInstanced" is additionally created to avoid WaterMaterial from being used in instances (seems to fail, causing the material to disappear).
                    this.catalog_materials["WaterInstanced"] = material;
                    this.catalog_materials["WaterInstanced"].alpha = 0.7;
                    this.catalog_materials["WaterInstanced"].transparencyMode = 2;
                    this.catalog_materials["WaterInstanced"].freeze();

                    //console.debug("NOT ADDING WATERMATERIAL TO CATALOG");
                    this.catalog_materials[key] = <Material>this.materialWater;
                    dontFreeze = true;
                } else if (metadata["ddd:material"] === "Water4Advanced") {
                    /*
                    mesh.material.alpha = 0.8;
                    mesh.material.transparencyMode = 2;  // ALPHA_BLEND
                    mesh.material.useSpecularOverAlpha = true;
                    mesh.material.useReflectionOverAlpha = true;
                    mesh.material.bumpTexture = new Texture("/textures/waterbump.png", this.scene);
                    */
                    //console.debug("NOT ADDING WATERMATERIAL TO CATALOG");
                    this.catalog_materials[key] = <Material>this.materialWater;
                    dontFreeze = true;
                } else if (material instanceof PBRMaterial) {
                    //dontFreeze = true;
                    //mesh.material.specularColor = Color3.Lerp(mesh.material.albedoColor, Color3.White(), 0.2);
                    //mesh.material.albedoColor = Color3.Lerp(mesh.material.albedoColor, Color3.White(), 0.5);
                    //mesh.material.albedoColor = Color3.FromHexString(mesh.metadata.gltf.extras['ddd:material:color']).toLinearSpace();
                    //mesh.material.albedoColor = Color3.FromHexString(mesh.material.albedoColor).toLinearSpace();

                    //let uvScale = 0.25;
                    let uvScale = 1.0;

                    if (metadata["ddd:material"] === "Lava") {
                        uvScale = 0.125;
                    }
                    if (metadata["ddd:material"] === "Grass") {
                        //uvScale = 0.5;
                    }
                    if (
                        metadata["ddd:material"] === "Roadline" ||
            metadata["ddd:material"] === "Roadmarks" ||
            metadata["ddd:material"] === "Fence" ||
            metadata["ddd:material"] === "TrafficSigns" ||
            metadata["ddd:material"] === "RoadRailway" ||
            metadata["ddd:material"] === "Flowers Blue" ||
            metadata["ddd:material"] === "Flowers Roses" ||
            metadata["ddd:material"] === "Grass Blade" ||
            metadata["ddd:material"] === "Grass Blade Dry"
                    ) {
                        uvScale = 1.0;

                        // TODO: add this as metadata (should not apply to all of these)
                        material.twoSidedLighting = true;
                    }

                    if (
                        metadata["ddd:material"] === "Flowers Blue" ||
            metadata["ddd:material"] === "Flowers Roses" ||
            metadata["ddd:material"] === "Grass Blade" ||
            metadata["ddd:material"] === "Grass Blade Dry"
                    ) {
                        uvScale = 1.0;

                        // TODO: add this as metadata (should not apply to all of these)
                        material.twoSidedLighting = true;
                        material.backFaceCulling = false;
                    }

                    if (metadata["ddd:material"] === "Fence") {
                        uvScale = 0.5;
                        material.backFaceCulling = false;
                        if (material.albedoTexture && material instanceof PBRBaseMaterial) {
                            (<Texture>material.albedoTexture).vOffset = 0.0725;
                        }
                        if (material.bumpTexture) {
                            (<Texture>material.bumpTexture).vOffset = 0.0725;
                        }
                    }

                    if (uvScale !== 1.0) {
                        if (material.albedoTexture && material instanceof PBRBaseMaterial) {
                            (<Texture>material.albedoTexture).uScale = uvScale;
                            (<Texture>material.albedoTexture).vScale = uvScale;
                            if (material.bumpTexture) {
                                (<Texture>material.bumpTexture).uScale = uvScale;
                                (<Texture>material.bumpTexture).vScale = uvScale;
                            }
                            if (material.emissiveTexture) {
                                (<Texture>material.emissiveTexture).uScale = uvScale;
                                (<Texture>material.emissiveTexture).vScale = uvScale;
                            }
                        }
                    }

                    // Babylon does not enable emissive by default if an emissive texture exists. This makes eg. lava emissive.
                    if (material.emissiveTexture) {
                        material.emissiveColor = Color3.White();
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

                    // Detail map
                    // TODO: Disabled as didn't seem to be working (10-2023)
                    /*
                    material.detailMap.texture = this.textureDetailSurfaceImp;
                    if (material.detailMap.texture) {
                        ( <Texture> material.detailMap.texture ).uScale = 1 / 256;
                        ( <Texture> material.detailMap.texture ).vScale = 1 / 256;
                        material.detailMap.isEnabled = true;
                        material.detailMap.diffuseBlendLevel = 0.15; // 0.2
                        //mesh.material.detailMap.bumpLevel = 1; // between 0 and 1
                        //mesh.material.detailMap.roughnessBlendLevel = 0.05; // between 0 and 1
                        //mesh.material.freeze();  // Careful: may prevent environment texture change (?)
                    }
                    */

                    (<PBRMaterial>material).environmentIntensity = this.baseEnvironmentIntensity * 0.75; // * 0.25;
                    //(<PBRMaterial>material).ambientColor = new Color3(0, 0, 0);

                    (<PBRMaterial>material).useHorizonOcclusion = true;
                    if (this.envReflectionProbe) {
                        // Seems this is applied even if not done explicitly here?
                        (<PBRMaterial>material).reflectionTexture = this.envReflectionProbe!.cubeTexture;
                    }

                    // Freezing PBR materials causes them to not respond to environment intensity or reflection texture changes
                    dontFreeze = true;
                }

                if ("zoffset" in metadata && metadata["zoffset"]) {
                    this.catalog_materials[key].zOffset = metadata["zoffset"];
                }

                //mesh.material.ambientColor = mesh.material.albedoColor; // new Color3(1, 1, 1);
                if (!dontFreeze) {
                    this.catalog_materials[key].freeze();
                }
            }
        } else {
            console.debug("No material (null) (key=" + key + ")");
        }
    }

    addMeshToCatalog(key: string, mesh: Mesh): void {
        if (this.catalog[key]) {
            console.debug("Mesh already in catalog: " + key);
        } else {
            //console.debug("Adding mesh to catalog: " + key);
            this.catalog[key] = mesh;
            mesh.setEnabled(false);
            mesh.parent = null;
        }
    }

    processMeshDummy(_root: Mesh, mesh: Mesh): Mesh | null {
        return mesh;
    }

    processMesh(root: Mesh, mesh: Mesh): Mesh | null {
    //console.debug("Processing mesh: " + mesh.id, mesh);
        const rootmd = root.metadata ? root.metadata.tileInfo : null;

        if ("getTotalVertices" in mesh) {
            if (mesh.getChildMeshes().length == 0) {
                if (mesh.getTotalVertices() == 0 || mesh.getTotalIndices() == 0) {
                    //console.log("Empty mesh with no vertices or indices: " + mesh.id, mesh);
                    return null;
                }
            }
        }

        //mesh.isPickable = false;
        mesh.receiveShadows = true; // Fixes instances with no shadows

        // TODO: Ground/texture override shall be done per layer settings (and passed here into processMesh as needed)
        if (
            !("_splatmapMaterial" in root) &&
      this.useSplatMap &&
      !this.viewerState.sceneGroundTextureOverrideUrl &&
      this.viewerState.dddConfig.materialsSplatmap
        ) {
            // && this.viewerState.dddConfig.materialsTextureSet.indexOf("default") >= 0

            if (rootmd && "metadata" in root && "tileCoords" in root.metadata) {
                const coords = root.metadata["tileCoords"];
                //console.debug("Creating splat material for: ", coords);

                const tileUrlBase = this.viewerState.dddConfig.tileUrlBase;
                const splatmapUrl =
          tileUrlBase +
          "17" +
          "/" +
          coords[1] +
          "/" +
          coords[2] +
          ".splatmap-16chan-0_15-256.png";

                //console.info("Splatmap texture: " + splatmapUrl);

                //const temporaryTexture = this.textureDetailSurfaceImp;
                const splatmapTexture = new Texture(splatmapUrl, this.scene);
                const matwrapper = new TerrainMaterialWrapper(
                    this,
                    splatmapTexture,
          <Texture>this.splatmapAtlasTexture,
          <Texture>this.splatmapAtlasNormalsTexture,
                );
                (<any>root)._splatmapMaterial = matwrapper.material;

                const createSplatmapMaterial = () => {
                    matwrapper.splatMap = splatmapTexture;

                    let uvScale = [ 225, 225 ]; //[225, 225]; // [113.36293971960356 * 2, 112.94475604662343 * 2];
                    const bounds = rootmd ? rootmd["tile:bounds_m"] : null;
                    if (bounds) {
                        //console.debug("Bounds: ", bounds);
                        uvScale = [ bounds[2] - bounds[0], bounds[3] - bounds[1] ];
                    }

                    (<Texture>matwrapper.material.albedoTexture).uScale =
            (1.0 / uvScale[0]) * (127 / 128); // + 1
                    (<Texture>matwrapper.material.albedoTexture).vScale =
            (1.0 / uvScale[1]) * (127 / 128); // + 1
                    (<Texture>matwrapper.material.albedoTexture).uOffset = 0.5; //  + (1 / uvScale[0]);
                    (<Texture>matwrapper.material.albedoTexture).vOffset = 0.5; // - ( 0.5/128 ); // 1 / root._splatmapMaterial.albedoTexture.getSize().height);
                    /*if (mesh.material.bumpTexture) {
                        mesh.material.bumpTexture.uScale = 1.0 / uvScale[0];
                        mesh.material.bumpTexture.vScale = 1.0 / uvScale[1];
                        mesh.material.bumpTexture.uOffset = 0.5;
                        mesh.material.bumpTexture.vOffset = 0.5;
                    }*/

                    //(<any> root)._splatmapMaterial._splatmapMaterial.freeze();
                };

                // Wait for texture observable to create material (trying to avoid freeze time)
                //if (splatmapTexture.isReady()) {
                //    createSplatmapMaterial();
                //} else {
                //    let onLoadObservable = splatmapTexture.onLoadObservable;
                //    onLoadObservable.addOnce(() => {
                //        createSplatmapMaterial();
                //    });
                //}
                createSplatmapMaterial();
            }
        }

        let replaced = false;
        if (
            mesh &&
      mesh.metadata &&
      mesh.metadata.gltf &&
      mesh.metadata.gltf.extras
        ) {
            const metadata = mesh.metadata.gltf.extras;

            mesh.isBlocker = true;

            if (metadata["ddd:material"] && !("ddd:text" in metadata)) {
                let key = metadata["ddd:material"];

                //mesh.renderingGroupId = 1;

                if (key === "WaterBasicDaytime") {
                    //console.debug(metadata["ddd:path"]);
                    // FIXME: Weak condition to identify the water mesh inside an instance
                    //if ( metadata["ddd:path"].startsWith( "Catalog Group" )) {
                    if (metadata["ddd:path"].indexOf("/DDDInstance") >= 0) {
                        key = "WaterInstanced";
                    }
                }

                if (
                    key == "WaterBasicDaytime" ||
          key == "Water4Advanced" ||
          key == "WaterInstanced"
                ) {
                    mesh.renderingGroupId = 2;
                }

                // Fonts
                if (key === "DDDFonts-01-64") {
                    // Font material should be in catalog
                    //this.catalog_materials[key] = this.materialText!;
                } else {
                    // Create font materials ad-hoc using pre-existing material albedo texture
                    // (this allows font materials to be included in the format)
                    if (
                        "ddd:material:type" in metadata &&
            metadata["ddd:material:type"] == "font" &&
            !(key in this.catalog_materials)
                    ) {
                        const fontAtlasTexture = (<PBRMaterial>mesh.material).albedoTexture;
                        const tmw = new TextMaterialWrapper(this, fontAtlasTexture, null);
                        const materialTextCustom = tmw.material;
                        this.catalog_materials[key] = materialTextCustom;
                    }
                }

                let mat = this.catalog_materials[key];

                if (!(key in this.catalog_materials) && mesh.material) {
                    mesh.material.id = key + "(Auto)";
                    mesh.material.name = key;
                    this.addMaterialToCatalog(
                        metadata["ddd:material"],
                        mesh.material,
                        mesh.metadata.gltf.extras,
                    );
                    mat = this.catalog_materials[key];

                    if (!(<any>root in this.depends)) {
                        this.depends.push(root);
                    }
                }

                // Add color material
                /*
                if (key.startsWith("Color") && mesh.material && !mat) {
                    console.debug("Adding color material " + mesh.material + " to catalog: " + key);
                    mat = mesh.material;
                    mat.name = key;
                    this.catalog_materials[key] = mat;
                    //mesh.material = null;
                }
                */

                // TODO: Indicate when to splat in metadata (partially done)
                if (
                    this.useSplatMap &&
          this.viewerState.dddConfig.materialsSplatmap &&
          "ddd:material:splatmap" in metadata &&
          metadata["ddd:material:splatmap"] === true &&
          (!("ddd:layer" in metadata) || metadata["ddd:layer"] === "0") &&
          (metadata["ddd:material"] === "Park" ||
            metadata["ddd:material"] === "Grass" ||
            metadata["ddd:material"] === "Terrain" ||
            metadata["ddd:material"] === "Ground" ||
            metadata["ddd:material"] === "Ground Clear" ||
            metadata["ddd:material"] === "Dirt" ||
            metadata["ddd:material"] === "Garden" ||
            metadata["ddd:material"] === "Forest" ||
            metadata["ddd:material"] === "Sand" ||
            metadata["ddd:material"] === "Rock" ||
            metadata["ddd:material"] === "Rock Orange" ||
            (metadata["ddd:material"] === "WayPedestrian" &&
              (!("ddd:area:type" in metadata) ||
                metadata["ddd:area:type"] !== "stairs")) ||
            metadata["ddd:material"] === "Wetland" ||
            metadata["ddd:material"] === "Asphalt")
                ) {
                    if ((<any>root)._splatmapMaterial) {
                        if (
                            mesh.material &&
              mesh.material !== (<any>root)._splatmapMaterial
                        ) {
                            try {
                                mesh.material.dispose();
                            } catch (e) {
                                console.debug("Could not dispose material: " + mesh.id);
                            }
                        }

                        mesh.material = (<any>root)._splatmapMaterial;
                        //( <any>root )._splatmapMaterial.renderingGroupId = 1;

                        // Add meshes to the reflection probe (Expensive!)
                        //this.envReflectionProbe.renderList.push(mesh);
                    } else {
                        //this.depends.push(root);
                        //return;
                    }
                } else if (key in this.catalog_materials) {
                    // && mesh.material

                    if (mesh.material && mesh.material !== mat && mat) {
                        const mmat = mesh.material;
                        mesh.material = null;
                        mmat.dispose(); // Causes white materials? but cleans all outstanding materials
                    }
                    if (mat) {
                        mesh.material = mat;
                    }
                } else {
                    //console.debug("Material not found in catalog: " + key);
                    // TODO: Will never happen if not showing materials (dependencies should be to the particular instance or material)

                    this.depends.push(root);
                }
            }

            if (metadata["ddd:light:color"]) {
                replaced = true;

                //lightFlare.billboardMode = 7;
                /*
                var light = new PointLight("light_" + mesh.id, mesh.position, this.scene);
                light.parent = mesh.parent;
                light.position = mesh.position;
                light.position.y = light.position.z + 1;
                light.intensity = 20;
                light.diffuse = new Color3(1, 0, 0);
                light.specular = new Color3(0, 1, 0);
                */

                mesh.parent = null;
                mesh.dispose();
            } else if (metadata["ddd:text"]) {
                let newMesh = null;

                const showText = this.viewerState.sceneTextsEnabled;
                if (showText) {
                    // Text should be (possibly) exported as meshes by the generator.
                    const textWidth = metadata["ddd:text:width"];
                    const textHeight = metadata["ddd:text:width"];
                    newMesh = MeshBuilder.CreatePlane(
                        "text_" + mesh.id,
                        {
                            width: textWidth,
                            height: textHeight,
                            sideOrientation: Mesh.DOUBLESIDE,
                            updatable: true,
                        },
                        this.scene,
                    );
                    newMesh.parent = null;
                    newMesh.parent = mesh.parent; // .parent;
                    newMesh.scaling = mesh.scaling.clone();
                    newMesh.rotationQuaternion = mesh.rotationQuaternion!.clone();
                    newMesh.position = mesh.position.clone();

                    newMesh.rotate(Vector3.Right(), Math.PI / 2.0, Space.LOCAL);
                    newMesh.scaling.y *= 0.35;

                    //Create dynamic texture
                    const texture = new DynamicTexture(
                        "dynamicTexture_text_" + mesh.id,
                        { width: 256, height: 128 },
                        this.scene,
                        true,
                    );
                    //var textureContext = texture.getContext();
                    const font = "bold 36px serif";
                    const text = metadata["ddd:text"];
                    texture.drawText(
                        text,
                        128.0 - text.length * 8,
                        60,
                        font,
                        "blue",
                        "transparent",
                        true,
                        true,
                    );

                    const material = new StandardMaterial(
                        "Mat" + mesh.id,
            <Scene>this.scene,
                    );
                    material.diffuseTexture = texture;
                    material.diffuseTexture.hasAlpha = true;
                    material.useAlphaFromDiffuseTexture = true;
                    material.transparencyMode = 1; // ALPHA_TEST
                    newMesh.material = material;

                    newMesh.isPickable = false;
                    //newMesh.metadata = {gltf: {extras: metadata}};  // Doesn't seem to work and/or freezes the app
                    //delete newMesh.metadata['ddd:text'];
                }

                mesh.parent = null;
                mesh.dispose();
                mesh = <Mesh>newMesh;
            } else if (metadata["ddd:instance:key"]) {
                replaced = true;
                const key = metadata["ddd:instance:key"];

                if (key == "lamppost-default-1") {
                    //console.debug("TEST: lamppost-default-1");
                    // Create a flare quad
                    /*
                    const quad = MeshBuilder.CreatePlane( "quad_" + mesh.id, { width: 4.5, height: 4.5, sideOrientation: Mesh.DOUBLESIDE, updatable: true, frontUVs: new Vector4(0, 0, 1, 1) }, this.scene );
                    quad.material = this.materialFlare;
                    quad.billboardMode = 7;
                    quad.receiveShadows = false;
                    
                    const scaleMatrix = Matrix.Compose( new Vector3( 1, 1, -1 ), new Quaternion( 0, 0, 0, 0 ), new Vector3( 0, 0, 0 )); //Matrix.Scaling(-1, 1, 1);
                    const nodeMatrix = mesh.parent!.computeWorldMatrix( true );
                    let pos = Vector3.TransformCoordinates(mesh.position.add(new Vector3(0, 5.75, 0)), nodeMatrix);
                    quad.position = pos;
                    */
                    /*
                    if (this._decimator++ % 40 == 0) {
                        //lightFlare.billboardMode = 7;
                        const light = new PointLight("light_" + mesh.id, mesh.position.add(new Vector3(0, 4.0, 0)), this.scene);
                        light.parent = mesh.parent;
                        //light.position = mesh.position;
                        //light.position.y = light.position.y + 1;
                        light.intensity = 50.0;
                        light.radius = 0.15;
                        light.range = 12.0;
                        light.shadowEnabled = false;
                        light.diffuse = new Color3(240.0/255.0, 234.0/255.0, 129.0/255.0);
                        light.specular = new Color3(255.0/255.0, 250.0/255.0, 99.0/255.0);
                    }
                    */
                }

                // Ignored objects (devel purpose)
                const ignored_keys: string[] = []; // ["building-window"]
                if (ignored_keys.indexOf(key) >= 0) {
                    mesh.parent = null;
                    mesh.dispose();
                    return null;
                }

                if (this.catalog[key]) {
                    if ("ddd:instance:buffer:matrices" in metadata) {
                        this.instanceAsThinInstanceBuffers(key, root, mesh);
                    } else {
                        //this.instanceAsNode(root, key, mesh);
                        this.instanceAsThinInstance(key, root, mesh); // note this removes the mesh
                    }
                } else {
                    // Instance not found. Mark this root for re processing and exit.
                    //console.debug("Instance key not found in catalog: : " + key);
                    this.depends.push(root);
                    return null;
                }
            }

            this.depends.push(root);
        }

        if (mesh) {
            // && !replaced

            // Babylon Occlusion doens't seem to work well for ddd use case
            //mesh.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;

            /*
            if (mesh.simplify && mesh.getTotalVertices() > 0 && !replaced) {
                mesh.simplify([{ quality: 0.1, distance: 100 }, ], false, SimplificationType.QUADRATIC);
            }
            */

            mesh.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
            //mesh.freezeWorldMatrix();

            //if (mesh.material) { mesh.material.needDepthPrePass = true; }  // causes some objects with textures to show black

            for (const child of [ ...mesh.getChildren() ]) {
                const processed = this.processMesh(root, <Mesh>child);
                /*
                if (processed == null) {
                    //console.debug("Removing child: " + children.id);
                    children.parent = null;
                    children.dispose();
                }
                */
            }

            /*
            // Adding shadows for ground here was done as a test, but we may incur adding them
            // multiple times, and they should be managed. Performance impact needs testing.
            if ( this.shadowGenerator && mesh.getBoundingInfo) {
                this.shadowGenerator.getShadowMap()!.renderList!.push( mesh );
            }
            */
        }

        /*
        if (mesh === root) {
            //this.octree = this.scene.createOrUpdateSelectionOctree(); // capacity, maxDepth);
        }
        */

        return mesh;
    }

    instanceAsThinInstance(key: string, root: Mesh, node: Mesh): void {
        const instance = this.catalog[key];
        const meshes = instance.getChildMeshes();

        for (const mesh of meshes) {
            if (
                mesh &&
        mesh.metadata &&
        mesh.metadata.gltf &&
        mesh.metadata.gltf.extras
            ) {
                const metadata = mesh.metadata.gltf.extras;
                if (metadata["ddd:light:color"]) {
                    // TODO: include the child instance
                    continue;
                }
            }

            if (mesh.getTotalVertices() == 0 || mesh.getTotalIndices() == 0) {
                //console.log("Mesh with no vertices or indices: ", mesh);
                if (mesh.getChildMeshes().length == 0) {
                    //console.log("Empty mesh with no vertices or indices: ", mesh);
                    continue;
                }
            }

            // Get root
            const instanceRootKey = root.id + "_" + key + "_" + mesh.id; // root.id + "_" +  // TODO! do not clone but keep groups!
            let meshInstanceRoot = this.instanceRoots[instanceRootKey];
            if (!meshInstanceRoot) {
                //console.debug("Creating instanceroot for: " + instanceRootKey);
                instance.setEnabled(true);
                meshInstanceRoot = <Mesh>mesh.clone(instanceRootKey, null, true); // (do not clone children = true)
                meshInstanceRoot = meshInstanceRoot.makeGeometryUnique(); // Can we do this without cloning geometry? do thin instances work that way?

                const cloneMat = meshInstanceRoot.material;
                if (cloneMat) {
                    meshInstanceRoot.material = null;
                    cloneMat.dispose();
                }

                //meshInstanceRoot.metadata.gltf.extras['ddd:instance:key'] = "_MESH_INSTANCE_ROOT";  // WARN:seems this extras are being shared among instances
                meshInstanceRoot.toLeftHanded();
                //meshInstanceRoot.rotate(Vector3.Up(), Math.PI / 2);
                //meshInstanceRoot.scaling = new Vector3(1, 1, -1);
                this.instanceRoots[instanceRootKey] = meshInstanceRoot;
                meshInstanceRoot.parent = root;
                //meshInstanceRoot.setPivotMatrix(meshInstanceRoot.computeWorldMatrix(true));  // Seems to cause problems, but should not :? (freezing may be involved)

                this.processMesh(root, meshInstanceRoot);

                // After postprocessing, do not add this mesh as instance if it's empty
                if (mesh.getTotalVertices() == 0 || mesh.getTotalIndices() == 0)
                    continue;

                // Enable shadows for the instances if shadows are set
                if (this.shadowGenerator) {
          this.shadowGenerator
              .getShadowMap()!
              .renderList!.push(meshInstanceRoot);
                }

                //meshInstanceRoot.setEnabled(false);
                //meshInstanceRoot.addLODLevel(200, null);

                instance.setEnabled(false);
                //instance.dispose();
            }

            // Transform
            /*
            let localPos = mesh.position;
            let localRot = mesh.rotationQuaternion;
            let localScaling = mesh.scaling;
            localScaling.x = -1 * localScaling.x;
            var meshMatrix = Matrix.Compose(localScaling, localRot, localPos);
            */

            const scaleMatrix = Matrix.Compose(
                new Vector3(1, 1, -1),
                new Quaternion(0, 0, 0, 0),
                new Vector3(0, 0, 0),
            ); //Matrix.Scaling(-1, 1, 1);

            //const meshInstanceMatrix = meshMatrix.multiply( Matrix.Invert(meshInstanceRootMatrix));
            //const meshMatrix = mesh.matrix

            const nodeMatrix = node.computeWorldMatrix(true);

            let matrix = nodeMatrix;
            matrix = scaleMatrix.multiply(matrix);

            const meshInstanceRootMatrix = meshInstanceRoot.computeWorldMatrix(true);

            const meshMatrix = mesh.computeWorldMatrix(true);
            const meshMatrixRelInstanceRoot = meshMatrix.multiply(
                Matrix.Invert(instance.computeWorldMatrix(true)),
            );

            matrix = meshMatrixRelInstanceRoot.multiply(matrix);

            //let meshInstanceMatrix = scaleMatrix.multiply(meshInstanceRootMatrix);  // meshInstanceMatrix.multiply(meshMatrix);
            matrix = matrix.multiply(Matrix.Invert(meshInstanceRootMatrix));
            //console.debug("Creating instance: " + meshInstanceRoot.id);

            // TODO: Improve performance by not updating GPU buffers here (thinInstanceAdd), only in last call for this instanceRoot.
            meshInstanceRoot.thinInstanceAdd(matrix);

            meshInstanceRoot.freezeWorldMatrix();
        }

        node.parent = null;
        node.dispose();
    }

    instanceAsThinInstanceBuffers(key: string, root: Mesh, node: Mesh): void {
    //console.debug( "Creating thin instance buffers for: " + key );

        const instance = this.catalog[key];
        const meshes = instance.getChildMeshes();
        const metadataNode = node.metadata.gltf.extras;

        for (const mesh of meshes) {
            const metadata = mesh.metadata.gltf.extras;
            if (metadata["ddd:light:color"]) {
                // TODO: include the child instance
                continue;
            }

            // Get root
            const instanceRootKey = root.id + "_" + key + "_" + mesh.id; // root.id + "_" +  // TODO! do not clone but keep groups!
            let meshInstanceRoot = this.instanceRoots[instanceRootKey];
            if (!meshInstanceRoot) {
                //console.debug("Creating instanceroot for: " + instanceRootKey);
                instance.setEnabled(true);
                meshInstanceRoot = <Mesh>mesh.clone(instanceRootKey, null, true);
                meshInstanceRoot = meshInstanceRoot.makeGeometryUnique(); // Can we do this without cloning geometry? do thin instances work that way?

                const cloneMat = meshInstanceRoot.material;
                if (cloneMat) {
                    meshInstanceRoot.material = null;
                    cloneMat.dispose();
                }

                //meshInstanceRoot.metadata.gltf.extras['ddd:instance:key'] = "_MESH_INSTANCE_ROOT";  // WARN:seems this extras are being shared among instances

                // This section is critical. The bakeCurrentTransformIntoVertices in the middle may be too.
                // This transform works together with the meshinstance transform below.
                //meshInstanceRoot.toLeftHanded();
                //meshInstanceRoot.bakeCurrentTransformIntoVertices();
                //meshInstanceRoot.rotate(Vector3.Right(), Math.PI / 2);
                //meshInstanceRoot.rotate( Vector3.Up(), -Math.PI / 2 );
                //meshInstanceRoot.scaling = new Vector3( 1, -1, 1 );
                meshInstanceRoot.rotate(Vector3.Right(), -Math.PI / 2);
                meshInstanceRoot.rotate(Vector3.Up(), Math.PI);
                meshInstanceRoot.rotate(Vector3.Forward(), Math.PI);
                meshInstanceRoot.bakeCurrentTransformIntoVertices();
                //meshInstanceRoot.flipFaces(true);

                // Apply tht transformation (without baking) to the meshInstanceRoot, this
                // (somewhat surprisingly) combined with the instance matrix.
                meshInstanceRoot.rotate(Vector3.Up(), Math.PI);
                meshInstanceRoot.rotate(Vector3.Right(), -Math.PI / 2);
                meshInstanceRoot.scaling = new Vector3(1, -1, 1);

                this.instanceRoots[instanceRootKey] = meshInstanceRoot;
                meshInstanceRoot.parent = root;
                //meshInstanceRoot.position = root.computeWorldMatrix(true);  // Seems to cause problems, but should not :? (freezing may be involved)

                this.processMesh(meshInstanceRoot, meshInstanceRoot);

                // Enable shadows for the instances if shadows are set
                if (this.shadowGenerator) {
          this.shadowGenerator
              .getShadowMap()!
              .renderList!.push(meshInstanceRoot);
                }

                //meshInstanceRoot.setEnabled(false);
                // TODO: LOD should be controlled by DDD metadata, also, some LODding may be (better?) left to DDD format/renderer
                meshInstanceRoot.addLODLevel(300, null);

                instance.setEnabled(false);
                //instance.dispose();
            }

            const bufferMatrices = metadataNode["ddd:instance:buffer:matrices"];

            //console.debug("Thin instance buffers for: " + key + " / " + mesh.id + "  (" + (bufferMatrices.length / 16) + " matrices)" );

            // Transform each node (test only)
            // DEPRECATED: This is very slow, whereas directly loading the matrices is very fast.
            /*
            const adaptRotation = Quaternion.FromEulerAngles(-Math.PI / 2, Math.PI, 0);
            const adaptMatrix = Matrix.Compose( new Vector3( 1, -1, 1 ), adaptRotation, new Vector3( 0, 0, 0 )); //Matrix.Scaling(-1, 1, 1);
            for ( let i = 0; i < bufferMatrices.length; i += 16 ) {
                const nodeMatrix = Matrix.FromArray( bufferMatrices, i );
                //let matrix = adaptMatrix.multiply( nodeMatrix );
                let matrix = nodeMatrix.multiply(adaptMatrix);
                meshInstanceRoot.thinInstanceAdd( matrix );
            }
            */

            // Load all matrices directly into buffer
            const bufferMatricesArray = new Float32Array(bufferMatrices.length);
            bufferMatricesArray.set(bufferMatrices);
            meshInstanceRoot.thinInstanceSetBuffer(
                "matrix",
                bufferMatricesArray,
                16,
                true,
            );

            meshInstanceRoot.freezeWorldMatrix();
        }

        node.parent = null;
        node.dispose();
    }

    instanceAsNode(key: string, _root: Mesh, mesh: Mesh): void {
    //console.debug("Replacing mesh: " + key);
        const newMesh = new TransformNode(mesh.id + "_instance", this.scene); // new Mesh("chunk_" + tileKey, this.scene);
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
        if (!newMesh.metadata) {
            newMesh.metadata = {};
        }
        if (mesh.metadata && mesh.metadata.gltf) {
            newMesh.metadata.gltf = mesh.metadata.gltf;
            //newMesh.metadata.gltf.extras['ddd:instance:key'] = null;
        }
        mesh.dispose();
        this.catalog[key].setEnabled(true);
        const instance = this.catalog[key].clone(); // createInstance(mesh.id + "_instanced");
        this.catalog[key].setEnabled(false);
        instance.metadata.gltf.extras["ddd:instance:key"] = null;
        instance.id = mesh.id + "_clone";
        //instance.isVisible = true;
        instance.parent = newMesh;
        newMesh.rotate(new Vector3(1, 0, 0), Math.PI / 2, Space.LOCAL);
        instance.setEnabled(true);
    //mesh = newMesh;
    }

    /**
   * Dispose this DDDViewer instance.
   * @todo Ensure all events, processes and objects are disconnected and disposed.
   */
    dispose(): void {
        if (this.scene) {
            console.debug("Disposing SceneViewer scene.");
            this.scene.dispose();
            //this.scene = null;
        }
        if (this.engine) {
            console.debug("Disposing SceneViewer 3D engine (BabylonJS).");
            this.engine.dispose();
            //this.engine = null;
        }
    }

    /**
   * DDDViewer main update callback, this is called every frame by the engine.
   * Children object update method is called recursively from here (sequencer, processes, layers).
   * @param deltaTime
   */
    update(deltaTime: number): void {
        const positionWGS84 = this.positionWGS84();
        if (positionWGS84) {
            this.viewerState.positionWGS84 = positionWGS84;

            this.viewerState.positionTileZoomLevel = 17;
            if (this.viewerState.positionGroundHeight !== null && this.viewerState.positionGroundHeight < 50) {
                this.viewerState.positionTileZoomLevel = 18;
            }

            this.updateElevation();

            if (this.camera) {
                if (this.camera instanceof ArcRotateCamera) {
                    let heading = -90 + -this.camera.alpha * (180.0 / Math.PI);
                    heading = ((heading % 360) + 360) % 360;
                    this.viewerState.positionHeading = heading;

                    const tilt = this.camera.beta * (180.0 / 3.14159265359);
                    this.viewerState.positionTilt = tilt;
                } else if (this.camera instanceof TargetCamera) {
                    let heading = this.camera.rotation.y * (180.0 / Math.PI);
                    heading = ((heading % 360) + 360) % 360;
                    this.viewerState.positionHeading = heading;

                    const yaw = this.camera.rotation.x * (180.0 / 3.14159265359);
                    this.viewerState.positionTilt = 90.0 - yaw;
                }
            }
        }

        if (this.cameraController) {
            this.cameraController.update(deltaTime);
        }

        if (this.camera) {
            let positionScene = this.camera.position.asArray();
            positionScene = [ positionScene[0], positionScene[1], positionScene[2] ]; // Copy array
            this.viewerState.positionScene = positionScene;

            if (this.envReflectionProbe) {
                this.envReflectionProbe.position = this.camera.position.clone();
            }
        }

        this.updateSceneDatetime(deltaTime);
        this.sequencer.update(deltaTime);
        this.processes.update(deltaTime);
        this.layerManager.update(deltaTime);

        // Update render metrics
        this.viewerState.sceneFPS = this.engine.getFps(); // this.engine.getFps().toFixed( 1 );
        this.viewerState.sceneDrawCalls = this.sceneInstru
            ? this.sceneInstru.drawCallsCounter.current
            : 0;
        this.viewerState.sceneTriangles = this.sceneInstru
            ? this.scene.getActiveIndices() / 3
            : 0;
    }

    updateSceneDatetime(deltaTime: number) {
    // Run time
    // TODO: this currently requires a minimum elapsed time so Date.setSeconds work. This approach accumulates error.
        const updateInterval = 100; // 5000;
        const maxUpdateElapsed = 2000; // 2 sec
        const updateSceneTime = true;

        if (updateSceneTime) {
            const currentDateUpdate = new Date().getTime();

            if (currentDateUpdate - this.lastDateUpdate > updateInterval) {
                let updateElapsed = currentDateUpdate - this.lastDateUpdate;
                this.lastDateUpdate = currentDateUpdate;

                if (updateElapsed > maxUpdateElapsed) {
                    updateElapsed = maxUpdateElapsed;
                }
                let scaledElapsed = (updateElapsed / 1000) * this.viewerState.timeScale;
                // FIXME: Should use sun position, not hours (also, check with other time zones)
                if (this.viewerState.positionDate.getHours() < 5) {
                    scaledElapsed *= 3;
                } // Faster pace at night

                this.viewerState.positionDate.setSeconds(
                    this.viewerState.positionDate.getSeconds() + scaledElapsed,
                );
                this.viewerState.positionDateSeconds =
          this.viewerState.positionDate.getTime() / 1000;

                this.lightSetupFromDatePos();
            }
        }

    //this.skybox.computeWorldMatrix();  // only needed if scene.freezeActiveMeshes is true
    }

    sceneToWGS84(coords: number[]): number[] {
    //let wgs84Pos = this.originShiftWGS84;
    //const point = olProj.transform([coords[0], coords[2]], this.projection, 'EPSG:4326');
        const point = this.projection!.inverse([ coords[0], coords[2] ]);
        return [ point[0], point[1], coords[1] ];
    }

    wgs84ToScene(coords: number[]): number[] {
    //const point = olProj.transform(coords, 'EPSG:4326', this.projection);
        const point = this.projection!.forward(coords);

        return [ point[0], coords[2], point[1] ];
    }

    positionWGS84(): number[] {
        const scenePos = this.camera!.position.asArray();
        const wgs84Pos = this.sceneToWGS84([ scenePos[0], scenePos[1], scenePos[2] ]);
        return wgs84Pos;
    /*
        const extent = this.map.getView().calculateExtent(this.map.getSize());
        let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        */
    }

    parsePositionString(posString: string): ScenePosition {
    //console.debug("Parsing: " + posString);

        const result = new ScenePosition();

        try {
            // Parse at location
            //http://localhost:8080/maps/@42.1354407,-0.4126472,17.0z
            const href = posString;
            const regexp = /.*@([0-9.\\-]+),([0-9.\\-]+)((,(([0-9.\\-]+)[ayhtz]))*).*/;
            const matches = href.match(regexp);
            //console.debug(matches);

            if (matches && matches.length >= 3) {
                result.positionWGS84 = [ parseFloat(matches[2]), parseFloat(matches[1]) ];
            }
            if (matches && matches.length >= 4) {
                for (const match of matches[3].split(",")) {
                    if (match === "") {
                        continue;
                    }
                    const value = parseFloat(match.slice(0, -1));
                    const code = match.slice(-1);
                    if (code === "z") {
                        result.positionTileZoomLevel = value;
                    } else if (code === "a") {
                        result.positionGroundHeight = value;
                    } else if (code === "h") {
                        result.positionHeading = value;
                    } else if (code === "t") {
                        result.positionTilt = value;
                    }
                    //console.debug(value, code);
                }
            }
        } catch (e) {
            console.debug("Error parsing location from href: " + e);
        }

        //let positionWgs84 = this.getViewerState().positionWGS84;
        return result;
    }

    positionString(heightPrecision: number = 0): string | null {
    // TODO: This would not be a SceneViewer method, a utility module at most

        // /@43.2505933,5.3736631,126a,35y,20.08h,56.42t/
        const point = this.positionWGS84();
        //const zoom = this.map.getView().getZoom();

        //let heading = (this.camera.rotation.y * (180.0 / 3.14159265359));
        //heading = (heading % 360 + 360) % 360;
        const heading = this.viewerState.positionHeading;

        //let yaw = this.camera.rotation.x * (180.0 / 3.14159265359);
        const tilt = this.viewerState.positionTilt;

        //let height = this.camera.position.y;
        const groundHeight = this.viewerState.positionGroundHeight;
        if (groundHeight === null) {
            //return this.camera.position.y;
            return null;
        }

        let posString = "@" + point[1].toFixed(7) + "," + point[0].toFixed(7);

        const shortFormat = false;
        if (shortFormat) {
            posString = posString + "," + groundHeight.toFixed(heightPrecision) + "m"; // If heading and yaw is 0, GM uses 'm' (seem MSL m or Ground m)
        } else {
            posString = posString + "," + groundHeight.toFixed(heightPrecision) + "a"; // seems Ground M  ... (not WGS84 height (with EGM))
            posString = posString + "," + "35" + "y"; // ?
            posString = posString + "," + heading.toFixed(1) + "h"; // Heading
            posString = posString + "," + tilt.toFixed(2) + "t"; // Yaw (0 is vertical, 90 horizontal)
        }
        return posString;
    }

    /**
   * Calculates ground elevation (in MSL) for a given point in the scene. Receives a Vector3,
   * and uses its X and Z coordinates.
   *
   * FIXME: This is hitting objects other than the ground, check if masks can be used or otherwise correctly resolve ground elevation.
   *        Also the 3000m limit is arbitrary. Also fails when no ground objects are available.
   *        Also fails sometimes hitting invisible objects below ground (seems some non visible objects are being hit)
   */
    elevationMSLFromSceneCoords(
        coords: Vector3,
    ): [number | null, PickingInfo | null] {
        const ray = new Ray(
            new Vector3(coords.x, -100.0, coords.z),
            new Vector3(0, 1, 0),
            3000.0,
        );

        // This "pickWithRay" call sometimes fails with "Uncaught TypeError: Cannot read properties of undefined (reading 'subtractToRef') at Ray.intersectsTriangle()"
        let pickResult: PickingInfo | null = null;
        try {
            pickResult = this.scene.pickWithRay(ray);
        } catch (e) {
            console.debug(
                "Error picking scene with ray (in elevationMSLFromSceneCoords): " + e,
            );
            return [ null, null ];
        }

        let terrainElevation: number | null = null;
        //let terrainMesh: Mesh | null = null;

        if (
            pickResult &&
      pickResult.pickedMesh &&
      pickResult.pickedMesh.id !== "skyBox"
        ) {
            terrainElevation = pickResult.distance - 100.0;
            //terrainMesh = <Mesh> pickResult.pickedMesh;
        }

        return [ terrainElevation, pickResult ];
    }

    /**
   * This method is called internally to update altitude and position name.
   */
    private updateElevation(): void {
        if (!this.camera) return;

        const [ terrainElevation, terrainPickResult ] = this.elevationMSLFromSceneCoords(this.camera.position);

        if (terrainElevation && terrainPickResult) {
            // Update also position name if possible, from position metadata
            const terrainObjectRef = DDDObjectRef.fromMeshFace(
                <Mesh>terrainPickResult.pickedMesh,
                terrainPickResult.faceId,
            );
            const metadata = terrainObjectRef.getMetadata();
            if (metadata && metadata["osm:name"]) {
                this.viewerState.positionName = metadata["osm:name"];
            } else {
                this.viewerState.positionName = null;
            }

            this.viewerState.positionTerrainElevation = terrainElevation;
            this.viewerState.positionGroundHeight = this.camera.position.y - terrainElevation;
        } else {
            //this.viewerState.positionTerrainElevation = null;
        }
    }

    /*
    positionGroundHeight() {
        //const ray = new Ray(this.camera.position, new Vector3(0, -1, 0));
        const ray = new Ray(new Vector3(this.camera.position.x, -100.0, this.camera.position.z), new Vector3(0, 1, 0), 3000.0);
        const pickResult = this.scene.pickWithRay(ray);
        if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id !== 'skyBox') {
            //console.debug(pickResult.pickedMesh.id);
            return this.camera.position.y - (pickResult.distance - 100.0);
        } else {
            return null;
        }
    }

    positionTerrainElevation() {
        //const ray = new Ray(this.camera.position, new Vector3(0, -1, 0));
        const ray = new Ray(new Vector3(this.camera.position.x, -100.0, this.camera.position.z), new Vector3(0, 1, 0), 3000.0);
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

    /**
   * Untested
   * (from: https://gist.github.com/spite/051604efd1d971ab4b6ef1bc1ae2636e)
   */
    /*
    _getTileFromLatLon(zoom, lat, lon) {
        const width = Math.pow(2, zoom);
        const height = Math.pow(2, zoom);
        const latRad = (lat * Math.PI) / 180;
        const x = ~~((width * (lon + 180)) / 360);
        const y = ~~(((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2.0) * height);
        return {zoom, x, y};
    }
    */

    registerProjectionForCoords(coords: Coordinate): void {
        console.debug("Setting Scene Geo transform for coords: " + coords);

        // Get tile grid coordinates
        const coordsUtm = transform(coords, "EPSG:4326", "EPSG:3857");
        const tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);

        const tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
        const tileCenter = extent.getCenter(tileExtent);
        const tileCenterWGS84 = transform(tileCenter, "EPSG:3857", "EPSG:4326");

        // Using coords of tile center for custom projection as DDD does
        this.projection = proj4.default(
            "+proj=tmerc +lat_0=" + tileCenterWGS84[1] +
            " +lon_0=" + tileCenterWGS84[0] +
            " +k_0=1 " +
            "+x_0=0. +y_0=0. +datum=WGS84 +ellps=WGS84 " +
            "+towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
        );
    }

    deselectMesh(): void {
        if (this.sceneSelectedMeshId) {
            //this.viewerState.selectedMesh.showBoundingBox = false;

            for (const mesh of this.highlightMeshes) {
                mesh.dispose();
            }
            this.highlightMeshes = [];
            this.selectedMesh = null;
            this.viewerState.sceneSelectedMeshId = null;
        }
    }

    deselectObject(): void {
        if (this.selectedObject) {
            //this.viewerState.selectedMesh.showBoundingBox = false;

            for (const mesh of this.highlightMeshes) {
                mesh.dispose();
            }
            this.highlightMeshes = [];
            this.selectedMesh = null;
            this.selectedObject = null;
            this.viewerState.sceneSelectedMeshId = null;
        }
    }

    /**
   * Finds a mesh by id. Currently this also searches combined indexed meshes by path).
   * @param meshId
   * @param node
   */
    /*
    findMeshById( meshId: string, node: Mesh | null = null ): Mesh | null {
        let children = null;
        if ( node ) {
            const nodeUrlId = node.id.split( "/" ).pop()!.replaceAll( "#", "_" );
            if ( nodeUrlId === meshId ) {
                return node;
            }

            // Search in combined indexed nodes
            let metadata = DDDObjectRef.nodeMetadata(node);
            let combined = false;
            if (metadata) {
                if ('ddd:batch:indexes' in metadata)  {
                    combined = true;
                    const indexes = metadata['ddd:batch:indexes'];
                    // Find triangle in indexes
                    for (let i = 0; i < indexes.length; i++) {
                        if ('ddd:path' in metadata && metadata['ddd:path'] == meshId) {
                            return node;
                        }
                    }
                }
            }

            children = node.getChildren();
        } else {
            children = this.scene.rootNodes;
        }

        for ( const child of children ) {
            const result = this.findMeshById( meshId, <Mesh> child );
            if ( result !== null ) { return result; }
        }

        return null;
    }
    */

    /**
   * Finds an object by id.
   * TODO: Move to DDDObjectRef and just leave here a convenience method search the whole scene.
   * @param meshId
   * @param node
   */
    findObjectById(
        objectId: string,
        objectRef: DDDObjectRef | null = null,
    ): DDDObjectRef | null {
        
        let children = null;

        if (objectRef) {
            //console.debug(DDDObjectRef.urlId(objectId), objectRef.getUrlId());
            if (objectRef.getUrlId() === DDDObjectRef.urlId(objectId)) {
                return objectRef;
            }

            children = objectRef.getChildren();
        } else {
            children = this.scene.rootNodes.map((o) => new DDDObjectRef(o));
        }

        for (const child of children) {
            const result = this.findObjectById(objectId, child);
            if (result !== null) {
                return result;
            }
        }

        return null;
    }

    selectObject(objectRef: DDDObjectRef, highlight: boolean = true): void {
        this.deselectObject();

        if (!objectRef) return;

        this.selectedObject = objectRef;
        this.viewerState.sceneSelectedMeshId = objectRef.mesh.id;
        //this.viewerState.selectedMesh.showBoundingBox = true;
        //console.debug(this.viewerState.selectedMesh.metadata.gltf.extras);

        if (highlight) {
            // Highlight
            //that.highlightLayer.addMesh(pickResult.pickedMesh, Color3.White()); // , true);
            //pickResult.pickedMesh.material = that.materialHighlight;

            // Prepare the wireframe mesh
            // To disable depth test check rendering groups:  https://forum.babylonjs.com/t/how-do-i-disable-depth-testing-on-a-mesh/1159
            let highlightClone = null;
            if (this.selectedObject.faceIndexStart > -1) {
                highlightClone = (<Mesh>objectRef.mesh).clone(); // "highlightMesh: " + objectRef.mesh.id, objectRef.mesh.parent, true, false);
                highlightClone.makeGeometryUnique();
                const indices = highlightClone.getIndices(); // true, true);
                //highlightClone.unfreezeWorldMatrix();
                //highlightClone.unfreezeNormals();
                const newIndices = (<IndicesArray>indices).slice(
                    this.selectedObject.faceIndexStart * 3,
                    this.selectedObject.faceIndexEnd * 3,
                );
                /*
                let newIndices: number[] = [];
                for (let i = this.selectedObject.faceIndexStart * 3; i < this.selectedObject.faceIndexEnd * 3; i++) {
                    newIndices.push(indices[i]);
                }
                */
                highlightClone.setIndices(newIndices);
            } else {
                //console.debug(objectRef.mesh);
                highlightClone = (<Mesh>objectRef.mesh).clone(
                    objectRef.mesh.id + " Selection",
                    objectRef.mesh.parent,
                    true,
                    false,
                ); // "highlightMesh: " + objectRef.mesh.id, objectRef.mesh.parent, true, true);

                /*
                const newMesh = new TransformNode( highlightClone.id + "_pivot", this.scene );  // new Mesh("chunk_" + tileKey, this.scene);
                //let newMesh = mesh;
                //newMesh.geometry = null;
                newMesh.parent = objectRef.mesh.parent;
                newMesh.position = (<Mesh>objectRef.mesh).position.clone();
                newMesh.rotationQuaternion = (<Mesh>objectRef.mesh).rotationQuaternion!.clone();
                newMesh.scaling = (<Mesh>objectRef.mesh).scaling;
                highlightClone.parent = newMesh;
                highlightClone = newMesh;
                */
            }

            highlightClone.material = this.materialHighlight;
            highlightClone.isPickable = false;
            //highlightClone.parent = objectRef.mesh.parent;
            this.highlightMeshes.push(highlightClone);

            if (this.viewerState.sceneSelectedShowNormals) {
                const normals = this.showNormals(highlightClone, 0.5);
                if (normals) {
                    normals.parent = highlightClone;
                    this.highlightMeshes.push(normals);
                }
            }

            // This is currently NOT selecting children.
            // Note, however, that combined items may be selected together if the "combined" node is selected.

            /*
            // Iterate clone recursively to set highlight material to all submeshes
            const setHighlightRecursively = ( submesh: Mesh ) => {
                submesh.material = this.materialHighlight;
                let highlightNode = submesh.clone("highlight", submesh.parent, true, false);

                for ( const mc of submesh.getChildren()) {
                    setHighlightRecursively( <Mesh> mc );
                }
                return highlightNode;
            };
            highlightClone = setHighlightRecursively( (<Mesh> objectRef.mesh) );
            */
        }
    }

    // Vertex normals
    showNormals(mesh: Mesh, size: number = 1, color: Color3 | null = null) {
        if (!mesh.getVerticesData) return null;
        const normals = <FloatArray>mesh.getVerticesData(VertexBuffer.NormalKind);
        if (!normals) return null;

        const positions = <FloatArray>(
      mesh.getVerticesData(VertexBuffer.PositionKind)
    );
        color = color || Color3.Red();
        size = size || 1;

        const lines = [];
        for (let i = 0; i < normals.length; i += 3) {
            const v1 = Vector3.FromArray(positions, i);
            const v2 = v1.add(Vector3.FromArray(normals, i).scaleInPlace(size));
            lines.push([ v1.add(mesh.position), v2.add(mesh.position) ]);
        }
        const normalLines = MeshBuilder.CreateLineSystem(
            "normalLines",
            { lines: lines },
            this.scene,
        );
        normalLines.color = color;
        return normalLines;
    }

    selectMesh(mesh: Mesh, highlight: boolean): void {
        this.deselectMesh();

        if (mesh) {
            this.selectedMesh = mesh;
            this.viewerState.sceneSelectedMeshId = mesh.id;
            //this.viewerState.selectedMesh.showBoundingBox = true;
            //console.debug(this.viewerState.selectedMesh.metadata.gltf.extras);

            if (highlight) {
                // Highlight
                //that.highlightLayer.addMesh(pickResult.pickedMesh, Color3.White()); // , true);
                //pickResult.pickedMesh.material = that.materialHighlight;
                //pickResult.pickedMesh.material = that.materialGrass;

                // Prepare the wireframe mesh
                // To disable depth test check rendering groups:  https://forum.babylonjs.com/t/how-do-i-disable-depth-testing-on-a-mesh/1159
                const highlightClone = mesh.clone();

                // Iterate clone recursively to set highlight material to all submeshes
                const setHighlightRecursively = (submesh: Mesh) => {
                    submesh.material = this.materialHighlight;
                    for (const mc of submesh.getChildren()) {
                        setHighlightRecursively(<Mesh>mc);
                    }
                };
                setHighlightRecursively(highlightClone);

                //highlightClone.material = this.materialHighlight;
                highlightClone.parent = mesh.parent;
                this.highlightMeshes.push(highlightClone);
            }
        }
    }

    getBoundsRecursively(node: Mesh, bounds?: BoundingInfo): BoundingInfo {
        if (!bounds) {
            //bounds = { minimumWorld: { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY },
            //    maximumWorld: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY, z: Number.NEGATIVE_INFINITY } };
            bounds = new BoundingInfo(
                new Vector3(
                    Number.POSITIVE_INFINITY,
                    Number.POSITIVE_INFINITY,
                    Number.POSITIVE_INFINITY,
                ),
                new Vector3(
                    Number.NEGATIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                    Number.NEGATIVE_INFINITY,
                ),
            );
        }
        if (node.getBoundingInfo) {
            const minWorld = node.getBoundingInfo().boundingBox.minimumWorld;
            const maxWorld = node.getBoundingInfo().boundingBox.maximumWorld;
            if (bounds.minimum.x > minWorld.x) {
                bounds.minimum.x = minWorld.x;
            }
            if (bounds.minimum.y > minWorld.y) {
                bounds.minimum.y = minWorld.y;
            }
            if (bounds.minimum.z > minWorld.z) {
                bounds.minimum.z = minWorld.z;
            }
            if (bounds.maximum.x < maxWorld.x) {
                bounds.maximum.x = maxWorld.x;
            }
            if (bounds.maximum.y < maxWorld.y) {
                bounds.maximum.y = maxWorld.y;
            }
            if (bounds.maximum.z < maxWorld.z) {
                bounds.maximum.z = maxWorld.z;
            }
        }

        for (const nc of node.getChildren()) {
            bounds = this.getBoundsRecursively(<Mesh>nc, bounds);
        }
        return bounds;
    }

    /*
   * Find a node within a scene or node recursively.
   * Criteria is a dictionary of key=value pairs. An object will match if any of the pairs matches object's metadata.
   */
    findNode(node: Mesh, criteria: { [key: string]: any }): Mesh | null {
    //console.debug(node);
        if (criteria["_node_name"] && node.id) {
            const name = node.id.split("/").pop()!.replaceAll("#", "_");
            if (name === criteria["_node_name"]) {
                return node;
            }
        }
        if (node.metadata && node.metadata.gltf && node.metadata.gltf.extras) {
            const metadata = node.metadata.gltf.extras;
            for (const key in criteria) {
                if (metadata[key] === criteria[key]) {
                    return node;
                }
            }
        }
        for (const sn of node.getChildren()) {
            const result = this.findNode(<Mesh>sn, criteria);
            if (result) {
                return result;
            }
        }
        return null;
    }

    initCamera(): Camera {
        if (this.camera) {
            this.camera.customRenderTargets.length = 0; //4 = [];
            this.camera.detachControl();
            this.camera.dispose();
        }

        console.debug("Creating free camera.");
        const camera = new UniversalCamera("Camera", Vector3.Zero(), this.scene);
        camera.detachControl(); // Controls managed by DDD CameraController

        camera.minZ = 0.5; // 1.0; // 0.1;
        camera.maxZ = 4500;
        camera.angularSensibility = 500.0;
        camera.touchAngularSensibility = 1000.0;
        //camera.touchMoveSensibility = 1.0;
        camera.inertia = 0.25;
        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);
        camera.keysUpward.push(69);
        camera.keysDownward.push(81);
        camera.attachControl(this.engine.getRenderingCanvas(), true);
        camera.fov = 45.8 * (Math.PI / 180.0); // 35.0 might be GM, 45.8... is default  // 35 // 40 used for a long time
        const positionScene = this.wgs84ToScene(this.viewerState.positionWGS84);
        camera.position = new Vector3(
            positionScene[0],
            this.viewerState.positionGroundHeight +
        this.viewerState.positionTerrainElevation +
        1,
            positionScene[2],
        );
        camera.rotation = new Vector3(
            (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0),
            this.viewerState.positionHeading * (Math.PI / 180.0),
            0.0,
        );
        //camera.cameraRotation = new Vector2(/* (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0) */ 0, this.viewerState.positionHeading * (Math.PI / 180.0));
        this.camera = camera;
        this.setMoveSpeed(this.viewerState.sceneMoveSpeed);

        this.updateRenderTargets();
        if (this.shadowGenerator) {
            this.shadowGenerator.splitFrustum();
        }

        return camera;
    }

    setCameraController(cc: BaseCameraController) {
        this.cameraController = cc;
        this.cameraController.activate();
    }

    setPosition(
        positionHeading: number,
        positionTilt: number,
        positionGroundHeight: number,
    ) {
        console.warn(
            "setPosition implementation is invalid, for testing purposes.",
        );
        const positionScene = this.wgs84ToScene(this.viewerState.positionWGS84);
        this.camera.position = new Vector3(
            positionScene[0],
            this.viewerState.positionGroundHeight +
        this.viewerState.positionTerrainElevation +
        1,
            positionScene[2],
        );
        (<UniversalCamera>this.camera).rotation = new Vector3(
            (90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0),
            this.viewerState.positionHeading * (Math.PI / 180.0),
            0.0,
        );
    }

    updateRenderTargets(): void {
        if (this.camera && this.envReflectionProbe) {
            this.camera.customRenderTargets.push(this.envReflectionProbe.cubeTexture);
        }
    //this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", this.camera);
    }

    groundTextureLayerSetUrl(url: string): void {
    // TODO: This shall not be a global viewer setting, but a layer setting
    // This method is keep here for compatibility during TS migration / refactoring

        this.viewerState.sceneGroundTextureOverrideUrl = url;
        (<GeoTile3DLayer>(
      this.layerManager.layers["ddd-osm-3d"]
    )).groundTextureLayerSetUrl(url);
    }

    setMoveSpeed(speed: number): void {
        this.viewerState.sceneMoveSpeed = speed;
        if (this.camera && this.camera instanceof TargetCamera) {
            this.camera.speed = speed;
        }
    }

    lightSetupFromDatePos(): void {
    //this.envReflectionProbe.update(); // = new ReflectionProbe("envReflectionProbe", 128, this.scene, true, true, true)
    //this.envReflectionProbe.renderList.push(this.skyBox);
    //this.scene.environmentTexture = this.envReflectionProbe.cubeTexture;

        //console.debug(this.envReflectionProbe.cubeTexture.readPixels(0, 0));
        const lightDate = new Date(this.viewerState.positionDate.getTime());
        const lightSecondsOffsetTimezone =
      (this.viewerState.positionWGS84[0] / 180.0) * (12 * 3600);
        lightDate.setSeconds(lightDate.getSeconds() - lightSecondsOffsetTimezone);
        const times = SunCalc.getTimes(
            lightDate,
            this.viewerState.positionWGS84[1],
            this.viewerState.positionWGS84[0],
        );

        const sunriseStr =
      times.sunrise.getHours() + ":" + times.sunrise.getMinutes();
        const sunsetStr = times.sunset.getHours() + ":" + times.sunset.getMinutes();

        // get position of the sun (azimuth and altitude) at today's sunrise
        ///*var sunrisePos = SunCalc.getPosition(times.sunrise, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
        //var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
        //var sunsetSunPos = SunCalc.getPosition(times.sunset, this.viewerState.positionWGS84[1], this.viewerState.positionWGS84[0]);
        //var sunsetAzimuth = sunsetPos.azimuth * 180 / Math.PI; **

        const currentSunPos = SunCalc.getPosition(
            lightDate,
            this.viewerState.positionWGS84[1],
            this.viewerState.positionWGS84[0],
        ); // , this.viewerState.positionScene[1]
        const currentMoonPos = SunCalc.getMoonPosition(
            lightDate,
            this.viewerState.positionWGS84[1],
            this.viewerState.positionWGS84[0],
        );
        //var crrentMoonIlum = SunCalc.getMoonIllumination(this.viewerState.positionDate);

        //var currentPos = currentSunPos.altitude > 0 ? currentSunPos : currentMoonPos;

        //var currentElevation = currentPos.altitude * 180 / Math.PI;
        //var currentAzimuth = currentPos.azimuth * 180 / Math.PI;
        //console.debug("Sun azimuth: " + currentAzimuth + " ele: " + currentElevation + " Date: " + this.viewerState.positionDate + " Sunrise: " + sunriseStr + " azimuth: " + sunriseAzimuth + " Sunset: " + sunsetStr + " azimuth: " + sunsetAzimuth);

        const altitudeLessHorizonAtmAprox =
      ((currentSunPos.altitude + 0.25) / (Math.PI + 0.25)) * Math.PI; // 0.25~15rad
        let sunlightAmountNorm = Math.sin(altitudeLessHorizonAtmAprox);
        if (sunlightAmountNorm < 0) {
            sunlightAmountNorm = 0;
        }
        sunlightAmountNorm = 1 - Math.pow(1 - sunlightAmountNorm, 4);

        //let lightAltitude = altitudeLessHorizonAtmAprox >= 0 && altitudeLessHorizonAtmAprox < Math.PI ? altitudeLessHorizonAtmAprox : Math.PI - altitudeLessHorizonAtmAprox;
        const sunAltitude =
      currentSunPos.altitude >= 0 ? currentSunPos.altitude : 0.01;
        const lightRot = Quaternion.FromEulerAngles(
            sunAltitude,
            currentSunPos.azimuth,
            0,
        ); // Use moon
        const lightSunAndFlareRot = Quaternion.FromEulerAngles(
            sunAltitude,
            currentSunPos.azimuth,
            0,
        );

        //this.light = new DirectionalLight("light", new Vector3(0.3, -0.5, 0.5).normalizeToNew(), this.scene);
        //this.light.diffuse = new Color3(0.95, 0.95, 1.00);
        //this.light.specular = new Color3(1, 1, 0.95);
        const minLightDay = 0.0;
        const maxLightDay = 1.1; // 3.0;

        // Set light dir and intensity
        Vector3.Forward().rotateByQuaternionToRef(lightRot, this.light!.direction);
        const lightIntensity =
      minLightDay + (maxLightDay - minLightDay) * sunlightAmountNorm;
    //console.debug("Sunlight amount norm: " + sunlightAmountNorm + " lightIntensity: " + lightIntensity);
    this.light!.intensity = lightIntensity;

    /*
        if (this.scene.environmentTexture) {
            this.scene.environmentTexture.level = 0.1 + sunlightAmountNorm; // = hdrTexture;
        }
        Color3.LerpToRef(this.ambientColorNight, this.ambientColorDay, sunlightAmountNorm, this.scene.ambientColor);
        */

    if (this.skybox) {
        this.skybox.rotation.y = currentSunPos.azimuth - 19 * (Math.PI / 180.0);
    }

    const skyboxMinReflectionLevel = 0.05;
    const environmentIntensityMax = 1.2;

    if (
        this.skybox &&
      this.skybox.material &&
      this.skybox.material instanceof StandardMaterial
    ) {
      (<StandardMaterial>this.skybox.material).reflectionTexture!.level =
        skyboxMinReflectionLevel + sunlightAmountNorm;
    }

    this.scene.environmentIntensity =
      skyboxMinReflectionLevel + sunlightAmountNorm * environmentIntensityMax;

    if (this.skybox) {
        const shaderMaterial: ShaderMaterial | null = <ShaderMaterial | null>(
        this.scene.getMaterialByName("skyShader")
      );
        if (shaderMaterial) {
            shaderMaterial.setFloat(
                "time",
                (this.viewerState.positionDate.getTime() % 100000000.0) / 500000.0,
            );
            if (currentSunPos.altitude > 0) {
                shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
            } else if (currentMoonPos.altitude > 0) {
                //shaderMaterial.setFloat("suny", -Math.sin(currentMoonPos.altitude));
                shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
            } else {
                //shaderMaterial.setFloat("suny", 0);
                shaderMaterial.setFloat("suny", Math.sin(currentSunPos.altitude));
            }
            //shaderMaterial.setFloat( "sunx", ( currentSunPos.azimuth - ( Math.PI / 2.0 )) / Math.PI );
            shaderMaterial.setFloat(
                "sunx",
                (19 * (Math.PI / 180.0) - Math.PI / 2.0) / Math.PI,
            );
        }
    }

    if (this.lensFlareSystem) {
        Vector3.Forward().rotateByQuaternionToRef(
            lightSunAndFlareRot,
            this.lensFlareSystem.getEmitter().position,
        );
        this.lensFlareSystem.getEmitter().position.scaleInPlace(-1400.0);
        this.lensFlareSystem
            .getEmitter()
            .position.addInPlace(this.camera!.position);
        this.lensFlareSystem.setEmitter(this.lensFlareSystem.getEmitter());

        const flareEnabled = currentSunPos.altitude > 0;
        if (this.lensFlareSystem.isEnabled !== flareEnabled) {
            this.lensFlareSystem.isEnabled = flareEnabled;
        }
    }

    // Update light position for correct shadows calculation
    // TODO: This shall not be done as part of datetime/sun update, as it is needed even if time is not moving
    Vector3.Forward().rotateByQuaternionToRef(
        lightSunAndFlareRot,
      this.light!.position,
    );
    this.light!.position.scaleInPlace(-1400.0);
    this.light!.position.addInPlace(this.camera!.position);
    this.light!.position = this.light!.position;

    //console.debug(this.scene.ambientColor);

    // Lamps
    const lampMatOn = sunlightAmountNorm < 0.35; // 0.3 fits, but turn off too quick
    if (lampMatOn !== this._previousLampPatOn) {
        this._previousLampPatOn = lampMatOn;
        if ("LightLampOff" in this.catalog_materials) {
            const lampMat: StandardMaterial = <StandardMaterial>(
          this.catalog_materials["LightLampOff"]
        );
            lampMat.unfreeze();
            if (lampMatOn) {
                lampMat.emissiveColor = this.colorLightLamp;
            } else {
                lampMat.emissiveColor = Color3.Black();
            }
        //lampMat.freeze();
        }
    }

    const semCycleSeconds = 20;
    let semColor =
      (this.viewerState.positionDate.getMinutes() % semCycleSeconds) /
      semCycleSeconds;
    semColor = semColor < 0.5 ? 0 : semColor < 0.9 ? 1 : 2;
    if ("LightRed" in this.catalog_materials) {
        const lampMat: StandardMaterial = <StandardMaterial>(
        this.catalog_materials["LightRed"]
      );
        lampMat.unfreeze();
        lampMat.emissiveColor =
        semColor === 0 ? this.colorLightRed : Color3.Black();
        //lampMat.freeze();
    }
    if ("LightGreen" in this.catalog_materials) {
        const lampMat: StandardMaterial = <StandardMaterial>(
        this.catalog_materials["LightGreen"]
      );
        lampMat.unfreeze();
        lampMat.emissiveColor =
        semColor === 1 ? this.colorLightGreen : Color3.Black();
    }
    if ("LightOrange" in this.catalog_materials) {
        const lampMat: StandardMaterial = <StandardMaterial>(
        this.catalog_materials["LightOrange"]
      );
        lampMat.unfreeze();
        lampMat.emissiveColor =
        semColor === 2 ? this.colorLightOrange : Color3.Black();
        //lampMat.freeze();
    }
    }

    sceneShadowsSetEnabled(value: boolean): void {
        this.viewerState.sceneShadowsEnabled = value;
        localStorage.setItem("dddSceneShadowsEnabled", JSON.stringify(value));

        // TODO: If shadows were off, we'd still need to create the shadowgenerator and add shadow casters
        this.scene.shadowsEnabled = value;

        // TODO: this persistent setting belongs to the app
        alert("Reload the viewer for changes to take effect.");
    }

    sceneTextsSetEnabled(value: boolean): void {
        this.viewerState.sceneTextsEnabled = value;
        localStorage.setItem("dddSceneTextsEnabled", JSON.stringify(value));

        // TODO: this persistent setting belongs to the app
        alert("Reload the viewer for changes to take effect.");
    }

    /**
   */
    loadTextures(): void {
        const textures = this.viewerState.dddConfig.materialsTextureSet;
        const splatmap = this.viewerState.dddConfig.materialsSplatmap;

        console.debug(
            "Loading textures: " + textures + " (splatmap: " + splatmap + ")",
        );

        if (textures !== null) {
            this.loadCatalog(
                this.viewerState.dddConfig.assetsUrlbase +
          "/catalog_materials-" +
          textures +
          ".glb",
                true,
            );
        }

        if (splatmap) {
            console.info("Loading splatmap textures.");
            this.useSplatMap = true;
            const atlasTextureUrl =
        this.viewerState.dddConfig.assetsUrlbase +
        "/splatmap-textures-atlas-" +
        splatmap +
        ".png";
            const atlasNormalsTextureUrl =
        this.viewerState.dddConfig.assetsUrlbase +
        "/splatmap-textures-atlas-normals-" +
        splatmap +
        ".png";
            this.splatmapAtlasTexture = new Texture(
                atlasTextureUrl,
                this.scene,
                false,
                true,
                Texture.NEAREST_NEAREST_MIPLINEAR,
            ); // , Texture.NEAREST_SAMPLINGMODE);
            this.splatmapAtlasNormalsTexture = new Texture(
                atlasNormalsTextureUrl,
                this.scene,
                false,
                true,
                Texture.NEAREST_NEAREST_MIPLINEAR,
            );
        } else {
            this.useSplatMap = false;
        }
    }

    /**
   * Changes the materials set used to draw the scene.
   * @todo this would ideally belong to layers that explicity support DDD export features (splatmaps / texture catalogs)
   * @param textureSet
   */
    sceneTextureSet(textureSet: string | null, splatmap: number): void {
        this.viewerState.dddConfig.materialsTextureSet = textureSet;
        this.viewerState.dddConfig.materialsSplatmap = splatmap;

        //if (textureSet) {
        this.loadTextures();
        //}

        alert("Reload the app to apply changes.");
    }
}

export { SceneViewer };
