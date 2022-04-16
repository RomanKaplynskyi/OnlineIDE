class OidProvider {
    /**
     *
     * @param client_id {string} - OID Cliend ID
     * @param token_url {string} - OID token url
     * @param authorize_url {string} - OID authorize url
     * @param client_secret {string} - OID client secret
     * @param tenant_id {string} - OID tenant id
     * @param scope {string} - OID scope
     * @param name {string} - name scope
     */
    constructor({ client_id = null, token_url = null, authorize_url = null, client_secret = null, tenant_id = null, scope= null, name = '' }) {
        this.client_id = client_id
        this.token_url = token_url
        this.authorize_url = authorize_url
        this.client_secret = client_secret
        this.tenant_id = tenant_id
        this.scope = scope
        this.name = name
    }
}

module.exports = OidProvider