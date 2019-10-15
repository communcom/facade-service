const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params }) {
        return await this.callService('wallet', 'getBalance', params);
    }

    async getDelegationState({ params }) {
        return await this.callService('wallet', 'getDelegationState', params);
    }

    async getTransferHistory({ params }) {
        return await this.callService('wallet', 'getTransferHistory', params);
    }

    async getTokensInfo({ params }) {
        return await this.callService('wallet', 'getTokensInfo', params);
    }

    async getClaimHistory({ params }) {
        return await this.callService('wallet', 'getClaimHistory', params);
    }

    async getValidators({ auth: { userId: currentUserId } }) {
        return await this.callService('wallet', 'getValidators', { currentUserId });
    }
}

module.exports = Wallet;
