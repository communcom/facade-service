const core = require('cyberway-core-service');
const { Basic } = core.controllers;

class Options extends Basic {
    async get({ auth: { userId }, params: { profile } }) {
        const [basic, notify, push] = await Promise.all([
            this.callService('options', 'get', { userId, profile }),
            // TODO: Not enabled while MVP:
            // this.callService('onlineNotify', 'getOptions', { user: userId }),
            // this.callService('push', 'getOptions', { user: userId, profile }),
        ]);

        return { basic, notify, push };
    }

    async set({ auth: { userId }, params: { profile, basic, notify, push } }) {
        const promises = [];

        if (basic) {
            promises.push(this.callService('options', 'set', { userId, profile, data: basic }));
        }

        if (notify) {
            promises.push(this.callService('onlineNotify', 'setOptions', { userId, data: notify }));
        }

        if (push) {
            promises.push(this.callService('push', 'setOptions', { userId, profile, data: push }));
        }

        const errors = [];

        await Promise.all(
            promises.map(promise =>
                promise.catch(err => {
                    errors.push(err);
                })
            )
        );

        if (errors.length) {
            throw {
                code: 500,
                message: `Some options not changed - ${errors.join(', ')}`,
            };
        }
    }

    async getNotificationsSettings({ params, auth, clientInfo }) {
        return await this.callService(
            'options',
            'getNotificationsSettings',
            params,
            auth,
            clientInfo
        );
    }

    async setNotificationsSettings({ params, auth, clientInfo }) {
        return await this.callService(
            'options',
            'setNotificationsSettings',
            params,
            auth,
            clientInfo
        );
    }
    async getPushSettings({ params, auth, clientInfo }) {
        return await this.callService('options', 'getPushSettings', params, auth, clientInfo);
    }

    async setPushSettings({ params, auth, clientInfo }) {
        return await this.callService('options', 'setPushSettings', params, auth, clientInfo);
    }
}

module.exports = Options;
