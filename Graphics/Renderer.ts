module Vapor {
    /**
     * The base behavior that is used to render anything.
     * @class Represents a Renderer
     * @see Vapor.Behavior
     */
    export class Renderer extends Component {
        /**
         * The Vapor.Material that this Renderer uses.
         * @type Vapor.Material
         */
        public material: Material = null;

        /**
         * @private
         */
        public Update() {
            //console.log("Renderer Update");
            //Vapor.Behavior.prototype.Update.call(this); // call super
        }

        /**
         * @private
         */
        public Render() {
            //console.log("Renderer Draw");
            //Vapor.Behavior.prototype.Draw.call(this); // call super
        }
    }
}