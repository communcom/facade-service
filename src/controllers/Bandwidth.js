const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Bandwidth extends Basic {
    createCallProxy(methodName) {
        return async ({ routing: { channelId }, auth: { user }, params }) => {
            return await this.callService('bandwidth', `bandwidth.${methodName}`, {
                routing: { channelId },
                auth: { user },
                params,
            });
        };
    }
}

module.exports = Bandwidth;
