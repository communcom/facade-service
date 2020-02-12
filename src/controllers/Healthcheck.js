const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;
const HealthcheckModel = require('../utils/HealthcheckModel');

class Healthcheck extends Basic {
    constructor({ healthCheckService }) {
        super();
        this.healthcheckService = healthCheckService;
    }
    async healthcheck() {
        return this.healthcheckService.status || new HealthcheckModel();
    }
}

module.exports = Healthcheck;
