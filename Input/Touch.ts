module Vapor {
export class TouchInput {
        private static previousFrame: Array<TouchData> = new Array<TouchData>();
        private static currentFrame: Array<TouchData> = new Array<TouchData>();
        private static nextFrame: Array<TouchData> = new Array<TouchData>();

        public static Initialize() {
            document.ontouchstart = TouchInput.TouchStart;
            document.ontouchend = TouchInput.TouchEnd;
            document.ontouchmove = TouchInput.TouchMove;
        }

        // touches: a list of all fingers currently on the screen.
        // changedTouches: a list of fingers involved in the current event. For example, in a touchend event, this will be the finger that was removed.
        // radius coordinates and rotationAngle: describe the ellipse that approximates finger shape.

        private static TouchStart(event: TouchEvent) {
            // prevent the mobile defaults (pinch zoom, etc)
            event.preventDefault();

            var changedTouches: TouchList = event.changedTouches;

            for (var i = 0; i < changedTouches.length; i++) {
                // try to find an existing touch object with the same ID
                var found: boolean = false;
                for (var j = 0; j < TouchInput.nextFrame.length; j++) {
                    if (changedTouches[i].identifier == TouchInput.nextFrame[j].fingerId) {
                        found = true;
                        break;
                    }
                }

                // if an existing touch object wasn't found, create a new one
                if (!found) {
                    var newTouch: TouchData = new TouchData();
                    newTouch.fingerId = changedTouches[i].identifier;
                    newTouch.position = new Vector3(changedTouches[i].screen.x, changedTouches[i].screen.y, 0.0);
                    //newTouch.deltaPosition = new Point(0.0, 0.0);
                    //newTouch.deltaTime = 0.0;
                    //newTouch.tapCount = 0;
                    //newTouch.phase = TouchPhase.Began;

                    //console.log("Added touch");
                    TouchInput.nextFrame.push(newTouch);
                }
            }
        }

        private static TouchEnd(event: TouchEvent) {
            //console.log("Touch End " + event.touches);

            var changedTouches: TouchList = event.changedTouches;

            for (var i = 0; i < changedTouches.length; i++) {
                var newTouch: Touch = changedTouches[i];
                for (var j = 0; j < TouchInput.nextFrame.length; j++) {
                    var oldTouch: TouchData = TouchInput.nextFrame[j];
                    if (newTouch.identifier == oldTouch.fingerId) {
                        oldTouch.deltaPosition = new Vector3(newTouch.screenX - oldTouch.position.X, newTouch.screenY - oldTouch.position.Y, 0.0);
                        oldTouch.position = new Vector3(newTouch.screenX, newTouch.screenY, 0.0);
                        oldTouch.deltaTime = Time.deltaTime;
                        oldTouch.tapCount = 0;
                        oldTouch.phase = TouchPhase.Ended;
                    }
                }
            }
        }

        private static TouchMove(event: TouchEvent) {
            //console.log("Touch Move " + event.touches);

            var changedTouches: TouchList = event.changedTouches;

            for (var i = 0; i < changedTouches.length; i++) {
                var newTouch: Touch = changedTouches[i];
                for (var j = 0; j < TouchInput.nextFrame.length; j++) {
                    var oldTouch: TouchData = TouchInput.nextFrame[j];
                    if (newTouch.identifier == oldTouch.fingerId) {
                        oldTouch.deltaPosition = new Vector3(newTouch.screenX - oldTouch.position.X, newTouch.screenY - oldTouch.position.Y, 0.0);
                        oldTouch.position = new Vector3(newTouch.screenX, newTouch.screenY, 0.0); //use client instead?
                        oldTouch.deltaTime = Time.deltaTime;
                        oldTouch.tapCount = 0;
                        oldTouch.phase = TouchPhase.Moved;
                    }
                }
            }
        }

        /**
         * @private
         * Internal method to update the mouse frame data (only used in Vapor.Game.Scene).
         */
        public static Update() {
            TouchInput.previousFrame = TouchInput.currentFrame.clone();
            TouchInput.currentFrame = TouchInput.nextFrame.clone();

            // remove the touches that have ended from the next frame
            if (TouchInput.nextFrame != null) {
                //TouchInput.nextFrame.removeWhere((touch) => touch.phase == TouchPhase.Ended);
                for (var i = TouchInput.nextFrame.length - 1; i >= 0; i--)
                {
                    if (TouchInput.nextFrame[i].phase == TouchPhase.Ended)
                    {
                        TouchInput.nextFrame.removeAt(i);
                    }
                }
            }
        }

        /**
         * Gets the touch object stored at the given index.
         * @param {int} index The index of the touch to get.
         * @returns {Vapor.Input.Touch} The touch object at the given index
         */
        public static GetTouch(index: number): TouchData {
            return TouchInput.currentFrame[index];
        }

        /**
         * Number of touches. Guaranteed not to change throughout the frame.
         */
        public static get TouchCount(): number {
            return TouchInput.currentFrame.length;
        }
    }
}


// -------------------------------------------------------------------------------------------------------------
// NOTE: TypeScript does not define any sort of Touch functionality, so we must force that functionality into it.
//       http://stackoverflow.com/questions/12869055/does-typescript-support-touchevent
// -------------------------------------------------------------------------------------------------------------

interface Touch {
    identifier: number;
    target: EventTarget;
    screenX: number;
    screenY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
};

interface TouchList {
    length: number;
    item(index: number): Touch;
    identifiedTouch(identifier: number): Touch;
};

interface TouchEvent extends UIEvent {
    touches: TouchList;
    targetTouches: TouchList;
    changedTouches: TouchList;
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    initTouchEvent(type: string, canBubble: boolean, cancelable: boolean, view: Window, detail: number, ctrlKey: boolean, altKey: boolean, shiftKey: boolean, metaKey: boolean, touches: TouchList, targetTouches: TouchList, changedTouches: TouchList);
};

declare var TouchEvent: {
    prototype: TouchEvent;
    new (): TouchEvent;
}

//
// add touch events to HTMLElement
//
interface HTMLElement extends Element, ElementCSSInlineStyle, MSEventAttachmentTarget, MSNodeExtensions {
    ontouchstart: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
}

//
// add touch events to Document
//
interface Document extends Node, NodeSelector, MSEventAttachmentTarget, DocumentEvent, MSResourceMetadata, MSNodeExtensions {
    ontouchstart: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
}