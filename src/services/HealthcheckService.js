const core = require('cyberway-core-service');
const BasicService = core.services.Basic;
const Logger = core.utils.Logger;
const { CLIENT_STATUSES } = require('../data/constants');
const HealthcheckModel = require('../utils/HealthcheckModel');

class HealthcheckService extends BasicService {
    constructor() {
        super();

        this.clientStatusMap = new Map(); // clientName (e.g. prism) -> status (e.g. "green")
        this.lastHealthcheck = new HealthcheckModel();
    }

    async start(...args) {
        super.start(...args);
        this.startLoop(10 * 1000, 60 * 1000);
    }

    setConnector(connector) {
        this.connector = connector;
    }

    async iteration() {
        if (!this.connector) {
            return Logger.error('Connector is not set in Healthcheck Service!');
        }

        for (const clientName of this.connector._clientsMap.keys()) {
            try {
                const { status, message } = await this.connector.callService(
                    clientName,
                    'healthcheck',
                    {}
                );
                this.clientStatusMap.set(clientName, { status, message });
            } catch (error) {
                Logger.warn(`Error during getting "${clientName}" service status. Error:`, error);

                // method not found -> cannot set any status
                if (error.code === -32601) {
                    this.clientStatusMap.set(clientName, {
                        status: CLIENT_STATUSES.GREY,
                        message: null,
                    });
                } else {
                    this.clientStatusMap.set(clientName, {
                        status: CLIENT_STATUSES.RED,
                        message: error.message || 'Unknown error',
                    });
                }
            } finally {
                let hasRedStatusService = false;
                for (const { status } of this.clientStatusMap.values()) {
                    if (status === CLIENT_STATUSES.RED) {
                        hasRedStatusService = true;
                    }
                }
                const overallStatus = hasRedStatusService
                    ? CLIENT_STATUSES.YELLOW
                    : CLIENT_STATUSES.GREEN;

                const clientStatuses = [];

                for (const [key, value] of this.clientStatusMap) {
                    clientStatuses.push({ clientName: key, ...value });
                }

                this.lastHealthcheck = new HealthcheckModel({
                    lastHealthcheck: new Date(),
                    overallStatus,
                    clientStatuses,
                });
            }
        }
    }

    getStatus() {
        return this.lastHealthcheck;
    }
}

module.exports = HealthcheckService;
