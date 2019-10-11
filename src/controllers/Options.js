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

    async getFavorites({ auth: { userId } }) {
        return await this.callService('options', 'getFavorites', { userId });
    }

    async addFavorite({ auth: { userId }, params: { permlink } }) {
        return await this.callService('options', 'addFavorite', { userId, permlink });
    }

    async removeFavorite({ auth: { userId }, params: { permlink } }) {
        return await this.callService('options', 'removeFavorite', { userId, permlink });
    }

    async getBlackList({ auth: { userId: owner } }) {
        return await this.callService('notify', 'getBlackList', { owner });
    }

    async addToBlackList({ auth: { userId: owner }, params: { banned } }) {
        return await this.callService('notify', 'addToBlackList', { owner, banned });
    }

    async removeFromBlackList({ auth: { userId: owner }, params: { banned } }) {
        return await this.callService('notify', 'removeFromBlackList', { owner, banned });
    }
}

module.exports = Options;
