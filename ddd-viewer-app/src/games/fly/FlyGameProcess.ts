import * as BABYLON from 'babylonjs';

export default class {

    constructor( gameData ) {

        // These attributes are set by the SceneViewer/ViewerProcesses externally
        this.processes = null;
		this.sceneViewer = null;
        this.finished = false;

        this.time = 0.0;

        this.gameLabel = 'Vuelo Principante';

        this.seagull = null;

        // JSON encoded game data
        this.gameData = gameData;

        this.controlsLeft = false;
        this.controlsRight = false;
        this.controlsUp = false;
        this.controlsDown = false;

        this.rotationSpeed = 2 * Math.PI * 0.5;

        this.seagull = null;
        this.heading = 0;
        this.velocity = new BABYLON.Vector3();

        /*
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.animTime = animTime;
        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
        */
    }

    loadPlayerModel() {
        const filename = '/assets/seagull/gull-oriented.glb';
        BABYLON.SceneLoader.ImportMesh( null, filename, '', this.scene, //this.scene,
          // onSuccess
          // eslint-disable-next-line no-unused-vars
          ( newMeshes, particleSystems, skeletons ) => {
              newMeshes[0].setParent( null );
              newMeshes[0].setEnabled( true );
              newMeshes[0].position = new BABYLON.Vector3( 0, 200, 0 );
              this.seagull = newMeshes[0];

              newMeshes.forEach(( mesh ) => {
                  this.sceneViewer.shadowGenerator.getShadowMap().renderList.push( mesh );
              });
          },
		  () => {
          },
          ( scene, msg, ex ) => {
              console.log( 'Could not load model: ' + filename, ex );
          }
       );
    }

    initialize() {

        this.sceneViewer = this.processes.sceneViewer;

        // Load seagull model
        this.loadPlayerModel();

        // Set player initial position
        //@42.2309465,-8.7266273,34a,35y,24.5h,70.25t
        this.sceneViewer.camera.detachControl();
        this.sceneViewer.viewerState.sceneViewModeShow = false;

        window.addEventListener( 'keydown', ( e ) => { if ( String.fromCharCode( e.which ) === 'A' ) { this.controlsLeft = true; } });
        window.addEventListener( 'keyup', ( e ) => { if ( String.fromCharCode( e.which ) === 'A' ) { this.controlsLeft = false; } });
        window.addEventListener( 'keydown', ( e ) => { if ( String.fromCharCode( e.which ) === 'D' ) { this.controlsRight = true; } });
        window.addEventListener( 'keyup', ( e ) => { if ( String.fromCharCode( e.which ) === 'D' ) { this.controlsRight = false; } });
        window.addEventListener( 'keydown', ( e ) => { if ( String.fromCharCode( e.which ) === 'W' ) { this.controlsUp = true; } });
        window.addEventListener( 'keyup', ( e ) => { if ( String.fromCharCode( e.which ) === 'W' ) { this.controlsUp = false; } });
        window.addEventListener( 'keydown', ( e ) => { if ( String.fromCharCode( e.which ) === 'S' ) { this.controlsDown = true; } });
        window.addEventListener( 'keyup', ( e ) => { if ( String.fromCharCode( e.which ) === 'S' ) { this.controlsDown = false; } });

    }

    update( deltaTime ) {

        // TODO: Hacky way of initializing the process:
        // This should be called by ViewerProcesses for each new process.
        if ( this.time === 0 ) {
            this.initialize();
        }
        this.time += deltaTime;
        const sceneViewer = this.processes.sceneViewer;

        // Check needed objects are loaded
        if ( this.seagull === null ) { return; }

        // Process input
        let pitch = 0.0;
        if ( this.controlsLeft ) { this.heading -= this.rotationSpeed * deltaTime; }
        if ( this.controlsRight ) { this.heading += this.rotationSpeed * deltaTime; }
        if ( this.controlsUp ) { pitch = -0.3; }
        if ( this.controlsDown ) { pitch = 0.1; }

        // Apply physics
        let inclination = ( this.controlsLeft ? -0.2 : ( this.controlsRight ? 0.2 : 0.0 ));
        this.seagull.rotation = new BABYLON.Vector3( pitch, this.heading, inclination );

        let velocityRef = new BABYLON.Vector3( 0, -2.0, -7.5 );
        let headingRotation = new BABYLON.Vector3( 0, this.heading, 0 ).toQuaternion();
        let velocity = velocityRef.rotateByQuaternionToRef( headingRotation, new BABYLON.Vector3());

        const movement = velocity.scale( deltaTime );


        let newPos = this.seagull.position.clone();
        newPos.addInPlace( movement );
        this.seagull.position = newPos;

        // Update camera to follow target from behind
        let cameraTargetPos = new BABYLON.Vector3( 0, 1, -2 );
        let cameraTargetPosWorld = BABYLON.Vector3.TransformCoordinates( cameraTargetPos, this.seagull.getWorldMatrix());

        let cameraNewPos = BABYLON.Vector3.Lerp( sceneViewer.camera.position, cameraTargetPosWorld, 0.02 );

        sceneViewer.camera.position = cameraNewPos;
        //sceneViewer.camera.lookAt(this.seagull.position);
        //new BABYLON.Vector3((90.0 - sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
        sceneViewer.camera.setTarget( this.seagull.position );

    }

}
