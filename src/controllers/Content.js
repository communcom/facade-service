const core = require('gls-core-service');
const Basic = core.controllers.Basic;

class Content extends Basic {
    async getComments({
        auth: { user: currentUserId },
        params: {
            sortBy,
            sequenceKey,
            limit,
            userId: requestedUserId,
            user,
            permlink,
            refBlockNum,
            type,
            contentType,
            app,
        },
    }) {
        const data = {
            sortBy,
            sequenceKey,
            limit,
            requestedUserId,
            user,
            currentUserId,
            permlink,
            refBlockNum,
            type,
            contentType,
            app,
        };

        return await this.callService('prismApi', 'getComments', data);
    }

    async getPost({
        auth: { user: currentUserId },
        params: {
            userId: requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        };

        return await this.callService('prismApi', 'getPost', data);
    }

    async getComment({
        auth: { user: currentUserId },
        params: {
            userId: requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        },
    }) {
        const data = {
            currentUserId,
            requestedUserId,
            permlink,
            refBlockNum,
            contentType,
            username,
            user,
            app,
        };

        return await this.callService('prismApi', 'getComment', data);
    }

    async getFeed({
        auth: { user: currentUserId },
        params: {
            type,
            sortBy,
            sequenceKey,
            limit,
            userId: requestedUserId,
            communityId,
            timeframe,
            tags,
            contentType,
            username,
            app,
        },
    }) {
        const data = {
            type,
            sortBy,
            sequenceKey,
            limit,
            currentUserId,
            requestedUserId,
            communityId,
            timeframe,
            tags,
            contentType,
            username,
            app,
        };

        return await this.callService('prismApi', 'getFeed', data);
    }

    async getProfile({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, type, username, user, app },
    }) {
        const data = { currentUserId, requestedUserId, type, username, user, app };

        return await this.callService('prismApi', 'getProfile', data);
    }

    async suggestNames({ params }) {
        return await this.callService('prismApi', 'suggestNames', params);
    }

    async getChargers({ params: { userId } }) {
        const data = { userId };

        return await this.callService('prismApi', 'getChargers', data);
    }

    async getHashTagTop({ params: { communityId, limit, sequenceKey } }) {
        const data = { communityId, limit, sequenceKey };

        return await this.callService('prismApi', 'getHashTagTop', data);
    }

    async getLeadersTop({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getLeadersTop', { ...params, currentUserId });
    }

    async waitForBlock({ params: { blockNum } }) {
        const data = { blockNum };

        return await this.callService('prism', 'waitForBlock', data);
    }

    async waitForTransaction({ params: { transactionId } }) {
        const data = { transactionId };

        return await this.callService('prism', 'waitForTransaction', data);
    }

    async search({ params: { where, text, field, limit, offset, type } }) {
        const data = { where, text, field, limit, offset, type };

        return await this.callService('search', 'search', data);
    }

    async getPostVotes({
        params: { userId: requestedUserId, permlink, type, sequenceKey, limit, app },
        auth,
    }) {
        const data = {
            requestedUserId,
            permlink,
            type,
            sequenceKey,
            limit,
            app,
        };

        if (auth && auth.user) {
            data.currentUserId = auth.user;
        }

        return await this.callService('prismApi', 'getPostVotes', data);
    }

    async getCommentVotes({
        params: { userId: requestedUserId, permlink, type, sequenceKey, limit, app },
        auth,
    }) {
        const data = {
            requestedUserId,
            permlink,
            type,
            sequenceKey,
            limit,
            app,
        };

        if (auth && auth.user) {
            data.currentUserId = auth.user;
        }

        return await this.callService('prismApi', 'getCommentVotes', data);
    }

    async resolveProfile({ params: { username, app } }) {
        const data = { username, app };

        return await this.callService('prismApi', 'resolveProfile', data);
    }

    async getSubscriptions({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, limit, sequenceKey, type, app },
    }) {
        const data = { currentUserId, requestedUserId, limit, sequenceKey, type, app };

        return await this.callService('prismApi', 'getSubscriptions', data);
    }

    async getSubscribers({
        auth: { user: currentUserId },
        params: { userId: requestedUserId, limit, sequenceKey, type, app },
    }) {
        const data = { currentUserId, requestedUserId, limit, sequenceKey, type, app };

        return await this.callService('prismApi', 'getSubscribers', data);
    }

    async getProposals({ params: { communityId, limit, sequenceKey, app } }) {
        const data = { communityId, limit, sequenceKey, app };

        return await this.callService('prismApi', 'getProposals', data);
    }

    async getProposal({ params }) {
        return await this.callService('prismApi', 'getProposal', params);
    }

    async getHeaders({ params }) {
        return await this.callService('prismApi', 'getHeaders', params);
    }

    async getNotifyMeta({ params }) {
        return await this.callService('prismApi', 'getNotifyMeta', params);
    }

    async getCommunitySettings({ params }) {
        return await this.callService('prismApi', 'getCommunitySettings', params);
    }
}

module.exports = Content;
