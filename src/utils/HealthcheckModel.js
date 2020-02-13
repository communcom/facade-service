const { CLIENT_STATUSES } = require('../data/constants');

class HealthcheckModel {
    constructor(
        {
            clientStatuses = [],
            overallStatus = CLIENT_STATUSES.RED,
            lastHealthcheck = new Date(Date.now()),
        } = {
            clientStatuses: {},
            overallStatus: CLIENT_STATUSES.RED,
            lastHealthcheck: new Date(Date.now()),
        }
    ) {
        this.clientStatuses = clientStatuses;
        this.overallStatus = overallStatus;
        this.lastHealthcheck = lastHealthcheck;
    }

    get status() {
        return {
            lastHealthcheck: this.lastHealthcheck,
            overallStatus: this.overallStatus,
            clientStatuses: this.clientStatuses,
        };
    }
}

module.exports = HealthcheckModel;
