module Vapor {
    /**
     * A Scene is essentially a list of GameObjects.  It updates and renders all GameObjects
     * as well as holds a reference to a Canvas to render to.
     * @class Represents a Scene
     * @param {Vapor.Canvas} [canvas] The Canvas to use.  If not given, it creates its own.
     */
    export class Scene extends VaporObject {
        /**
         * The list of GameObjects in the Scene.
         */
        gameObjects: Array<GameObject> = new Array<GameObject>();

        /**
         * The list of Camera Components in the Scene. (Don't add to this list!  
         * Add the GameObject containing the Camera to Scene.gameObjects.)
         */
        //cameras: Array<Camera> = new Array<Camera>();

        /**
         * True if the game is paused.
         */
        paused: boolean = false;

        /**
         * Gets the first camera in the scene.
         */
        //public get Camera(): Camera {
        //    return cameras[0];
        //}

        /**
         * The [Canvas] used to render the Scene.
         */
        canvas: Canvas;

        /**
         * The Box2D physics world.
         */
        //Box2D.World world;// = new Box2D.World(new Vector2(0.0, 0.0), true, new Box2D.DefaultWorldPool());

        /**
         * The gravity vector used for Box2D.
         */
        private gravity: Vector2;

        constructor(canvas: Canvas = new Canvas(), gravity: Vector2 = new Vector2(0.0, -9.8)) {
            super("Scene");

            this.canvas = canvas;
            this.gravity = gravity;

            //world = new Box2D.World(_gravity, true, new Box2D.DefaultWorldPool());

            // Tell the browser to call the Update method
            window.requestAnimationFrame(this.Update.bind(this));

            // Hook the browser resize event and react accordingly
            window.onresize = this.WindowResized.bind(this);

            // We need to initialize values on input classes
            Keyboard.Initialize();
            Mouse.Initialize();
            TouchInput.Initialize();
        }

        /**
         * Adds the given GameObject to the Scene.
         * @param {Vapor.GameObject} gameObject The GameObject to add.
         */
        public AddGameObject(gameObject: GameObject) {
            gameObject.scene = this;

            for (var i = 0; i < gameObject.components.length; i++) {
                // Check if gameObject contains Camera component.  Add to camera list if it does.
                //if (gameObject.components[i] instanceof Camera) {
                //    this.cameras.add(gameObject.components[i]);
                //}
                // TODO: Check if gameObject contains Light component.  Add to light list if it does.
            }

            this.gameObjects.push(gameObject);

            gameObject.Start();
        }

        /**
         * Removes the given [GameObject] from the [Scene].
         */
        public RemoveGameObject(gameObject: GameObject) {
            this.gameObjects.remove(gameObject);
        }

        /**
         * Clears all [GameObject]s out of the [Scene].
         */
        public Clear() {
            this.gameObjects.length = 0;
            //world = new Box2D.World(gravity, true, new Box2D.DefaultWorldPool());
        }

        /**
         * @private
         */
        public Update(time: number) {
            if (!this.paused) {
                Time.Update();

                //world.step(1 / 60, 10, 10);
                //world.clearForces();

                // Call Update on each GameObject
                for (var i = 0; i < this.gameObjects.length; i++) {
                    this.gameObjects[i].Update();
                }

                // Update all of the Input
                Keyboard.Update();
                Mouse.Update();
                TouchInput.Update();

                this.Render();

                // Tell the browser to call the Update method
                window.requestAnimationFrame(this.Update.bind(this));
            }
        }

        /**
         * @private
         */
        public Render() {
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            ////gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //// Loop through every Camera
            //for (var i = 0; i < this.cameras.length; i++) {
            //    this.cameras[i].Clear();

            //    // TODO: Perform frustum culling on each camera
            //    // TODO: Only draw the objects visible in each camera

            //    //console.log(this.cameras[i].transform.modelMatrix);

            //    // Loop through every GameObject
            //    for (var j = 0; j < this.gameObjects.length; j++) {
            //        // Set the view & projection matrix on each renderer
            //        if (this.gameObjects[j].renderer != null) {
            //            Matrix4 viewMatrix = new Matrix4.copy(this.cameras[i].transform.modelMatrix);
            //            viewMatrix.invert();
            //            this.gameObjects[j].renderer.material.SetMatrix("uViewMatrix", viewMatrix);
            //            this.gameObjects[j].renderer.material.SetMatrix("uProjectionMatrix", this.cameras[i].projectionMatrix);
            //        }

            //        this.gameObjects[j].Render();
            //    }
            //}
        }

        /**
         * @private
         */
        private WindowResized(event: UIEvent) {
            //window.console.log("Scene - Window Resized");

            this.canvas.Resize();

            //for (var i = 0; i < this.cameras.length; i++) {
            //    this.cameras[i].OnWindowResized(event);
            //}
        }
    }
}