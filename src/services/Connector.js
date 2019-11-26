const core = require('cyberway-core-service');
const BasicConnector = core.services.Connector;
const env = require('../data/env');
const Options = require('../controllers/Options');
const Subscribe = require('../controllers/Subscribe');
const History = require('../controllers/History');
const Transfer = require('../controllers/Transfer');
const Offline = require('../controllers/Offline');
const Registration = require('../controllers/Registration');
const Content = require('../controllers/Content');
const Meta = require('../controllers/Meta');
const Bandwidth = require('../controllers/Bandwidth');
const Wallet = require('../controllers/Wallet');

class Connector extends BasicConnector {
    constructor() {
        super();

        const linking = { connector: this };

        this._options = new Options(linking);
        this._subscribe = new Subscribe(linking);
        this._history = new History(linking);
        this._transfer = new Transfer(linking);
        this._offline = new Offline(linking);
        this._registration = new Registration(linking);
        this._content = new Content(linking);
        this._meta = new Meta(linking);
        this._bandwidth = new Bandwidth(linking);
        this._wallet = new Wallet(linking);
    }

    _checkAuth(params) {
        if (params.auth && params.auth.user) {
            return params;
        }
        throw {
            code: 1103,
            message: 'Unauthorized request: access denied',
        };
    }

    async start() {
        const options = this._options;
        const subscribe = this._subscribe;
        const history = this._history;
        const transfer = this._transfer;
        const offline = this._offline;
        const registration = this._registration;
        const content = this._content;
        const meta = this._meta;
        const bandwidth = this._bandwidth;
        const wallet = this._wallet;

        const authCheck = {
            handler: this._checkAuth,
            scope: this,
        };

        await super.start({
            serverRoutes: {
                /* public points */
                'options.get': {
                    handler: options.get,
                    scope: options,
                    before: [authCheck],
                },
                'options.set': {
                    handler: options.set,
                    scope: options,
                    before: [authCheck],
                },
                'onlineNotify.on': {
                    handler: subscribe.onlineNotifyOn,
                    scope: subscribe,
                    before: [authCheck],
                },
                'onlineNotify.off': {
                    handler: subscribe.onlineNotifyOff,
                    scope: subscribe,
                    before: [authCheck],
                },
                'onlineNotify.history': {
                    handler: history.onlineNotify,
                    scope: history,
                    before: [authCheck],
                },
                'onlineNotify.historyFresh': {
                    handler: history.onlineNotifyFresh,
                    scope: history,
                    before: [authCheck],
                },
                'push.notifyOn': {
                    handler: subscribe.pushNotifyOn,
                    scope: subscribe,
                    before: [authCheck],
                },
                'push.notifyOff': {
                    handler: subscribe.pushNotifyOff,
                    scope: subscribe,
                    before: [authCheck],
                },
                'push.history': {
                    handler: history.push,
                    scope: history,
                    before: [authCheck],
                },
                'push.historyFresh': {
                    handler: history.pushFresh,
                    scope: history,
                    before: [authCheck],
                },
                'notify.getHistory': {
                    handler: history.notify,
                    scope: history,
                    before: [authCheck],
                },
                'notify.getHistoryFresh': {
                    handler: history.notifyFresh,
                    scope: history,
                    before: [authCheck],
                },
                'notify.markAsViewed': {
                    handler: history.markAsViewed,
                    scope: history,
                    before: [authCheck],
                },
                'notify.markAllAsViewed': {
                    handler: history.markAllAsViewed,
                    scope: history,
                    before: [authCheck],
                },
                'notify.markAsRead': {
                    handler: history.markAsRead,
                    scope: history,
                    before: [authCheck],
                },
                'notify.markAllAsRead': {
                    handler: history.markAllAsRead,
                    scope: history,
                    before: [authCheck],
                },
                'notify.getBlackList': {
                    handler: options.getBlackList,
                    scope: options,
                    before: [authCheck],
                },
                'notify.addToBlackList': {
                    handler: options.addToBlackList,
                    scope: options,
                    before: [authCheck],
                },
                'notify.removeFromBlackList': {
                    handler: options.removeFromBlackList,
                    scope: options,
                    before: [authCheck],
                },
                'favorites.get': {
                    handler: options.getFavorites,
                    scope: options,
                    before: [authCheck],
                },
                'favorites.add': {
                    handler: options.addFavorite,
                    scope: options,
                    before: [authCheck],
                },
                'favorites.remove': {
                    handler: options.removeFavorite,
                    scope: options,
                    before: [authCheck],
                },
                'registration.getState': this._proxyTo('registration', 'getState'),
                'registration.firstStep': this._proxyTo('registration', 'firstStep'),
                'registration.verify': this._proxyTo('registration', 'verify'),
                'registration.setUsername': this._proxyTo('registration', 'setUsername'),
                'registration.toBlockChain': this._proxyTo('registration', 'toBlockChain'),
                'registration.resendSmsCode':this._proxyTo('registration', 'resendSmsCode'),
                'registration.onboardingCommunitySubscription': this._proxyTo('registration', 'onboardingCommunitySubscription'),
                'registration.onboardingDeviceSwitched': this._proxyTo('registration', 'onboardingDeviceSwitched'),
                'registration.onboardingSharedLink': this._proxyTo('registration', 'onboardingSharedLink'),

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
                    before: [authCheck],
                },
                'meta.getUserLastOnline': {
                    handler: meta.getUserLastOnline,
                    scope: meta,
                },
                'bandwidth.provide': {
                    handler: bandwidth.createCallProxy('provide'),
                    before: [authCheck],
                },
                'bandwidth.createProposal': {
                    handler: bandwidth.createCallProxy('createProposal'),
                    before: [authCheck],
                },
                'bandwidth.getProposals': {
                    handler: bandwidth.createCallProxy('getProposals'),
                    before: [authCheck],
                },
                'bandwidth.signAndExecuteProposal': {
                    handler: bandwidth.createCallProxy('signAndExecuteProposal'),
                    before: [authCheck],
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

                'frame.getEmbed': this._proxyTo('embedsCache', 'getEmbed'),

                'stateReader.getDelegations': this._proxyTo('stateReader', 'getDelegations'),
                'stateReader.getValidators': this._proxyTo('stateReader', 'getValidators'),
                'stateReader.getLeaders': this._proxyTo('stateReader', 'getLeaders'),
                'stateReader.getNameBids': this._proxyTo('stateReader', 'getNameBids'),
                'stateReader.getLastClosedBid': this._proxyTo('stateReader', 'getLastClosedBid'),

                'geoip.lookup': ({ meta }) =>
                    this.callService('geoip', 'lookup', { ip: meta.clientRequestIp }),

                'config.getConfig': this._proxyTo('config', 'getConfig'),

                /* service points */
                offline: {
                    handler: offline.handle,
                    scope: offline,
                    before: [authCheck],
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
                notify: env.GLS_NOTIFY_CONNECT,
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
}

module.exports = Connector;
