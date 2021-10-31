/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D scenes
* Copyright 2021 Jose Juan Montes and Contributors
* MIT License (see LICENSE file)
*/

import { Camera } from "@babylonjs/core";
import { SceneViewer } from "SceneViewer";
import { BaseCameraController } from "./BaseCameraController";

/**
 * DDD Viewer base layer class.
 */
class WalkCollideCameraController extends BaseCameraController {

    update(deltaTime: number): void {

    }

    activate(): void {
    }

   /*
    geolocationPosition( enabled ) {

        //this.selectCameraFree();
        //this.walkMode = true;
        //this.camera.detachControl();

        /-
        this.app.$getLocation({enableHighAccuracy: true}).then(coordinates => {
            console.log(coordinates);
            let altitude = coordinates.altitude !== null ? coordinates.altitude : 2.0;
            let scenePos = this.wgs84ToScene([coordinates.lng, coordinates.lat, altitude]);
            //console.log(scenePos);
            this.camera.position.x = scenePos[0];
            this.camera.position.y = altitude;
            this.camera.position.z = scenePos[2];

            let heading = coordinates.heading;
            if (heading) {
                this.sceneViewer.viewerState.positionHeading = heading;
                let rotation = new Vector3((90.0 - this.sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), this.sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
                this.camera.rotation = rotation;
            }
        });
        -/

        this.viewerState.geolocationEnabled = enabled;

        if ( enabled ) {

            const that = this;

            // Enable geolocation
            this.selectCameraFree();

            //this._geolocationWatchId = this.app.$watchLocation({enableHighAccuracy: true, maximumAge: 5}).then(coordinates => {
            this.app.$getLocation({ enableHighAccuracy: true, maximumAge: 5 }).then(( coords ) => { that.onDeviceLocation( coords ); });

            // Compass
            this._onDeviceOrientation = function( e ) { that.onDeviceOrientation( e ); };
            this._onDeviceOrientation.bind( that );
            const isIOS = false;
            if ( isIOS ) {
                DeviceOrientationEvent.requestPermission().then(( response ) => {
                    if ( response === "granted" ) {
                        window.addEventListener( "deviceorientation", this._onDeviceOrientation );
                    } else {
                        alert( "Compass usage permission not granted." );
                    }
                }).catch(() => alert( "Compass not supported." ));
            } else {
                window.addEventListener( "deviceorientationabsolute", this._onDeviceOrientation );
            }

        } else  {

            // Disable geolocation

            this.viewerState.geolocationEnabled = false;
            if ( this._geolocationWatchId !== null ) {
                this.app.$clearLocationWatch( this._geolocationWatchId );
                this._geolocationWatchId = null;
            }
            window.removeEventListener( "deviceorientationabsolute", this._onDeviceOrientation );
            window.removeEventListener( "deviceorientation", this._onDeviceOrientation );
            this._onDeviceOrientation = null;
        }

    }

    onDeviceLocation( coordinates ) {
        //console.log(coordinates);
        if ( coordinates ) {

            const altitude = coordinates.altitude !== null ? coordinates.altitude : 2.0;
            if ( this.walkMode ) { altitude.y = 2.5; }

            this.viewerState.positionWGS84 = [ coordinates.lng, coordinates.lat, altitude ];
            const scenePos = this.wgs84ToScene( this.viewerState.positionWGS84 );
            this.viewerState.positionScene = scenePos;

            this.camera.position.x = scenePos[0];
            this.camera.position.y = altitude;
            this.camera.position.z = scenePos[2];

            /-
            let heading = coordinates.heading;
            if (heading !== null && !isNaN(heading)) {
                this.viewerState.positionHeading = heading;
                let rotation = new Vector3((90.0 - this.viewerState.positionTilt) * (Math.PI / 180.0), this.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
                this.camera.rotation = rotation;
                //console.debug(heading);
            }
            -/
        }

        if ( this.viewerState.geolocationEnabled ) {
            const that = this;
            setTimeout( function() {
                that.app.$getLocation({ enableHighAccuracy: true, maximumAge: 5 }).then(( coords ) => { that.onDeviceLocation( coords ); });
            }, 1000 );
        }

    }
    */


    /**
    * From: https://www.w3.org/TR/orientation-event/
    */
    /*
    getQuaternion( alpha, beta, gamma ) {

        var degtorad = Math.PI / 180; // Degree-to-Radian conversion

      var _x = beta  ? beta  * degtorad : 0; // beta value
      var _y = gamma ? gamma * degtorad : 0; // gamma value
      var _z = alpha ? alpha * degtorad : 0; // alpha value

      var cX = Math.cos( _x/2 );
      var cY = Math.cos( _y/2 );
      var cZ = Math.cos( _z/2 );
      var sX = Math.sin( _x/2 );
      var sY = Math.sin( _y/2 );
      var sZ = Math.sin( _z/2 );

      //
      // ZXY quaternion construction.
      //

      var w = cX * cY * cZ - sX * sY * sZ;
      var x = sX * cY * cZ - cX * sY * sZ;
      var y = cX * sY * cZ + sX * cY * sZ;
      var z = cX * cY * sZ + sX * sY * cZ;

      //return [ w, x, y, z ];
      return new Quaternion(x, y, z, w);
    }
    */

    /*
    onDeviceOrientation( e ) {

        //let rotation = Quaternion.FromEulerAngles(e.alpha * Math.PI / 180.0, e.beta * Math.PI / 180.0, e.gamma * Math.PI / 180.0);
        //let forward = Vector3.Forward().rotateByQuaternionToRef(rotation, new Vector3());
        //let heading = Math.atan2(forward.y, forward.x) * 180.0 / Math.PI;
        //alert(heading);

        let heading = e.webkitCompassHeading || Math.abs( e.alpha - 360 );

        if ( heading !== null && !isNaN( heading )) {

            heading = ( heading ) % 360.0;
            this.viewerState.positionHeading = heading;

            let tilt = e.webkitCompassTilt || Math.abs( e.beta - 360 );
            if ( tilt !== null && !isNaN( tilt )) {
                this.viewerState.positionTilt = ( - tilt );
            }

            const tiltRotation = ( 90.0 - this.viewerState.positionTilt ) * ( Math.PI / 180.0 );
            if ( tiltRotation < 0 ) { tilt = Math.PI * 2 - tiltRotation; }
            const rotation = new Vector3( tiltRotation, this.viewerState.positionHeading * ( Math.PI / 180.0 ), 0.0 );
            //let rotation = new Vector3(Math.PI / 2 + -e.beta * Math.PI / 180.0, -e.alpha * Math.PI / 180.0, e.gamma * Math.PI / 180.0 );
            this.camera!.rotation = rotation;
            //console.debug(heading);
        }
        //compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
    }
    */


}

export { WalkCollideCameraController };