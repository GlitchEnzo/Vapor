module Vapor {
    /**
     * A wrapper around the Web Audio API AudioContext object
     * @class Represents an AudioManager
     */
    export class AudioManager {
        /**
         * The Web Audio API AudioContext.
         */
        public context: AudioContext;

        constructor() {
            this.context = new AudioContext();
        }

        //public LoadAudio(url: string, callback: (buffer: AudioBuffer) => any) {
        //    var request = FileDownloader.DownloadArrayBuffer(url, this.FileDownloaded.bind(this));
        //}

        //public CreateBufferSource() {
        //    return this.context.createBufferSource();
        //}

        //private FileDownloaded(request: XMLHttpRequest) {
        //    this.context.decodeAudioData(request.response, this.AudioLoaded.bind(this));
        //}

        //private AudioLoaded(buffer: AudioBuffer) {
        //    var source = this.context.createBufferSource();
        //    source.buffer = buffer;  
        //    source.connect(this.context.destination);
        //    source.start(0);
        //}
    }
}