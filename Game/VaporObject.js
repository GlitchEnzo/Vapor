var Vapor;
(function (Vapor) {
    var VaporObject = (function () {
        /**
        * Creates a new instance of a VaporObject.
        */
        function VaporObject() {
            this.name = "VaporObject";
        }
        Object.defineProperty(VaporObject.prototype, "Name", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });
        return VaporObject;
    })();
    Vapor.VaporObject = VaporObject;
})(Vapor || (Vapor = {}));
//# sourceMappingURL=VaporObject.js.map
