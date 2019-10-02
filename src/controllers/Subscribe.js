const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Subscribe extends Basic {
    async onlineNotifyOn({ auth: { user }, routing: { channelId }, params: { app } }) {
        const data = { user, app, channelId };

        return await this.callService('onlineNotify', 'subscribe', data);
    }

    async onlineNotifyOff({ auth: { user }, routing: { channelId }, params: { app } }) {
        const data = { user, app, channelId };

        return await this.callService('onlineNotify', 'unsubscribe', data);
    }

    async pushNotifyOn({ auth: { user }, params: { app, key, profile } }) {
        const data = { user, app, key, profile };

        return await this.callService('push', 'notifyOn', data);
    }

    async pushNotifyOff({ auth: { user }, params: { app, key, profile } }) {
        const data = { user, app, key, profile };

        return await this.callService('push', 'notifyOff', data);
    }
}

module.exports = Subscribe;
