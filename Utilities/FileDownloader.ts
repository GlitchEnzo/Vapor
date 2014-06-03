module Vapor {
    export class FileDownloader {
        /**
         * Download the file at the given URL.  It ONLY downloads asynchronously.
         * (Modern browsers are deprecating synchronous requests, and now throw exceptions when trying to do a sychronous request with a responseType)
         * The callback is called after the file is done loading.
         * The callback is in the form: Callback(request: XMLHttpRequest): void
         */
        public static Download(url: string, callback: (request: XMLHttpRequest) => any, responseType: string = "text"): XMLHttpRequest {
            try {
                var request: XMLHttpRequest = new XMLHttpRequest();

                request.open('GET', url, true);
                request.responseType = responseType;
                request.onload = () => {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            callback(request);
                        }
                        else {
                            console.error(request.statusText);
                        }
                    }
                };
                request.onerror = () => { console.error(request.statusText); };
                request.send();
            }
            catch (e) {
                console.log("Exception caught in FileDownloader.Download(): " + e);
            }

            return request;
        }

        /**
         * Download the file at the given URL as an ArrayBuffer (useful for Audio).  
         */
        public static DownloadArrayBuffer(url: string, callback: (request: XMLHttpRequest) => any): XMLHttpRequest {
            return FileDownloader.Download(url, callback, "arraybuffer");
        }

        /**
         * Download the file at the given URL as a Blob (useful for Images).  
         */
        public static DownloadBlob(url: string, callback: (request: XMLHttpRequest) => any): XMLHttpRequest {
            return FileDownloader.Download(url, callback, "blob");
        }

        /**
         * Download the file at the given URL as a Document (useful for XML and HTML).  
         */
        public static DownloadDocument(url: string, callback: (request: XMLHttpRequest) => any): XMLHttpRequest {
            return FileDownloader.Download(url, callback, "document");
        }

        /**
         * Download the file at the given URL as a JavaScript object parsed from the JSON string returned by the server.  
         */
        public static DownloadJSON(url: string, callback: (request: XMLHttpRequest) => any): XMLHttpRequest {
            return FileDownloader.Download(url, callback, "json");
        }

        /**
         * Download the file at the given URL in a synchronous (blocking) manner.  
         */
        public static DownloadSynchronous(url: string): XMLHttpRequest {
            try {
                var request: XMLHttpRequest = new XMLHttpRequest();
                request.open("GET", url, false);
                request.send();
            }
            catch (e) {
                console.log("Exception caught in FileDownloader.DownloadSynchronous()");
            }

            if (request.status != 200) {
                console.log("FileDownloader Error! " + request.status.toString() + " " + request.statusText);
            }

            return request;
        }
    }
}