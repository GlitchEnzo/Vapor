module Vapor {
    /**
     * Represents an instance of a Shader, with variables to set.
     * @class Represents a Material
     * @param {Vapor.Shader} shader The backing shader that this Material uses.
     */
    export class Material extends VaporObject {
        public shader: Shader;
        //??? textures = [];
        public textureCount: number = 0;

        // TODO: Switch to Map objects once more browsers support them by default.  Chrome needs to have a flag enabled.

        /**
         * A cache of variable locations in the shader to optimize rendering.
         */
        //private cache: Map<String, WebGLUniformLocation>;
        private cache: { [index: string]: WebGLUniformLocation; } = {};

        /**
         * A map of texture indices.
         */
        //private textureIndices: Map<String, number>;
        private textureIndices: { [index: string]: number; } = {};

        constructor(shader: Shader) {
            super("Material");

            this.shader = shader;
            this.textureCount = 0;
            //this.cache = new Map<String, WebGLUniformLocation>();
            //this.textureIndices = new Map<String, number>();
            this.Use();
        }

        //    Material.Copy(Material other)
        //    {
        //        this.shader = other.shader;
        //        this.textureCount = other.textureCount;
        //        this._cache = new Map.from(other._cache);
        //        this.Use();
        //    }

        /**
         * Sets up WebGL to use this Material (and backing Shader).
         */
        public Use() {
            this.shader.Use();
        }

        /**
         * Sets up OpenGL to use this Material (and backing Shader) and sets up
         * the required vertex attributes (position, normal, tex coord, etc).
         */
        public Enable() {
            this.shader.Use();

            gl.enableVertexAttribArray(this.shader.vertexPositionAttribute);

            if (this.shader.usesTexCoords)
                gl.enableVertexAttribArray(this.shader.textureCoordAttribute);

            if (this.shader.usesNormals)
                gl.enableVertexAttribArray(this.shader.vertexNormalAttribute);
        }

        /**
         * Disables the vertex attributes (position, normal, tex coord, etc).
         */
        public Disable() {
            this.shader.Use();

            gl.disableVertexAttribArray(this.shader.vertexPositionAttribute);

            if (this.shader.usesTexCoords)
                gl.disableVertexAttribArray(this.shader.textureCoordAttribute);

            if (this.shader.usesNormals)
                gl.disableVertexAttribArray(this.shader.vertexNormalAttribute);
        }

        /**
         * Sets the matrix of the given name on this Material.
         * @param {string} name The name of the matrix variable to set.
         * @param {mat4} matrix The matrix value to set the variable to.
         */
        public SetMatrix(name: string, matrix: Matrix) {
            if (matrix == null) {
                console.log("Matrix is undefined! (" + name + ")");
                return;
            }

            this.Use();

            // cache the location of the variable for faster access
            if (!this.cache[name])
                this.cache[name] = gl.getUniformLocation(this.shader.program, name);

            // (location, transpose, value)
            gl.uniformMatrix4fv(this.cache[name], false, matrix.data);
        }

        /**
         * Sets the vector of the given name on this Material.
         * @param {string} name The name of the vector variable to set.
         * @param {Vector4} vector The vector value to set the variable to.
         */
        public SetVector(name: string, vector: Vector4) {
            if (vector == null) {
                console.log("Vector is undefined! (" + name + ")");
                return;
            }

            this.Use();

            // cache the location of the variable for faster access
            if (!this.cache[name])
                this.cache[name] = gl.getUniformLocation(this.shader.program, name);

            // (location, value)
            gl.uniform4fv(this.cache[name], vector.data);
        }

        /**
         * Sets the texture of the given name on this Material.
         * @param {String} name The name of the texture variable to set.
         * @param {Texture2D} texture The texture value to set the variable to.
         */
        public SetTexture(name: string, texture: Texture2D) {
            if (texture == null) {
                console.log("Texture is undefined! (" + name + ")");
                return;
            }

            this.Use();

            // cache the location of the variable for faster access
            if (!this.cache[name]) {
                if (this.textureCount >= 31) {
                    console.log("The maximum number of textures (32) is already bound!");
                    return;
                }
                this.cache[name] = gl.getUniformLocation(this.shader.program, name);
                this.textureIndices[name] = this.textureCount;
                this.textureCount++;
            }

            // Does this need to be done each draw? - No, it shouldn't have to be.
            gl.activeTexture(this.TextureIndex(this.textureIndices[name]));
            gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture.glTexture);
            gl.uniform1i(this.cache[name], this.textureIndices[name]);
            // TODO: Unbind texture?
        }

        /**
         * Converts a normal int index into a WebGL.Texture# int index.
         */
        private TextureIndex(index: number): number {
            return WebGLRenderingContext.TEXTURE0 + index;
        }
    }
} 