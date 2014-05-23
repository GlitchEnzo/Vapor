module Vapor {
    class FileDownloader {
        /**
         * Download the file at the given URL.  
         * It defaults to download sychronously.
         * You can optionally provide a callback function which forces it to download asychronously.
         * The callback is in the form: void Callback(ProgressEvent event)
         */
        public static Download(url: string, callback: (event: ProgressEvent) => any): XMLHttpRequest {
            var request: XMLHttpRequest = new XMLHttpRequest();

            if (callback == null) {
                //console.log("Sending synchronous request");

                try {
                    request.open("GET", url, false);
                    request.send();
                }
                catch (e) {
                    // swallow exception?
                    console.log("Exception caught in FileDownloader.Download()");
                }

                if (request.status == 200) {
                    //window.console.log("Successful response");
                    //window.console.log(this.request.responseText);
                }
                else {
                    console.log("FileDownloader Error! " + request.status.toString() + " " + request.statusText);
                }
            }
            else // asynchronous request
            {
                //console.log("Sending asynchronous request");

                // the callback is defined so send an asynchronous request
                request.open('GET', url, true);
                request.onreadystatechange = callback;
                request.send();
            }

            return request;
        }
    }
}