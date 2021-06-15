import ViewerProcesses from "./ViewerProcesses";

class AnimationProcess {

    processes: ViewerProcesses | null;
    finished: boolean;

    animTime: number;
    time: number;

    interpFactor: number;

    constructor( processes: ViewerProcesses, animTime: number ) {
        this.processes = processes;

        this.finished = false;

        this.animTime = animTime;
        this.time = 0.0;
        this.interpFactor = 0.0;
    }

    update( deltaTime: number, factor: number = 0 ): void {
        this.time += deltaTime;

        this.interpFactor = ( this.animTime > 0 )
            ? (( this.time ) / ( this.animTime - factor ))
            : 1.0;

        if ( this.interpFactor > 1.0 ) this.interpFactor = 1.0;
    
    }

}

export default AnimationProcess;