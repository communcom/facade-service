const core = require('cyberway-core-service');
const BasicMain = core.services.BasicMain;
const env = require('./data/env');
const Connector = require('./services/Connector');
const HealthcheckService = require('./services/HealthcheckService');

class Main extends BasicMain {
    constructor() {
        super(env);
        const healthcheckService = new HealthcheckService();
        const connector = new Connector({ healthcheckService });

        healthcheckService.setConnector(connector);

        this.addNested(connector, healthcheckService);
    }
}

module.exports = Main;
