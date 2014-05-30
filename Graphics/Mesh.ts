module Vapor {
    /**
     * Represents a 3D model that is rendered.
     * @class Represents a Mesh
     */
    export class Mesh extends VaporObject {
        private vertices: Float32Array;
        public vertexBuffer: WebGLBuffer = null;
        public vertexCount: number = 0;

        /**
         * Gets and sets the vertices making up this Mesh.
         * @name Vapor.Mesh.prototype.vertices
         * @property
         */
        public get Vertices(): Float32Array { return this.vertices; }
        public set Vertices(newVertices: Float32Array) {
            // create vertex position buffer
            this.vertices = newVertices;
            gl.deleteBuffer(this.vertexBuffer);
            this.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.vertices, WebGLRenderingContext.STATIC_DRAW);
            //this.vertexBuffer.stride = 3; // 3 floats per vertex position
            this.vertexCount = this.vertices.length / 3;
        }

        private uv: Float32Array;
        public uvBuffer: WebGLBuffer = null;

        /**
         * Gets and sets the texture coodinates for each vertex making up this Mesh.
         * @name Vapor.Mesh.prototype.uv
         * @property
         */
        public get UV(): Float32Array { return this.uv; }
        public set UV(newUVs: Float32Array) {
            // create texture coordinate buffer
            this.uv = newUVs;
            gl.deleteBuffer(this.uvBuffer);
            this.uvBuffer = gl.createBuffer();
            gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.uvBuffer);
            gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.uv, WebGLRenderingContext.STATIC_DRAW);
            //this.uvBuffer.stride = 2; // 2 floats per vertex position
        }

        private normals: Float32Array;
        public normalBuffer: WebGLBuffer = null;

        /**
         * Gets and sets the normal vectors for each vertex making up this Mesh.
         * @name Vapor.Mesh.prototype.normals
         * @property
         */
        public get Normals(): Float32Array { return this.normals; }
        public set Normals(newNormals: Float32Array) {
            // create normal vector buffer
            this.normals = newNormals;
            gl.deleteBuffer(this.normalBuffer);
            this.normalBuffer = gl.createBuffer();
            gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.normalBuffer);
            gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.normals, WebGLRenderingContext.STATIC_DRAW);
            //this.normalBuffer.stride = 3; // 3 floats per vertex position
        }

        private triangles: Uint16Array;
        public indexBuffer: WebGLBuffer = null;
        public indexCount: number = 0;

        /**
         * Gets and sets the index buffer of this Mesh. This defines which vertices make up what triangles.
         * @name Vapor.Mesh.prototype.triangles
         * @property
         */
        public get Triangles(): Uint16Array { return this.triangles; }
        public set Triangles(newTriangles: Uint16Array) {
            // create index buffer
            this.triangles = newTriangles;
            gl.deleteBuffer(this.indexBuffer);
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.triangles, WebGLRenderingContext.STATIC_DRAW);
            this.indexCount = this.triangles.length;
        }

        /**
         * Draws the mesh using the given Material
         * @param {Vapor.Material} material The Material to use to render the mesh.
         */
        public Render(material: Material) {
            material.Enable();

            gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(material.shader.vertexPositionAttribute, 3, WebGLRenderingContext.FLOAT, false, 0, 0);

            if (material.shader.usesTexCoords) {
                if (this.uvBuffer != null) {
                    //console.log("Setting tex coords");
                    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.uvBuffer);
                    gl.vertexAttribPointer(material.shader.textureCoordAttribute, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
                }
                else
                    console.log("Shader (" + material.shader.filepath + ") expects texure coords, but the mesh (" + this.Name + ") doesn't have them.");
            }
            //else
            //{
            //    // disable tex coord attribute
            //    // TODO: determine the actual attribute index
            //    gl.disableVertexAttribArray(1);
            //}

            if (material.shader.usesNormals) {
                if (this.normalBuffer != null) {
                    //console.log("Setting normals");
                    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.normalBuffer);
                    gl.vertexAttribPointer(material.shader.vertexNormalAttribute, 3, WebGLRenderingContext.FLOAT, false, 0, 0);
                }
                else
                    console.log("Shader (" + material.shader.filepath + ") expects normals, but the mesh (" + this.Name + ") doesn't have them.");
            }

            gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(WebGLRenderingContext.TRIANGLES, this.indexCount, WebGLRenderingContext.UNSIGNED_SHORT, 0);

            material.Disable();
        }

        // ----  Creation Methods

        /**
         * Creates a new Mesh containing data for a triangle.
         * @returns {Vapor.Mesh} The new Mesh representing a triangle.
         */
        public static CreateTriangle(): Mesh {
            //    0
            //   / \
            //  /   \
            // 1-----2

            var mesh = new Mesh();
            mesh.Name = "Triangle";

            mesh.Vertices = new Float32Array([0.0,  0.5, 0.0,
                                             -0.5, -0.5, 0.0,
                                              0.5, -0.5, 0.0]);

            mesh.UV = new Float32Array([0.5, 1.0,
                                        0.0, 0.0,
                                        1.0, 0.0]);

            mesh.Normals = new Float32Array([0.0, 0.0, 1.0,
                                             0.0, 0.0, 1.0,
                                             0.0, 0.0, 1.0]);

            mesh.Triangles = new Uint16Array([0, 1, 2]);

            return mesh;
        }

        /**
         * Creates a new Mesh containing data for a quad.
         * @returns {Vapor.Mesh} The new Mesh representing a quad.
         */
        public static CreateQuad(): Mesh {
            // 1--0
            // |\ | 
            // | \|
            // 3--2

            var mesh = new Mesh();
            mesh.Name = "Quad";

            mesh.Vertices = new Float32Array([0.5, 0.5, 0.0,
                -0.5, 0.5, 0.0,
                0.5, -0.5, 0.0,
                -0.5, -0.5, 0.0]);

            mesh.UV = new Float32Array([1.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                0.0, 0.0]);

            mesh.Normals = new Float32Array([0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0]);

            mesh.Triangles = new Uint16Array([0, 1, 2, 1, 3, 2]);

            return mesh;
        }

        /**
         * Creates a new Mesh containing data for a line.
         * @returns {Vapor.Mesh} The new Mesh representing a line.
         */
        public static CreateLine(points: Array<Vector3>, width: number = 0.1): Mesh {
            // 1-3-5
            // |/|/|
            // 0-2-4

            // 0-2-4
            // |/|/|
            // 1-3-5

            var mesh = new Mesh();
            mesh.Name = "Line";

            var halfWidth = width / 2.0;

            var vertices = new Array<number>();
            var triangles = new Array<number>();

            //for (Vector3 point in points) {
            for (var i = 0; i < points.length; i++) {
                // TODO: calculate the vector perpendicular to the direction of the line for width
                vertices.add(points[i].X);
                vertices.add(points[i].Y + halfWidth);
                vertices.add(points[i].Z);

                vertices.add(points[i].X);
                vertices.add(points[i].Y - halfWidth);
                vertices.add(points[i].Z);
            }

            mesh.Vertices = new Float32Array(vertices);

            //mesh.uv
            //mesh.normals = new Float32List.fromList([0.0, 0.0, 1.0]);

            for (var i = 0; i < points.length; i += 2) {
                triangles.add(i);
                triangles.add(i + 1);
                triangles.add(i + 2);

                triangles.add(i + 1);
                triangles.add(i + 3);
                triangles.add(i + 2);
            }

            //mesh.triangles = new Uint16List.fromList([0, 1, 2, 1, 3, 2]);
            mesh.Triangles = new Uint16Array(triangles);
            //[0, 1, 2, 
            // 1, 3, 2]);
            //2, 3, 4,
            //3, 5, 4]);

            return mesh;
        }

        /**
         * Creates a Mesh with vertices forming a 2D circle.
         * radius - Radius of the circle. Value should be greater than or equal to 0.0. Defaults to 1.0.
         * segments - The number of segments making up the circle. Value should be greater than or equal to 3. Defaults to 15.
         * startAngle - The starting angle of the circle.  Defaults to 0.
         * angularSize - The angular size of the circle.  2 pi is a full circle. Pi is a half circle. Defaults to 2 pi.
         */
        public static CreateCircle(radius: number = 1.0, segments: number = 15, startAngle: number = 0.0, angularSize: number = Math.PI * 2.0): Mesh {
            var mesh = new Mesh();
            mesh.Name = "Circle";

            var uvs = new Array<Vector2>();
            var vertices = new Array<Vector3>();
            var triangles = new Array<number>();

            vertices.add(new Vector3());
            uvs.add(new Vector2(0.5, 0.5));

            var stepAngle = angularSize / segments;

            for (var i = 0; i <= segments; i++) {
                var vertex = new Vector3();
                var angle = startAngle + stepAngle * i;

                //window.console.log(string.Format("{0}: {1}", i, angle));
                vertex.X = radius * Math.cos(angle);
                vertex.Y = radius * Math.sin(angle);

                vertices.add(vertex);
                uvs.add(new Vector2((vertex.X / radius + 1) / 2, (vertex.Y / radius + 1) / 2));
            }

            for (var i = 1; i <= segments; i++) {
                triangles.add(i + 1);
                triangles.add(i);
                triangles.add(0);
            }

            mesh.Vertices = this.CreateFloat32List3(vertices);
            //mesh.normals = normals;
            mesh.UV = this.CreateFloat32List2(uvs);
            mesh.Triangles = new Uint16Array(triangles);

            return mesh;
        }

        /**
         * Convert a list of Vector3 objects into a Float32List object
         */
        private static CreateFloat32List3(vectorList: Array<Vector3>): Float32Array {
            var list = new Float32Array(vectorList.length * 3);

            var index = 0;
            for (var i = 0; i < vectorList.length; i++) {
                list[index++] = vectorList[i].X;
                list[index++] = vectorList[i].Y;
                list[index++] = vectorList[i].Z;
            }

            return list;
        }

        /**
         * Convert a list of Vector2 objects into a Float32List object
         */
        private static CreateFloat32List2(vectorList: Array<Vector2>): Float32Array {
            var list = new Float32Array(vectorList.length * 2);

            var index = 0;
            for (var i = 0; i < vectorList.length; i++) {
                list[index++] = vectorList[i].X;
                list[index++] = vectorList[i].Y;
            }

            return list;
        }
    }
}