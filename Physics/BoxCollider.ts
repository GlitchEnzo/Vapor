/// <reference path="Collider.ts" />

module Vapor {
    /**
     * Represents a collider that is a box shape.
     */
    export class BoxCollider extends Collider {
        public center: Vector2 = new Vector2(0.0, 0.0);

        public size: Vector2 = new Vector2(1.0, 1.0);

        public Awake() {
            var shape = new Box2D.Collision.Shapes.b2PolygonShape();
            var center = new Box2D.Common.Math.b2Vec2(this.center.X, this.center.Y);
            shape.SetAsOrientedBox(this.size.X / 2, this.size.Y / 2, center, 0.0);

            this.fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            this.fixtureDef.restitution = 0.5;
            this.fixtureDef.density = 0.05;
            //this.fixtureDef.friction = 0.1;
            this.fixtureDef.shape = shape;
            this.fixtureDef.isSensor = this.isSensor;
        }

        public Start() {
            super.Start();

            this.fixture = this.attachedRigidbody.body.CreateFixture(this.fixtureDef);
        }

        public Update() {
            var polygon = <Box2D.Collision.Shapes.b2PolygonShape>this.fixture.GetShape();;
            //var pos = Box2D.Transform.mul(attachedRigidbody.body.originTransform, polygon.centroid);
            // TODO: Figure out how to ge the position of the box
            //var pos = Box2D.Common.Math.b2Math.MulX(this.attachedRigidbody.body.GetTransform(), polygon.ComputeAABB().);
            var pos = this.attachedRigidbody.body.GetPosition(); // this is not right for rigid bodies with multiple shapes, but it should work for now

            this.transform.position = new Vector3(pos.x, pos.y, this.transform.position.Z);
            this.transform.EulerAngles = new Vector3(this.transform.EulerAngles.X, this.transform.EulerAngles.Y, this.attachedRigidbody.body.GetAngle());
        }
    }
}