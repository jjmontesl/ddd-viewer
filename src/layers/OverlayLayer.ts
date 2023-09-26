import {
    AbstractMesh,
    Color3,
    Mesh,
    MeshBuilder,
    Node,
    Ray,
    StandardMaterial,
    Texture,
    TransformNode,
    Vector3,
} from "@babylonjs/core";
import { Coordinate } from "ol/coordinate";
import * as extent from "ol/extent";
import * as olProj from "ol/proj";
import { createXYZ, extentFromProjection } from "ol/tilegrid";
import TileGrid from "ol/tilegrid/TileGrid";
import { SceneViewer } from "../SceneViewer";
import { Base3DLayer } from "./Base3DLayer";
import { GeoJson3DLayer } from "./GeoJson3DLayer";

class OverlayLayer extends Base3DLayer {
    sourceLayerKey: string;

    items: HTMLElement[] = [];

    div: HTMLElement | null = null;

    template: string | null = null;

    maxDistance: number = 0;

    maxItems: number = 10;

    occlude: boolean = false;

    constructor(key: string, sourceLayerKey: string) {
        super(key);
        this.sourceLayerKey = sourceLayerKey;
        setTimeout(() => {
            this.createOverlayDiv();
            this.updateSceneFromFeatures();
        }, 0);
    }

    createOverlayDiv(): void {
    // Add an overlay DIV over the 3D canvas
    // FIXME: This should be created by the scene viewer, and other divs
        const sceneViewer: SceneViewer = this.layerManager!.sceneViewer;
        this.div = document.createElement("div");
        sceneViewer.element.appendChild(this.div);
        this.div.className = "ddd-layer-overlay";

        this.div.style.zIndex = "5";
        this.div.style.width = "100%";
        this.div.style.height = "100%";
        this.div.style.position = "absolute";
        this.div.style.top = "0";
        this.div.style.left = "0";
        this.div.style.right = "0";
        this.div.style.bottom = "0";
        this.div.style.pointerEvents = "none";
    }

    resizeOverlayDiv() {
        const sceneViewer: SceneViewer = this.layerManager!.sceneViewer;
    this.div!.style.width = sceneViewer.canvas.style.width;
    this.div!.style.height = sceneViewer.canvas.style.height;
    }

    update(): void {}

    setVisible(visible: boolean) {
        super.setVisible(visible);
        if (this.div) this.div.style.display == "visible" ? "block" : "none";
    /*
        for (let node of this.sceneNodes) {
            node.setEnabled(this.visible);
        }
        */
    }

    /**
   * Update scene generating a DIV for each feature in the source layer.
   */
    updateSceneFromFeatures() {
        const sourceLayer = <GeoJson3DLayer>(
      this.layerManager!.getLayer(this.sourceLayerKey)!
    );
        for (const feature of sourceLayer.featuresPoints) {
            const html =
        "<div style=\"background: white; display: inline-block;\">Feature: " +
        feature +
        "</div>";
            const featureDiv = document.createElement("div");
      this.div!.appendChild(featureDiv);
      featureDiv.outerHTML = html;
        }

    /*
        for (let feature of this.featuresLines) {
            let marker = MeshBuilder.CreateLines("lineMarker", { points: feature.coordsScene }, sceneViewer.scene);
            marker.material = this.featureMaterial;
            marker.parent = this.rootNode;
            //this.sceneNodes.push(marker);
        }
        */
    }

    clearScene() {
    /*
        if (this.rootNode) {
            this.rootNode.parent = null;
            this.rootNode.dispose();
            this.rootNode = null;
        }
        */
    }
}

export { OverlayLayer };
