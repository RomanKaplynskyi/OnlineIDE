"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordTemplate = exports.getPasswordResetURL = void 0;
var getPasswordResetURL = function (user, token) {
    return "http://localhost:3000/update-password/" + user.id + "/" + token;
};
exports.getPasswordResetURL = getPasswordResetURL;
var resetPasswordTemplate = function (user, url) {
    var from = process.env.EMAIL_LOGIN;
    var to = user.email;
    var subject = '🥵 URL-Minimization Password Reset 🥵';
    var html = "\n  <p>Hey " + user.email + ",</p>\n  <p>We heard that you lost your URL-Minimization password. Sorry about that!</p>\n  <p>But don\u2019t worry! You can use the following link to reset your password:</p>\n  <a href=" + url + ">" + url + "</a>\n  <p>If you don\u2019t use this link within 1 hour, it will expire.</p>\n  <p>Do something outside today! </p>\n  <p>\u2013Your friends at URL-Minimization</p>\n  ";
    return { from: from, to: to, subject: subject, html: html };
};
exports.resetPasswordTemplate = resetPasswordTemplate;
//# sourceMappingURL=resetPsw.js.map