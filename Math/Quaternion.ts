module Vapor {
    export class Quaternion {
        public data: Float32Array;

        /**
         * Creates a new instance of a Quaternion initialized to the identity.
         * @constructor
         */
        constructor() {
            this.data = new Float32Array(4);
            this.data[0] = 0;
            this.data[1] = 0;
            this.data[2] = 0;
            this.data[3] = 1;
        }

        /**
         * Set quaternion with rotation of yaw, pitch and roll stored in the given Vector3.
         */
        public SetEuler(eulerAngles: Vector3) {
            var yaw = eulerAngles.data[0];
            var pitch = eulerAngles.data[1];
            var roll = eulerAngles.data[2];

            var halfYaw = yaw * 0.5;
            var halfPitch = pitch * 0.5;
            var halfRoll = roll * 0.5;
            var cosYaw = Math.cos(halfYaw);
            var sinYaw = Math.sin(halfYaw);
            var cosPitch = Math.cos(halfPitch);
            var sinPitch = Math.sin(halfPitch);
            var cosRoll = Math.cos(halfRoll);
            var sinRoll = Math.sin(halfRoll);

            this.data[0] = cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw;
            this.data[1] = cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw;
            this.data[2] = sinRoll * cosPitch * cosYaw - cosRoll * sinPitch * sinYaw;
            this.data[3] = cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw;
        }
    }
} 