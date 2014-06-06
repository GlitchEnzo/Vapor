module Vapor {
    export class Vector3 {
        public data: Float32Array;

        get X(): number {
            return this.data[0];
        }
        set X(value: number) {
            this.data[0] = value;
        }

        get Y(): number {
            return this.data[1];
        }
        set Y(value: number) {
            this.data[1] = value;
        }

        get Z(): number {
            return this.data[2];
        }
        set Z(value: number) {
            this.data[2] = value;
        }

        get XY(): Vector2 {
            return new Vector2(this.data[0], this.data[1]);
        }
        set XY(value: Vector2) {
            this.data[0] = value.X;
            this.data[1] = value.Y;
        }

        /**
         * Creates a new instance of a Vector3 initialized to the given values or [0, 0, 0].
         * @constructor
         */
        constructor(x: number = 0, y: number = 0, z: number = 0) {
            this.data = new Float32Array(3);
            this.data[0] = x;
            this.data[1] = y;
            this.data[2] = z;
        }

        public static Copy(other: Vector3) {
            var copy = new Vector3();
            copy.data[0] = other.data[0];
            copy.data[1] = other.data[1];
            copy.data[2] = other.data[2];
            return copy;
        }

        /**
         * Adds the given Vector3 to this Vector3
         * @param {Vector3} other - The Vector3 to add to this one
         */
        public Add(other: Vector3) {
            this.data[0] += other.data[0];
            this.data[1] += other.data[1];
            this.data[2] += other.data[2];
        }

        /**
         * Adds the given Vector3 objects together and returns the result.
         * @param {Vector3} a - The first Vector3 to add.
         * @param {Vector3} b - The second Vector3 to add.
         * @returns {Vector3} The sum of a and b.
         */
        public static Add(a: Vector3, b: Vector3): Vector3 {
            var result = new Vector3();
            result.data[0] = a.data[0] + b.data[0];
            result.data[1] = a.data[1] + b.data[1];
            result.data[2] = a.data[2] + b.data[2];
            return result;
        }

        /**
         * Subtracts the given Vector3 from this Vector3.
         *
         * @param {Vector3} other - The Vector3 to subtract from this one
         */
        public Subtract(other: Vector3) {
            this.data[0] -= other.data[0];
            this.data[1] -= other.data[1];
            this.data[2] -= other.data[2];
        }

        /// Projects [this] using the projection matrix [arg]
        public ApplyProjection(arg: Matrix): Vector3 {
            var _x = this.data[0];
            var _y = this.data[1];
            var _z = this.data[2];

            var d =  1.0 / (arg.data[3] * _x + arg.data[7] * _y + arg.data[11] * _z + arg.data[15]);
            this.data[0] = (arg.data[0] * _x + arg.data[4] * _y + arg.data[8] * _z + arg.data[12]) * d;
            this.data[1] = (arg.data[1] * _x + arg.data[5] * _y + arg.data[9] * _z + arg.data[13]) * d;
            this.data[2] = (arg.data[2] * _x + arg.data[6] * _y + arg.data[10] * _z + arg.data[14]) * d;
            return this;
        }
    }
}