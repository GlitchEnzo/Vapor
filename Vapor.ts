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
/// <reference path="Input/Mouse.ts" />
/// <reference path="Input/Touch.ts" />
/// <reference path="Input/TouchData.ts" />
/// <reference path="Input/TouchPhase.ts" />

/// <reference path="Math/MathHelper.ts" />
/// <reference path="Math/Matrix.ts" />
/// <reference path="Math/Quaternion.ts" />
/// <reference path="Math/Transform.ts" />
/// <reference path="Math/Vector2.ts" />
/// <reference path="Math/Vector3.ts" />
/// <reference path="Math/Vector4.ts" />

/// <reference path="Utilities/ArrayExtensions.ts" />
/// <reference path="Utilities/FileDownloader.ts" />
/// <reference path="Utilities/Time.ts" />

/**
 * The global handle to the current instance of the WebGL rendering context.
 */ 
var gl: WebGLRenderingContext;

window.onload = () => {
    //var data: Array<number> = new Array<number>();
    //data.awesome();

    //data.push(5);
    //console.log(data.length);
    //data.clear();
    //console.log(data.length);

    //var canvas = new Vapor.Canvas();
    //canvas.Resize();

    var scene = new Vapor.Scene();

    var shader = Vapor.Shader.FromFile("../Shaders/white.glsl");
    var material = new Vapor.Material(shader);

    var camera = Vapor.GameObject.CreateCamera();
    //camera.transform.position = new Vapor.Vector3(0.0, 0.0, -7.0);
    camera.transform.position = new Vapor.Vector3(0.0, 0.0, 0.0);
    //camera.camera.backgroundColor = Vapor.Color.SolidBlack;
    scene.AddGameObject(camera);

    var triangle = Vapor.GameObject.CreateTriangle();
    triangle.renderer.material = material;
    triangle.transform.position = new Vapor.Vector3(-1.5, 0.0, 7.0);
    scene.AddGameObject(triangle);

    console.log(triangle.transform.modelMatrix);

    console.log(WebGLRenderingContext.STATIC_DRAW);
    console.log(gl.STATIC_DRAW);

    /*
    var paddle1 = Vapor.GameObject.CreateQuad();
    //paddle1.transform.Scale = new Vapor.Vector3(1.0, 2.0, 1.0);
    //Paddle paddle1Comp = new Paddle();
    //paddle1.AddComponent(paddle1Comp);
    paddle1.renderer.material = material;
    //paddle1.transform.position = new Vapor.Vector3(3.5, 0.0, 0.0);
    scene.AddGameObject(paddle1);
    */

    //console.log(paddle1.transform.modelMatrix);
};