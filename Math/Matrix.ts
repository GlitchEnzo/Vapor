module Vapor {
    export class Matrix {
        public data: Float32Array;

        private static EPSILON: number = 0.000001;

        /**
         * Creates a new instance of a Matrix initialized to the identity matrix.
         * @constructor
         */
        constructor() {
            this.data = new Float32Array(16);
            this.data[0] = 1;
            this.data[1] = 0;
            this.data[2] = 0;
            this.data[3] = 0;

            this.data[4] = 0;
            this.data[5] = 1;
            this.data[6] = 0;
            this.data[7] = 0;

            this.data[8] = 0;
            this.data[9] = 0;
            this.data[10] = 1;
            this.data[11] = 0;

            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 1;
        }

        public SetIdentity() {
            this.data[0] = 1;
            this.data[1] = 0;
            this.data[2] = 0;
            this.data[3] = 0;

            this.data[4] = 0;
            this.data[5] = 1;
            this.data[6] = 0;
            this.data[7] = 0;

            this.data[8] = 0;
            this.data[9] = 0;
            this.data[10] = 1;
            this.data[11] = 0;

            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 1;
        }

        public SetZero() {
            this.data[0] = 0;
            this.data[1] = 0;
            this.data[2] = 0;
            this.data[3] = 0;

            this.data[4] = 0;
            this.data[5] = 0;
            this.data[6] = 0;
            this.data[7] = 0;

            this.data[8] = 0;
            this.data[9] = 0;
            this.data[10] = 0;
            this.data[11] = 0;

            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 0;
        }

        public static Copy(other: Matrix) {
            var copy = new Matrix();
            copy.data[0] = other.data[0];
            copy.data[1] = other.data[1];
            copy.data[2] = other.data[2];
            copy.data[3] = other.data[3];
            copy.data[4] = other.data[4];
            copy.data[5] = other.data[5];
            copy.data[6] = other.data[6];
            copy.data[7] = other.data[7];
            copy.data[8] = other.data[8];
            copy.data[9] = other.data[9];
            copy.data[10] = other.data[10];
            copy.data[11] = other.data[11];
            copy.data[12] = other.data[12];
            copy.data[13] = other.data[13];
            copy.data[14] = other.data[14];
            copy.data[15] = other.data[15];
            return copy;
        }

        /**
         * Multiplies two Matrix objects.
         *
         * @param {Matrix} a - The first operand
         * @param {Matrix} b - The second operand
         * @returns {Matrix} The result of the multiplication.
         */
        public static Multiply(a: Matrix, b: Matrix): Matrix {
            // Cache the entire first matrix
            var a00 = a.data[0], a01 = a.data[1], a02 = a.data[2], a03 = a.data[3],
                a10 = a.data[4], a11 = a.data[5], a12 = a.data[6], a13 = a.data[7],
                a20 = a.data[8], a21 = a.data[9], a22 = a.data[10], a23 = a.data[11],
                a30 = a.data[12], a31 = a.data[13], a32 = a.data[14], a33 = a.data[15];

            // Cache only the current line of the second matrix
            var b0 = b.data[0], b1 = b.data[1], b2 = b.data[2], b3 = b.data[3];

            var out = new Matrix();
            out.data[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out.data[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out.data[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out.data[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b.data[4]; b1 = b.data[5]; b2 = b.data[6]; b3 = b.data[7];
            out.data[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out.data[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out.data[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out.data[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b.data[8]; b1 = b.data[9]; b2 = b.data[10]; b3 = b.data[11];
            out.data[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out.data[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out.data[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out.data[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b.data[12]; b1 = b.data[13]; b2 = b.data[14]; b3 = b.data[15];
            out.data[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out.data[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out.data[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out.data[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        }

        /**
         * Rotates this Matrix by the given angle
         * 
         * @param {Vector3} axis - The axis to rotate around
         * @param {Number} angle - The angle to rotate the matrix by (in radians)
         */
        public Rotate(axis: Vector3, angle: number) {
            var x = axis.data[0], y = axis.data[1], z = axis.data[2],
                len = Math.sqrt(x * x + y * y + z * z),
                s, c, t,
                a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                b00, b01, b02,
                b10, b11, b12,
                b20, b21, b22;

            if (Math.abs(len) < Matrix.EPSILON) { return null; }

            len = 1.0 / len;
            x *= len;
            y *= len;
            z *= len;

            s = Math.sin(angle);
            c = Math.cos(angle);
            t = 1 - c;

            a00 = this.data[0]; a01 = this.data[1]; a02 = this.data[2];  a03 = this.data[3];
            a10 = this.data[4]; a11 = this.data[5]; a12 = this.data[6];  a13 = this.data[7];
            a20 = this.data[8]; a21 = this.data[9]; a22 = this.data[10]; a23 = this.data[11];

            // Construct the elements of the rotation matrix
            b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
            b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
            b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

            // Perform rotation-specific matrix multiplication
            this.data[0] = a00 * b00 + a10 * b01 + a20 * b02;
            this.data[1] = a01 * b00 + a11 * b01 + a21 * b02;
            this.data[2] = a02 * b00 + a12 * b01 + a22 * b02;
            this.data[3] = a03 * b00 + a13 * b01 + a23 * b02;
            this.data[4] = a00 * b10 + a10 * b11 + a20 * b12;
            this.data[5] = a01 * b10 + a11 * b11 + a21 * b12;
            this.data[6] = a02 * b10 + a12 * b11 + a22 * b12;
            this.data[7] = a03 * b10 + a13 * b11 + a23 * b12;
            this.data[8] = a00 * b20 + a10 * b21 + a20 * b22;
            this.data[9] = a01 * b20 + a11 * b21 + a21 * b22;
            this.data[10] = a02 * b20 + a12 * b21 + a22 * b22;
            this.data[11] = a03 * b20 + a13 * b21 + a23 * b22;
        }

        /**
         * Scales this Matrix by the dimensions in the given Vector3
         *
         * @param {Vector3} scale - The Vector3 to scale the matrix by
         **/
        public Scale(scale: Vector3) {
            var x = scale.data[0], y = scale.data[1], z = scale.data[2];

            this.data[0] = this.data[0] * x;
            this.data[1] = this.data[1] * x;
            this.data[2] = this.data[2] * x;
            this.data[3] = this.data[3] * x;
            this.data[4] = this.data[4] * y;
            this.data[5] = this.data[5] * y;
            this.data[6] = this.data[6] * y;
            this.data[7] = this.data[7] * y;
            this.data[8] = this.data[8] * z;
            this.data[9] = this.data[9] * z;
            this.data[10] = this.data[10] * z;
            this.data[11] = this.data[11] * z;
            //this.data[12] = this.data[12];
            //this.data[13] = this.data[13];
            //this.data[14] = this.data[14];
            //this.data[15] = this.data[15];
        }

        /**
         * Sets this Matrix to the given rotation (Quaternion) and translation (Vector3)
         *
         * @param {Vector3} position - Translation vector
         * @param {Quaternion} rotation - Rotation quaternion
         */
        public FromTranslationRotation(position: Vector3, rotation: Quaternion) {
            // Quaternion math
            var x = rotation.data[0],
                y = rotation.data[1],
                z = rotation.data[2],
                w = rotation.data[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,

                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            this.data[0] = 1 - (yy + zz);
            this.data[1] = xy + wz;
            this.data[2] = xz - wy;
            this.data[3] = 0;
            this.data[4] = xy - wz;
            this.data[5] = 1 - (xx + zz);
            this.data[6] = yz + wx;
            this.data[7] = 0;
            this.data[8] = xz + wy;
            this.data[9] = yz - wx;
            this.data[10] = 1 - (xx + yy);
            this.data[11] = 0;
            this.data[12] = position.data[0];
            this.data[13] = position.data[1];
            this.data[14] = position.data[2];
            this.data[15] = 1;
        }

        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param {vec3} eye Position of the viewer
         * @param {vec3} center Point the viewer is looking at
         * @param {vec3} up vec3 pointing up
         */
        public SetLookAt(eye: Vector3, center: Vector3, up: Vector3) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
                eyex = eye.data[0],
                eyey = eye.data[1],
                eyez = eye.data[2],
                upx = up.data[0],
                upy = up.data[1],
                upz = up.data[2],
                centerx = center.data[0],
                centery = center.data[1],
                centerz = center.data[2];

            if (Math.abs(eyex - centerx) < Matrix.EPSILON &&
                Math.abs(eyey - centery) < Matrix.EPSILON &&
                Math.abs(eyez - centerz) < Matrix.EPSILON) {
                this.SetIdentity();
            }

            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;

            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;

            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }

            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }

            this.data[0] = x0;
            this.data[1] = y0;
            this.data[2] = z0;
            this.data[3] = 0;
            this.data[4] = x1;
            this.data[5] = y1;
            this.data[6] = z1;
            this.data[7] = 0;
            this.data[8] = x2;
            this.data[9] = y2;
            this.data[10] = z2;
            this.data[11] = 0;
            this.data[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            this.data[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            this.data[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            this.data[15] = 1;
        }

        /**
         * Constructs an OpenGL perspective projection matrix in this Matrix.
         *
         * [fovYRadians] specifies the field of view angle, in radians, in the y direction.
         * [aspectRatio] specifies the aspect ratio that determines the field of view in the x direction.
         *  The aspect ratio of x (width) to y (height).
         * [zNear] specifies the distance from the viewer to the near plane (always positive).
         * [zFar] specifies the distance from the viewer to the far plane (always positive).
         */
        public SetPerspectiveMatrix(fovYRadians: number, aspectRatio: number, zNear: number, zFar: number) {
          var height = Math.tan(fovYRadians * 0.5) * zNear;
          var width = height * aspectRatio;
          this.SetFrustumMatrix(-width, width, -height, height, zNear, zFar);
        }

        /**
         * Constructs an OpenGL perspective projection matrix in this Matrix.
         *
         * [left], [right] specify the coordinates for the left and right vertical clipping planes.
         * [bottom], [top] specify the coordinates for the bottom and top horizontal clipping planes.
         * [near], [far] specify the coordinates to the near and far depth clipping planes.
         */
        public SetFrustumMatrix(left: number, right: number, bottom: number, top: number, near: number, far: number) {
            var two_near = 2.0 * near;
            var right_minus_left = right - left;
            var top_minus_bottom = top - bottom;
            var far_minus_near = far - near;
            this.SetZero();

            //[row, column] = [column * 4 + row]
            this.data[0] = two_near / right_minus_left; //[0, 0]
            this.data[5] = two_near / top_minus_bottom; //[1, 1]
            this.data[8] = (right + left) / right_minus_left; //[0, 2]
            this.data[9] = (top + bottom) / top_minus_bottom; //[1, 2]
            this.data[10] = -(far + near) / far_minus_near; //[2, 2]
            this.data[11] = -1.0; //[3, 2]
            this.data[14] = -(two_near * far) / far_minus_near; //[2, 3]
        }

        /**
         * On success, Sets [pickWorld] to be the world space position of
         * the screen space [pickX], [pickY], and [pickZ].
         *
         * The viewport is specified by ([viewportX], [viewportWidth]) and
         * ([viewportY], [viewportHeight]).
         *
         * [cameraMatrix] includes both the projection and view transforms.
         *
         * [pickZ] is typically either 0.0 (near plane) or 1.0 (far plane).
         *
         * Returns false on error, for example, the mouse is not in the viewport
         *
         */
        public static Unproject(cameraMatrix: Matrix, viewportX: number, viewportWidth: number,
                                viewportY: number, viewportHeight: number,
                                pickX: number, pickY: number, pickZ: number, pickWorld: Vector3): boolean {
            pickX = (pickX - viewportX);
            pickY = (pickY - viewportY);
            pickX = (2.0 * pickX / viewportWidth) - 1.0;
            pickY = (2.0 * pickY / viewportHeight) - 1.0;
            pickZ = (2.0 * pickZ) - 1.0;

            // Check if pick point is inside unit cube
            if (pickX < -1.0 || pickY < -1.0 || pickX > 1.0 || pickY > 1.0 ||
                pickZ < -1.0 || pickZ > 1.0) {
                return false;
            }

            // Copy camera matrix.
            var invertedCameraMatrix = Matrix.Copy(cameraMatrix);

            // Invert the camera matrix.
            invertedCameraMatrix.Invert();

            // Determine intersection point.
            var v = new Vector4(pickX, pickY, pickZ, 1.0);
            invertedCameraMatrix.Transform(v);
            if (v.W == 0.0) {
                return false;
            }

            var invW = 1.0 / v.W;
            pickWorld.X = v.X * invW;
            pickWorld.Y = v.Y * invW;
            pickWorld.Z = v.Z * invW;

            return true;
        }

        public Invert(): number {
            var a00 = this.data[0];
            var a01 = this.data[1];
            var a02 = this.data[2];
            var a03 = this.data[3];
            var a10 = this.data[4];
            var a11 = this.data[5];
            var a12 = this.data[6];
            var a13 = this.data[7];
            var a20 = this.data[8];
            var a21 = this.data[9];
            var a22 = this.data[10];
            var a23 = this.data[11];
            var a30 = this.data[12];
            var a31 = this.data[13];
            var a32 = this.data[14];
            var a33 = this.data[15];

            var b00 = a00 * a11 - a01 * a10;
            var b01 = a00 * a12 - a02 * a10;
            var b02 = a00 * a13 - a03 * a10;
            var b03 = a01 * a12 - a02 * a11;
            var b04 = a01 * a13 - a03 * a11;
            var b05 = a02 * a13 - a03 * a12;
            var b06 = a20 * a31 - a21 * a30;
            var b07 = a20 * a32 - a22 * a30;
            var b08 = a20 * a33 - a23 * a30;
            var b09 = a21 * a32 - a22 * a31;
            var b10 = a21 * a33 - a23 * a31;
            var b11 = a22 * a33 - a23 * a32;
            var det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
            if (det == 0.0) {
                return det;
            }
            var invDet = 1.0 / det;

            this.data[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            this.data[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            this.data[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            this.data[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            this.data[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            this.data[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            this.data[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            this.data[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            this.data[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            this.data[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            this.data[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            this.data[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            this.data[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            this.data[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            this.data[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            this.data[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

            return det;
        }

        /**
         * Transforms the given Vector4 by this Matrix.
         *
         */
        public Transform(arg: Vector4): Vector4 {
            var x_ = (this.data[0] * arg.data[0]) + (this.data[4] * arg.data[1]) + (this.data[8] * arg.data[2]) + (this.data[12] * arg.data[3]);
            var y_ = (this.data[1] * arg.data[0]) + (this.data[5] * arg.data[1]) + (this.data[9] * arg.data[2]) + (this.data[13] * arg.data[3]);
            var z_ = (this.data[2] * arg.data[0]) + (this.data[6] * arg.data[1]) + (this.data[10] * arg.data[2]) + (this.data[14] * arg.data[3]);
            var w_ = (this.data[3] * arg.data[0]) + (this.data[7] * arg.data[1]) + (this.data[11] * arg.data[2]) + (this.data[15] * arg.data[3]);
            arg.X = x_;
            arg.Y = y_;
            arg.Z = z_;
            arg.W = w_;
            return arg;
        }
    }
}