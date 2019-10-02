const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Meta extends Basic {
    async recordPostView({ meta: { clientRequestIp }, params: { postLink, fingerPrint } }) {
        return await this.callService('meta', 'recordPostView', {
            postLink,
            fingerPrint,
            clientRequestIp,
        });
    }

    async getPostsViewCount({ params: { postLinks } }) {
        return await this.callService('meta', 'getPostsViewCount', { postLinks });
    }

    async markUserOnline({ auth: { user } }) {
        return await this.callService('meta', 'markUserOnline', { user });
    }

    async getUserLastOnline({ params: { user } }) {
        return await this.callService('meta', 'getUserLastOnline', { user });
    }
}

module.exports = Meta;
