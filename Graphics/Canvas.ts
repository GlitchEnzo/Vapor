module Vapor {
    export class Canvas {
        /**
         * The HTML Canvas Element that is being used for rendering.
         */
        element: HTMLCanvasElement;

        /**
         * Creates a new instance of a Canvas.
         * @constructor
         * @param {HTMLCanvasElement} [canvasElement] - The existing HTML Canvas Element to use.  If not provided, a new Canvas will be created and appended to the document.
         */
        constructor(canvasElement?: HTMLCanvasElement) {
            console.log("Initializing canvas.");
            // if an existing canvas element was passed in, use it, otherwise create a new one
            if (canvasElement) {
                console.log("Using existing canvas element.");
                this.element = canvasElement;
            }
            else {
                console.log("Constructing a new canvas element.");
                //this.element = new HTMLCanvasElement(width: window.innerWidth, height: window.innerHeight);
                this.element = document.createElement("canvas")
                this.element.id = "VaporCanvas";
                this.element.width = window.innerWidth;
                this.element.height = window.innerHeight;

                //element.style.zIndex = "0";
                this.element.tabIndex = 0;
                this.element.focus();

                document.body.appendChild(this.element);
            }

            try {
                gl = this.element.getContext("webgl");
                if (gl == null) {
                    console.log("Using experimental context.");
                    gl = this.element.getContext("experimental-webgl");
                }
                //gl.viewportWidth = element.width;
                //gl.viewportHeight = element.height;
                gl.viewport(0, 0, this.element.width, this.element.height);
            }
            catch (e) {
                console.error("Exception caught. " + e);
            }

            if (gl == null) {
                window.alert("Unable to initialize WebGL.");
            }
        }

        /**
         *  Resizes the canvas based upon the current browser window size.
         */
        Resize()
        {
            //console.log("Resized. " + window.innerWidth.toString() + "x" + window.innerHeight.toString());

            this.element.width = window.innerWidth;
            this.element.height = window.innerHeight;

            gl.viewport(0, 0, this.element.width, this.element.height);
        }
    }
}