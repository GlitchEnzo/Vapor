module Vapor {
    export class Keyboard {
        private static previousFrame: { [index: number]: boolean; } = {};
        private static currentFrame: { [index: number]: boolean; } = {};
        private static nextFrame: { [index: number]: boolean; } = {};

        public static Initialize() {
            document.onkeydown = Keyboard.KeyDown;
            document.onkeyup = Keyboard.KeyUp;
        }

        private static KeyDown(event: KeyboardEvent) {
            //console.log(event.keyCode.toString() + " was pressed.");
            Keyboard.nextFrame[event.keyCode] = true;
        }

        private static KeyUp(event: KeyboardEvent) {
            //console.log(event.keyCode.toString() + " was released.");
            Keyboard.nextFrame[event.keyCode] = false;
        }

        /**
         * @private
         * Internal method to update the keyboard frame data (only used in Vapor.Game.Scene).
         */
        public static Update() {
            Keyboard.previousFrame = JSON.parse(JSON.stringify(Keyboard.currentFrame));
            Keyboard.currentFrame = JSON.parse(JSON.stringify(Keyboard.nextFrame));
        }

        /**
         * Gets the state for the given key code.
         * Returns true for every frame that the key is down, like autofire.
         * @param {Vapor.Input.KeyCode} keyCode The key code to check.
         * @returns {boolean} True if the key is currently down, otherwise false.
         */
        public static GetKey(keyCode: number): boolean {
            return Keyboard.currentFrame[keyCode] && Keyboard.currentFrame[keyCode];
        }

        /**
         * Returns true during the frame the user pressed the given key.
         * @param {Vapor.Input.KeyCode} keyCode The key code to check.
         * @returns {boolean} True if the key was pressed this frame, otherwise false.
         */
        public static GetKeyDown(keyCode: number): boolean {
            return Keyboard.currentFrame[keyCode] && Keyboard.currentFrame[keyCode] && (!Keyboard.previousFrame[keyCode] || !Keyboard.previousFrame[keyCode]);
        }

        /**
         * Returns true during the frame the user released the given key.
         * @param {Vapor.Input.KeyCode} keyCode The key code to check.
         * @returns {boolean} True if the key was released this frame, otherwise false.
         */
        public static GetKeyUp(keyCode: number): boolean {
            return Keyboard.currentFrame[keyCode] && !Keyboard.currentFrame[keyCode] && Keyboard.previousFrame[keyCode];
        }
    }
}