var OidProvider = (function () {
    function OidProvider(_a) {
        var _b = _a.client_id, client_id = _b === void 0 ? null : _b, _c = _a.token_url, token_url = _c === void 0 ? null : _c, _d = _a.authorize_url, authorize_url = _d === void 0 ? null : _d, _e = _a.client_secret, client_secret = _e === void 0 ? null : _e, _f = _a.tenant_id, tenant_id = _f === void 0 ? null : _f, _g = _a.scope, scope = _g === void 0 ? null : _g, _h = _a.name, name = _h === void 0 ? '' : _h;
        this.client_id = client_id;
        this.token_url = token_url;
        this.authorize_url = authorize_url;
        this.client_secret = client_secret;
        this.tenant_id = tenant_id;
        this.scope = scope;
        this.name = name;
    }
    return OidProvider;
}());
module.exports = OidProvider;
//# sourceMappingURL=OidProvider.js.map