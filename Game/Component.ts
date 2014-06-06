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
        get Enabled(): boolean { return this.enabled; }

        /**
         * Sets the enabled state of this Component.
         */
        set Enabled(value: boolean) { this.enabled = value; }

        /**
         * The GameObject this Component is attached to
         */
        public gameObject: GameObject;

        /**
         * The Transform of the GameObject
         */
        public get transform(): Transform { return this.gameObject.transform; }

        /**
         * The Scene that this Component belongs to.
         */
        public get scene(): Scene { return this.gameObject.scene; }

        /**
         * Called as soon as this Component gets added to a GameObject
         */
        public Awake() { }

        /**
         * Called when the parent GameObject gets added to a Scene.
         */
        public Start() { }

        /**
         * Called once per frame.
         */
        public Update() { }

        /**
         * Called once per frame.  Put rendering code inside here.
         */
        public Render() { }

        /**
         * Called whenver collisions are detected via the physics engine (Box2D).
         */
        public OnCollision(contact: Box2D.Dynamics.Contacts.b2Contact) { }
    }
}