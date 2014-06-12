/// <reference path="Audio/AudioManager.ts" />
/// <reference path="Audio/AudioSource.ts" />
/// <reference path="Audio/waa.ts" />

/// <reference path="Game/Component.ts" />
/// <reference path="Game/GameObject.ts" />
/// <reference path="Game/Scene.ts" />
/// <reference path="Game/VaporObject.ts" />

/// <reference path="Graphics/Camera.ts" />
/// <reference path="Graphics/Canvas.ts" />
/// <reference path="Graphics/Color.ts" />
/// <reference path="Graphics/Material.ts" />
/// <reference path="Graphics/Mesh.ts" />
/// <reference path="Graphics/MeshRenderer.ts" />
/// <reference path="Graphics/Renderer.ts" />
/// <reference path="Graphics/Shader.ts" />
/// <reference path="Graphics/ShaderType.ts" />
/// <reference path="Graphics/Texture2D.ts" />

/// <reference path="Input/Keyboard.ts" />
/// <reference path="Input/KeyCode.ts" />
/// <reference path="Input/Mouse.ts" />
/// <reference path="Input/Touch.ts" />
/// <reference path="Input/TouchData.ts" />
/// <reference path="Input/TouchPhase.ts" />

/// <reference path="Math/BoundingBox2D.ts" />
/// <reference path="Math/BoundingBox3D.ts" />
/// <reference path="Math/MathHelper.ts" />
/// <reference path="Math/Matrix.ts" />
/// <reference path="Math/Quaternion.ts" />
/// <reference path="Math/Transform.ts" />
/// <reference path="Math/Vector2.ts" />
/// <reference path="Math/Vector3.ts" />
/// <reference path="Math/Vector4.ts" />

/// <reference path="Physics/box2dweb.ts" />
/// <reference path="Physics/BoxCollider.ts" />
/// <reference path="Physics/CircleCollider.ts" />
/// <reference path="Physics/Collider.ts" />
/// <reference path="Physics/RigidBody.ts" />

/// <reference path="Utilities/ArrayExtensions.ts" />
/// <reference path="Utilities/FileDownloader.ts" />
/// <reference path="Utilities/Time.ts" />

/**
 * The global handle to the current instance of the WebGL rendering context.
 */ 
var gl: WebGLRenderingContext;

window.onload = () => {
    var audioManager = new Vapor.AudioManager();
    var audioSource = new Vapor.AudioSource.FromFile(audioManager, "Funeral.mp3", (source) => { source.Play(); });

    var scene = new Vapor.Scene();

    Vapor.Shader.FromFile("Shaders/white.glsl", (shader: Vapor.Shader) => {
        var material = new Vapor.Material(shader);

        var camera = Vapor.GameObject.CreateCamera();
        camera.transform.position = new Vapor.Vector3(0.0, 0.0, -7.0);
        camera.camera.backgroundColor = Vapor.Color.SolidBlack;
        scene.AddGameObject(camera);

        var triangle = Vapor.GameObject.CreateTriangle();
        triangle.renderer.material = material;
        //triangle.transform.position = new Vapor.Vector3(-1.5, 0.0, 7.0);
        triangle.transform.position = new Vapor.Vector3(-1.5, 0.0, 0.0);
        scene.AddGameObject(triangle);

        var paddle1 = Vapor.GameObject.CreateQuad();
        //paddle1.transform.Scale = new Vapor.Vector3(1.0, 2.0, 1.0);
        paddle1.renderer.material = material;
        paddle1.transform.position = new Vapor.Vector3(1.5, 0.0, 0.0);
        scene.AddGameObject(paddle1);
    });
};