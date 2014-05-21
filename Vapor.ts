/// <reference path="Game/VaporObject.ts" />

/// <reference path="Graphics/Canvas.ts" />

/// <reference path="Math/Vector3.ts" />

/**
 * The global handle to the current instance of the WebGL rendering context.
 */ 
var gl: WebGLRenderingContext;

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    console.log("OnLoad!");
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    var canvas = new Vapor.Canvas();
    canvas.Resize();
};