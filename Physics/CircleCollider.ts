module Vapor {
    /**
     * 
     */
    export class CircleCollider extends Collider {
        /**
         * Does nothing since there is no way to set the center point of a Circle fixture.
         * I belive this is a bug with the Dart port of Box2D.
         */
        public center: Vector2 = new Vector2(0.0, 0.0);

        public radius: number = 1.0;

        constructor(radius: number = 1.0) {
            super("CircleCollider");
            this.radius = radius;
        }

        public Awake() {
            var shape = new Box2D.Collision.Shapes.b2CircleShape();
            //shape.SetLocalPosition(this.center);
            shape.SetRadius(this.radius);

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
            var circle = <Box2D.Collision.Shapes.b2CircleShape>this.fixture.GetShape();        
            //var pos = Box2D.Common.Math.b2Transform.mul(this.attachedRigidbody.body.GetTransform(), circle.GetLocalPosition());
            var pos = Box2D.Common.Math.b2Math.MulX(this.attachedRigidbody.body.GetTransform(), circle.GetLocalPosition());

            this.transform.position = new Vector3(pos.x, pos.y, this.transform.position.Z);
            this.transform.EulerAngles = new Vector3(this.transform.EulerAngles.X, this.transform.EulerAngles.Y, this.attachedRigidbody.body.GetAngle());

            //transform.position = new Vector3(gameObject.rigidbody.body.position.x, gameObject.rigidbody.body.position.y, transform.position.z);
            //transform.eulerAngles = new Vector3(transform.eulerAngles.x, transform.eulerAngles.y, gameObject.rigidbody.body.angle);

            var contactList = this.attachedRigidbody.body.GetContactList();
            if (contactList != null && contactList.contact != null) {
                if (contactList.contact.IsTouching()) {
                    this.gameObject.OnCollision(contactList.contact);
                }
            }
        }
    }
}