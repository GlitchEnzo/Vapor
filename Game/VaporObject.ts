module Vapor {
    /**
     * The base class of all objects in Vapor.
     */
    export class VaporObject {
        private name: string;

        /**
         * Gets the name of this VaporObject.
         */
        get Name(): string {
            return this.name;
        }

        /**
         * Sets the name of this VaporObject.
         */
        set Name(value: string) {
            this.name = value;
        }

        /**
         * Creates a new instance of a VaporObject.
         */
        constructor() {
            this.name = "VaporObject";
        }
    }
} 