module Vapor {
    export class BoundingBox3D {
        private min: Vector3;
        private max: Vector3;

        get Min(): Vector3 {
            return this.min;
        }

        get Max(): Vector3 {
            return this.max;
        }

        /**
         * Creates a new instance of a BoundingBox3D initialized to the given values or 0s.
         * @constructor
         */
        constructor(min: Vector3 = new Vector3(), max: Vector3 = new Vector3()) {
            this.min = min;
            this.max = max;
        }

        /**
         * Return true if this intersects with given BoundingBox.
         * @param {BoundingBox3D} other - The BoundingBox3D to check intersection with.
         */
        public IntersectsBoundingBox(other: BoundingBox3D): boolean {
            return this.min.X <= other.max.X &&
                this.min.Y <= other.max.Y &&
                this.min.Z <= other.max.Z &&
                this.max.X >= other.min.X &&
                this.max.Y >= other.min.Y &&
                this.max.Z >= other.min.Z;
        }
    }
} 