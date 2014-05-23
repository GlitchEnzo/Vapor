interface Array<T> {
    /**
     * Adds the given item to the end of the array.
     */
    add(item: T);

    /**
     * Clears the array.
     */
    clear();

    /**
     * Creates a copy of the array.
     */
    clone(): Array<T>;

    /**
     * Removes the given item from the array.
     */
    remove(item: T);

    /**
     * Removes the item at the given index from the array.
     */
    removeAt(index: number);
}

Array.prototype.add = function (item: any) {
    this.push(item);
}

Array.prototype.clear = function () {
    this.length = 0;
}

Array.prototype.clone = function () {
    return this.slice(0);
}

Array.prototype.remove = function (item: any) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.removeAt = function (index: number) {
    if (index > -1) {
        this.splice(index, 1);
    }
}