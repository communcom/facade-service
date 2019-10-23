const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Registration extends Basic {
    async getState({ params }) {
        return await this.callService('registration', 'getState', params);
    }

    async firstStep({ params }) {
        return await this.callService('registration', 'firstStep', params);
    }

    async verify({ params }) {
        return await this.callService('registration', 'verify', params);
    }

    async setUsername({ params }) {
        return await this.callService('registration', 'setUsername', params);
    }

    async toBlockChain({ params }) {
        return await this.callService('registration', 'toBlockChain', params);
    }

    async resendSmsCode({ params }) {
        return await this.callService('registration', 'resendSmsCode', params);
    }
}

module.exports = Registration;
