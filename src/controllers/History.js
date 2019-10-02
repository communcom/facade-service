const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class History extends Basic {
    async notify({
        auth: { user },
        params: { app, fromId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, app, fromId, limit, types, markAsViewed, freshOnly };

        return await this.callService('notify', 'history', data);
    }

    async notifyFresh({ auth: { user }, params: { app } }) {
        return await this.callService('notify', 'historyFresh', { user, app });
    }

    async onlineNotify({
        auth: { user },
        params: { app, fromId, limit, markAsViewed = true, freshOnly },
    }) {
        const data = { user, app, fromId, limit, markAsViewed, freshOnly };

        return await this.callService('onlineNotify', 'history', data);
    }

    async onlineNotifyFresh({ auth: { user }, params: { app } }) {
        return await this.callService('onlineNotify', 'historyFresh', { user, app });
    }

    async push({
        auth: { user },
        params: { app, profile, afterId, limit, types, markAsViewed = true, freshOnly },
    }) {
        const data = { user, app, profile, afterId, limit, types, markAsViewed, freshOnly };

        return await this.callService('push', 'history', data);
    }

    async pushFresh({ auth: { user }, params: { app, profile } }) {
        const data = { user, app, profile };

        return await this.callService('push', 'historyFresh', data);
    }

    async markAsViewed({ auth: { user }, params: { app, ids } }) {
        const data = { user, app, ids };

        return await this.callService('notify', 'markAsViewed', data);
    }

    async markAllAsViewed({ auth: { user }, params: { app } }) {
        const data = { user, app };

        return await this.callService('notify', 'markAllAsViewed', data);
    }

    async markAsRead({ auth: { user }, params: { app, ids } }) {
        const data = { user, app, ids };

        return await this.callService('notify', 'markAsRead', data);
    }

    async markAllAsRead({ auth: { user }, params: { app } }) {
        const data = { user, app };

        return await this.callService('notify', 'markAllAsRead', data);
    }
}

module.exports = History;
