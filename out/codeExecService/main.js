"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var cors_1 = __importDefault(require("@koa/cors"));
var CodeHandler_1 = __importDefault(require("./CodeHandler"));
var app = new koa_1.default();
var router = new koa_router_1.default();
var PORT = process.env.PORT || 3099;
var OidManager = require('./models/OidManager');
var OidProvider = require('./models/OidProvider');
var oidManager = new OidManager({ redirectUrl: "http://localhost:3099/login_code" });
var UserModel = require('./models/users');
var TokensDB = require('./models/tokens');
var TgUser = require('../../models/tgAuthBot/db/dto/tgUser');
var sequelize = require('./db');
var bcrypt = require('bcrypt');
var jwtKoa = require('koa-jwt');
var koaBody = require('koa-body');
var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4');
var bot = require('../../models/tgAuthBot/bot');
var CodeHandler = new CodeHandler_1.default();
var providerIndex = 1;
var user = {
    login: null,
    fullName: null,
    id: null
};
var sessionTime = 5;
var secretJWT = process.env.JWT_SECRET || 'jwt_secret_key';
oidManager.RegisterProvider(new OidProvider({
    tenant_id: 'e85368ce-b733-4d62-9fbb-856330c351fe',
    client_id: '77b1ea08-b5d7-4ee7-a5b1-4bc397d091ac',
    client_secret: 'wIQ7Q~fHxwyJW~67EFfuPGk4t9EQFPr_DDfw6',
    token_url: 'https://login.microsoftonline.com/e85368ce-b733-4d62-9fbb-856330c351fe/oauth2/v2.0/token',
    authorize_url: 'https://login.microsoftonline.com/e85368ce-b733-4d62-9fbb-856330c351fe/oauth2/v2.0/authorize',
    scope: 'openid',
    name: 'Azure'
}));
oidManager.RegisterProvider(new OidProvider({
    client_id: '1859055940-emivjbkel8kod0mek6brp6p6hnf8g5sk.apps.googleusercontent.com',
    client_secret: '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',
    token_url: 'https://oauth2.googleapis.com/token',
    authorize_url: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'profile',
    name: 'Google'
}));
app.use(koa_bodyparser_1.default());
app.use(cors_1.default({
    credentials: true
}));
app.use(router.routes());
router.use(jwtKoa({
    secret: secretJWT
}).unless({ path: [/^\/public|^\/login|^\/tryToConfirmCode|^\//] }));
router.post('/runCode', jwtKoa({ secret: secretJWT, cookie: 'token' }), function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, msg, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, next()];
            case 1:
                _a.sent();
                console.log(ctx);
                data = ctx.request.body;
                if (!data) return [3, 5];
                console.log(data);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, CodeHandler.Handle(data).catch(function (res) { return res; })];
            case 3:
                msg = _a.sent();
                console.log(msg);
                ctx.body = { msg: msg };
                return [3, 5];
            case 4:
                e_1 = _a.sent();
                ctx.body = { msg: 'error' };
                return [3, 5];
            case 5: return [2];
        }
    });
}); });
router.get('/wee', jwtKoa({ secret: secretJWT, cookie: 'token' }), function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = { msg: 'Hello[[[ world' };
        return [2];
    });
}); });
router.get('/isAuthenticated', jwtKoa({ secret: secretJWT, cookie: 'token' }), function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 200;
        ctx.body = 'ok';
        return [2];
    });
}); });
router.post('/logIn', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, userData, isLogSuccessful, userLogData, tgUser, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, next()];
            case 1:
                _a.sent();
                data = ctx.request.body;
                if (!data) return [3, 12];
                console.log(data);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 11, , 12]);
                return [4, UserModel.findOne({ where: { login: data.login } })];
            case 3:
                userData = _a.sent();
                console.log(userData);
                if (!userData) return [3, 9];
                user.login = userData.login;
                user.id = userData.id;
                return [4, bcrypt.compare(data.password, userData.password)];
            case 4:
                isLogSuccessful = _a.sent();
                console.log(isLogSuccessful);
                ctx.body = { res: isLogSuccessful };
                if (!isLogSuccessful) return [3, 8];
                return [4, generateToken(userData)];
            case 5:
                userLogData = _a.sent();
                return [4, TgUser.findOne({ where: { userID: user.id } })];
            case 6:
                tgUser = _a.sent();
                return [4, bot.sendMessage(tgUser.chatID, "ConfirmationCode to log in: " + userLogData.token)];
            case 7:
                _a.sent();
                ctx.body = { res: true, userID: userData.id };
                _a.label = 8;
            case 8: return [3, 10];
            case 9:
                ctx.body = { res: false };
                _a.label = 10;
            case 10: return [3, 12];
            case 11:
                e_2 = _a.sent();
                ctx.body = { msg: 'error' };
                return [3, 12];
            case 12: return [2];
        }
    });
}); });
router.post('/tryToConfirmCode', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, userTokenData, userData, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, next()];
            case 1:
                _a.sent();
                data = ctx.request.body;
                if (!data) return [3, 8];
                console.log(data);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4, TokensDB.findOne({ where: { userID: data.userID, token: data.confirmCode } })];
            case 3:
                userTokenData = _a.sent();
                console.log(userTokenData);
                if (!userTokenData) return [3, 5];
                return [4, UserModel.findOne({ where: { id: userTokenData.userID } })];
            case 4:
                userData = _a.sent();
                ctx.cookies.set('token', jwt.sign({ id: userData.id, userName: userData.fullName }, secretJWT), {
                    sameSite: 'lax',
                    httpOnly: true,
                    secure: false,
                    maxAge: 99999999
                });
                ctx.body = { res: true };
                return [3, 6];
            case 5:
                ctx.body = { res: false };
                _a.label = 6;
            case 6: return [3, 8];
            case 7:
                e_3 = _a.sent();
                ctx.body = { msg: 'error' };
                return [3, 8];
            case 8: return [2];
        }
    });
}); });
function generateToken(userData) {
    return __awaiter(this, void 0, void 0, function () {
        var date, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    date.setMinutes(date.getMinutes() + sessionTime);
                    return [4, TokensDB.create({
                            userID: userData.id,
                            token: (Math.random() + 1).toString(36).substring(2),
                            expirationDate: date
                        })];
                case 1:
                    res = _a.sent();
                    return [2, res];
            }
        });
    });
}
function issueTokenPair(userData) {
    return __awaiter(this, void 0, void 0, function () {
        var newRefreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newRefreshToken = uuid();
                    return [4, TokensDB.create({
                            userID: userData.id,
                            token: newRefreshToken,
                        })];
                case 1:
                    _a.sent();
                    return [2, {
                            token: jwt.sign({ id: userData.id, userName: userData.fullName }, secretJWT),
                            refreshToken: newRefreshToken,
                        }];
            }
        });
    });
}
router.post('/confirmCode', koa_bodyparser_1.default(), function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, userData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, next()];
            case 1:
                _c.sent();
                data = ctx.request.body;
                if (!data) return [3, 6];
                console.log(data);
                console.log(ctx);
                return [4, UserModel.findOne({ where: { id: user.id } })];
            case 2:
                userData = _c.sent();
                console.log(userData);
                _a = !userData;
                if (_a) return [3, 4];
                return [4, bcrypt.compare(data.confirmCode, userData.confirmCode)];
            case 3:
                _a = !(_c.sent());
                _c.label = 4;
            case 4:
                if (_a) {
                    ctx.status = 403;
                    ctx.body = { msg: 'Invalid user or password' };
                    return [2];
                }
                userData.password = null;
                ctx.status = 200;
                _b = ctx;
                return [4, issueTokenPair(userData)];
            case 5:
                _b.body = _c.sent();
                _c.label = 6;
            case 6: return [2];
        }
    });
}); });
router.post('/register', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var confirmCode, userData, _a, _b, e_4;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4, next()];
            case 1:
                _d.sent();
                confirmCode = (Math.random() + 1).toString(36).substring(2);
                _b = (_a = UserModel).create;
                _c = {
                    login: ctx.request.body.email
                };
                return [4, bcrypt.hash(ctx.request.body.password, 10)];
            case 2: return [4, _b.apply(_a, [(_c.password = _d.sent(),
                        _c.fullName = ctx.request.body.fullName,
                        _c.confirmCode = confirmCode,
                        _c)])];
            case 3:
                userData = _d.sent();
                _d.label = 4;
            case 4:
                _d.trys.push([4, 6, , 7]);
                console.log(userData);
                return [4, generateToken(userData)];
            case 5:
                _d.sent();
                ctx.body = { res: true, confirmCode: confirmCode };
                return [3, 7];
            case 6:
                e_4 = _d.sent();
                ctx.body = { msg: 'error' };
                return [3, 7];
            case 7:
                ctx.body = { 'redirect': "http://t.me/OnlineIDELog_bot", 'confirmCode': confirmCode };
                return [2];
        }
    });
}); });
router.post('/logout', jwtKoa({ secret: secretJWT, cookie: 'token' }), function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.cookies.set('token', '');
        ctx.body = { success: true };
        return [2];
    });
}); });
router.get('/logViaOpenID', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, next()];
            case 1:
                _a.sent();
                res = oidManager.GetRedirectHeaderByProvider(oidManager.GetProviderByIndex(providerIndex));
                console.log(res);
                ctx.redirect(res, 302);
                return [2];
        }
    });
}); });
router.post('/login_code', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, code, state, res, _b, header, data, responseResult, email, userData;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4, next()];
            case 1:
                _d.sent();
                _a = ctx.request.body, code = _a.code, state = _a.state;
                return [4, oidManager.AuthUserByCode(code, oidManager.GetProviderByIndex(providerIndex))];
            case 2:
                res = _d.sent();
                _b = (_c = res.data) === null || _c === void 0 ? void 0 : _c.id_token.split('.'), header = _b[0], data = _b[1];
                responseResult = {
                    header: atob(header),
                    data: Buffer.from(data, 'base64').toString("utf8")
                };
                console.dir(responseResult);
                email = JSON.parse(responseResult.data).email;
                return [4, UserModel.findOne({ where: { login: email } })];
            case 3:
                userData = _d.sent();
                ctx.cookies.set('token', jwt.sign({ id: userData.id, userName: userData.fullName }, secretJWT), {
                    sameSite: 'lax',
                    httpOnly: true,
                    secure: false,
                    maxAge: 99999999
                });
                ctx.response.body = { 'test': 2 };
                ctx.redirect('http://localhost:8080?ddd=212');
                return [2];
        }
    });
}); });
app.listen(PORT, function () {
    console.log('Koa started on port ' + PORT);
    try {
        sequelize.authenticate().then(function () { return console.log('Databaze connected...'); }).catch(function (err) { return console.log('Error: ' + err); });
        sequelize.sync();
    }
    catch (e) {
        console.log('Databaze connection failed');
    }
});
//# sourceMappingURL=main.js.map