const axios = require("axios");
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

// axios.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
// })
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
            '&include_granted_scopes=true'+
            (provider.nonce ? '&nonce=' + provider.nonce : '') +
            '&redirect_uri=' + this.redirectUrl +
            '&response_type=' + 'code' +
            '&client_id=' + provider.client_id +
            '&response_mode=' + (provider.response_mode || 'form_post')
    }

    async AuthUserByCode(code, provider) {
        try {
            return await axios({
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
        } catch (e) {
            console.error(e)
        }

    }
}

module.exports = OidManager