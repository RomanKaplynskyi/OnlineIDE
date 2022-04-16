const axios = require("axios");
const qs =require('qs');
class OidManager {
    constructor(props) {
        this.redirectUrl = props.redirectUrl
        this.providers = []
    }

    /**
     *
     * @param provider { OidProvider }
     * @constructor
     */
    RegisterProvider (provider) {
        this.providers.push(provider)
    }

    GetProviderByIndex(index) {
        if (index < 0 || index > this.providers.length) {
            return null
        }
        return this.providers[index]
    }

    GetRedirectHeaderByProvider(provider) {
        return provider.authorize_url +
            '?state=' + btoa('fakestate') + // TODO - get it from global cache
            '&scope=' + (provider.scope || 'openid') +
            (provider.nonce ? '&nonce=' + provider.nonce : '') +
            '&redirect_uri=' + this.redirectUrl +
            '&response_type=' + 'code' +
            '&client_id=' + provider.client_id +
            '&response_mode=' + (provider.response_mode || 'form_post')
    }

    async AuthUserByCode(code, provider) {
        return axios({
            method: 'post',
            url: provider.token_url,
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: provider.client_id,
                client_secret: provider.client_secret,
                redirect_uri: this.redirectUrl,
                scope: provider.scope,
                code
            })
        })
    }
}

module.exports = OidManager