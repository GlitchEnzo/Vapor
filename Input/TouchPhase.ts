module Vapor {
    /**
     * Enumeration of the possible touch phases.
     */
    export enum TouchPhase {
        /**
         * A finger touched the screen.
         */
        Began,

        /**
         * A finger moved on the screen.
         */
        Moved,

        /**
         * A finger is touching the screen but hasn't moved.
         */
        Stationary,

        /**
         * A finger was lifted from the screen. This is the final phase of a touch.
         */
        Ended,

        /**
         * The system cancelled tracking for the touch. This is the final phase of a touch.
         */
        Canceled
    }
}