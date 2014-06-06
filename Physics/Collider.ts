module Vapor {
    /**
     * Represents a collider for use with the Box2D physics engine.
     * The base class for all Collider objects.
     */
    export class Collider extends Component {
        /**
         * The rigid body attached to the Collider's GameObject.
         */
        public attachedRigidbody: RigidBody;

        /**
         * True if the body associated with this Collider is used as a Box2D sensor.
         * Defaults to false.
         */
        public isSensor: boolean = false;

        /**
         * The FixtureDef that was used to create this collider.
        * [protected]
         */
        public fixtureDef: Box2D.Dynamics.b2FixtureDef;

        /**
         * The FixtureDef that was used to create this collider.
         */
        public get FixtureDefinition(): Box2D.Dynamics.b2FixtureDef {
            return this.fixtureDef;
        }

        /**
         * The actual Fixture that this collider represents.
         * [protected] 
         */
        public fixture: Box2D.Dynamics.b2Fixture;

        public Start() {
            // first just set to the rigid body attached to this object
            this.attachedRigidbody = this.gameObject.rigidbody;

            // next try to find a rigid body on the parents
            var parent = this.gameObject.parent;
            while (parent != null) {
                console.log("Parent = " + parent.Name);

                if (parent.rigidbody != null) {
                    this.attachedRigidbody = parent.rigidbody;
                }

                parent = parent.parent;
            }

            if (this.attachedRigidbody == null) {
                console.error("You must first attach a RigidBody component.");
            }
        }
    }
}