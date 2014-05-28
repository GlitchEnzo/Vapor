/// <reference path="../Math/Vector4.ts" />

module Vapor {
    export class Color {
        /**
         * Creates a new Color from the given integers.
         * @param {number} r Red. 0-255.
         * @param {number} g Green. 0-255.
         * @param {number} b Blue. 0-255.
         * @param {number} a Alpha. 0-255.
         * @returns {Vector4} The new Color.
         */
        static FromInts(r: number, g: number, b: number, a: number): Vector4 {
            return new Vector4(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        }

        /**
         * Red (255, 0, 0, 255)
         */
        static Red: Vector4 = new Vector4(1.0, 0.0, 0.0, 1.0);

        /**
         * Green (0, 255, 0, 255)
         */
        static Green: Vector4 = new Vector4(0.0, 1.0, 0.0, 1.0);

        /**
         * Blue (0, 0, 255, 255)
         */
        static Blue: Vector4 = new Vector4(0.0, 0.0, 1.0, 1.0);

        /**
         * Cornflower Blue (100, 149, 237, 255)
         */
        static CornflowerBlue: Vector4 = Color.FromInts(100, 149, 237, 255);

        /**
         * Unity Blue (49, 77, 121, 255)
         */
        static UnityBlue: Vector4 = Color.FromInts(49, 77, 121, 255);

        /**
         * Solid Black (0, 0, 0, 255)
         */
        static SolidBlack: Vector4 = new Vector4(0.0, 0.0, 0.0, 1.0);

        /**
         * Solid White (255, 255, 255, 255)
         */
        static SolidWhite: Vector4 = new Vector4(1.0, 1.0, 1.0, 1.0);

        /**
         * Transparent Black (0, 0, 0, 0)
         */
        static TransparentBlack: Vector4 = new Vector4(0.0, 0.0, 0.0, 0.0);

        /**
         * Transparent White (255, 255, 255, 0)
         */
        static TransparentWhite: Vector4 = new Vector4(1.0, 1.0, 1.0, 0.0);
    }
}