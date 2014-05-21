interface Array<T> {
    /**
     * Test of an "extension" method.
     */
    awesome();

    /**
     * Clears the array.
     */
    clear();
}

Array.prototype.awesome = function () { console.log("Awesome!") };

Array.prototype.clear = function () { this.length = 0; }