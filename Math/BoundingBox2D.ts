module Vapor {
    export class BoundingBox2D {
        private min: Vector2;
        private max: Vector2;

        get Min(): Vector2 {
            return this.min;
        }

        get Max(): Vector2 {
            return this.max;
        }

        /**
         * Creates a new instance of a BoundingBox2D initialized to the given values or 0s.
         * @constructor
         */
        constructor(min: Vector2 = new Vector2(), max: Vector2 = new Vector2()) {
            this.min = min;
            this.max = max;
        }

        /**
         * Return true if this intersects with given BoundingBox.
         * @param {BoundingBox2D} other - The BoundingBox2D to check intersection with.
         */
        public IntersectsBoundingBox(other: BoundingBox2D): boolean {
            return this.min.X <= other.max.X &&
                this.min.Y <= other.max.Y &&
                this.max.X >= other.min.X &&
                this.max.Y >= other.min.Y;
        }
    }
} 