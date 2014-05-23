/// <reference path="Game/Component.ts" />
/// <reference path="Game/GameObject.ts" />
/// <reference path="Game/Scene.ts" />
/// <reference path="Game/VaporObject.ts" />

/// <reference path="Graphics/Canvas.ts" />

/// <reference path="Input/Keyboard.ts" />
/// <reference path="Input/Mouse.ts" />
/// <reference path="Input/Touch.ts" />
/// <reference path="Input/TouchData.ts" />
/// <reference path="Input/TouchPhase.ts" />

/// <reference path="Math/Vector2.ts" />
/// <reference path="Math/Vector3.ts" />

/// <reference path="Utilities/ArrayExtensions.ts" />
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
};