"use strict";
var Utils = require("../Utils");
var bnds = require("../Enums/Bounds");
var Stack = (function () {
    function Stack(maxSize) {
        this.DEFAULT_SIZE = Infinity;
        this._innerArray = new Array();
        if (Utils.isUndefined(maxSize)) {
            this._maxSize = this.DEFAULT_SIZE;
        }
        else {
            this._maxSize = maxSize;
        }
    }
    Object.defineProperty(Stack.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "count", {
        get: function () {
            return this._innerArray.length;
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.pop = function () {
        if (!Utils.areEqual(this.count, bnds.Bounds.Empty)) {
            return this._innerArray.pop();
        }
        return null;
    };
    Stack.prototype.add = function (item) {
        return this.push(item);
    };
    Stack.prototype.push = function (item) {
        if (this._innerArray.length < this._maxSize) {
            return this._innerArray.push(item);
        }
        return bnds.Bounds.Full;
    };
    Stack.prototype.peek = function () {
        return this._innerArray[this._innerArray.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        return Utils.areEqual(this.count, bnds.Bounds.Empty);
    };
    Stack.prototype.isFull = function () {
        return Utils.areEqual(this.count, this._maxSize);
    };
    Stack.prototype.toArray = function () {
        return this._innerArray.slice(0);
    };
    Stack.prototype.toString = function () {
        return "[" + this.toArray().toString() + "]";
    };
    return Stack;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stack;
//# sourceMappingURL=Stack.js.map