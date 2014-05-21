class List<T> {
    private data: Array<T>;

    constructor() {
        this.data = new Array<T>();
    }

    Add(item: T) {
        this.data.push(item);
    }

    Remove(item: T) {
        var index = this.data.indexOf(item);
        if (index > -1) {
            this.data.splice(index, 1);
        }
    }

    RemoveAt(index: number) {
        if (index > -1) {
            this.data.splice(index, 1);
        }
    }

    Clear() {
        this.data.length = 0;
    }

    Get(index: number): T {
        if (index > -1) {
            return this.data[index];
        }
    }

    [n: number]: T;
}