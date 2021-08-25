/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/

import { Mesh, Node } from "@babylonjs/core";


/**
 * A reference to a "logical" object in the scene.
 *
 * Like real scene mesh objects, DDDObjectRefs have metadata, a path, parent and children.
 *
 * This allows to reference sets of triangles in larger objects (eg. if several logical objects were
 * batched into a larger mesh at design time or elsewhere).
 *
 * TODO: Reference the containing layer so each layer can resolve its objects.
 */
class DDDObjectRef {

    mesh: Node;

    submeshIdx: number = -1;

    faceIndexStart: number = -1;
    faceIndexEnd: number = -1;

    constructor(mesh: Node, submeshIdx: number = -1) {
        this.mesh = mesh;
        this.submeshIdx = submeshIdx;

        if (this.submeshIdx > -1) {
            let metadata = DDDObjectRef.nodeMetadata(mesh);
            const indexes = metadata['ddd:combined:indexes'];
            if (indexes && (submeshIdx) in indexes) {
                this.faceIndexStart = submeshIdx > 0 ? indexes[submeshIdx - 1][0] : 0;
                this.faceIndexEnd = indexes[submeshIdx][0];
            }
        }

        /*
        metadata = indexes[i][1];

        // WARN: TODO: this transformation is done in other places
        let meshName = null;
        if (!combined) {
            meshName = pickResult.pickedMesh.id.split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
        } else {
            meshName = metadata['ddd:path'].split("/").pop().replaceAll('#', '_'); // .replaceAll("_", " ");
        }
        */

    }

    static nodeMetadata(node: Node) {
        if ( node && node.metadata && node.metadata.gltf && node.metadata.gltf.extras ) {
            return node.metadata.gltf.extras;
        } else if (node.metadata !== null) {
            return node.metadata;
        } else {
            return null;
        }
    }

    static fromMeshFace(mesh: Mesh, faceIndex: number): DDDObjectRef {

        //console.debug("Selecting from mesh and face (mesh=" + mesh.id + ", faceIndex=" + faceIndex + ")");

        let metadata = DDDObjectRef.nodeMetadata(mesh);

        let subIndex = -1;
        if (metadata) {
            if ('ddd:combined:indexes' in metadata)  {
                const indexes = metadata['ddd:combined:indexes'];
                // Find triangle in indexes
                let prevIndex = -1;
                //if (indexes.length > 0) { subIndex = 0; }
                for (let i = 0; i < indexes.length; i++) {
                    if (faceIndex > prevIndex && faceIndex < indexes[i][0]) {
                        subIndex = i;
                        break;
                    }
                    prevIndex = indexes[i][0];
                }
            }
        }

        const objectRef = new DDDObjectRef(mesh, subIndex);
        return objectRef;
    }

    /*
    findChildByName(name: string): DDDObjectRef | null {
        return null;
    }
    */

    getMetadata(): any {
        let metadata = DDDObjectRef.nodeMetadata(this.mesh);
        if (metadata && this.submeshIdx >= 0) {
            const indexes = metadata['ddd:combined:indexes'];
            metadata = indexes[this.submeshIdx][1];
        }
        return metadata;
    }

    static urlId(value: string): string {
        let result = value;
        if (result) {
            result = result.replaceAll("/", "-");
            result = result.replaceAll("#", "_");
            result = result.replaceAll(" ", "_");
            result = encodeURIComponent(result);
            result = result.replaceAll("%3A", ":");
            //result = result.replace("/", "_");
            //result = result.replace("#", "_");
        }
        return result;
    }

    getId(): string {
        const metadata = this.getMetadata();

        let result = this.mesh.id;
        if (metadata && ('ddd:rpath' in metadata)) {
            result = metadata['ddd:rpath'];
        } else if (metadata && ('ddd:path' in metadata)) {
            result = metadata['ddd:path'];
        }
        return result;
    }

    getUrlId(): string {
        let result = this.getId();
        result = DDDObjectRef.urlId(result);
        return result;
    }

    getLabel(): string {
        let result = this.getId();
        return result;
    }

    getChildren(): DDDObjectRef[] {
        const result: DDDObjectRef[] = [];

        //if (this.submeshIdx < 0) {
        for (let child of this.mesh.getChildren()) {
            result.push(new DDDObjectRef(child));
        }
        //}

        const metadata = this.getMetadata();
        if (metadata && 'ddd:combined:indexes' in metadata) {
            for (let i = 0; i < metadata['ddd:combined:indexes'].length; i++) {
                result.push(new DDDObjectRef(this.mesh, i));
            }
        }

        return result;
    }

    getParent(): DDDObjectRef | null {
        let result = null;
        let parent = this.mesh.parent;
        if (parent) { result = new DDDObjectRef(parent); }
        return result;
    }

}

export { DDDObjectRef };