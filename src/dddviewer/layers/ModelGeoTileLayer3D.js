
import * as BABYLON from 'babylonjs';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import * as olProj from 'ol/proj';
import * as extent from 'ol/extent';
import 'babylonjs-loaders';


export default class {

    constructor() {
        this.tiles = {};
        this.layerManager = null;

        this._lastHeight = 0;  // Used to hack positioning of tiles before height is known
        this._lastLoadDynamic = 0;

        this._tilesLoadedCount = 0;
        this._initialHeightSet = false;

        // TODO: This makes sense here, but is also duplicated on SceneViewer
        this.tileGrid = createXYZ({
            extent: extentFromProjection('EPSG:3857'),
            //maxResolution: options.maxResolution,
            //maxZoom: options.maxZoom,
            //minZoom: options.minZoom,
            //tileSize: options.tileSize,
        });
    }

    update() {
        this.loadTilesDynamic();
    }


    /*
    * From: https://bartwronski.com/2017/04/13/cull-that-cone/
    */
    testConeSphere(origin, forward, size, angle, sphereCenter, sphereRadius) {

        const V = sphereCenter.subtract(origin);
        const VlenSq = BABYLON.Vector3.Dot(V, V);
        const V1len = BABYLON.Vector3.Dot(V, forward);
        const distanceClosestPoint = Math.cos(angle) * Math.sqrt(VlenSq - V1len * V1len) - V1len * Math.sin(angle);

        const angleCull = distanceClosestPoint > sphereRadius;
        const frontCull = V1len >  sphereRadius + size;
        const backCull  = V1len < -sphereRadius;

        return !(angleCull || frontCull || backCull);
    }

    loadTilesDynamic() {

        this._lastLoadDynamic -= 1;
        if (this._lastLoadDynamic > 0) { return; }

        this._lastLoadDynamic = 100;

        const coordsUtm = olProj.transform(this.layerManager.sceneViewer.positionWGS84(), 'EPSG:4326', 'EPSG:3857');
        const tileCoords = this.tileGrid.getTileCoordForCoordAndZ(coordsUtm, 17);
        //const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];

        this.loadTile(tileCoords);  // ensure elevation for current tile

        // Calculate frustrum (2D)
        const frustrumOrigin = this.layerManager.sceneViewer.camera.position;
        if (this.lastHeight) { frustrumOrigin.y -= this._lastHeight; }
        const frustrumForward = this.layerManager.sceneViewer.camera.getDirection(BABYLON.Vector3.Forward());
        const frustrumSize = 300.0;
        const frustrumAngle = this.layerManager.sceneViewer.camera.fov; // 30.0;

        // Project frustrum corners to tiles

        // Calculate tiles inside frustrum
        const tiledist = 1;
        for (let i = -tiledist; i <= tiledist; i++) {
            for (let j = -tiledist; j <= tiledist; j++) {
                let tileCenter = this.tileGrid.getTileCoordCenter([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
                let tileCenterWGS84 = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');
                let tileCenterScene = this.layerManager.sceneViewer.projection.forward(tileCenterWGS84);
                let sphereCenter = new BABYLON.Vector3(tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
                let sphereRadius = 220.0;
                if (this.testConeSphere(frustrumOrigin, frustrumForward, frustrumSize, frustrumAngle, sphereCenter, sphereRadius)) {
                    //console.debug("Loading: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
                    this.loadTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
                } else {
                    //console.debug("Ignoring: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
                }
            }
        }

        // Sort tiles by distance

        // Enqueue (1 on mobile? 2 on PC?)

        // setEnabled(false) on culled chunks

        // update LOD levels (call lodLevel - remove items, etc) per distance


        /*
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                this.loadTile([tileCoords[0], tileCoords[1] + i, tileCoords[2] + j]);
            }
        }
        */
    }

    loadTile(tileCoords) {

          //console.debug(tileCoords);
          const z = tileCoords[0];
          const x = tileCoords[1];
          const y = tileCoords[2];
          const tileKey = z + "/" + x + "/" + y;

          if (tileKey in this.tiles) {
              return;
          } else {
              this.tiles[tileKey] = "loading";
          }

          //const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
          //const tileUrl = "./scenes/ddd-model.glb";
          //const glb = "https://www.yourcityracing.com/static/game/larochelle_150r_-1.153,46.155.glb";
          //const glb = new File([""], "scene.glb", {type: "application/octect-stream"})

          //const tileUrlBase = './scenes/ddd_http_';
          //const tileUrlBase = 'http://localhost:8000/cache/ddd_http/';
          //const tileUrlBase = 'http://' + app.dddConfig.tileUrlBase + ':8000/cache/ddd_http/';
          //const tileUrlBase = 'http://' + location.hostname + '/cache/ddd_http/';
          const tileUrlBase = this.layerManager.sceneViewer.viewerState.dddConfig.tileUrlBase;
          const tileUrl = tileUrlBase + z + "/" + x + "/" + y + ".glb";

          const that = this;

          //console.debug("Loading: " + tileUrl);

          let pivot = new BABYLON.TransformNode("chunk_" + tileKey, this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
          //let reversePivot = new BABYLON.TransformNode("chunk_reverse_" + tileKey, this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
          //let rawPivot = new BABYLON.TransformNode("chunk_raw_" + tileKey, this.scene);  // new BABYLON.Mesh("chunk_" + tileKey, this.scene);
          //reversePivot.scaling = new BABYLON.Vector3(1, 1, -1);  // Babylon uses a parent node with this scale to flip glTF models, redone here
          //rawPivot.parent = reversePivot;
          //reversePivot.parent = pivot;
          //pivot.parent = this.scene;

          let marker = this.loadQuadMarker(tileCoords, BABYLON.Color3.Gray());
          this.tiles[tileKey] = marker;

          BABYLON.SceneLoader.ImportMesh(null, '', tileUrl, that.scene, //this.scene,
              // onSuccess
              function(newMeshes, particleSystems, skeletons) {
                  //console.log("GLB loaded", newMeshes);

                  marker.dispose(false, true);
                  //marker.parent = null;

                  let minHeight = Number.POSITIVE_INFINITY;
                  let maxHeight = Number.NEGATIVE_INFINITY;
                  newMeshes.forEach((mesh, i) => {
                      if (that.layerManager.sceneViewer.shadowsEnabled) {
                            if (mesh.metadata && mesh.metadata.gltf.extras && mesh.metadata.gltf.extras['ddd:shadows'] === false) { return; }
                          that.layerManager.sceneViewer.shadowGenerator.getShadowMap().renderList.push(mesh);
                          mesh.receiveShadows = true;
                      }

                      //console.debug(mesh.getBoundingInfo());
                      let heightMin = mesh.getBoundingInfo().boundingBox.minimumWorld.y;
                      if (heightMin < minHeight && heightMin !== 0) { minHeight = heightMin; }
                      let heightMax = mesh.getBoundingInfo().boundingBox.maximumWorld.y;
                      if (heightMax > maxHeight && heightMax !== 0) { maxHeight = heightMax; }

                      /*
                      if(mesh.material) {
                          if (mesh.id.indexOf("Item") < 0 && mesh.id.indexOf("Building") < 0) {
                              mesh.material = materialPlane;
                          }
                          //mesh.overrideMaterialSideOrientation = BABYLON.Mesh.DOUBLESIDE;
                          //mesh.updateMeshPositions();
                      }
                      */
                      //console.debug(mesh.absolutePosition);
                      //mesh.position = new BABYLON.Vector3(mesh.position.x, mesh.position.y, -mesh.position.z);
                      //mesh.updateMeshPositions();
                      //mesh.parent = rawPivot;
                  });

                  // Reparent root
                  newMeshes[0].parent = pivot;
                  that.tiles[tileKey] = pivot;


                  let tileExtent = that.tileGrid.getTileCoordExtent(tileCoords);
                  let tileCenter = extent.getCenter(tileExtent);
                  let tileCenterWGS84 = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');
                  let tileCenterScene = that.layerManager.sceneViewer.projection.forward(tileCenterWGS84);

                  //let distance = 225.0;
                  //pivot.position = new BABYLON.Vector3((x - 62360) * distance, 0, -(y - 48539) * distance);
                  //pivot.scaling = new BABYLON.Vector3(1, 1, -1);
                  pivot.position = new BABYLON.Vector3(tileCenterScene[0], 0, tileCenterScene[1]);
                  pivot.rotation = new BABYLON.Vector3(0, Math.PI, 0);

                  //pivot.freezeWorldMatrix();

                  that.tiles[tileKey] = pivot;

                  that._lastHeight = minHeight;

                  that._tilesLoadedCount++;
                  if (! that._initialHeightSet) {
                        //console.debug("Repositioning camera height based on terrain height: " + maxHeight);
                        //that.layerManager.sceneViewer.camera.position.y += maxHeight;

                         const ray = new BABYLON.Ray(new BABYLON.Vector3(
                             that.layerManager.sceneViewer.camera.position.x,
                             -100.0, that.layerManager.sceneViewer.camera.position.z),
                             new BABYLON.Vector3(0, 1, 0), 5000.0);
                         const pickResult = that.layerManager.sceneViewer.scene.pickWithRay(ray);
                         if (pickResult && pickResult.pickedMesh.id && pickResult.pickedMesh.id.indexOf('placeholder_') !== 0) {
                            that._initialHeightSet = true;
                            that.layerManager.sceneViewer.camera.position.y += (pickResult.distance - 100.0);
                         } else {
                             //that._tilesLoadedCount--;
                            //that.layerManager.sceneViewer.camera.position.y += maxHeight;
                         }
                  }

                  // Replace materials, instancing...
                  that.layerManager.sceneViewer.processMesh(pivot, pivot);

                  pivot.freezeWorldMatrix();

                  // Check if the selected node is in the recently loaded node
                  // TODO: Should use a generic notification + object id/naming system
                  if (that.layerManager.sceneViewer.viewerState.sceneSelectedMeshId) {
                      let criteria = {'_node_name': that.layerManager.sceneViewer.viewerState.sceneSelectedMeshId };
                      //console.debug(criteria);
                      let foundMesh = that.layerManager.sceneViewer.findNode(pivot, criteria);
                      //console.debug(foundMesh);
                      if (foundMesh) {
                          that.layerManager.sceneViewer.selectMesh(foundMesh);
                          that.layerManager.sceneViewer.viewerState.sceneSelectedMeshId = null;  // Triggers watchers update
                      }
                  }


                  /*
                  this.sceneViewer.selectMesh(pickResult.pickedMesh);
                  let meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
                  this.$router.push('/3d/item/' + meshName + '/' + this.sceneViewer.positionString()).catch(()=>{});
                  */


              },

              // onProgress
              function(event) {
                  //console.log("Tile model (.glb) loading: ", (event.loaded) )
                  //let color = marker.material.emissiveColor;
                  //color = new BABYLON.Color3((color.r + 0.05) % 1, (color.r + 0.05) % 1, (color.r + 0.05) % 1);
                  //marker.material.emissiveColor = color;
              },
              // onError
              function(scene, msg, ex) {
                //console.log("Tile model (.glb) loading error: ", event);
                console.log("Tile model (.glb) loading error: ", ex);

                if (ex.request && ex.request.status === 404) {
                        // 404 - tile is being generated, show OSM tile as replacement
                        marker.dispose(false, true);
                        marker = that.loadQuadTile(tileCoords);  // , BABYLON.Color3.Red()
                        that.tiles[tileKey] = marker; // "notfound";
                } else {
                      // Error: colour marker red
                      marker.dispose(false, true);
                      marker = that.loadQuadTile(tileCoords);  // , BABYLON.Color3.Red()
                      that.tiles[tileKey] = marker; // "notfound";

                      let color = marker.material.emissiveColor;
                      color = new BABYLON.Color3.Red();
                      marker.material.emissiveColor = color;
                }

            }
        );
        //model.parent = pivot;

    }

    loadQuadMarker(tileCoords, color=BABYLON.Color3.Gray()) {
        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        let tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
        let tileCenter = extent.getCenter(tileExtent);
        let tileCenterWGS84 = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');
        let tileCenterScene = this.layerManager.sceneViewer.projection.forward(tileCenterWGS84);

        let tileExtentMinScene = this.layerManager.sceneViewer.projection.forward(olProj.transform(extent.getBottomLeft(tileExtent), 'EPSG:3857', 'EPSG:4326'));
        let tileExtentMaxScene = this.layerManager.sceneViewer.projection.forward(olProj.transform(extent.getTopRight(tileExtent), 'EPSG:3857', 'EPSG:4326'));
        let sizeWidth = Math.abs(tileExtentMaxScene[0] - tileExtentMinScene[0]);
        let sizeHeight = Math.abs(tileExtentMaxScene[1] - tileExtentMinScene[1]);

        const marker = BABYLON.MeshBuilder.CreatePlane('placeholder_' + tileKey, { width: sizeWidth, height: sizeHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, this.scene);

        marker.position = new BABYLON.Vector3(tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
        marker.rotation = new BABYLON.Vector3(Math.PI * 0.5, 0, 0);

        //Creation of a repeated textured material
        let materialPlane = new BABYLON.StandardMaterial("textureTile_" + tileKey, this.scene);
        //materialPlane.diffuseTexture = new BABYLON.Texture("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.scene);
        materialPlane.diffuseColor = color;
        materialPlane.specularColor = BABYLON.Color3.Black();
        /*
        materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
        materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
        materialPlane.diffuseTexture.uOffset = -0.5;
        materialPlane.diffuseTexture.vOffset = -0.5;
        */
        materialPlane.emissiveColor = color; // new BABYLON.Color3(1.0, 1.0, 1.);
        materialPlane.disableLighting = true;
        materialPlane.backFaceCulling = false;

        marker.material = materialPlane;

        return marker;
    }

    loadQuadTile(tileCoords, color=BABYLON.Color3.White()) {

        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        let tileExtent = this.tileGrid.getTileCoordExtent(tileCoords);
        let tileCenter = extent.getCenter(tileExtent);
        let tileCenterWGS84 = olProj.transform(tileCenter, 'EPSG:3857', 'EPSG:4326');
        let tileCenterScene = this.layerManager.sceneViewer.projection.forward(tileCenterWGS84);

        let tileExtentMinScene = this.layerManager.sceneViewer.projection.forward(olProj.transform(extent.getBottomLeft(tileExtent), 'EPSG:3857', 'EPSG:4326'));
        let tileExtentMaxScene = this.layerManager.sceneViewer.projection.forward(olProj.transform(extent.getTopRight(tileExtent), 'EPSG:3857', 'EPSG:4326'));
        let sizeWidth = Math.abs(tileExtentMaxScene[0] - tileExtentMinScene[0]);
        let sizeHeight = Math.abs(tileExtentMaxScene[1] - tileExtentMinScene[1]);

        console.debug(sizeWidth, sizeHeight);
        const marker = BABYLON.MeshBuilder.CreatePlane('placeholder_' + tileKey, { width: sizeWidth, height: sizeHeight, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, this.scene);

        marker.position = new BABYLON.Vector3(tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
        marker.rotation = new BABYLON.Vector3(Math.PI * 0.5, 0, 0);

        //Creation of a repeated textured material
        let materialPlane = new BABYLON.StandardMaterial("textureTile_" + tileKey, this.scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.scene);

        //if (!color) color = BABYLON.Color3.Black; //new BABYLON.Color3(0, 0, 0);
        materialPlane.specularColor = BABYLON.Color3.Black();
        /*
        materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
        materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
        materialPlane.diffuseTexture.uOffset = -0.5;
        materialPlane.diffuseTexture.vOffset = -0.5;
        */
        materialPlane.emissiveColor = color;  // new BABYLON.Color3(1.0, 1.0, 1.);
        materialPlane.disableLighting = true;
        materialPlane.backFaceCulling = false;

        marker.material = materialPlane;

        return marker;
    }

}

