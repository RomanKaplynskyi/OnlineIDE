"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ICodeExecutor_1 = require("./ICodeExecutor");
var child_process_1 = require("child_process");
var JSCodeExecutor = (function (_super) {
    __extends(JSCodeExecutor, _super);
    function JSCodeExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSCodeExecutor.prototype.Execute = function (fileName) {
        var _this = this;
        if (!fileName)
            return null;
        console.dir(fileName);
        return new Promise(function (resolve, reject) {
            var sourceRoot = _this.config ? _this.config.sourceRoot : '';
            var timeout = _this.config ? _this.config.timeout : 0;
            child_process_1.exec("cd " + sourceRoot + " && node " + fileName.path, { timeout: timeout }, function (error, stdout, stderr) {
                console.log("Error: " + error);
                console.log("Stderr: " + stderr);
                if (error || stderr) {
                    console.log("Rejected: " + stderr);
                    var errMessage = error ? error.message : '';
                    reject(errMessage || stderr);
                }
                else {
                    console.log("Resolved: " + stdout);
                    resolve(stdout);
                }
            });
        });
    };
    return JSCodeExecutor;
}(ICodeExecutor_1.AbstractCodeExecutor));
exports.default = JSCodeExecutor;
//# sourceMappingURL=JSCodeExecutor.js.map