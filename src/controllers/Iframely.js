const urlValidator = require('valid-url');
const core = require('cyberway-core-service');
const { Basic } = core.controllers;
const { Logger } = core.utils;

class Iframely extends Basic {
    async getEmbed({ params: { type, url } }) {
        this._validateTypeOrThrow(type);
        this._validateUrlOrThrow(url);

        try {
            return await this.callService('embedsCache', 'getEmbed', { type, url });
        } catch (err) {
            Logger.error('Iframely error:', err);
            throw err;
        }
    }

    _validateTypeOrThrow(type) {
        const typeIsValid = ['oembed', 'iframely'].includes(type);

        if (!typeIsValid) {
            throw {
                code: 1101,
                message: `Type "${type}" is not valid`,
            };
        }
    }

    _validateUrlOrThrow(url) {
        const urlIsValid = urlValidator.isWebUri(url);

        if (!urlIsValid) {
            throw {
                code: 1101,
                message: 'URL is not valid',
            };
        }
    }
}

module.exports = Iframely;
