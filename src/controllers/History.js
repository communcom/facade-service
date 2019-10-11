const core = require('cyberway-core-service');
const Basic = core.controllers.Basic;

class History extends Basic {
    async notify({
        auth: { user },
        params: { fromId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, fromId, limit, types, markAsViewed, freshOnly };

        return await this.callService('notify', 'history', data);
    }

    async notifyFresh({ auth: { user } }) {
        return await this.callService('notify', 'historyFresh', { user });
    }

    async onlineNotify({
        auth: { user },
        params: { fromId, limit, markAsViewed = true, freshOnly },
    }) {
        const data = { user, fromId, limit, markAsViewed, freshOnly };

        return await this.callService('onlineNotify', 'history', data);
    }

    async onlineNotifyFresh({ auth: { user } }) {
        return await this.callService('onlineNotify', 'historyFresh', { user });
    }

    async push({
        auth: { user },
        params: { profile, afterId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, profile, afterId, limit, types, markAsViewed, freshOnly };

        return await this.callService('push', 'history', data);
    }

    async pushFresh({ auth: { user }, params: { profile } }) {
        const data = { user, profile };

        return await this.callService('push', 'historyFresh', data);
    }

    async markAsViewed({ auth: { user }, params: { ids } }) {
        const data = { user, ids };

        return await this.callService('notify', 'markAsViewed', data);
    }

    async markAllAsViewed({ auth: { user } }) {
        const data = { user };

        return await this.callService('notify', 'markAllAsViewed', data);
    }

    async markAsRead({ auth: { user }, params: { ids } }) {
        const data = { user, ids };

        return await this.callService('notify', 'markAsRead', data);
    }

    async markAllAsRead({ auth: { user } }) {
        const data = { user };

        return await this.callService('notify', 'markAllAsRead', data);
    }
}

module.exports = History;
