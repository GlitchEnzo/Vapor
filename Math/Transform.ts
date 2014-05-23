module Vapor {
    /**
     * Represents a Transform.
     * A Transform is what determines the translation (position), rotation (orientation),
     * and scale of a GameObject.
     */
    export class Transform extends Component {
        /**
         * Gets the model (aka world, aka transformation) Matrix of the GameObject (before scaling).
         */
        public modelMatrix: Matrix;

        /**
         * The model matrix with the current scaling applied.
         */
        public get ScaledModelMatrix(): Matrix {
            // TODO: Optimize this to only do the multiplication when needed.
            //return this.modelMatrix * this.scaleMatrix;
            return Matrix.Multiply(this.modelMatrix, this.scaleMatrix);
        }

        /**
         * Gets the Quaternion representing the rotation of the GameObject.
         */
        public rotation: Quaternion;

        private eulerAngles: Vector3;
        private scale: Vector3;
        private scaleMatrix: Matrix;

        constructor() {
            super("Transform");

            this.modelMatrix = new Matrix();
            this.rotation = new Quaternion();
            this.eulerAngles = new Vector3();
            this.scale = new Vector3(1.0, 1.0, 1.0);
            this.scaleMatrix = new Matrix();
        }

        /**
         * Gets and sets the position of the Transform.
         * @name Vapor.Transform.prototype.position
         * @property
         */
        public get position(): Vector3 {
            return new Vector3(this.modelMatrix[12],
                this.modelMatrix[13],
                this.modelMatrix[14]);
        }

        public set position(value: Vector3) {
            for (var i = 0; i < this.gameObject.children.length; i++) {
                var child = this.gameObject.children[i];
                // TODO: Set the position in local space, not world space.
                child.transform.position = child.transform.localPosition;
                child.transform.position.Add(value);
            }

            this.modelMatrix[12] = value[0];
            this.modelMatrix[13] = value[1];
            this.modelMatrix[14] = value[2];

            // Change RigidBody position as well, if there is one
            //if (this.gameObject.rigidbody != null && this.gameObject.rigidbody.body != null) {
            //    // use the body's angle, since we only care about position here
            //    gameObject.rigidbody.body.setTransform(this.position.xy, this.gameObject.rigidbody.body.angle);
            //}
        }

        /**
         * Gets the location relative to its parent.
         */
        public get localPosition(): Vector3 {
            // if there is no parent, the local position is the world position
            var local: Vector3 = this.position;
            if (this.gameObject.parent != null) {
                // TODO: Use local space, not world space.
                //local = local - this.gameObject.parent.transform.position;
                local.Subtract(this.gameObject.parent.transform.position);
            }
            return local;
        }

        /**
         * Sets the location relative to its parent.
         */
        public set localPosition(value: Vector3) {
            if (this.gameObject.parent != null) {
                // TODO: Use local space, not world space.
                this.position = this.gameObject.parent.transform.position;
                this.position.Add(value);
            }
            else {
                this.position = value;
            }
        }

        /**
         * Gets and sets the right Vector of the Transform.
         * TODO: Convert to use Quaternion:
         * http://nic-gamedev.blogspot.com/2011/11/quaternion-math-getting-local-axis.html
         * @name Vapor.Transform.prototype.right
         */
        public get right(): Vector3 {
            return new Vector3(this.modelMatrix[0],
                this.modelMatrix[1],
                this.modelMatrix[2]);
        }

        public set right(value: Vector3) {
            this.modelMatrix[0] = value[0];
            this.modelMatrix[1] = value[1];
            this.modelMatrix[2] = value[2];

            // TODO: Recalc forward and up
        }

        /**
         * Gets and sets the up Vector of the Transform.
         * @name Vapor.Transform.prototype.up
         * @field
         */
        public get up(): Vector3 {
            return new Vector3(this.modelMatrix[4],
                this.modelMatrix[5],
                this.modelMatrix[6]);
        }

        public set up(value: Vector3) {
            this.modelMatrix[4] = value[0];
            this.modelMatrix[5] = value[1];
            this.modelMatrix[6] = value[2];

            // TODO: Recalc forward and right
        }

        /**
         * Gets and sets the forward Vector of the Transform.
         * @name Vapor.Transform.prototype.forward
         * @field
         */
        public get forward(): Vector3 {
            return new Vector3(-this.modelMatrix[8],
                -this.modelMatrix[9],
                -this.modelMatrix[10]);
        }

        public set forward(value: Vector3) {
            this.modelMatrix[8] = -value[0];
            this.modelMatrix[9] = -value[1];
            this.modelMatrix[10] = -value[2];

            // TODO: Recalc up and right
        }

        /**
         * Gets and sets the euler angles (rotation around X, Y, and Z) of the Transform.
         * @name Vapor.Transform.prototype.eulerAngles
         * @field
         */
        public get EulerAngles(): Vector3 {
            // TODO: Actually calculate the angles instead of using old values.
            return this.eulerAngles;
        }

        public set EulerAngles(value: Vector3) {
            this.eulerAngles = value;
            this.rotation.SetEuler(value);
            this.modelMatrix.FromTranslationRotation(this.position, this.rotation);
        }

        /**
         * Gets and sets the position of the Transform.
         * @name Vapor.Transform.prototype.position
         * @property
         */
        public get Scale(): Vector3 {
            return this.scale;
        }

        public set Scale(value: Vector3) {
            this.scale = value;
            this.scaleMatrix.Scale(this.scale);
        }

        /**
         * Sets the Transform to point at the given target position with the given world up vector.
         * @param {vec3} targetPosition The target position to look at.
         * @param {vec3} worldUp The world up vector.
         */
        public LookAt(targetPosition: Vector3, worldUp: Vector3) {
            // TODO: worldUp should only be a hint, not "solid"
            this.modelMatrix.SetLookAt(this.position, targetPosition, worldUp);
        }

        public Rotate(axis: Vector3, angle: number) {
            this.modelMatrix.Rotate(axis, angle);
        }

        public RotateLocalX(angle: number) {
            this.Rotate(this.right, angle);
        }

        public RotateLocalY(angle: number) {
            this.Rotate(this.up, angle);
        }
    }
}

/*
// Get roll, pitch, yaw from Quaternion
// From: http://stackoverflow.com/questions/6870469/convert-opengl-4x4-matrix-to-rotation-angles
final double roll = Math.atan2(2 * (quat.getW() * quat.getX() + quat.getY() * quat.getZ()),
            1 - 2 * (quat.getX() * quat.getX() + quat.getY() * quat.getY()));
final double pitch = Math.asin(2 * (quat.getW() * quat.getY() - quat.getZ() * quat.getY()));
final double yaw = Math.atan2(2 * (quat.getW() * quat.getZ() + quat.getX() * quat.getY()), 1 - 2 * (quat.getY()
            * quat.getY() + quat.getZ() * quat.getZ()));
*/