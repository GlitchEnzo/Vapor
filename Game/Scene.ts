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
        cameras: Array<Camera> = new Array<Camera>();

        /**
         * True if the game is paused.
         */
        paused: boolean = false;

        /**
         * Gets the first camera in the scene.
         */
        public get Camera(): Camera {
            return this.cameras[0];
        }

        /**
         * The [Canvas] used to render the Scene.
         */
        canvas: Canvas;

        /**
         * The Box2D physics world.
         */
        world: Box2D.Dynamics.b2World;

        /**
         * The gravity vector used for Box2D.
         */
        private gravity: Vector2;

        constructor(canvas: Canvas = new Canvas(), gravity: Vector2 = new Vector2(0.0, -9.8)) {
            super("Scene");

            this.canvas = canvas;
            this.gravity = gravity;

            this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(gravity.X, gravity.Y), true);

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
                if (gameObject.components[i] instanceof Camera) {
                    this.cameras.push(<Camera>gameObject.components[i]);
                }
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
            this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(this.gravity.X, this.gravity.Y), true);
        }

        /**
         * @private
         */
        private Update(time: number) {
            if (!this.paused) {
                Time.Update();

                this.world.Step(1 / 60, 10, 10);
                this.world.ClearForces();

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
        private Render() {
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            // Loop through every Camera
            for (var i = 0; i < this.cameras.length; i++) {
                this.cameras[i].Clear();

                // TODO: Perform frustum culling on each camera
                // TODO: Only draw the objects visible in each camera

                // Loop through every GameObject
                for (var j = 0; j < this.gameObjects.length; j++) {
                    // Set the view & projection matrix on each renderer
                    if (this.gameObjects[j].renderer) {
                        var viewMatrix = Matrix.Copy(this.cameras[i].transform.modelMatrix);
                        viewMatrix.Invert();
                        this.gameObjects[j].renderer.material.SetMatrix("uViewMatrix", viewMatrix);
                        this.gameObjects[j].renderer.material.SetMatrix("uProjectionMatrix", this.cameras[i].projectionMatrix);
                    }

                    this.gameObjects[j].Render();
                }

            }
        }

        /**
         * @private
         */
        private WindowResized(event: UIEvent) {
            console.log("Scene - Window Resized");

            this.canvas.Resize();

            for (var i = 0; i < this.cameras.length; i++) {
                this.cameras[i].OnWindowResized(event);
            }
        }
    }
}