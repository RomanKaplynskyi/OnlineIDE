"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCodeExecutor = void 0;
var BaseExecConfig_1 = __importDefault(require("../BaseExecConfig"));
var AbstractCodeExecutor = (function () {
    function AbstractCodeExecutor(config) {
        this.config = new BaseExecConfig_1.default();
        this.config = config;
    }
    AbstractCodeExecutor.prototype.Execute = function (code) {
        throw new Error('Abstract');
    };
    return AbstractCodeExecutor;
}());
exports.AbstractCodeExecutor = AbstractCodeExecutor;
//# sourceMappingURL=ICodeExecutor.js.map