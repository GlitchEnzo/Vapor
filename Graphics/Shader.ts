module Vapor {
    /**
     * Represents a shader program.
     * @class Represents a Shader
     */
    export class Shader {
        public vertexShader: WebGLShader = null;
        public pixelShader: WebGLShader = null;
        public program: WebGLProgram = null;

        // the filepath to the shader, if it was loaded from a file
        public filepath: string = "";

        public usesTexCoords: boolean = false;
        public usesNormals: boolean = false;

        public vertexPositionAttribute: number;
        public textureCoordAttribute: number;
        public vertexNormalAttribute: number;

        //    Shader.Copy(Shader other)
        //    {
        //        
        //    }

        /**
         * Sets up WebGL to use this Shader.
         */
        public Use() {
            gl.useProgram(this.program);
        }

        /**
         * Loads a shader from the given file path.
         * @param {string} filepath The filepath of the shader to load.
         * @returns {Vapor.Shader} The newly created Shader.
         */
        public static FromFile(filepath: string): Shader {
            console.log("Loading shader = " + filepath.substring(filepath.lastIndexOf("/") + 1));

            var request = FileDownloader.Download(filepath);

            var shader = Shader.FromSource(request.responseText, filepath);
            shader.filepath = filepath;
            return shader;
        }

        /**
         * Loads a shader from a script tag with the given ID.
         * @param {string} shaderScriptID The ID of the script tag to load as a Shader.
         * @returns {Vapor.Shader} The newly created Shader.
         */
        public static FromScript(shaderScriptID: string): Shader {
            var shaderSource = Shader.LoadShaderSourceFromScript(shaderScriptID);
            return Shader.FromSource(shaderSource, null);
        }

        /**
         * Loads a shader from the given source code (text).
         * @param {string} shaderSource The full source (text) of the shader.
         * @param {string} [filepath] The current filepath to work from. (Used for including other shader code.)
         * @returns {Vapor.Shader} The newly created Shader.
         */
        public static FromSource(shaderSource: string, filepath: string): Shader {
            var shader = new Shader();

            shaderSource = Shader.PreprocessSource(shaderSource, filepath);

            shader.vertexShader = Shader.CompileShader(ShaderType.VertexShader, shaderSource);
            shader.pixelShader = Shader.CompileShader(ShaderType.FragmentShader, shaderSource);

            shader.program = gl.createProgram();
            gl.attachShader(shader.program, shader.vertexShader);
            gl.attachShader(shader.program, shader.pixelShader);
            gl.linkProgram(shader.program);

            if (!gl.getProgramParameter(shader.program, WebGLRenderingContext.LINK_STATUS)) {
                window.console.log("Link error! Could not initialise shaders.");
            }

            // setup the default attributes
            shader.vertexPositionAttribute = gl.getAttribLocation(shader.program, "aVertexPosition");
            //console.log("Pos attrib = " + shader.program.vertexPositionAttribute);
            //gl.enableVertexAttribArray(shader.program.vertexPositionAttribute);


            shader.textureCoordAttribute = gl.getAttribLocation(shader.program, "aTextureCoord");
            if (shader.textureCoordAttribute != -1) {
                //console.log("Uses Tex coords! - " + this.filepath);

                //gl.enableVertexAttribArray(shader.program.textureCoordAttribute);
                shader.usesTexCoords = true;
            }

            shader.vertexNormalAttribute = gl.getAttribLocation(shader.program, "aVertexNormal");
            if (shader.vertexNormalAttribute != -1) {
                //console.log("Uses Normals! - " + this.filepath);

                //gl.enableVertexAttribArray(shader.program.vertexNormalAttribute);
                shader.usesNormals = true;
            }

            return shader;
        }

        /**
            @private
        */
        private static LoadShaderSourceFromScript(shaderScriptID: string): string {
            var shaderScript = document.getElementById(shaderScriptID);
            if (shaderScript == null) {
                return null;
            }

            var shaderSource: string = "";
            var k = shaderScript.firstChild;
            while (k != null) {
                if (k.nodeType == 3) {
                    shaderSource += k.textContent;
                }
                k = k.nextSibling;
            }

            return shaderSource;
        }

        /**
          * @private
          * Process the shader source and pull in the include code
        */
        private static PreprocessSource(shaderSource: string, filepath: string): string {
            console.log("Preprocessing shader source...");

            var relativePath = "";
            if (filepath != null) {
                relativePath = filepath.substring(0, filepath.lastIndexOf("/") + 1);
            }

            // \s* = any whitespace before the #include (0 or more spaces)
            // \s+ = any whitespace after the #include (1 or more spaces)
            // .* = any non-whitespace characters (1 or more)
            var findIncludes = new RegExp("r'\s*#include\s+\".+\"'");
            //var matches = findIncludes.allMatches(shaderSource);
            var matches = findIncludes.exec(shaderSource);

            //console.log("Found matches = " + matches.length.toString());
            var stripIncludes = new RegExp("r'\s*#include\s+\"'", "g"); //g is a flag that allows replacing ALL instances in a string
            var stripEnd = new RegExp("r'\"'", "g");
            //for (var match in matches) {
            for (var i = 0; i < matches.length; i++) {
                //console.log("Match = " + match.group(0));
                var includeFile: string = matches[i].replace(stripIncludes, "");
                includeFile = includeFile.replace(stripEnd, "");

                console.log("Including shader = " + includeFile);

                var request = FileDownloader.Download(relativePath + includeFile);

                if (request.status != 200)
                    window.console.log("Could not load shader include! " + includeFile);

                shaderSource = shaderSource.replace(matches[i], request.responseText + "\n");
            }

            //console.log(shaderSource);

            return shaderSource;
        }

        /**
            @private
        */
        private static CompileShader(shaderType: ShaderType, source: string): WebGLShader {
            console.log("Compiling " + shaderType);

            var type = WebGLRenderingContext.VERTEX_SHADER;
            if (shaderType == ShaderType.FragmentShader)
                type = WebGLRenderingContext.FRAGMENT_SHADER;

            var shaderObject = gl.createShader(type);
            source = '#define ' + shaderType + '\n' + source;

            gl.shaderSource(shaderObject, source);
            gl.compileShader(shaderObject);

            if (!gl.getShaderParameter(shaderObject, WebGLRenderingContext.COMPILE_STATUS)) {
                window.console.log("Shader compilation error: " + shaderType + " - " + gl.getShaderInfoLog(shaderObject));
            }

            return shaderObject;
        }
    }
}