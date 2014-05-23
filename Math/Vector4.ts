module Vapor {
    export class Vector4 {
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

        get W(): number {
            return this.data[3];
        }
        set W(value: number) {
            this.data[3] = value;
        }

        /**
         * Creates a new instance of a Vector4 initialized to the given values or [0, 0, 0, 0].
         * @constructor
         */
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
            this.data = new Float32Array(3);
            this.data[0] = x;
            this.data[1] = y;
            this.data[2] = z;
            this.data[3] = w;
        }

        public static Copy(other: Vector4) {
            var copy = new Vector4();
            copy.data[0] = other.data[0];
            copy.data[1] = other.data[1];
            copy.data[2] = other.data[2];
            copy.data[3] = other.data[3];
            return copy;
        }

        /**
         * Adds the given Vector4 to this Vector4
         * @param {Vector4} other - The Vector4 to add to this one
         */
        public Add(other: Vector4) {
            this.data[0] += other.data[0];
            this.data[1] += other.data[1];
            this.data[2] += other.data[2];
            this.data[3] += other.data[3];
        }

        /**
         * Adds the given Vector4 objects together and returns the result.
         * @param {Vector4} a - The first Vector4 to add.
         * @param {Vector4} b - The second Vector4 to add.
         * @returns {Vector4} The sum of a and b.
         */
        public static Add(a: Vector4, b: Vector4): Vector4 {
            var result = new Vector4();
            result.data[0] = a.data[0] + b.data[0];
            result.data[1] = a.data[1] + b.data[1];
            result.data[2] = a.data[2] + b.data[2];
            result.data[3] = a.data[3] + b.data[3];
            return result;
        }

        /**
         * Subtracts the given Vector4 from this Vector4.
         *
         * @param {Vector4} other - The Vector4 to subtract from this one
         */
        public Subtract(other: Vector4) {
            this.data[0] -= other.data[0];
            this.data[1] -= other.data[1];
            this.data[2] -= other.data[2];
            this.data[3] -= other.data[3];
        }
    }
}