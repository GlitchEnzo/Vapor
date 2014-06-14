module Vapor {
    /**
     * A wrapper around the Web AudioSource API AudioBuffer object
     * @class Represents an AudioManager
     */
    export class AudioSource {
        /**
         * The Web Audio API AudioBuffer.
         */
        public buffer: AudioBuffer;

        /**
         * The Web Audio API Source Buffer.
         */
        public source: AudioBufferSourceNode;

        /**
         * The AudioManager managing this AudioSource.
         */
        public manager: AudioManager;

        public loaded: boolean = false;

        // TODO: This needs to be updated to always be tracking the time when the audio is playing
        //public currentTime: number;

        private startTime: number;
        private pauseTime: number;

        constructor(manager: AudioManager) {
            this.manager = manager;
            //this.source = manager.context.createBufferSource();
            //this.source.connect(manager.context.destination);
        }

        //public LoadAudio(url: string, callback: (source: AudioSource) => any) {
        //    FileDownloader.DownloadArrayBuffer(url, (request) => {
        //        this.manager.context.decodeAudioData(request.response, (buffer) => {
        //            this.source.buffer = buffer;
        //            this.loaded = true;
        //            callback(this);
        //        });
        //    });
        //}

        public Play(startTime: number = this.pauseTime) {
            this.source = this.manager.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.manager.context.destination);
            this.source.start(0, startTime);

            // save the start time 
            this.startTime = performance.now();
        }

        public Pause() {
            this.source.stop(0);

            // NOTE: This method will fail if the song is paused multiple times during playback
            this.pauseTime = performance.now() - this.startTime;
        }

        public Stop() {
            this.source.stop(0);

            this.startTime = 0;
            this.pauseTime = 0;
        }

        public static FromFile(manager: AudioManager, url: string, callback: (source: AudioSource) => any) {
            var source = new AudioSource(manager);
            FileDownloader.DownloadArrayBuffer(url, (request) => {
                source.manager.context.decodeAudioData(request.response, (buffer) => {
                    source.buffer = buffer;
                    //source.source.buffer = buffer;
                    source.loaded = true;
                    callback(source);
                });
            });
        }
    }
} 