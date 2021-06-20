import { AbstractMesh, Color3, Mesh, MeshBuilder, Node, Ray, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonjs/core";
import { Coordinate } from "ol/coordinate";
import * as extent from "ol/extent";
import * as olProj from "ol/proj";
import { createXYZ, extentFromProjection } from "ol/tilegrid";
import TileGrid from "ol/tilegrid/TileGrid";
import { SceneViewer } from "../SceneViewer";
import { Base3DLayer } from "./Base3DLayer";



class Tile3D {
    key: string;
    status: string | null;

    constructor( key: string ) {
        this.key = key;
        this.status = null;
    }
}

class GeoTile3D extends Tile3D {
    node: Node | null;
    coordsTileGrid: number[] | null;

    constructor( key: string ) {
        super( key );
        this.node = null;
        this.coordsTileGrid = null;
    }
}

class GeoTile3DLayer extends Base3DLayer {
    tiles: { [key: string]: GeoTile3D };

    groundTextureLayerUrl: string | null = null;
    //groundTextureLayerUrl = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";  // "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    //groundTextureLayerUrl = "http://localhost:8090/wmts/ign_ortho/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg";  // "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

    private _lastHeight = 0; // Used to hack positioning of tiles before height is known
    private _lastLoadDynamic = 0;
    private _initialHeightSet = false;

    tilesLoadedCount = 0;
    tileGrid: TileGrid;

    constructor() {
        super();
        this.tiles = {};
        // TODO: This makes sense here, but is also duplicated on SceneViewer
        this.tileGrid = createXYZ({
            extent: extentFromProjection( "EPSG:3857" ),
            //maxResolution: options.maxResolution,
            //maxZoom: options.maxZoom,
            //minZoom: options.minZoom,
            //tileSize: options.tileSize,
        });
    }

    update(): void { 
        this.updateTilesDynamic();
    }


    /*
    * From: https://bartwronski.com/2017/04/13/cull-that-cone/
    */
    testConeSphere( origin: Vector3, forward: Vector3, size: number, angle: number, sphereCenter: Vector3, sphereRadius: number ): boolean {
        //console.debug(origin, forward, size, angle, sphereCenter, sphereRadius);
        const V = sphereCenter.subtract( origin );
        const VlenSq = Vector3.Dot( V, V );
        const V1len = Vector3.Dot( V, forward );
        const distanceClosestPoint = Math.cos( angle ) * Math.sqrt( VlenSq - V1len * V1len ) - V1len * Math.sin( angle );

        const angleCull = distanceClosestPoint > sphereRadius;
        const frontCull = V1len > sphereRadius + size;
        const backCull  = V1len < -sphereRadius;

        return !( angleCull || frontCull || backCull );
    }

    updateTilesDynamic(): void {

        // loading chunks each 100 frames. Bad performance 
        this._lastLoadDynamic -= 1;
        if ( this._lastLoadDynamic > 0 ) { return; }
        this._lastLoadDynamic = 100;

        const sceneViewer: SceneViewer = this.layerManager!.sceneViewer;
    
        const positionWGS84: number[] = <number[]> this.layerManager?.sceneViewer.positionWGS84();
        const coordsWGS84: Coordinate = [ positionWGS84[0], positionWGS84[1] ];
        const coordsUtm: Coordinate = olProj.transform(coordsWGS84 , "EPSG:4326", "EPSG:3857" );
        const tileCoords = this.tileGrid.getTileCoordForCoordAndZ( coordsUtm, 17 );
        //const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];

        // Calculate frustrum (2D)
        const frustrumOrigin = sceneViewer.camera!.position.clone();
        //if (this._lastHeight) { frustrumOrigin.y -= this._lastHeight; }  // Considers all tiles in a plane centered on last
        frustrumOrigin.y = 0;
        const frustrumForward = sceneViewer.camera!.getDirection( Vector3.Forward());
        frustrumForward.y = 0;
        frustrumForward.normalize();
        const frustrumSize = sceneViewer.viewerState.sceneTileDrawDistance * 300.0; // 1500.0;
        const frustrumAngle = sceneViewer.camera!.fov * 2.0; // * (Math.PI / 180.0); // 30.0;

        this.loadTile( tileCoords );  // ensure elevation for current tile

        // Project frustrum corners to tiles

        // Calculate tiles inside frustrum
        const tiledistWalk = sceneViewer.viewerState.sceneTileDrawDistance + 3;
        const tiledistDraw = sceneViewer.viewerState.sceneTileDrawDistance + 0.7;
        for ( let i = -tiledistWalk; i <= tiledistWalk; i++ ) {
            for ( let j = -tiledistWalk; j <= tiledistWalk; j++ ) {

                // Current tile is already enqueued
                if ( i === 0 && j === 0 ) { continue; }

                if ( i * i + j * j > tiledistDraw * tiledistDraw ) {
                    this.disableTile([ tileCoords[0], tileCoords[1] + i, tileCoords[2] + j ]);
                } else {
                    const tileCenter = this.tileGrid.getTileCoordCenter([ tileCoords[0], tileCoords[1] + i, tileCoords[2] + j ]);
                    const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
                    const tileCenterScene = sceneViewer.projection.forward( tileCenterWGS84 );
                    const sphereCenter = new Vector3( tileCenterScene[0], 0, tileCenterScene[1]);  // TODO: Get median height from tile
                    const sphereRadius = 230.0 / 2.0;
                    if ( this.testConeSphere( frustrumOrigin, frustrumForward, frustrumSize, frustrumAngle, sphereCenter, sphereRadius )) {
                        //console.debug("Loading: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
                        this.loadTile([ tileCoords[0], tileCoords[1] + i, tileCoords[2] + j ]);
                    } else {
                        //console.debug("Ignoring: ", [tileCoords[0], tileCoords[1] + i, tileCoords[2] + j])
                        this.disableTile([ tileCoords[0], tileCoords[1] + i, tileCoords[2] + j ]);
                    }
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

    disableTile( tileCoords: number[] ): void {
        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        if ( !( tileKey in this.tiles )) {
            return;
        }

        const tile = this.tiles[tileKey];
        if ( tile.status !== "loading" && tile.node!.isEnabled( false )) {
            tile.node!.setEnabled( false );
            tile.node!.parent = null;  // TODO: this was not working before (tile.parent did not apply)
        }
    }

    /**
    * Gets tile metadata.
    * It does this recursively searching for a "Metadata" named node, as the path exporting root metadata to the root node or scene itself hasn't been found to work.
    */
    getTileMetadata( node: Node ): any {
        /*if (node.id.startsWith("Metadata")) {
            return node.metadata.gltf.extras;
        }*/
        for ( const child of node.getChildren()) {
            if ( child.id.indexOf( "Metadata" ) > 0 ) {
                return child.metadata.gltf.extras;
            }
        }
        for ( const child of node.getChildren()) {
            const md = this.getTileMetadata( <Mesh>child );
            if ( md !== null ) { return md; }
        }
        return null;
    }

    // TODO: Tile coordinates should be made a type or reuse OpenLayers grid coordinates type
    loadTile( tileCoords: number[] ): void {

        //console.debug(tileCoords);
        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
        const tileCenter = extent.getCenter( tileExtent );
        const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
        //const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

        const tileExtentMinScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getBottomLeft( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const tileExtentMaxScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getTopRight( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const sizeWidth = Math.abs( tileExtentMaxScene[0] - tileExtentMinScene[0]);
        const sizeHeight = Math.abs( tileExtentMaxScene[1] - tileExtentMinScene[1]);

        if ( tileKey in this.tiles ) {
            const tile = this.tiles[tileKey];
            if ( tile.status !== "loading" && !tile.node!.isEnabled( false )) {
                tile.node!.parent = null; // this.layerManager!.sceneViewer.scene;
                tile.node!.setEnabled( true );
                //tile.node.freezeWorldMatrix();
            }
            return;
        } else {
            this.tiles[tileKey] = new GeoTile3D( tileKey );
            this.tiles[tileKey].status = "loading";
            this.tiles[tileKey].coordsTileGrid = tileCoords;
        }

        //const glb = "https://www.yourcityracing.com/static/game/acoruna_hercules_500r_-8.406,43.386.glb";
        //const tileUrl = "./scenes/ddd-model.glb";
        //const glb = "https://www.yourcityracing.com/static/game/larochelle_150r_-1.153,46.155.glb";
        //const glb = new File([""], "scene.glb", {type: "application/octect-stream"})

        //const tileUrlBase = './scenes/ddd_http_';
        //const tileUrlBase = 'http://localhost:8000/cache/ddd_http/';
        //const tileUrlBase = 'http://' + app.dddConfig.tileUrlBase + ':8000/cache/ddd_http/';
        //const tileUrlBase = 'http://' + location.hostname + '/cache/ddd_http/';
        const tileUrlBase = this.layerManager!.sceneViewer.viewerState.dddConfig.tileUrlBase;
        const tileUrl = tileUrlBase + z + "/" + x + "/" + y + ".glb";

        //console.debug("Loading: " + tileUrl);

        const pivot = new TransformNode( "chunk_" + tileKey.replace( "/", "_" ), this.layerManager!.sceneViewer.scene );  // new Mesh("chunk_" + tileKey, this.layerManager.sceneViewer.scene);
        //let reversePivot = new TransformNode("chunk_reverse_" + tileKey, this.scene);  // new Mesh("chunk_" + tileKey, this.scene);
        //let rawPivot = new TransformNode("chunk_raw_" + tileKey, this.scene);  // new Mesh("chunk_" + tileKey, this.scene);
        //reversePivot.scaling = new Vector3(1, 1, -1);  // Babylon uses a parent node with this scale to flip glTF models, redone here
        //rawPivot.parent = reversePivot;
        //reversePivot.parent = pivot;
        //pivot.parent = this.scene;

        let marker = this.loadQuadMarker( tileCoords, Color3.Gray());
        this.tiles[tileKey].node = marker;

        this.layerManager!.sceneViewer.queueLoader.enqueueLoadModel( tileUrl,
            // onSuccess
            ( newMeshes: AbstractMesh[], _particleSystems: any, _skeletons: any ) => {
                //console.log("GLB loaded", newMeshes);

                marker.dispose( false, true );
                //marker.parent = null;

                let minHeight = Number.POSITIVE_INFINITY;
                let maxHeight = Number.NEGATIVE_INFINITY;
                newMeshes.forEach(( mesh: AbstractMesh, _i: number ) => {
                    if ( this.layerManager!.sceneViewer.shadowGenerator ) {
                        mesh.receiveShadows = true;
                        if ( mesh.metadata && mesh.metadata.gltf.extras &&
                                (( mesh.metadata.gltf.extras["ddd:shadows"] === false ) ||
                                 ( mesh.metadata.gltf.extras["ddd:shadows"] === "false" ) ||
                                 ( mesh.metadata.gltf.extras["ddd:path"].indexOf( "/Areas_" ) > 0 ) ||
                                 ( mesh.metadata.gltf.extras["ddd:path"].indexOf( "/Ways_" ) > 0 ))) {
                            //console.debug("No shadow");
                            return;
                        }
                        this.layerManager!.sceneViewer.shadowGenerator.getShadowMap()!.renderList!.push( mesh );
                    }

                    //console.debug(mesh.getBoundingInfo());
                    const heightMin = mesh.getBoundingInfo().boundingBox.minimumWorld.y;
                    if ( heightMin < minHeight && heightMin !== 0 ) { minHeight = heightMin; }
                    const heightMax = mesh.getBoundingInfo().boundingBox.maximumWorld.y;
                    if ( heightMax > maxHeight && heightMax !== 0 ) { maxHeight = heightMax; }

                    /*
                      if(mesh.material) {
                          if (mesh.id.indexOf("Item") < 0 && mesh.id.indexOf("Building") < 0) {
                              mesh.material = materialPlane;
                          }
                          //mesh.overrideMaterialSideOrientation = Mesh.DOUBLESIDE;
                          //mesh.updateMeshPositions();
                      }
                      */
                    //console.debug(mesh.absolutePosition);
                    //mesh.position = new Vector3(mesh.position.x, mesh.position.y, -mesh.position.z);
                    //mesh.updateMeshPositions();
                    //mesh.parent = rawPivot;
                });

                // Reparent root
                (<Mesh> newMeshes[0]).parent = <Node> pivot;
                newMeshes[0].id = tileKey.replace( "/", "_" );
                this.tiles[tileKey].node = pivot;
                this.tiles[tileKey].status = "loaded";


                const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
                const tileCenter = extent.getCenter( tileExtent );
                const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
                const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

                //let distance = 225.0;
                //pivot.position = new Vector3((x - 62360) * distance, 0, -(y - 48539) * distance);
                //pivot.scaling = new Vector3(1, 1, -1);
                pivot.position = new Vector3( tileCenterScene[0], 0, tileCenterScene[1]);
                pivot.rotation = new Vector3( 0, Math.PI, 0 );

                pivot.freezeWorldMatrix();

                this.tiles[tileKey].node = pivot;

                this._lastHeight = minHeight;

                this.tilesLoadedCount++;
                if ( ! this._initialHeightSet ) {
                    //console.debug("Repositioning camera height based on terrain height: " + maxHeight);
                    //that.layerManager.sceneViewer.camera.position.y += maxHeight;

                    const ray = new Ray( 
                        new Vector3(this.layerManager!.sceneViewer.camera!.position.x,
                            -100.0, this.layerManager!.sceneViewer.camera!.position.z ),
                        new Vector3( 0, 1, 0 ), 3000.0 );
                    const pickResult = this.layerManager!.sceneViewer.scene.pickWithRay( ray );
                    if ( pickResult && pickResult.pickedMesh && pickResult.pickedMesh.id &&
                              pickResult.pickedMesh.id.indexOf( "placeholder_" ) !== 0 &&
                              pickResult.pickedMesh.id.indexOf( "skyBox" ) !== 0 ) {
                        //console.debug("Setting height from: " + pickResult.pickedMesh.id);
                        this._initialHeightSet = true;
                        this.layerManager!.sceneViewer.camera!.position.y = ( pickResult.distance - 100.0 );
                        if ( this.layerManager!.sceneViewer.viewerState.positionGroundHeight ) {
                            this.layerManager!.sceneViewer.camera!.position.y += this.layerManager!.sceneViewer.viewerState.positionGroundHeight;
                        } else {
                            this.layerManager!.sceneViewer.camera!.position.y += 40.0;
                        }
                    } else {
                        //that._tilesLoadedCount--;
                        //that.layerManager.sceneViewer.camera.position.y += maxHeight;
                    }
                }

                const tileMetadata = this.getTileMetadata( pivot );
                //console.debug("Tile metadata: ", tileMetadata);

                // Replace materials, instancing...
                pivot.metadata = {
                    "tileCoords": tileCoords,
                    "tileSize": [ sizeWidth, sizeHeight ],
                    "tileInfo": tileMetadata,
                };

                this.layerManager!.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = true;
                this.layerManager!.sceneViewer.processMesh( <Mesh>pivot, <Mesh>pivot );  // TODO: Wrong conversion, use Node for "processMesh"
                this.layerManager!.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = false;

                //pivot.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;
                pivot.freezeWorldMatrix();

                // TODO: Removed during TS migration, but this is needed to support ground texture replacement
                //this.groundTextureLayerProcessNode( tileCoords, pivot );

                // Check if the selected node is in the recently loaded node
                // TODO: Should use a generic notification + object id/naming system
                if ( this.layerManager!.sceneViewer.viewerState.sceneSelectedMeshId ) {
                    const criteria = { "_node_name": this.layerManager!.sceneViewer.viewerState.sceneSelectedMeshId };
                    //console.debug(criteria);
                    const foundMesh = this.layerManager!.sceneViewer.findNode( <Mesh> pivot, criteria );
                    //console.debug(foundMesh);
                    if ( foundMesh ) {
                        this.layerManager!.sceneViewer.selectMesh( <Mesh> foundMesh, true );
                        this.layerManager!.sceneViewer.viewerState.sceneSelectedMeshId = null;  // Triggers watchers update
                    }
                }


                /*
                  this.sceneViewer.selectMesh(pickResult.pickedMesh);
                  let meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
                  this.$router.push('/3d/item/' + meshName + '/' + this.sceneViewer.positionString()).catch(()=>{});
                  */


            },
            // onError
            ( _scene: any, _msg: string, ex: any ) => {
                // eslint-disable-next-line no-console
                console.log( "Tile model (.glb) loading error: ", ex );

                if ( ex.request && ex.request.status === 404 ) {
                    // 404 - tile is being generated, show OSM tile as replacement
                    marker.dispose( false, true );
                    marker = this.loadQuadTile( tileCoords );  // , Color3.Red()
                    this.tiles[tileKey].node = marker; // "notfound";
                    this.tiles[tileKey].status = "notfound";
                    this.layerManager!.sceneViewer.viewerState.serverInfoShow = true;
                } else {
                    // Error: colour marker red
                    marker.dispose( false, true );
                    marker = this.loadQuadTile( tileCoords );  // , Color3.Red()
                    this.tiles[tileKey].node = marker; // "notfound";
                    this.tiles[tileKey].status = "error";

                    const color = Color3.Red();
                    (<StandardMaterial>(<Mesh>marker).material).emissiveColor = color;
                }

            }
        );
        //model.parent = pivot;

    }

    loadQuadMarker( tileCoords: number[], color: Color3 = Color3.Gray()): Node {
        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
        const tileCenter = extent.getCenter( tileExtent );
        const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
        const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

        const tileExtentMinScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getBottomLeft( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const tileExtentMaxScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getTopRight( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const sizeWidth = Math.abs( tileExtentMaxScene[0] - tileExtentMinScene[0]);
        const sizeHeight = Math.abs( tileExtentMaxScene[1] - tileExtentMinScene[1]);

        const marker = MeshBuilder.CreatePlane( "placeholder_" + tileKey, { width: sizeWidth, height: sizeHeight, sideOrientation: Mesh.DOUBLESIDE }, this.layerManager!.sceneViewer.scene );

        marker.position = new Vector3( tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
        marker.rotation = new Vector3( Math.PI * 0.5, 0, 0 );

        //Creation of a repeated textured material
        const materialPlane = new StandardMaterial( "textureTile_" + tileKey, this.layerManager!.sceneViewer.scene );
        //materialPlane.diffuseTexture = new Texture("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.scene);
        materialPlane.diffuseColor = color;
        materialPlane.specularColor = Color3.Black();
        /*
        materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
        materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
        materialPlane.diffuseTexture.uOffset = -0.5;
        materialPlane.diffuseTexture.vOffset = -0.5;
        */
        materialPlane.emissiveColor = color; // new Color3(1.0, 1.0, 1.);
        materialPlane.disableLighting = true;
        materialPlane.backFaceCulling = false;

        marker.material = materialPlane;

        return marker;
    }

    loadQuadTile( tileCoords: number[], color=Color3.White()): Node {

        const z = tileCoords[0];
        const x = tileCoords[1];
        const y = tileCoords[2];
        const tileKey = z + "/" + x + "/" + y;

        const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
        const tileCenter = extent.getCenter( tileExtent );
        const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
        const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

        const tileExtentMinScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getBottomLeft( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const tileExtentMaxScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getTopRight( tileExtent ), "EPSG:3857", "EPSG:4326" ));
        const sizeWidth = Math.abs( tileExtentMaxScene[0] - tileExtentMinScene[0]);
        const sizeHeight = Math.abs( tileExtentMaxScene[1] - tileExtentMinScene[1]);

        //console.debug(sizeWidth, sizeHeight);
        const marker = MeshBuilder.CreatePlane( "placeholder_" + tileKey, { width: sizeWidth, height: sizeHeight, sideOrientation: Mesh.DOUBLESIDE }, this.layerManager!.sceneViewer.scene );

        marker.position = new Vector3( tileCenterScene[0], this._lastHeight, tileCenterScene[1]);
        marker.rotation = new Vector3( Math.PI * 0.5, 0, 0 );

        //Creation of a repeated textured material
        const materialPlane = new StandardMaterial( "textureTile_" + tileKey, this.layerManager!.sceneViewer.scene );
        materialPlane.diffuseTexture = new Texture( "https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png", this.layerManager!.sceneViewer.scene );

        //if (!color) color = Color3.Black; //new Color3(0, 0, 0);
        materialPlane.specularColor = Color3.Black();
        /*
        materialPlane.diffuseTexture.uScale = 1.0 / 225.0;
        materialPlane.diffuseTexture.vScale = -1.0 / 225.0;
        materialPlane.diffuseTexture.uOffset = -0.5;
        materialPlane.diffuseTexture.vOffset = -0.5;
        */
        materialPlane.emissiveColor = color;  // new Color3(1.0, 1.0, 1.);
        materialPlane.disableLighting = true;
        materialPlane.backFaceCulling = false;

        marker.material = materialPlane;

        return marker;
    }

    /*
    groundTextureLayerProcessNode( tileCoords: number[], node: Node ): void {

        let materialGround = null;

        if ( this.groundTextureLayerUrl ) {
            const z = tileCoords[0];
            const x = tileCoords[1];
            const y = tileCoords[2];

            const tileExtent = this.tileGrid.getTileCoordExtent( tileCoords );
            const tileCenter = extent.getCenter( tileExtent );
            const tileCenterWGS84 = olProj.transform( tileCenter, "EPSG:3857", "EPSG:4326" );
            const tileCenterScene = this.layerManager!.sceneViewer.projection.forward( tileCenterWGS84 );

            const tileExtentMinScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getBottomLeft( tileExtent ), "EPSG:3857", "EPSG:4326" ));
            const tileExtentMaxScene = this.layerManager!.sceneViewer.projection.forward( olProj.transform( extent.getTopRight( tileExtent ), "EPSG:3857", "EPSG:4326" ));
            const sizeWidth = Math.abs( tileExtentMaxScene[0] - tileExtentMinScene[0]);
            const sizeHeight = Math.abs( tileExtentMaxScene[1] - tileExtentMinScene[1]);

            // Create material
            //console.debug("Creating material for ground texture: " + url);
            const tileKey = tileCoords[0] + "/" + tileCoords[1] + "/" + tileCoords[2];
            const url = this.replaceTileCoordsUrl( tileCoords, this.groundTextureLayerUrl );
            materialGround = new StandardMaterial( "materialGround_" + tileKey, this.layerManager!.sceneViewer.scene );
            materialGround.roughness = 0.95;
            materialGround.specularColor = new Color3( 0.15, 0.15, 0.15 ); // Color3.Black();
            //materialGround.specularColor = new Color3(0.2, 0.2, 0.2); // Color3.Black();
            //materialGround.emissiveColor = Color3.White();  // new Color3(1.0, 1.0, 1.);
            //materialGround.disableLighting = true;
            //materialGround.backFaceCulling = false;
            materialGround.diffuseTexture = new Texture( url, this.layerManager!.sceneViewer.scene );
            materialGround.diffuseTexture.uScale = 1.0 / ( sizeWidth + 0 );  // Force small texture overlap to avoid texture repeating
            materialGround.diffuseTexture.vScale = 1.0 / ( sizeHeight + 1 );  // Force small texture overlap to avoid texture repeating
            materialGround.diffuseTexture.uOffset = -0.5;
            materialGround.diffuseTexture.vOffset = -0.5;
            materialGround.diffuseTexture.wrapU = Texture.WRAP_ADDRESSMODE;
            materialGround.diffuseTexture.wrapV = Texture.WRAP_ADDRESSMODE;
            //materialGround.bumpTexture = materialGround.diffuseTexture;
            //materialGround.bumpTexture.uScale = 1.0 / sizeWidth;
            //materialGround.bumpTexture.vScale = 1.0 / sizeHeight;
            //materialGround.bumpTexture.uOffset = -0.5;
            //materialGround.bumpTexture.vOffset = -0.5;
        }

        // Assign
        const meshes = node.getChildMeshes();
        for ( const mesh of meshes ) {
            if ( mesh && mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras ) {
                const metadata = mesh.metadata.gltf.extras;
                if (( metadata["ddd:path"].indexOf( "/Areas" ) > 0 ) ||
                    ( metadata["ddd:path"].indexOf( "/Ways" ) > 0 )) {
                    if ( materialGround !== null ) {
                        if ( !( "_ground_material_original" in mesh )) {
                            mesh._ground_material_original = mesh.material;
                        }
                        mesh.material = materialGround;
                    } else {
                        if ( mesh._ground_material_original ) {
                            mesh.material = mesh._ground_material_original;
                        }
                    }
                }
            }
        }
    }
    */
   
    /*
    groundTextureLayerSetUrl( url: string ): void {
        // "https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png"
        //console.debug("Layer setting ground texture layer: " + url);
        this.groundTextureLayerUrl = url;
       
        // Update existing tiles
        for ( const key in this.tiles ) {
            const tile = this.tiles[key];
            this.groundTextureLayerProcessNode( tile.coordsTileGrid, tile.node );
        }
    }
    */

    replaceTileCoordsUrl( tileCoords: number[], url: string ): string {
        let result = url;
        result = result.replace( "{z}", tileCoords[0].toString());
        result = result.replace( "{x}", tileCoords[1].toString());
        result = result.replace( "{y}", tileCoords[2].toString());
        return result;
    }

    /*
    createTextMaterial( text: string ): StandardMaterial {

        //Create dynamic texture
        const texture = new DynamicTexture( "dynamicTexture_text_" + text , { width:512, height:256 }, this.layerManager!.sceneViewer.scene );
        //var textureContext = texture.getContext();
        const font = "bold 44px monospace";
        texture.drawText( "Generating...\nPlease try again later (5+ min).", 75, 135, font, "green", "white", true, true );

        const material = new StandardMaterial( "Mat" + text, this.layerManager!.sceneViewer.scene );
        material.diffuseTexture = texture;

        return material;
    }
    */

}


export { GeoTile3DLayer };

