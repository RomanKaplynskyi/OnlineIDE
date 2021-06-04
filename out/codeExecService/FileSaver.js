"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSaver = exports.CodeObject = void 0;
var fs_1 = require("fs");
var CodeObject = (function () {
    function CodeObject() {
        this.name = null;
        this.file = null;
        this.children = [];
        this.isFolder = false;
        this.path = '';
        this.model = '';
    }
    return CodeObject;
}());
exports.CodeObject = CodeObject;
var FileSaver = (function () {
    function FileSaver() {
    }
    FileSaver.SaveFiles = function (files, config) {
        var saveFileHelper = function (files) {
            files.forEach(function (file) {
                if (file.isFolder) {
                    console.log(config.sourceRoot + "/" + file.path);
                    fs_1.mkdir(config.sourceRoot + "/" + file.path, { recursive: true }, function (err) {
                        if (err)
                            return console.log(err);
                        console.log(file.name + " folder was successfully written");
                        saveFileHelper(file.children);
                    });
                }
                else {
                    fs_1.writeFile(config.sourceRoot + "/" + file.path, file.model || '', function (err) {
                        if (err)
                            return console.log(err);
                        console.log(file.name + " file was successfully written");
                    });
                }
            });
        };
        saveFileHelper(files);
    };
    return FileSaver;
}());
exports.FileSaver = FileSaver;
//# sourceMappingURL=FileSaver.js.map