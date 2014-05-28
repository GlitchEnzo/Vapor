/// <reference path="../Math/Transform.ts" />

module Vapor {
    /**
     * Represents the base object of everything that is in a Scene.
     * @class Represents a GameObject
     */
    export class GameObject extends VaporObject
    {
        /**
         * The list of Components attached to this GameObject.
         */
        components: Array<Component> = new Array<Component>();

        /**
         * The list of GameObjects that are children to this GameObject.
         */
        children: Array<GameObject> = new Array<GameObject>();

        /**
         * The parent that this GameObject is a child of.
         */
        parent: GameObject = null;

        /**
         * The Scene that this GameObject belongs to.
         */
        scene: Scene;

        /**
         * The Transform attached to this GameObject.
         */
        public transform: Transform;

        /**
         * The Renderer attached to this GameObject, if there is one.
         */
        renderer: Renderer;

        /**
         * The Collider attached to this GameObject, if there is one.
         */
        //collider: Collider;

        /**
         * The Box2D Body attached to this GameObject, if there is one.
         */
        //rigidbody: RigidBody;

        /**
        * The Camera attached to this GameObject, if there is one.
        */
        camera: Camera;

        constructor() {
            super("GameObject");
            this.transform = new Transform();
            this.AddComponent(this.transform);
        }

        /**
         * Adds the given Component to this GameObject.
         * @param {Vapor.Component} component The Component to add.
         */
        AddComponent(component: Component)
        {
            component.gameObject = this;
        
            if (component instanceof Camera)
            {
                this.camera = <Camera>component;
            }
            else if (component instanceof Renderer)
            {
                this.renderer = <Renderer>component;
            }
            //else if (component is Collider)
            //{
            //    this.collider = component;
            //}
            //else if (component is RigidBody)
            //{
            //    this.rigidbody = component;
            //}

            this.components.push(component);

            component.Awake();
        }

        /**
         * Called when the GameObject gets added to a Scene.
         */
        Start()
        {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].Start();
            }
        }

        /**
         * Gets the Component with the given name attached to this GameObject.
         * @param {string} name The name of the Component to get.
         * @returns {Vapor.Component} The Component, if it's found. Otherwise, null.
         */
        GetComponentByName(name: string): Component
        {
            var found = null;
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].Name == name) {
                    found = this.components[i];
                    break;
                }
            }

            return found;
        }

        /**
         * Gets the component of the given type (including child types) attached to this GameObject, if there is one.
         * @param {any} type The type of the Component to get.  This can be a parent type as well.
         */
        GetComponentByType(type: any): Component
        {
            var found = null;
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i] instanceof type) {
                    found = this.components[i];
                    break;
                }
            }

            return found;
        }

        /**
         * Adds the given GameObject as a child to this GameObject.
         * @param {Vapor.GameObject} child The GameObject child to add.
         */
        AddChild(child: GameObject)
        {
            child.parent = this;
            //child.rigidbody = this.rigidbody;
            this.children.push(child);
        }

        /**
         * @private
         */
        Update()
        {
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].Enabled) {
                    this.components[i].Update();
                }
            }
        }

        /**
         * @private
         */
        Render()
        {
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].Enabled) {
                    this.components[i].Render();
                }
            }
        }

        //OnCollision(Box2D.Contact contact)
        //{
        //    for (var i = 0; i < this.components.length; i++) {
        //        this.components[i].OnCollision(contact);
        //    }
        //}

        // ------ Static Creation Methods -------------------------------------------

        /**
         * Creates a GameObject with a Camera Behavior already attached.
         * @returns {Vapor.GameObject} A new GameObject with a Camera.
         */
        public static CreateCamera(): GameObject {
            var cameraObject = new GameObject();
            cameraObject.Name = "Camera";

            var camera = new Camera();
            cameraObject.AddComponent(camera);

            return cameraObject;
        }

        /**
         * Creates a GameObject with a triangle Mesh and a MeshRenderer Behavior already attached.
         * @returns {Vapor.GameObject} A new GameObject with a triangle Mesh.
         */
        public static CreateTriangle(): GameObject {
            var triangleObject = new GameObject();
            triangleObject.Name = "Triangle";

            var meshRenderer = new MeshRenderer();
            meshRenderer.mesh = Mesh.CreateTriangle();
            triangleObject.AddComponent(meshRenderer);

            return triangleObject;
        }

        ///**
        // * Creates a GameObject with a quad Mesh and a MeshRenderer Behavior already attached.
        // * @returns {Vapor.GameObject} A new GameObject with a quad Mesh.
        // */
        //static GameObject CreateQuad()
        //{
        //    var quadObject = new GameObject();
        //    quadObject.name = "Quad";

        //    var meshRenderer = new MeshRenderer();
        //    meshRenderer.mesh = Mesh.CreateQuad();
        //    quadObject.AddComponent(meshRenderer);

        //    return quadObject;
        //}

        ///**
        // * Creates a GameObject with a line Mesh and a MeshRenderer Behavior already attached.
        // * @returns {Vapor.GameObject} A new GameObject with a line Mesh.
        // */
        //static GameObject CreateLine(List < Vector3 > points, [double width = 0.1])
        //{
        //    var lineObject = new GameObject();
        //    lineObject.name = "Line";

        //    var meshRenderer = new MeshRenderer();
        //    meshRenderer.mesh = Mesh.CreateLine(points, width);
        //    lineObject.AddComponent(meshRenderer);

        //    return lineObject;
        //}

        ///**
        // * Creates a GameObject with a circle Mesh and a MeshRenderer Behavior already attached.
        // * @returns {Vapor.GameObject} A new GameObject with a quad Mesh.
        // */
        //static GameObject CreateCircle([double radius = 1.0, int segments = 15, double startAngle = 0.0, double angularSize = Math.PI * 2.0])
        //{
        //    var circleObject = new GameObject();
        //    circleObject.name = "Circle";

        //    var meshRenderer = new MeshRenderer();
        //    meshRenderer.mesh = Mesh.CreateCircle(radius, segments, startAngle, angularSize);
        //    circleObject.AddComponent(meshRenderer);

        //    return circleObject;
        //}
    }
}