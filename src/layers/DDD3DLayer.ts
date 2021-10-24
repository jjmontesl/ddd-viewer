/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { AbstractMesh, Color3, Mesh, MeshBuilder, Node, Ray, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonjs/core";
import { Coordinate } from "ol/coordinate";
import * as extent from "ol/extent";
import * as olProj from "ol/proj";
import { createXYZ, extentFromProjection } from "ol/tilegrid";
import TileGrid from "ol/tilegrid/TileGrid";
import { SceneViewer } from "../SceneViewer";
import { Base3DLayer } from "./Base3DLayer";



/*
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
*/

class DDD3DLayer extends Base3DLayer {

    node: Node | null = null;

    constructor(key: string) {
        super(key);
        console.log("Constructing new DDD3DLayer.");
        // TODO: This makes sense here, but is also duplicated on SceneViewer
    }

    update(): void {
    }


    /*
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
    */

    // TODO: Tile coordinates should be made a type or reuse OpenLayers grid coordinates type
    loadData( data: string ): void {

        const objectBlob = new Blob([data], { type: 'model/gltf-binary' });
        const objectUrl = URL.createObjectURL(objectBlob);

        const layerKey = "model";
        const pivot = new Mesh( "dddobject_" + layerKey, this.layerManager!.sceneViewer.scene );

        this.layerManager!.sceneViewer.queueLoader.enqueueLoadModel( objectUrl,
            // onSuccess
            ( newMeshes: AbstractMesh[], _particleSystems: any, _skeletons: any ) => {

                //console.log("DDD3DLayer GLB loaded", newMeshes);

                newMeshes.forEach( (mesh: AbstractMesh, _i: number) => {
                    if (this.layerManager!.sceneViewer.shadowGenerator) {
                        mesh.receiveShadows = true;
                        if ( mesh.metadata && mesh.metadata.gltf.extras &&
                                (( mesh.metadata.gltf.extras["ddd:shadows"] === false ) ||
                                 ( mesh.metadata.gltf.extras["ddd:shadows"] === "false" ) ||
                                 ( mesh.metadata.gltf.extras["ddd:path"].indexOf( "/Areas_" ) > 0 ) ||
                                 ( mesh.metadata.gltf.extras["ddd:path"].indexOf( "/Ways_" ) > 0 ))) {
                            //console.debug("No shadow");
                            return;
                        }

                        // TODO: Do this at SceneViewer processMesh level
                        this.layerManager!.sceneViewer.shadowGenerator.getShadowMap()!.renderList!.push(mesh);
                    }

                });

                // Reparent root
                (<Mesh> newMeshes[0]).parent = <Node> pivot;
                this.node = pivot;

                pivot.freezeWorldMatrix();

                this.layerManager!.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = true;
                this.layerManager!.sceneViewer.processMesh( <Mesh>pivot, <Mesh>pivot );  // TODO: Wrong conversion, use Node for "processMesh"
                this.layerManager!.sceneViewer.scene.blockfreeActiveMeshesAndRenderingGroups = false;

                //pivot.occlusionType = AbstractMesh.OCCLUSION_TYPE_OPTIMISTIC;
                pivot.freezeWorldMatrix();

            },
            // onError
            ( _scene: any, _msg: string, ex: any ) => {
                // eslint-disable-next-line no-console
                console.log( "Tile model (.glb) loading error: ", ex );

            }
        );
        //model.parent = pivot;

    }

    clearScene() {
        console.log("Deleting DDD3DLayer: " + this.key);
        if (this.node) {
            //tile.node.setEnabled(false);
            this.node.parent = null;
            this.node.dispose();
            this.node = null;
        }
    }

}


export { DDD3DLayer };

