const core = require('cyberway-core-service');
const BasicConnector = core.services.Connector;
const env = require('../data/env');
const Transfer = require('../controllers/Transfer');
const Offline = require('../controllers/Offline');
const Content = require('../controllers/Content');
const Meta = require('../controllers/Meta');
const Bandwidth = require('../controllers/Bandwidth');
const Wallet = require('../controllers/Wallet');
const Healthcheck = require('../controllers/Healthcheck');

class Connector extends BasicConnector {
    constructor({ healthcheckService, tracer }) {
        super();

        this._checkAuth = this._checkAuth.bind(this);

        const linking = { connector: this, tracer };

        this._transfer = new Transfer(linking);
        this._offline = new Offline(linking);
        this._content = new Content(linking);
        this._meta = new Meta(linking);
        this._bandwidth = new Bandwidth(linking);
        this._wallet = new Wallet(linking);
        this._healthcheck = new Healthcheck({ ...linking, healthcheckService });

        this._tracer = tracer;
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
        const transfer = this._transfer;
        const offline = this._offline;
        const content = this._content;
        const meta = this._meta;
        const bandwidth = this._bandwidth;
        const wallet = this._wallet;
        const healthcheck = this._healthcheck;

        await super.start({
            serverRoutes: {
                'options.get': {
                    handler: throwDeprecatedError,
                    before: [this._checkAuth],
                },
                'options.set': {
                    handler: throwDeprecatedError,
                    before: [this._checkAuth],
                },
                'settings.getUserSettings': this._proxyTo('settings', 'getUserSettings'),
                'settings.setUserSettings': this._authProxyTo('settings', 'setUserSettings'),
                'settings.getNotificationsSettings': this._authProxyTo(
                    'settings',
                    'getNotificationsSettings'
                ),
                'settings.setNotificationsSettings': this._authProxyTo(
                    'settings',
                    'setNotificationsSettings'
                ),
                'settings.getPushSettings': this._authProxyTo('settings', 'getPushSettings'),
                'settings.setPushSettings': this._authProxyTo('settings', 'setPushSettings'),

                'device.setInfo': this._authProxyTo('settings', 'setDeviceInfo'),
                'device.setFcmToken': this._authProxyTo('settings', 'setFcmToken'),
                'device.resetFcmToken': this._authProxyTo('settings', 'resetFcmToken'),

                'notifications.getNotifications': this._authProxyTo(
                    'notifications',
                    'getNotifications'
                ),
                'notifications.getStatus': this._authProxyTo('notifications', 'getStatus'),
                'notifications.markAllAsViewed': this._authProxyTo(
                    'notifications',
                    'markAllAsViewed'
                ),
                'notifications.markAsRead': this._authProxyTo('notifications', 'markAsRead'),

                'notifications.subscribe': this._authProxyTo(
                    'notificationsSender',
                    'subscribe',
                    true
                ),
                'notifications.unsubscribe': this._authProxyTo(
                    'notificationsSender',
                    'unsubscribe',
                    true
                ),

                'registration.getState': this._proxyTo('registration', 'getState'),
                'registration.firstStep': this._proxyTo('registration', 'firstStep'),
                'registration.verify': this._proxyTo('registration', 'verify'),
                'registration.firstStepEmail': this._proxyTo('registration', 'firstStepEmail'),
                'registration.verifyEmail': this._proxyTo('registration', 'verifyEmail'),
                'registration.setUsername': this._proxyTo('registration', 'setUsername'),
                'registration.toBlockChain': this._proxyTo('registration', 'toBlockChain'),
                'registration.resendSmsCode': this._proxyTo('registration', 'resendSmsCode'),
                'registration.resendEmailCode': this._proxyTo('registration', 'resendEmailCode'),
                'registration.onboardingCommunitySubscriptions': this._proxyTo(
                    'registration',
                    'onboardingCommunitySubscriptions'
                ),
                'registration.onboardingDeviceSwitched': this._proxyTo(
                    'registration',
                    'onboardingDeviceSwitched'
                ),
                'registration.onboardingSharedLink': this._proxyTo(
                    'registration',
                    'onboardingSharedLink'
                ),
                'registration.appendReferralParent': this._proxyTo(
                    'registration',
                    'appendReferralParent'
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
                'content.getVotedLeader': content.createCallProxy('getVotedLeader'),
                'content.getHashTagTop': content.createCallProxy('getHashTagTop'),
                'content.waitForBlock': content.createCallProxy('waitForBlock'),
                'content.waitForTransaction': content.createCallProxy('waitForTransaction'),
                'content.quickSearch': content.createCallProxy('quickSearch'),
                'content.extendedSearch': content.createCallProxy('extendedSearch'),
                'content.entitySearch': content.createCallProxy('entitySearch'),
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
                'content.getCommunityBlacklist': content.createCallProxy('getCommunityBlacklist'),
                'content.getReportsList': content.createCallProxy('getReportsList'),
                'content.getEntityReports': content.createCallProxy('getEntityReports'),
                'content.getBanPostProposal': content.createCallProxy('getBanPostProposal'),
                'content.getTrendingTags': content.createCallProxy('getTrendingTags'),
                'content.getReferralUsers': this._authProxyTo('registration', 'getReferralUsers'),

                'meta.getPostsViewCount': {
                    handler: meta.getPostsViewCount,
                    scope: meta,
                },
                'meta.recordPostView': {
                    handler: this._proxyTo('meta', 'recordPostView'),
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
                'wallet.getTransfer': {
                    handler: wallet.getTransfer,
                    scope: wallet,
                },
                'wallet.waitForBlock': {
                    handler: wallet.waitForBlock,
                    scope: wallet,
                },
                'wallet.waitForTransaction': {
                    handler: wallet.waitForTransaction,
                    scope: wallet,
                },
                'wallet.getBlockSubscribeStatus': {
                    handler: wallet.getBlockSubscribeStatus,
                    scope: wallet,
                },
                'wallet.getVersion': {
                    handler: wallet.getVersion,
                    scope: wallet,
                },
                'wallet.getDonations': {
                    handler: wallet.getDonations,
                    scope: wallet,
                },
                'wallet.getDonationsBulk': {
                    handler: wallet.getDonationsBulk,
                    scope: wallet,
                },
                'wallet.getPointsPrices': {
                    handler: wallet.getPointsPrices,
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

                'exchange.getCurrencies': this._exchangeProxyTo('exchange', 'getCurrencies'),
                'exchange.getCurrenciesFull': this._exchangeProxyTo(
                    'exchange',
                    'getCurrenciesFull'
                ),
                'exchange.getMinMaxAmount': this._exchangeProxyTo('exchange', 'getMinMaxAmount'),
                'exchange.getExchangeAmount': this._exchangeProxyTo(
                    'exchange',
                    'getExchangeAmount'
                ),
                'exchange.createTransaction': this._exchangeProxyTo(
                    'exchange',
                    'createTransaction'
                ),
                'exchange.getTransactions': this._exchangeProxyTo('exchange', 'getTransactions'),
                'exchange.getStatus': this._exchangeProxyTo('exchange', 'getStatus'),
                'exchange.getClient': this._exchangeProxyTo('exchange', 'getClient'),
                'exchange.createClient': this._exchangeProxyTo('exchange', 'createClient'),
                'exchange.getOrCreateClient': this._exchangeProxyTo(
                    'exchange',
                    'getOrCreateClient'
                ),
                'exchange.addCard': this._exchangeProxyTo('exchange', 'addCard'),
                'exchange.chargeCard': this._exchangeProxyTo('exchange', 'chargeCard'),
                'exchange.getRates': this._exchangeProxyTo('exchange', 'getRates'),
                'exchange.getCarbonStatus': this._exchangeProxyTo('exchange', 'getCarbonStatus'),
                'exchange.payMirCalculate': this._exchangeProxyTo('exchange', 'payMirCalculate'),
                'exchange.payMirBuyCMN': this._exchangeProxyTo('exchange', 'payMirBuyCMN'),
                'exchange.payMirSellCMN': this._exchangeProxyTo('exchange', 'payMirSellCMN'),
                'exchange.payMirGetHistory': this._exchangeProxyTo('exchange', 'payMirGetHistory'),

                'rewards.getState': this._proxyTo('rewards', 'getState'),
                'rewards.getStateBulk': this._proxyTo('rewards', 'getStateBulk'),
                'airdrop.getAirdrop': this._authProxyTo('airdrop', 'getAirdrop'),
                'community.createNewCommunity': this._authProxyTo(
                    'community',
                    'createNewCommunity'
                ),
                'community.getCommunity': this._authProxyTo('community', 'getCommunity'),
                'community.setSettings': this._authProxyTo('community', 'setSettings'),
                'community.startCommunityCreation': this._authProxyTo(
                    'community',
                    'startCommunityCreation'
                ),
                'community.getUsersCommunities': this._authProxyTo(
                    'community',
                    'getUsersCommunities'
                ),
                'community.isExists': this._authProxyTo('community', 'isExists'),
                'auth.signOut': this._authProxyTo('settings', 'resetFcmToken'),

                'auth.getPublicKeys': this._proxyTo('auth', 'auth.getPublicKeys'),
                /* service endpoints */
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
                healthcheck: {
                    handler: healthcheck.healthcheck,
                    scope: healthcheck,
                },
            },
            requiredClients: {
                frontend: env.GLS_FRONTEND_GATE_CONNECT,
                notifications: env.GLS_NOTIFICATIONS_CONNECT,
                notificationsSender: env.GLS_NOTIFICATIONS_SENDER_CONNECT,
                settings: env.GLS_SETTINGS_CONNECT,
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
                walletWriter: env.GLS_WALLET_WRITER_CONNECT,
                stateReader: env.GLS_STATE_READER_CONNECT,
                geoip: env.GLS_GEOIP_CONNECT,
                embedsCache: env.GLS_EMBEDS_CACHE_CONNECT,
                config: env.GLS_CONFIG_CONNECT,
                exchange: env.GLS_EXCHANGE_CONNECT,
                rewards: env.GLS_REWARDS_CONNECT,
                airdrop: env.GLS_AIRDROPS_CONNECT,
                community: env.GLS_COMMUNITY_SERVICE_CONNECT,
                auth: env.GLS_AUTH_SERVICE_CONNECT,
            },
        });
    }

    _proxyTo(serviceName, methodName) {
        return async ({ params, auth, clientInfo }) => {
            return await this.callService(serviceName, methodName, params, auth, clientInfo);
        };
    }

    _authProxyTo(serviceName, methodName, withRouting = false) {
        return {
            handler: async ({ params, auth, clientInfo, routing }) => {
                if (withRouting) {
                    params = {
                        ...params,
                        routing,
                    };
                }

                return await this.callService(serviceName, methodName, params, auth, clientInfo);
            },
            before: [this._checkAuth],
        };
    }

    _exchangeProxyTo(serviceName, methodName) {
        return async ({ params, auth, clientInfo, meta }) => {
            return await this.callService(serviceName, methodName, params, auth, {
                ...clientInfo,
                ip: meta.clientRequestIp,
            });
        };
    }

    async callService(serviceName, methodName, params, auth, clientInfo) {
        let childOf;
        const tags = {
            'peer.service': 'facade',
            'service.name': serviceName,
            'method.name': methodName,
            'method.params': JSON.stringify(params),
        };

        if (clientInfo) {
            if (clientInfo.carrier) {
                childOf = this._tracer.extract('text_map', clientInfo.carrier);
            }

            const { platform, clientType } = clientInfo;
            tags['client.platform'] = platform;
            tags['clien.type'] = clientType;
        }

        const facadeSpan = this._tracer.startSpan(`call_service::${serviceName}.${methodName}`, {
            childOf,
            tags,
        });

        const facadeCarrier = {};
        this._tracer.inject(facadeSpan, 'text_map', facadeCarrier);

        if (clientInfo && clientInfo.carrier) {
            clientInfo.carrier = facadeCarrier;
        }

        try {
            const result = await super.callService(
                serviceName,
                methodName,
                params,
                auth,
                clientInfo
            );

            facadeSpan.finish();

            return result;
        } catch (err) {
            facadeSpan.finish();

            throw err;
        }
    }
}

function throwDeprecatedError() {
    throw {
        code: 400,
        message: 'Method is deprecated',
    };
}

module.exports = Connector;
