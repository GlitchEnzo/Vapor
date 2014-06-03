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

        constructor(manager: AudioManager) {
            this.manager = manager;
            this.source = manager.context.createBufferSource();
            this.source.connect(manager.context.destination);
        }

        public LoadAudio(url: string, callback: (source: AudioSource) => any) {
            FileDownloader.DownloadArrayBuffer(url, (request) => {
                this.manager.context.decodeAudioData(request.response, (buffer) => {
                    this.source.buffer = buffer;
                    this.loaded = true;
                    callback(this);
                });
            });
        }

        public Play() {
            this.source.start(0);
        }

        public static FromFile(manager: AudioManager, url: string, callback: (source: AudioSource) => any) {
            var source = new AudioSource(manager);
            FileDownloader.DownloadArrayBuffer(url, (request) => {
                source.manager.context.decodeAudioData(request.response, (buffer) => {
                    source.source.buffer = buffer;
                    source.loaded = true;
                    callback(source);
                });
            });
        }
    }
} 