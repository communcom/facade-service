const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Offline extends Basic {
    async handle({ auth: { user }, routing: { channelId } }) {
        try {
            await this.callService('onlineNotify', 'unsubscribe', { channelId });
        } catch (error) {
            // service offline, do nothing
        }

        try {
            await this.callService('bandwidth', 'notifyOffline', { user, channelId });
        } catch (error) {
            // service offline, do nothing
        }

        return { status: 'Ok' };
    }

    async signOut({}, auth, clientInfo) {
        return this.callService('settings', 'resetFcmToken', {}, auth, clientInfo);
    }
}

module.exports = Offline;
