const fetch = require('node-fetch');
const urlValidator = require('valid-url');
const core = require('gls-core-service');
const Basic = core.controllers.Basic;
const Logger = core.utils.Logger;
const env = require('../data/env');

class Iframely extends Basic {
    async getEmbed({ params: { type, url } }) {
        this._validateTypeOrThrow(type);
        this._validateUrlOrThrow(url);

        const embedUrl = `${env.GLS_IFRAMELY_CONNECT}/${type}?url=${url}`;

        try {
            const response = await fetch(embedUrl);
            if (response.ok) {
                return await response.json();
            } else {
                throw {
                    code: 1102,
                    message: 'Iframely error',
                    error: await response.text(),
                };
            }
        } catch (error) {
            Logger.error('Iframely error -- ', error.stack || error);
            throw error;
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
}

module.exports = Iframely;
