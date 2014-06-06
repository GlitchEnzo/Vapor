module Vapor {
    /**
     * A body type enum. There are three types of bodies.
     *
     * Static: Have zero mass, zero velocity and can be moved manually.
     *
     * Kinematic: Have zero mass, a non-zero velocity set by user, and are moved by
     *   the physics solver.
     *
     * Dynamic: Have positive mass, non-zero velocity determined by forces, and is
     *   moved by the physics solver.
     */
    export enum BodyType {
        Static,
        Kinematic,
        Dynamic
    }

    /**
     * Represents a Rigid Body for use with the Box2D physics engine.
     */
    export class RigidBody extends Component {
        /**
         * The backing Box2D Body object that this RigidBody represents.
         */
        public body: Box2D.Dynamics.b2Body;

        /**
         * The type of body (Dynamic, Static, or Kinematic) associated with this Collider.
         * Defaults to Dynamic.
         * The types are defined in Box2D.BodyType.
         */
        private bodyType: BodyType = BodyType.Dynamic;

        /**
         * The Box2D.BodyDef that was used to create this Rigid Body.
         */
        private bodyDef: Box2D.Dynamics.b2BodyDef;

        /**
         * The Box2D.BodyDef that was used to create this Rigid Body.
         */
        public get BodyDefinition(): Box2D.Dynamics.b2BodyDef {
            return this.bodyDef;
        }

        /**
         * Constructs a new RigidBody using the given body type.  Defaults to Box2D.BodyType.DYNAMIC.
         */
        constructor(bodyType = BodyType.Dynamic) {
            super("RigidBody");
            this.bodyType = bodyType;
        }

        public Awake() {
            this.bodyDef = new Box2D.Dynamics.b2BodyDef();
            this.bodyDef.type = this.bodyType;
            this.bodyDef.position = new Box2D.Common.Math.b2Vec2(this.transform.position.X, this.transform.position.Y);
        }

        public Start() {
            this.body = this.gameObject.scene.world.CreateBody(this.bodyDef);
            //this.body.SetTransform(transform.position.xy, transform.eulerAngles.z);
            var position = new Box2D.Common.Math.b2Vec2(this.transform.position.X, this.transform.position.Y);
            this.body.SetPositionAndAngle(position, this.transform.EulerAngles.Z);
        }
    }
}