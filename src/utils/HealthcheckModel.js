const { CLIENT_STATUSES } = require('../data/constants');

class HealthcheckModel {
    constructor(
        {
            clientStatuses = [],
            overallStatus = CLIENT_STATUSES.RED,
            lastHealthcheck = new Date(),
        } = {
            clientStatuses: {},
            overallStatus: CLIENT_STATUSES.RED,
            lastHealthcheck: new Date(),
        }
    ) {
        this.clientStatuses = clientStatuses;
        this.overallStatus = overallStatus;
        this.lastHealthcheck = lastHealthcheck;
    }
}

module.exports = HealthcheckModel;
