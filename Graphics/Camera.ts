module Vapor {
    /**
     * A Camera is what renders the GameObjects in the Scene.
     * @class Represents a Camera
     */
    export class Camera extends Component {
        /**
         * The Color to clear the background to.  Defaults to UnityBlue.
         */
        backgroundColor: Vector4 = Color.UnityBlue;

        /**
         * The angle, in degrees, of the field of view of the Camera.  Defaults to 45.
         */
        fieldOfView: number = 45.0;

        /**
         * The aspect ratio (width/height) of the Camera.  Defaults to the GL viewport dimensions.
         */
        aspect: number;// = gl.viewportWidth / gl.viewportHeight;

        /**
         * The distance to the near clipping plane of the Camera.  Defaults to 0.1.
         */
        nearClipPlane: number = 0.1;

        /**
         * The distance to the far clipping plane of the Camera.  Defaults to 1000.
         */
        farClipPlane: number = 1000.0;

        /**
         * The current projection Matrix of the Camera.
         */
        projectionMatrix: Matrix = new Matrix();

        constructor() {
            super("Camera");

            // NOTE: Can NOT do anything with Transform in the constructor, since
            //       it is not yet attached to a GameObject with a Transform.
            //       Must do it in Awake...

            this.aspect = gl.canvas.width / gl.canvas.height;
            this.projectionMatrix.SetPerspectiveMatrix(MathHelper.ToRadians(this.fieldOfView), this.aspect, this.nearClipPlane, this.farClipPlane);
        }

        

        /**
         * @private
         */
        public Awake() {
            // initialize the view matrix
            this.transform.position = new Vector3(0.0, 0.0, -10.0);
            this.transform.LookAt(new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 1.0, 0.0));
        }

        /**
         * @private
         */
        public Update() {
            /*
            var position = this.transform.position;
        
            if (Vapor.Input.GetKey(Vapor.Input.KeyCode.W))
                position[2] += 1;
            
            if (Vapor.Input.GetKey(Vapor.Input.KeyCode.S))
                position[2] -= 1;
            
                if (Vapor.Input.GetKey(Vapor.Input.KeyCode.A))
                position[0] += 1;
            
            if (Vapor.Input.GetKey(Vapor.Input.KeyCode.D))
                position[0] -= 1;
                */

            //this.transform.position = position;

            //if (Vapor.Input.touchCount == 3)
            //    alert("3 touches");

            //if (Vapor.Input.touchCount != 0)
            //    alert(Vapor.Input.touchCount + " touches");
        }

        /**
         * @private
         * Clears the depth and color buffer.
         */
        public Clear() {
            gl.clearColor(this.backgroundColor.X, this.backgroundColor.Y, this.backgroundColor.Z, this.backgroundColor.W);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        /**
         * @private
         * Resets the projection matrix based on the window size.
         */
        public OnWindowResized(event: Event) {
            this.aspect = gl.canvas.width / gl.canvas.height;
            this.projectionMatrix.SetPerspectiveMatrix(MathHelper.ToRadians(this.fieldOfView), this.aspect, this.nearClipPlane, this.farClipPlane);
        }

        public ScreenToWorld(screenPoint: Vector3, z: number = 0.0): Vector3 {
            //Vector3 screenSpace = new Vector3.copy(screenPoint);
            //screenSpace.x /= window.innerWidth;
            //screenSpace.y /= window.innerHeight;

            //screenSpace.x = screenSpace.x * 2 - 1;
            //screenSpace.y = screenSpace.y * 2 - 1;

            //screenSpace.y = -screenSpace.y;

            //Matrix4 inverseProjection = new Matrix4.identity();
            //inverseProjection.copyInverse(projectionMatrix);

            //screenSpace = inverseProjection * screenSpace;
            //screenSpace = transform.modelMatrix * screenSpace;

            var pickWorld: Vector3 = new Vector3();
            Matrix.Unproject(Matrix.Multiply(this.projectionMatrix, this.transform.modelMatrix),
                            0.0, window.innerWidth,
                            0.0, window.innerHeight,
                            screenPoint.X, screenPoint.Y, z,
                            pickWorld);

            //if (!unproject(projectionMatrix * transform.modelMatrix, 
            //               0.0, window.innerWidth,
            //               0.0, window.innerHeight,
            //               screenPoint.x, screenPoint.y, z,
            //               pickWorld))
            //console.log("Unproject failed!");

            // reverse the y value
            pickWorld[1] = -pickWorld[1];

            return pickWorld;
        }

        public WorldToScreen(worldPoint: Vector3): Vector3 {
            var screenPoint: Vector3 = Vector3.Copy(worldPoint);
            screenPoint.ApplyProjection(Matrix.Multiply(this.projectionMatrix, this.transform.modelMatrix));

            // Now:
            // (-1, 1)  (1, 1)
            // (-1, -1) (1, -1)

            // Convert to:
            // (0, 0)           (pixelWidth, 0)
            // (0, pixelHeight) (pixelWidth, pixelHeight)

            // convert from [-1,1] to [0,1]
            screenPoint.X = (screenPoint.X + 1.0) * 0.5;
            screenPoint.Y = (-screenPoint.Y + 1.0) * 0.5; //y needs to be reversed

            // convert [0,1] to [0,pixelWidth/pixelHeight]
            screenPoint.X *= window.innerWidth;
            screenPoint.Y *= window.innerHeight;

            //console.log(screenPoint.toString());

            return screenPoint;
        }
    }
}