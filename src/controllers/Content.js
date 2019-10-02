const core = require('gls-core-service');
const { Basic } = core.controllers;

class Content extends Basic {
    async getComments({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getComments', {
            ...params,
            currentUserId,
        });
    }

    async getPost({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getPost', {
            ...params,
            currentUserId,
        });
    }

    async getComment({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getComment', {
            ...params,
            currentUserId,
        });
    }

    async getPosts({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getPosts', {
            ...params,
            currentUserId,
        });
    }

    async getProfile({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getProfile', {
            ...params,
            currentUserId,
        });
    }

    async suggestNames({ params }) {
        return await this.callService('prismApi', 'suggestNames', params);
    }

    async getChargers({ params }) {
        return await this.callService('prismApi', 'getChargers', params);
    }

    async getHashTagTop({ params }) {
        return await this.callService('prismApi', 'getHashTagTop', params);
    }

    async getLeadersTop({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getLeadersTop', { ...params, currentUserId });
    }

    async waitForBlock({ params }) {
        return await this.callService('prism', 'waitForBlock', params);
    }

    async waitForTransaction({ params }) {
        return await this.callService('prism', 'waitForTransaction', params);
    }

    async search({ params }) {
        return await this.callService('search', 'search', params);
    }

    async getPostVotes({ auth: { currentUserId }, params }) {
        return await this.callService('prismApi', 'getPostVotes', {
            ...params,
            currentUserId,
        });
    }

    async getCommentVotes({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getCommentVotes', {
            ...params,
            currentUserId,
        });
    }

    async resolveProfile({ params }) {
        return await this.callService('prismApi', 'resolveProfile', params);
    }

    async getSubscriptions({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getSubscriptions', {
            ...params,
            currentUserId,
        });
    }

    async getSubscribers({ auth: { user: currentUserId }, params }) {
        return await this.callService('prismApi', 'getSubscribers', {
            ...params,
            currentUserId,
        });
    }

    async getProposals({ params }) {
        return await this.callService('prismApi', 'getProposals', params);
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
