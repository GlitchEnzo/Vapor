/// <reference path="Renderer.ts" />

module Vapor {
    /**
     * Represents a Renderer behavior that is used to render a mesh.
     * @class Represents a MeshRenderer
     */
    export class MeshRenderer extends Renderer {
        /**
         * The mesh that this MeshRenderer will draw.
         */
        mesh: Mesh = null;

        /**
         * @private
         */
        public Render() {
            this.material.Use();
            //this.material.SetMatrix("uModelViewMatrix", this.gameObject.transform.modelMatrix);
            this.material.SetMatrix("uModelMatrix", this.gameObject.transform.ScaledModelMatrix);
            this.mesh.Render(this.material);
        }
    }
}