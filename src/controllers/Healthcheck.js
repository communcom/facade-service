const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class Healthcheck extends Basic {
    constructor({ healthcheckService }) {
        super();
        this.healthcheckService = healthcheckService;
    }
    async healthcheck() {
        return this.healthcheckService.lastHealthcheck;
    }
}

module.exports = Healthcheck;
