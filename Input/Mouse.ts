/// <reference path="../Math/Vector3.ts" />

module Vapor {
    export class Mouse {
        private static previousFrame: { [index: number]: boolean; } = {};
        private static currentFrame: { [index: number]: boolean; } = {};
        private static nextFrame: { [index: number]: boolean; } = {};

        private static nextMousePosition: Vector3 = new Vector3();

        private static mousePosition: Vector3 = new Vector3();
        private static deltaMousePosition: Vector3 = new Vector3();

        public static Initialize() {
            document.onmousedown = Mouse.MouseDown;
            document.onmouseup = Mouse.MouseUp;
            document.onmousemove = Mouse.MouseMove;
        }

        private static MouseDown(event: MouseEvent) {
            //console.log(event.button.toString() + " pressed");
            Mouse.nextFrame[event.button] = true;
        }

        private static MouseUp(event: MouseEvent) {
            //console.log(event.button.toString() + " released");
            Mouse.nextFrame[event.button] = false;
        }

        private static MouseMove(event: MouseEvent) {
            //console.log(event.client.toString());
            Mouse.nextMousePosition.X = event.clientX * 1.0;
            Mouse.nextMousePosition.Y = event.clientY * 1.0;

            var screenSpace: Vector3 = Vector3.Copy(Mouse.nextMousePosition);
            screenSpace.X /= window.innerWidth;
            screenSpace.Y /= window.innerHeight;

            screenSpace.X = screenSpace.X * 2 - 1;
            screenSpace.Y = screenSpace.Y * 2 - 1;

            screenSpace.Y = -screenSpace.Y;

            //console.log(screenSpace.toString());
        }

        /**
         * @private
         * Internal method to update the mouse frame data (only used in Vapor.Game.Scene).
         */
        public static Update() {
            Mouse.deltaMousePosition.X = Mouse.nextMousePosition.X - Mouse.mousePosition.X;
            Mouse.deltaMousePosition.Y = Mouse.nextMousePosition.Y - Mouse.mousePosition.Y;

            Mouse.mousePosition.X = Mouse.nextMousePosition.X;
            Mouse.mousePosition.Y = Mouse.nextMousePosition.Y;

            Mouse.previousFrame = JSON.parse(JSON.stringify(Mouse.currentFrame));
            Mouse.currentFrame = JSON.parse(JSON.stringify(Mouse.nextFrame));
        }

        /**
         * Gets the state for the given mouse button index.
         * Returns true for every frame that the button is down, like autofire.
         * @param {int} button The mouse button index to check. 0 = left, 1 = middle, 2 = right.
         * @returns {boolean} True if the button is currently down, otherwise false.
         */
        public static GetMouseButton(button: number): boolean {
            return Mouse.currentFrame[button] && Mouse.currentFrame[button];
        }

        /**
         * Returns true during the frame the user pressed the given mouse button.
         * @param {int} button The mouse button index to check. 0 = left, 1 = middle, 2 = right.
         * @returns {boolean} True if the button was pressed this frame, otherwise false.
         */
        public static GetMouseButtonDown(button: number): boolean {
            return Mouse.currentFrame[button] && Mouse.currentFrame[button] && (!Mouse.previousFrame[button] || !Mouse.previousFrame[button]);
        }

        /**
         * Returns true during the frame the user releases the given mouse button.
         * @param {int} button The mouse button index to check. 0 = left, 1 = middle, 2 = right.
         * @returns {boolean} True if the button was released this frame, otherwise false.
         */
        public static GetMouseButtonUp(button: number): boolean {
            return Mouse.currentFrame[button] && !Mouse.currentFrame[button] && Mouse.previousFrame[button];
        }
    }
}