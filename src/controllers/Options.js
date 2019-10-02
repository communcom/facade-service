const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Options extends Basic {
    async get({ auth: { user }, params: { app, profile } }) {
        const basic = await this._tryGetOptionsBy({
            service: 'options',
            method: 'get',
            errorPrefix: 'Basic',
            data: { user, app, profile },
        });

        const notify = await this._tryGetOptionsBy({
            service: 'onlineNotify',
            method: 'getOptions',
            errorPrefix: 'Notify',
            data: { user, app },
        });

        const push = await this._tryGetOptionsBy({
            service: 'push',
            method: 'getOptions',
            errorPrefix: 'Push',
            data: { user, app, profile },
        });

        return { basic, notify, push };
    }

    async set({ auth: { user }, params: { app, profile, basic, notify, push } }) {
        const errors = [];
        const trySetOptionsBy = this._makeOptionsSetter({ user, app, errors });

        if (basic) {
            await trySetOptionsBy({
                data: basic,
                service: 'options',
                method: 'set',
                errorPrefix: 'Basic',
                params: {
                    profile,
                },
            });
        }

        if (notify) {
            await trySetOptionsBy({
                data: notify,
                service: 'onlineNotify',
                method: 'setOptions',
                errorPrefix: 'Notify',
            });
        }

        if (push) {
            await trySetOptionsBy({
                data: push,
                service: 'push',
                method: 'setOptions',
                errorPrefix: 'Push',
                params: {
                    profile,
                },
            });
        }

        if (errors.length) {
            throw { code: 500, message: `Some options not changed - ${errors.join(' | ')}` };
        }
    }

    async getFavorites({ auth: { user }, params: { app } }) {
        const data = { user, app };

        return await this.callService('options', 'getFavorites', data);
    }

    async addFavorite({ auth: { user }, params: { app, permlink } }) {
        const data = { user, app, permlink };

        return await this.callService('options', 'addFavorite', data);
    }

    async removeFavorite({ auth: { user }, params: { app, permlink } }) {
        const data = { user, app, permlink };

        return await this.callService('options', 'removeFavorite', data);
    }

    async getBlackList({ auth: { user: owner, app } }) {
        const data = { owner, app };

        return await this.callService('notify', 'getBlackList', data);
    }

    async addToBlackList({ auth: { user: owner, app }, params: { banned } }) {
        const data = { owner, banned, app };

        return await this.callService('notify', 'addToBlackList', data);
    }

    async removeFromBlackList({ auth: { user: owner, app }, params: { banned } }) {
        const data = { owner, banned, app };

        return await this.callService('notify', 'removeFromBlackList', data);
    }

    async _tryGetOptionsBy({ service, method, errorPrefix, data }) {
        try {
            return await this.callService(service, method, data);
        } catch (error) {
            throw this._makeGetError(error, errorPrefix);
        }
    }

    _makeGetError(error, prefix) {
        return { code: error.code, message: `${prefix} -> ${error.message}` };
    }

    _makeOptionsSetter({ user, app, errors }) {
        return async ({ service, method, errorPrefix, data, params }) => {
            const { error } = await this.sendTo(service, method, { user, app, data, ...params });

            if (error) {
                errors.push(`${errorPrefix} -> ${error.message}`);
            }
        };
    }
}

module.exports = Options;
