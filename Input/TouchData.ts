module Vapor {
    /**
     * Contains the data for a certain touch.
     */
    export class TouchData {
        /**
         * The unique index for touch.
         */
        fingerId: number = 0;

        /**
         * The position of the touch.
         */
        position: Vector3 = new Vector3();

        /**
         * The position delta since last change.
         */
        deltaPosition: Vector3 = new Vector3();

        /**
         * Amount of time passed since last change.
         */
        deltaTime: number = 0.0;

        /**
         * Number of taps.
         */
        tapCount: number = 0;

        /**
         * Describes the phase of the touch.
         */
        phase: TouchPhase = TouchPhase.Began;
    }
}