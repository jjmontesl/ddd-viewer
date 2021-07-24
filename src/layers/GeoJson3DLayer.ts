import { AbstractMesh, Color3, Mesh, MeshBuilder, Node, Ray, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonjs/core";
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
        let csa = viewer.wgs84ToScene(this.coordsWgs84.asArray());
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
        for (let v of this.coordsWgs84) {
            let csa = viewer.wgs84ToScene(v.asArray());
            this.coordsScene.push(Vector3.FromArray(csa));
        }
    }

}


class GeoJson3DLayer extends Base3DLayer {

    featuresPoints: GeoJsonPoint[] = [];
    featuresLines: GeoJsonLine[] = [];

    altitudeOffset: number = 50;

    constructor() {
        super();
        setTimeout(() => {
            this.loadFromGeoJson(this.testData2);
            this.projectFeatures();
            this.updateSceneFromFeatures();
        }, 0);
    }

    update(): void { 
    }

    /**
     * Processes GeoJSON data (already loaded as Javascript objects) and loads the different features.
     */
    loadFromGeoJson(data: any): void {
        for (let feature of data['features']) {
            this.loadFeature(feature);
        }
    }

    loadFeature(feature: any): void {
        let properties = feature['properties'];
        let geometry = feature['geometry'];
        
        if (geometry['type'] == 'Point') {
            const lat = geometry['coordinates'][0];
            const lon = geometry['coordinates'][1];
            const alt = geometry['coordinates'].length > 2 ? geometry['coordinates'][2] : 0;
            let geojsonItem = new GeoJsonPoint(new Vector3(lat, lon, alt));
            geojsonItem.properties = properties;
            
            this.featuresPoints.push(geojsonItem);

        } else if (geometry['type'] == 'LineString') {
            let coords : Vector3[] = [];
            for (let coord of geometry['coordinates']) {
                const lat = coord[0];
                const lon = coord[1];
                const alt = coord.length > 2 ? coord[2] : 0;
                let v = new Vector3(lat, lon, alt);
                coords.push(v);
            }
            let geojsonItem = new GeoJsonLine(coords);
            geojsonItem.properties = properties;
            
            this.featuresLines.push(geojsonItem);

        } else {
            console.info("Unknown GeoJSON geometry type: " + geometry['type']);
        }
    }

    projectFeatures(): void {
        for (let feature of this.featuresPoints) {
            feature.transformCoords(this.layerManager!.sceneViewer);
        }
        for (let feature of this.featuresLines) {
            feature.transformCoords(this.layerManager!.sceneViewer);
        }
    }

    /**
     * TODO: This should be a more generic "markers" and "lines" vector visualization facility.
     */
    updateSceneFromFeatures(): void {
        const sceneViewer = this.layerManager!.sceneViewer;
        
        const markerMaterial = new StandardMaterial( "materialMarker", sceneViewer.scene );
        markerMaterial.diffuseColor = new Color3( 1, 0, 1 );
        markerMaterial.emissiveColor = new Color3( 1.0, 0.0, 1. );
        markerMaterial.disableLighting = true;

        for (let feature of this.featuresPoints) {
            let marker = MeshBuilder.CreateSphere("pointMarker", { diameter: 1.5, segments: 10 }, sceneViewer.scene);
            marker.material = markerMaterial;
            marker.position = feature.coordsScene;
            marker.position.y += this.altitudeOffset;  // Apply offset
        }
        
        for (let feature of this.featuresLines) {
            let marker = MeshBuilder.CreateLines("lineMarker", { points: feature.coordsScene }, sceneViewer.scene);
            marker.material = markerMaterial;
            marker.position.y += this.altitudeOffset;  // Apply offset
        }

    }

    testData2 = {
        "type": "FeatureCollection",
        "name": "test-geojson-coruna",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404975183396386, 43.384659774474109 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404796061689986, 43.386062790394071 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401014603443789, 43.385093700392034 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401512163739342, 43.384356024483452 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.402606796389557, 43.383329048957805 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.403661624216127, 43.382620281054209 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405233914750072, 43.38225866158453 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40569167022198, 43.382866181061509 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406328547400287, 43.382952969061265 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407104741461348, 43.383155473910833 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407462984874147, 43.38327119066404 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407522692109612, 43.383343513522611 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.408219276523386, 43.383488158980946 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.408816348878048, 43.383517088031198 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409353713997245, 43.3833724426419 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409811469469153, 43.383141009301148 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409871176704618, 43.382764928238124 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409930883940087, 43.382186337431747 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409791567057331, 43.381564346156296 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40073596967828, 43.385498695113057 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400298116618195, 43.385730119453108 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399800556322642, 43.385874759216982 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.385961542909655 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398785533319716, 43.386366531832685 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398188460965054, 43.386409923342534 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.3978700223759, 43.386352067989165 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39749187655128, 43.386120646023528 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39739236449217, 43.385932615025901 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397054023491195, 43.385643335429116 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396695780078398, 43.385469767008424 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396257927018311, 43.385440838889991 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395541440192716, 43.385339590366762 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395063782308986, 43.385252805783679 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.3946259292489, 43.385209413445558 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394387100307036, 43.385137092812982 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39424778342428, 43.384963522942783 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394128368953348, 43.384674238721409 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394188076188815, 43.384370488803235 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394387100307036, 43.383936557708552 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394645831660721, 43.383864235557446 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394705538896188, 43.383835306672857 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395800171546403, 43.379654937728894 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39643704872471, 43.380088899469932 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396815194549328, 43.380378205571724 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397054023491195, 43.380681975492863 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397969534435012, 43.381188255312658 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398088948905944, 43.381231650529067 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398467094730563, 43.381260580656068 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399143776732515, 43.381390766056818 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.381564346156296 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399720946675354, 43.38172346081091 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40015879973544, 43.381882575047932 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400417531089127, 43.382128478047406 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400536945560059, 43.382388844842083 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400954896208322, 43.382779392937529 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401432554092056, 43.382880645736762 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401571870974809, 43.382967433715805 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401611675798453, 43.38301082765873 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401750992681208, 43.383039756936761 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.403263575979686, 43.383126544688025 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404079574864392, 43.383054221570596 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404716452042699, 43.382924039741816 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405094597867318, 43.382895110408562 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405253817161896, 43.382866181061509 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406109620870245, 43.38285171638281 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406348449812111, 43.385484231062463 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406109620870245, 43.385498695113043 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405870791928379, 43.385686727456637 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405671767810158, 43.386019398635739 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405731475045625, 43.386221893242201 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405990206399315, 43.386409923342526 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406388254635756, 43.386569025279542 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406786302872197, 43.386540097685696 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40708483904953, 43.386424387172227 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407164448696816, 43.38629421258058 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407244058344103, 43.386091718215702 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40718435110864, 43.385831367324059 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407025131814063, 43.385657799441745 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406766400460375, 43.38545530295093 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406567376342153, 43.385382982611702 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399402508086203, 43.384703167205664 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399283093615269, 43.384399417432448 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399223386379802, 43.384269238492294 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399084069497047, 43.383849771116886 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398924850202471, 43.383517088031198 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398845240555183, 43.38327119066404 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398805435731539, 43.383227796907462 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398944752614293, 43.384630845969141 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399143776732515, 43.384196916738091 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399223386379802, 43.383994415367297 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399263191203447, 43.383922093285236 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.383560481580687 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399521922557133, 43.383314584389538 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399541824968956, 43.383155473910833 ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399502020145311, 43.383097615451412 ] } }
        ]
        };

    testData = {
        "type": "FeatureCollection",
        "name": "test-geojson-coruna-lines",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.409938347344516, 43.382511795439768 ], [ -8.409639811167185, 43.383075918514884 ], [ -8.408992982782967, 43.383437533109785 ], [ -8.408087423045062, 43.383437533109785 ], [ -8.40748039948449, 43.383206100017517 ], [ -8.406753961452983, 43.382924039741802 ], [ -8.405659328802768, 43.382837251700643 ], [ -8.404276111181133, 43.382931272072959 ], [ -8.403280990590028, 43.383104847761842 ], [ -8.403579526767359, 43.383582178343772 ], [ -8.403629282796915, 43.383958254337038 ], [ -8.403997477415624, 43.384312631503391 ], [ -8.403947721386068, 43.384623613840724 ], [ -8.403768599679669, 43.384724863559796 ], [ -8.403828306915138, 43.385057540017485 ], [ -8.4042462575634, 43.385260037837 ], [ -8.404843329918062, 43.385440838889984 ], [ -8.406007621009655, 43.385643335429101 ], [ -8.406753961452983, 43.3854625349801 ], [ -8.407400789837201, 43.385824135338872 ], [ -8.407380887425379, 43.38613510992225 ], [ -8.407191814513068, 43.386446082910318 ], [ -8.406425571657918, 43.386612416644418 ], [ -8.406037474627388, 43.386583489071278 ], [ -8.40481347630033, 43.38613510992225 ], [ -8.403708892444204, 43.385614407393483 ], [ -8.402843137529942, 43.385498695113029 ], [ -8.401639041614706, 43.385621639403695 ], [ -8.401360407849198, 43.385657799441717 ], [ -8.400673774641335, 43.385737351449485 ], [ -8.400106555904404, 43.385672263450907 ], [ -8.399608995608853, 43.385332358322906 ], [ -8.399400020284721, 43.38495629085407 ], [ -8.399439825108365, 43.384594685318518 ], [ -8.399897580580275, 43.384406649587589 ], [ -8.400405092081737, 43.384290935001729 ], [ -8.400574262582225, 43.384139059272592 ], [ -8.400673774641335, 43.38389316442823 ], [ -8.401181286142799, 43.383538784809822 ], [ -8.401678846438351, 43.383329048957798 ], [ -8.401987333821593, 43.382916807409785 ], [ -8.401967431409771, 43.382779392937522 ], [ -8.401629090408795, 43.382699837048044 ], [ -8.401400212672842, 43.382844484042153 ], [ -8.401330554231464, 43.382989130691143 ], [ -8.401430066290576, 43.383083150827908 ], [ -8.401519627143774, 43.383112080071434 ] ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.404972695594909, 43.38451513181122 ], [ -8.404813476300331, 43.384211381095817 ], [ -8.405032402830374, 43.383835306672836 ], [ -8.40537074383135, 43.38357494609027 ], [ -8.405808596891436, 43.383502623507773 ], [ -8.406186742716054, 43.383502623507773 ], [ -8.406385766834276, 43.383690662042795 ], [ -8.406345962010631, 43.384066737363078 ], [ -8.406027523421479, 43.384356024483445 ], [ -8.40556976794957, 43.384457274649435 ], [ -8.405171719713129, 43.384413881741857 ], [ -8.40537074383135, 43.383979950957773 ], [ -8.405609572773216, 43.38396548654481 ], [ -8.405928011362366, 43.384066737363078 ], [ -8.405768792067791, 43.384211381095817 ], [ -8.405510060714104, 43.384225845450111 ] ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.403101868883633, 43.384804416791852 ], [ -8.40328099059003, 43.384399417432427 ], [ -8.403121771295453, 43.38415352364413 ], [ -8.402763527882657, 43.383922093285214 ], [ -8.402325674822571, 43.383835306672836 ], [ -8.401708700056085, 43.383893164428223 ], [ -8.401231042172356, 43.38429816716981 ], [ -8.4010917252896, 43.384587453185787 ], [ -8.401330554231466, 43.384862273622318 ], [ -8.40202713864524, 43.385021379621385 ], [ -8.402723723059012, 43.384934594582752 ], [ -8.402863039941767, 43.384645310223334 ], [ -8.402902844765411, 43.384327095833527 ], [ -8.402683918235367, 43.38419691673807 ], [ -8.402285869998925, 43.384139059272584 ], [ -8.401867919350662, 43.38415352364413 ], [ -8.401549480761508, 43.384341560160216 ], [ -8.401629090408798, 43.384572988917775 ], [ -8.401947528997949, 43.384674238721395 ], [ -8.402206260351637, 43.384659774474088 ], [ -8.402484894117146, 43.384428346047834 ] ] } },
        { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.408475520075596, 43.384211381095817 ], [ -8.407938154956399, 43.38463084596912 ], [ -8.407977959780043, 43.384211381095817 ], [ -8.407460497072668, 43.38444281035035 ], [ -8.407380887425381, 43.384008879773347 ], [ -8.407022644012581, 43.38429816716981 ], [ -8.407042546424405, 43.383979950957773 ] ] } }
        ]
    }

}


export { GeoJson3DLayer };

