module Vapor {
    /**
     * 
     */
    export class RevoluteJoint extends Component {
        public radius: number = 1.0;

        public jointDef: Box2D.Dynamics.Joints.b2RevoluteJointDef;

        public enableMotor: boolean = false;

        /**
         * The other RigidBody object that the one with the joint is connected to. If this is null then the othen end of the joint will be fixed at a point in space.
         */
        public connectedRigidBody: RigidBody;

        /**
         * Coordinate in local space where the end point of the joint is attached.
         */
        public anchor: Vector2;

        private revoluteJoint: Box2D.Dynamics.Joints.b2RevoluteJoint;

        public Awake() {
            this.jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            this.jointDef.enableMotor = this.enableMotor;
            //_jointDef.initialize(gameObject.rigidbody.body, connectedRigidBody.body, anchor);
        }

        public Start() {
            var anchor = new Box2D.Common.Math.b2Vec2(this.anchor.X, this.anchor.Y);
            this.jointDef.Initialize(this.gameObject.rigidbody.body, this.connectedRigidBody.body, anchor);
            this.revoluteJoint = <Box2D.Dynamics.Joints.b2RevoluteJoint>this.scene.world.CreateJoint(this.jointDef);
        }
    }
}