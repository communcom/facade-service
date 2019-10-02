const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Rates extends Basic {
    async getActual() {
        return await this._transfer('getActual', {});
    }

    async getHistorical({ params: { date } }) {
        const data = { date };

        return await this._transfer('getHistorical', data);
    }

    async getHistoricalMulti({ params: { dates } }) {
        const data = { dates };

        return await this._transfer('getHistoricalMulti', data);
    }

    async _transfer(method, data) {
        return await this.callService('rates', method, data);
    }
}

module.exports = Rates;
