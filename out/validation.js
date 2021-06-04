"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetSchema = exports.loginSchema = exports.registerSchema = void 0;
var Joi = require('joi');
exports.registerSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
});
exports.loginSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});
exports.resetSchema = Joi.object({
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
});
//# sourceMappingURL=validation.js.map