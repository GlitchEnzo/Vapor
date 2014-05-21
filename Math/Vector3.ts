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

        /**
         * Creates a new instance of a Vector3 initialized to [0, 0, 0]
         * @constructor
         */
        constructor() {
            this.data = new Float32Array(3);
            this.data[0] = 0;
            this.data[1] = 0;
            this.data[2] = 0;
        }

        /**
         * Changes this Vector3 to [1, 2, 3]
         */
        public Change() {
            this.data[0] = 1;
            this.data[1] = 2;
            this.data[2] = 3;
        }

        /**
         * Changes the given Vector3 to [1, 2, 3]
         * @param {Vector3} vec3 - The vector to change
         */
        public static Change(vec3: Vector3) {
            vec3.data[0] = 1;
            vec3.data[1] = 2;
            vec3.data[2] = 3;
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
    }
}