/// <reference path="VaporObject.ts" />

module Vapor {
    /**
     * The base class for all functionality that is added to GameObjects.
     * @class Represents a Component
     */
    export class Component extends VaporObject {
        /**
         * True if the component is enabled, and therefore Updated and Rendered.
         */
        private enabled: boolean = true;

        /**
         * Gets the enabled state of this Component.
         */
        get Enabled(): boolean {
            return this.enabled;
        }

        /**
         * Sets the enabled state of this Component.
         */
        set Enabled(value: boolean) {
            this.enabled = value;
        }

        /**
         * The GameObject this Component is attached to
         */
        public gameObject: GameObject = null;

        /**
         * The Transform of the GameObject
         */
        //Transform get transform => gameObject.transform;

        /**
         * The Scene that this Component belongs to.
         */
        //Scene get scene => gameObject.scene;

        /**
         * Called as soon as this Component gets added to a GameObject
         */
        Awake() { }

        /**
         * Called when the parent GameObject gets added to a Scene.
         */
        Start() { }

        /**
         * Called once per frame.
         */
        Update() { }

        /**
         * Called once per frame.  Put rendering code inside here.
         */
        Render() { }

        /**
         * Called whenver collisions are detected via the physics engine (Box2D).
         */
        //OnCollision(Box2D.Contact contact) { }
    }
}