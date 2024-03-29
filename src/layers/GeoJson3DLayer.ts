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

class GeoJsonItem {
    properties: any;
}

class GeoJsonPoint extends GeoJsonItem {
    coordsWgs84: Vector3 = Vector3.Zero();
    coordsScene: Vector3 = Vector3.Zero();

    constructor(coordsWgs84: Vector3) {
        super();
        this.coordsWgs84 = coordsWgs84;
    }

    /**
   * Currently receives a viewer for coordinate transformations
   */
    transformCoords(viewer: SceneViewer) {
        const csa = viewer.wgs84ToScene(this.coordsWgs84.asArray());
        this.coordsScene = Vector3.FromArray(csa);
    }
}

class GeoJsonLine extends GeoJsonItem {
    // TODO: These should be buffers
    coordsWgs84: Vector3[] = [];
    coordsScene: Vector3[] = [];

    constructor(coordsWgs84: Vector3[]) {
        super();
        this.coordsWgs84 = coordsWgs84;
    }

    /**
   * Currently receives a viewer for coordinate transformations
   */
    transformCoords(viewer: SceneViewer) {
        this.coordsScene = [];
        for (const v of this.coordsWgs84) {
            const csa = viewer.wgs84ToScene(v.asArray());
            this.coordsScene.push(Vector3.FromArray(csa));
        }
    }
}

class GeoJson3DLayer extends Base3DLayer {
    featuresPoints: GeoJsonPoint[] = [];
    featuresLines: GeoJsonLine[] = [];

    altitudeOffset: number = 50;
    colorHex: string = "#ff00ff";

    //private sceneNodes: Mesh[] = [];
    private rootNode: TransformNode | null = null;

    private featureMaterial: StandardMaterial | null = null;

    constructor(key: string, geojsonData: any) {
        super(key);
        setTimeout(() => {
            this.loadFromGeoJson(geojsonData);
            this.projectFeatures();
            this.updateSceneFromFeatures();
        }, 0);
    }

    update(): void {}

    setColor(colorHex: string) {
        this.colorHex = colorHex;

        if (this.featureMaterial) {
            const color = Color3.FromHexString(colorHex);
            //this.featureMaterial.unfreeze();
            this.featureMaterial.diffuseColor = color;
            this.featureMaterial.emissiveColor = color;
            this.featureMaterial.disableLighting = true;
            //this.featureMaterial.freeze();
        }
    }

    setVisible(visible: boolean) {
        super.setVisible(visible);
        if (this.rootNode) this.rootNode.setEnabled(this.visible);
    /*
        for (let node of this.sceneNodes) {
            node.setEnabled(this.visible);
        }
        */
    }

    setAltitudeOffset(altitudeOffset: number) {
        this.altitudeOffset = altitudeOffset;
        if (this.rootNode) {
            this.rootNode.position.y = this.altitudeOffset; // Apply offset
        }
    }

    /**
   * Processes GeoJSON data (already loaded as Javascript objects) and loads the different features.
   */
    loadFromGeoJson(data: any): void {
        for (const feature of data["features"]) {
            this.loadFeature(feature);
        }
    }

    loadFeature(feature: any): void {
        const properties = feature["properties"];
        const geometry = feature["geometry"];

        if (geometry["type"] == "Point") {
            const lat = geometry["coordinates"][0];
            const lon = geometry["coordinates"][1];
            const alt =
        geometry["coordinates"].length > 2 ? geometry["coordinates"][2] : 0;
            const geojsonItem = new GeoJsonPoint(new Vector3(lat, lon, alt));
            geojsonItem.properties = properties;

            this.featuresPoints.push(geojsonItem);
        } else if (geometry["type"] == "LineString") {
            const coords: Vector3[] = [];
            for (const coord of geometry["coordinates"]) {
                const lat = coord[0];
                const lon = coord[1];
                const alt = coord.length > 2 ? coord[2] : 0;
                const v = new Vector3(lat, lon, alt);
                coords.push(v);
            }
            const geojsonItem = new GeoJsonLine(coords);
            geojsonItem.properties = properties;

            this.featuresLines.push(geojsonItem);
        } else {
            console.info("Unknown GeoJSON geometry type: " + geometry["type"]);
        }
    }

    projectFeatures(): void {
        for (const feature of this.featuresPoints) {
            feature.transformCoords(this.layerManager!.sceneViewer);
        }
        for (const feature of this.featuresLines) {
            feature.transformCoords(this.layerManager!.sceneViewer);
        }
    }

    /**
   * TODO: This should be a more generic "markers" and "lines" vector visualization facility.
   */
    updateSceneFromFeatures(): void {
        const sceneViewer = this.layerManager!.sceneViewer;

        // Create material only if it hasn't already been created
        if (!this.featureMaterial) {
            const featureMaterial = new StandardMaterial(
                "featureMaterial",
                sceneViewer.scene,
            );
            this.featureMaterial = featureMaterial;
        }

        if (!this.rootNode) {
            this.rootNode = new TransformNode(
                "geoJson3DLayer-root",
                sceneViewer.scene,
            );
        }

        this.setColor(this.colorHex);

        for (const feature of this.featuresPoints) {
            const marker = MeshBuilder.CreateSphere(
                "pointMarker",
                { diameter: 1.5, segments: 3 },
                sceneViewer.scene,
            );
            marker.material = this.featureMaterial;
            marker.position = feature.coordsScene;
            marker.parent = this.rootNode;
            //sceneNodes.push(marker);
        }

        for (const feature of this.featuresLines) {
            const marker = MeshBuilder.CreateLines(
                "lineMarker",
                { points: feature.coordsScene },
                sceneViewer.scene,
            );
            marker.material = this.featureMaterial;
            marker.parent = this.rootNode;
            //this.sceneNodes.push(marker);
        }

        this.setAltitudeOffset(this.altitudeOffset);
    }

    clearScene() {
        if (this.rootNode) {
            this.rootNode.parent = null;
            this.rootNode.dispose();
            this.rootNode = null;
        }
    }
}

export { GeoJson3DLayer };
