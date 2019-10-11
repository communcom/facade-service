const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Subscribe extends Basic {
    async onlineNotifyOn({ auth: { user }, routing: { channelId } }) {
        const data = { user, channelId };

        return await this.callService('onlineNotify', 'subscribe', data);
    }

    async onlineNotifyOff({ auth: { user }, routing: { channelId } }) {
        const data = { user, channelId };

        return await this.callService('onlineNotify', 'unsubscribe', data);
    }

    async pushNotifyOn({ auth: { user }, params: { key, profile } }) {
        const data = { user, key, profile };

        return await this.callService('push', 'notifyOn', data);
    }

    async pushNotifyOff({ auth: { user }, params: { key, profile } }) {
        const data = { user, key, profile };

        return await this.callService('push', 'notifyOff', data);
    }
}

module.exports = Subscribe;
