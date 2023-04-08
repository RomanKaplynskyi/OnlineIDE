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
var axios = require("axios");
axios.interceptors.request.use(function (request) {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});
var qs = require('qs');
var OidManager = (function () {
    function OidManager(props) {
        this.redirectUrl = props.redirectUrl;
        this.providers = [];
    }
    OidManager.prototype.RegisterProvider = function (provider) {
        this.providers.push(provider);
    };
    OidManager.prototype.GetProviderByIndex = function (index) {
        if (index < 0 || index > this.providers.length) {
            return null;
        }
        return this.providers[index];
    };
    OidManager.prototype.GetRedirectHeaderByProvider = function (provider) {
        return provider.authorize_url +
            '?state=' + btoa('fakestate') +
            '&scope=' + (provider.scope || 'openid') +
            '&include_granted_scopes=true' +
            (provider.nonce ? '&nonce=' + provider.nonce : '') +
            '&redirect_uri=' + this.redirectUrl +
            '&response_type=' + 'code' +
            '&client_id=' + provider.client_id +
            '&response_mode=' + (provider.response_mode || 'form_post');
    };
    OidManager.prototype.AuthUserByCode = function (code, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios({
                                method: 'post',
                                url: provider.token_url,
                                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                data: qs.stringify({
                                    grant_type: 'authorization_code',
                                    client_id: provider.client_id,
                                    client_secret: provider.client_secret,
                                    redirect_uri: this.redirectUrl,
                                    scope: provider.scope,
                                    code: code
                                })
                            })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return OidManager;
}());
module.exports = OidManager;
//# sourceMappingURL=OidManager.js.map