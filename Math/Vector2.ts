module Vapor {
    export class Vector2 {
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

        /**
         * Creates a new instance of a Vector3 initialized to the given values or [0, 0].
         * @constructor
         */
        constructor(x: number = 0, y: number = 0) {
            this.data = new Float32Array(2);
            this.data[0] = x;
            this.data[1] = y;
        }

        /**
         * Adds the given Vector2 to this Vector2
         * @param {Vector2} other - The Vector2 to add to this one
         */
        public Add(other: Vector2) {
            this.data[0] += other.data[0];
            this.data[1] += other.data[1];
        }

        /**
         * Adds the given Vector2 objects together and returns the result.
         * @param {Vector2} a - The first Vector2 to add.
         * @param {Vector2} b - The second Vector2 to add.
         * @returns {Vector2} The sum of a and b.
         */
        public static Add(a: Vector2, b: Vector2): Vector2 {
            var result = new Vector2();
            result.data[0] = a.data[0] + b.data[0];
            result.data[1] = a.data[1] + b.data[1];
            return result;
        }
    }
} 