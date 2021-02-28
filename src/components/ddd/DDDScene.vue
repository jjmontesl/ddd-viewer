<template>

    <div style="width: 100%; height: 100px; position: relative; z-index: 0;">
        <canvas class="ddd-scene" id="ddd-scene" style="width: 100%; outline:none; height: 100px;">
        </canvas>
    </div>

</template>

<script>

/* eslint-disable no-unused-vars, no-var, no-undef, no-debugger, no-console,  */

//import * as earcut from "earcut"
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import * as BABYLON from 'babylonjs';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';


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
  props: [
      'viewerState',
  ],
  destroyed() {
      if (this.scene) {
          console.debug("Disposing BabylonJS scene.");
          this.scene.dispose();
          this.scene = null;
      }
      window.removeEventListener('resize', this.resize);
  },
  mounted() {
    console.debug('Creating 3D scene.');

    const that = this;

    this.camera = null;
    this.originShiftWgs84 = [0, 0];
    this.tiles = {};

    this.tileGrid = createXYZ({
        extent: extentFromProjection('EPSG:3857'),
        //maxResolution: options.maxResolution,
        //maxZoom: options.maxZoom,
        //minZoom: options.minZoom,
        //tileSize: options.tileSize,
    });

    setTimeout(() => {

        // Get the canvas element from the DOM.
        const canvas = document.getElementById('ddd-scene');
        //const canvas = that.$el.querySelector('.ddd-scene');
        //const canvas = document.getElementById("renderCanvas");


        // Associate a Babylon Engine to it.
        const engine = new BABYLON.Engine(canvas);
        that.engine = engine;

        that.scene = new BABYLON.Scene(engine);
        //that.scene = createScene(engine, canvas);

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
        //camera.cameraRotation = new BABYLON.Vector2(Math.PI * 0.495, Math.PI * 0.5);
        camera.cameraRotation = new BABYLON.Vector2(Math.PI * 0.495, 0);
        that.camera = camera;

        that.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), that.scene);

        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        //BABYLON.SceneLoader.ImportMesh('', '', https://models.babylonjs.com/', 'alien.glb', that.scene, function (newMeshes) {
        //    console.debug("Preparing model.");
        //    that.scene.createDefaultCameraOrLight(true);
        //    that.scene.activeCamera.attachControl(canvas, false);
        //    that.scene.activeCamera.alpha += Math.PI; // camera +180°
        //});

        //console.debug(that.viewerState);
        let coords = that.viewerState.positionWGS84;
        that.loadTileForCoords(coords);

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


        const height = window.innerHeight - 40;
        //console.debug("Resizing 3D canvas: " + height);
        that.$el.querySelector('.ddd-scene').style.height = height + "px";
        if (that.$el.querySelector('canvas')) { that.$el.querySelector('canvas').height = height; }
        //this.map.updateSize();


        // Render every frame
        engine.runRenderLoop(() => {
            if (! that.scene) { return; }
            that.scene.render();
            that.update();
        });

        // Events
        canvas.addEventListener("click", function () {

            // Easy way of computing dragging (still clicks if mouse is stopped before button release
            if (camera.inertialAlphaOffset || camera.inertialBetaOffset) {
                return;
            }
            event.preventDefault();

            var pickResult = that.scene.pick(that.scene.pointerX, that.scene.pointerY);

            console.debug("Scene click: " + pickResult.pickedMesh.id);
            //console.log(pickResult.pickedMesh.id);
            console.log(pickResult);

            // Direct to /3d/mesh/
            //const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
            //const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);
            //const posString = this.positionString();

            if (pickResult.pickedMesh.id === "skyBox") {
                that.$router.push('/3d/pos/').catch(()=>{});
                return;
            } else {
                that.$router.push('/3d/item/' + pickResult.pickedMesh.id).catch(()=>{});
                //that.$router.push('/3d/item/test/').catch(()=>{});
                return;
            }
        });


        // Events
        window.addEventListener('resize', that.resize);
        // Resize initially
        setTimeout(() => { that.resize(); }, 100);

    }, 0);

  },

  methods: {

      resize: function() {
        const height = window.innerHeight - 40;
        //console.debug("Resizing map: " + height);
        this.$el.querySelector('.ddd-scene').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        this.engine.resize();
      },

      addLayer: function(layer) {
          console.debug("Adding layer: " + layer);
      },

      sceneToWGS84: function(coords) {
          //let wgs84Pos = this.originShiftWgs84;
          const point = olProj.transform([coords[0], coords[2]], 'DDDCUSTOM:0', 'EPSG:4326');
          return [point[0], point[1], coords[1]];
      },

      wgs84ToScene: function(coords) {
          const point = olProj.transform(coords, 'EPSG:4326', 'DDDCUSTOM:0');
          return [point[0], coords[2], point[1]];
      },

      positionWGS84: function() {
        const scenePos = this.camera.position.asArray();
        //console.debug(scenePos);
        const wgs84Pos = this.sceneToWGS84(scenePos);
        return wgs84Pos;
        /*
        const extent = this.map.getView().calculateExtent(this.map.getSize());
        let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        */

      },

      update: function() {

          // Update position so it is reactively updated
          let positionWgs84 = this.positionWGS84();
          this.$emit('dddPosition', positionWgs84, 17);
          let positionScene = this.camera.position.asArray();
          this.$emit('dddScenePosition', [positionScene[0], positionScene[2], positionScene[1]]);

          // Load tiles dynamically with the new position
          this.loadTilesDynamic();

      },

      loadTilesDynamic: function() {
          const coordsUtm = olProj.transform(this.positionWGS84(), 'EPSG:4326', 'EPSG:3857');
          const tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);

          const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];
          if (!(tileKey in this.tiles)) {
              console.debug("Dynamically loading: " + tileKey);
              this.loadTile(tileCoords);
          }
      },

      loadTileForCoords: function(coords) {
          // Get tile grid coordinates
          const coordsUtm = olProj.transform(coords, 'EPSG:4326', 'EPSG:3857');
          const tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);

          let tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
          let tileCenter = extent.getCenter(tileExtent);
          const tileCenterUtm = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');

          // Using coords of tile center for custom projection as DDD does
          this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);
          proj4.defs('DDDCUSTOM:0',
              '+proj=tmerc +lat_0=' + tileCenterUtm[1] + ' +lon_0=' + tileCenterUtm[0] + ' +k_0=1 ' +
              '+x_0=0. +y_0=0. +datum=WGS84 +ellps=WGS84 ' +
              '+towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
          register(proj4);

          this.loadTile(tileCoords);

      },

      loadTile: function(tileCoords) {

        //console.debug(tileCoords);
        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];

        const tileKey = z + "/" + x + "/" + y;
        if (tileKey in this.tiles) {
            return;
        } else {
            this.tiles[tileKey] = "LOADING";
        }

        //const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
        //const tileUrl = "./scenes/ddd-model.glb";
        //const glb = "https://www.yourcityracing.com/static/game/larochelle_150r_-1.153,46.155.glb";
        //const glb = new File([""], "scene.glb", {type: "application/octect-stream"})

        //const tileUrlBase = './scenes/ddd_http_';
        const tileUrlBase = 'http://localhost:8000/cache/ddd_http/';
        const tileUrl = tileUrlBase + z + "/" + x + "/" + y + ".glb";

        const that = this;

        console.debug("Loading: " + tileUrl);

        let pivot = new BABYLON.TransformNode("chunk_" + tileKey, this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
        let reversePivot = new BABYLON.TransformNode("chunk_reverse_" + tileKey, this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
        reversePivot.scaling = new BABYLON.Vector3(1, 1, -1);  // Babylon uses a parent node with this scale to flip glTF models, redone here
        reversePivot.parent = pivot;
        //pivot.parent = this.scene;

        //let model = await BABYLON.SceneLoader.ImportMeshAsync("", "", tileUrl);
        //BABYLON.SceneLoader.ImportMesh('', '', tileUrl, this.scene, //this.scene,
         BABYLON.SceneLoader.ImportMesh(null, '', tileUrl, this.scene, //this.scene,
            // onSuccess
            function(newMeshes) {
                console.log("GLB loaded", newMeshes);
                newMeshes.forEach((mesh, i) => {
                    //if(mesh.material) {
                    //    mesh.overrideMaterialSideOrientation = BABYLON.Mesh.DOUBLESIDE;
                    //    mesh.updateMeshPositions();
                    //}
                    mesh.parent = reversePivot;
                });
                that.tiles[tileKey] = pivot;

                let tileExtent = that.tileGrid.getTileCoordExtent(tileCoords);
                let tileCenter = extent.getCenter(tileExtent);
                const tileCenterScene = olProj.transform(tileCenter, 'EPSG:3857', 'DDDCUSTOM:0');

                //let distance = 225.0;
                //pivot.position = new BABYLON.Vector3((x - 62360) * distance, 0, -(y - 48539) * distance);
                pivot.position = new BABYLON.Vector3(tileCenterScene[0], 0, tileCenterScene[1]);
            },

            // onProgress
            function(event) {
                console.log("Tile model (.glb) loading: ", (event.loaded) )
            },
            // onError
            function(event) {
                console.log("Tile model (.glb) loading error: ", event)
            }
        );
        //model.parent = pivot;


      }
  }

}
</script>
