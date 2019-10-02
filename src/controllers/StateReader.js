const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class StateReader extends Basic {
    async getDelegations({ params }) {
        return await this.callService('stateReader', 'getDelegations', params);
    }

    async getValidators({ params }) {
        return await this.callService('stateReader', 'getValidators', params);
    }

    async getLeaders({ params }) {
        return await this.callService('stateReader', 'getLeaders', params);
    }

    async getNameBids({ params }) {
        return await this.callService('stateReader', 'getNameBids', params);
    }

    async getLastClosedBid({ params }) {
        return await this.callService('stateReader', 'getLastClosedBid', params);
    }
}

module.exports = StateReader;
