module Vapor {
    export class Texture2D extends VaporObject {
        /**
         * The actual HTML image element.
         */
        public image = new HTMLImageElement();

        /**
         * The OpenGL Texture object.
         */
        public glTexture: WebGLTexture;

        /**
         * The callback that is called when the texture is done loading.
         * In the form: void Callback(Texture2D texture)
         */
        public LoadedCallback: (texture: Texture2D) => any;

        constructor(texturePath: string) {
            super("Texture2D");

            this.image.crossOrigin = "anonymous"; //???
            this.image.onload = this.Loaded.bind(this);
            this.image.src = texturePath;

            this.glTexture = gl.createTexture();
        }

        private Loaded(e: Event) {
            console.log("Texture loaded.");

            // bind the texture and set parameters for it
            gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.glTexture);
            gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, this.image);
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
            gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);

            // unbind the texture
            gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);

            if (this.LoadedCallback)
                this.LoadedCallback(this);
        }
    }
}