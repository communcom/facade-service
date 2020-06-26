const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Wallet extends Basic {
    async getBalance({ params }) {
        return await this.callService('wallet', 'getBalance', params);
    }

    async getTransferHistory({ params }) {
        return await this.callService('wallet', 'getTransferHistory', params);
    }

    async getClaimHistory({ params }) {
        return await this.callService('wallet', 'getClaimHistory', params);
    }

    async getSellPrice({ params }) {
        return await this.callService('wallet', 'getSellPrice', params);
    }

    async getBuyPrice({ params }) {
        return await this.callService('wallet', 'getBuyPrice', params);
    }

    async getPointInfo({ params }) {
        return await this.callService('wallet', 'getPointInfo', params);
    }

    async getTransfer({ params }) {
        return await this.callService('wallet', 'getTransfer', params);
    }

    async waitForBlock({ params }) {
        return await this.callService('walletWriter', 'waitForBlock', params);
    }

    async waitForTransaction({ params }) {
        return await this.callService('walletWriter', 'waitForTransaction', params);
    }

    async getBlockSubscribeStatus({ params }) {
        return await this.callService('wallet', 'getBlockSubscribeStatus', params);
    }

    async getVersion({ params }) {
        return await this.callService('wallet', 'getVersion', params);
    }

    async getDonations({ params }) {
        return await this.callService('wallet', 'getDonations', params);
    }

    async getDonationsBulk({ params }) {
        return await this.callService('wallet', 'getDonationsBulk', params);
    }

    async getPointsPrices({ params }) {
        return await this.callService('wallet', 'getPointsPrices', params);
    }
}

module.exports = Wallet;
