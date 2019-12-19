const core = require('cyberway-core-service');
const BasicConnector = core.services.Connector;
const env = require('../data/env');
const Options = require('../controllers/Options');
const Transfer = require('../controllers/Transfer');
const Offline = require('../controllers/Offline');
const Content = require('../controllers/Content');
const Meta = require('../controllers/Meta');
const Bandwidth = require('../controllers/Bandwidth');
const Wallet = require('../controllers/Wallet');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._checkAuth = this._checkAuth.bind(this);

        const linking = { connector: this };

        this._options = new Options(linking);
        this._transfer = new Transfer(linking);
        this._offline = new Offline(linking);
        this._content = new Content(linking);
        this._meta = new Meta(linking);
        this._bandwidth = new Bandwidth(linking);
        this._wallet = new Wallet(linking);
    }

    _checkAuth(params) {
        if (!params.auth || !params.auth.user) {
            throw {
                code: 1103,
                message: 'Unauthorized request: access denied',
            };
        }

        return params;
    }

    async start() {
        const options = this._options;
        const transfer = this._transfer;
        const offline = this._offline;
        const content = this._content;
        const meta = this._meta;
        const bandwidth = this._bandwidth;
        const wallet = this._wallet;

        await super.start({
            serverRoutes: {
                /* public points */
                'options.get': {
                    handler: options.get,
                    scope: options,
                    before: [this._checkAuth],
                },
                'options.set': {
                    handler: options.set,
                    scope: options,
                    before: [this._checkAuth],
                },

                'notifications.getNotifications': this._authProxyTo(
                    'notifications',
                    'getNotifications'
                ),
                'notifications.markAllAsViewed': this._authProxyTo(
                    'notifications',
                    'markAllAsViewed'
                ),
                'notifications.markAsRead': this._authProxyTo('notifications', 'markAsRead'),

                'favorites.get': {
                    handler: options.getFavorites,
                    scope: options,
                    before: [this._checkAuth],
                },
                'favorites.add': {
                    handler: options.addFavorite,
                    scope: options,
                    before: [this._checkAuth],
                },
                'favorites.remove': {
                    handler: options.removeFavorite,
                    scope: options,
                    before: [this._checkAuth],
                },
                'registration.getState': this._proxyTo('registration', 'getState'),
                'registration.firstStep': this._proxyTo('registration', 'firstStep'),
                'registration.verify': this._proxyTo('registration', 'verify'),
                'registration.setUsername': this._proxyTo('registration', 'setUsername'),
                'registration.toBlockChain': this._proxyTo('registration', 'toBlockChain'),
                'registration.resendSmsCode': this._proxyTo('registration', 'resendSmsCode'),
                'registration.onboardingCommunitySubscriptions': this._proxyTo(
                    'registration',
                    'onboardingCommunitySubscriptions'
                ),
                'registration.onboardingDeviceSwitched': ({ auth, clientInfo }) => {
                    // pass clientInfo as params
                    return this.callService(
                        'registration',
                        'onboardingDeviceSwitched',
                        {},
                        auth,
                        clientInfo
                    );
                },
                'registration.onboardingSharedLink': this._proxyTo(
                    'registration',
                    'onboardingSharedLink'
                ),

                'rates.getActual': this._proxyTo('rates', 'getActual'),
                'rates.getHistorical': this._proxyTo('rates', 'getHistorical'),
                'rates.getHistoricalMulti': this._proxyTo('rates', 'getHistoricalMulti'),

                'content.getComment': content.createCallProxy('getComment'),
                'content.getComments': content.createCallProxy('getComments'),
                'content.getPost': content.createCallProxy('getPost'),
                'content.getPosts': content.createCallProxy('getPosts'),
                'content.getProfile': content.createCallProxy('getProfile'),
                'content.suggestNames': content.createCallProxy('suggestNames'),
                'content.getChargers': content.createCallProxy('getChargers'),
                'content.getLeaders': content.createCallProxy('getLeaders'),
                'content.getLeaderCommunities': content.createCallProxy('getLeaderCommunities'),
                'content.getHashTagTop': content.createCallProxy('getHashTagTop'),
                'content.waitForBlock': content.createCallProxy('waitForBlock'),
                'content.waitForTransaction': content.createCallProxy('waitForTransaction'),
                'content.search': content.createCallProxy('search'),
                'content.getPostVotes': content.createCallProxy('getPostVotes'),
                'content.getCommentVotes': content.createCallProxy('getCommentVotes'),
                'content.resolveProfile': content.createCallProxy('resolveProfile'),
                'content.getSubscriptions': content.createCallProxy('getSubscriptions'),
                'content.getSubscribers': content.createCallProxy('getSubscribers'),
                'content.getProposals': content.createCallProxy('getProposals'),
                'content.getProposal': content.createCallProxy('getProposal'),
                'content.getHeaders': content.createCallProxy('getHeaders'),
                'content.getNotifyMeta': content.createCallProxy('getNotifyMeta'),
                'content.getCommunitySettings': content.createCallProxy('getCommunitySettings'),
                'content.getCommunity': content.createCallProxy('getCommunity'),
                'content.getCommunities': content.createCallProxy('getCommunities'),
                'content.getBlacklist': content.createCallProxy('getBlacklist'),
                'content.getReportsList': content.createCallProxy('getReportsList'),
                'content.getEntityReports': content.createCallProxy('getEntityReports'),

                'meta.getPostsViewCount': {
                    handler: meta.getPostsViewCount,
                    scope: meta,
                },
                'meta.recordPostView': {
                    handler: meta.recordPostView,
                    scope: meta,
                },
                'meta.markUserOnline': {
                    handler: meta.markUserOnline,
                    scope: meta,
                    before: [this._checkAuth],
                },
                'meta.getUserLastOnline': {
                    handler: meta.getUserLastOnline,
                    scope: meta,
                },
                'bandwidth.provide': {
                    handler: bandwidth.createCallProxy('provide'),
                    before: [this._checkAuth],
                },
                'bandwidth.createProposal': {
                    handler: bandwidth.createCallProxy('createProposal'),
                    before: [this._checkAuth],
                },
                'bandwidth.getProposals': {
                    handler: bandwidth.createCallProxy('getProposals'),
                    before: [this._checkAuth],
                },
                'bandwidth.signAndExecuteProposal': {
                    handler: bandwidth.createCallProxy('signAndExecuteProposal'),
                    before: [this._checkAuth],
                },
                'wallet.getBalance': {
                    handler: wallet.getBalance,
                    scope: wallet,
                },
                'wallet.getTransferHistory': {
                    handler: wallet.getTransferHistory,
                    scope: wallet,
                },
                'wallet.getClaimHistory': {
                    handler: wallet.getClaimHistory,
                    scope: wallet,
                },
                'wallet.getSellPrice': {
                    handler: wallet.getSellPrice,
                    scope: wallet,
                },
                'wallet.getBuyPrice': {
                    handler: wallet.getBuyPrice,
                    scope: wallet,
                },
                'wallet.getPointInfo': {
                    handler: wallet.getPointInfo,
                    scope: wallet,
                },

                'frame.getEmbed': this._proxyTo('embedsCache', 'getEmbed'),

                'stateReader.getDelegations': this._proxyTo('stateReader', 'getDelegations'),
                'stateReader.getValidators': this._proxyTo('stateReader', 'getValidators'),
                'stateReader.getLeaders': this._proxyTo('stateReader', 'getLeaders'),
                'stateReader.getNameBids': this._proxyTo('stateReader', 'getNameBids'),
                'stateReader.getLastClosedBid': this._proxyTo('stateReader', 'getLastClosedBid'),

                'geoip.lookup': ({ meta }) =>
                    this.callService('geoip', 'lookup', { ip: meta.clientRequestIp }),

                'config.getConfig': ({ auth, clientInfo }) =>
                    // pass clientInfo as params
                    this.callService('config', 'getConfig', clientInfo, auth),

                /* service points */
                offline: {
                    handler: offline.handle,
                    scope: offline,
                    before: [this._checkAuth],
                },

                /* inner services only points */
                transfer: {
                    handler: transfer.handle,
                    scope: transfer,
                },
            },
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                onlineNotify: env.GLS_ONLINE_NOTIFY_CONNECT,
                notifications: env.GLS_NOTIFICATIONS_CONNECT,
                options: env.GLS_OPTIONS_CONNECT,
                push: env.GLS_PUSH_CONNECT,
                mail: env.GLS_MAIL_CONNECT,
                registration: env.GLS_REGISTRATION_CONNECT,
                rates: env.GLS_RATES_CONNECT,
                prism: env.GLS_PRISM_CONNECT,
                prismApi: env.GLS_PRISM_API_CONNECT,
                search: env.GLS_SEARCH_CONNECT,
                meta: env.GLS_META_CONNECT,
                bandwidth: env.GLS_BANDWIDTH_PROVIDER_CONNECT,
                wallet: env.GLS_WALLET_CONNECT,
                stateReader: env.GLS_STATE_READER_CONNECT,
                geoip: env.GLS_GEOIP_CONNECT,
                embedsCache: env.GLS_EMBEDS_CACHE_CONNECT,
                config: env.GLS_CONFIG_CONNECT,
            },
        });
    }

    _proxyTo(serviceName, methodName) {
        return async ({ params, auth, clientInfo }) => {
            return await this.callService(serviceName, methodName, params, auth, clientInfo);
        };
    }

    _authProxyTo(serviceName, methodName) {
        return {
            handler: async ({ params, auth, clientInfo }) => {
                return await this.callService(serviceName, methodName, params, auth, clientInfo);
            },
            before: [this._checkAuth],
        };
    }
}

module.exports = Connector;
