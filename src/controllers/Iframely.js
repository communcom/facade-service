const fetch = require('node-fetch');
const urlValidator = require('valid-url');
const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;
const Logger = core.utils.Logger;
const env = require('../data/env');

class Iframely extends Basic {
    async getEmbed({ params: { type, url } }) {
        this._validateTypeOrThrow(type);
        this._validateUrlOrThrow(url);
        try {
            const response = await this.callService('embedsCache', 'getEmbed', { type, url });

            return this._normalizeResult(response);
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
                message: `Type ${type} is not a valid type`,
            };
        }
    }

    _validateUrlOrThrow(url) {
        const urlIsValid = urlValidator.isWebUri(url);

        if (!urlIsValid) {
            throw {
                code: 1101,
                message: `URL ${url} is not a valid URL`,
            };
        }
    }

    _normalizeResult(result) {
        if (result.type === 'photo') {
            result.type = 'image';
        }

        return result;
    }
}

module.exports = Iframely;
