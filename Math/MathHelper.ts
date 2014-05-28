module Vapor {
    export class MathHelper {
        public static ToRadians(degrees: number): number {
            // pi / 180 = 0.01745329251994329576923690768489
            return degrees * 0.01745329251994329576923690768489;
        }
    }
}