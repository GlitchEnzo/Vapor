module Vapor {
    /**
     * A static class offering access to time related fields.
     * @class Represents a Mesh
     */
    export class Time {
        /**
         * The amount of time that has passed since the last frame, in seconds.
         */
        public static deltaTime: number = 0.0;

        /**
         * The time of the previous frame, in milliseconds.
         */
        private static previousTime: number = performance.now();

        /**
         * @private
         */
        public static Update() {
            var currentTime: number = performance.now();
            Time.deltaTime = (currentTime - Time.previousTime) / 1000.0;
            Time.previousTime = currentTime;
            
            //console.log(Time.deltaTime);
        }
    }
}