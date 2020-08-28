const core = require('cyberway-core-service');
const BasicMain = core.services.BasicMain;

const { initTracer } = require('jaeger-client');

const env = require('./data/env');
const Connector = require('./services/Connector');
const HealthcheckService = require('./services/HealthcheckService');

const config = {
    serviceName: 'facade-service',
    sampler: {
        type: 'const',
        param: 1,
    },
    reporter: {
        logSpans: true,
    },
};

const options = {
    contextKey: 'commun-trace-id',
};

const tags = {};

class Main extends BasicMain {
    constructor() {
        super(env);

        this.tracer = initTracer(config, options);
 
        const healthcheckService = new HealthcheckService();
        const connector = new Connector({ healthcheckService, tracer: this.tracer });

        healthcheckService.setConnector(connector);

        this.addNested(connector, healthcheckService);
    }
}

module.exports = Main;
