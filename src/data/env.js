// Описание переменных окружения смотри в Readme.
const env = process.env;

module.exports = {
    GLS_FRONTEND_GATE_CONNECT: env.GLS_FRONTEND_GATE_CONNECT,
    GLS_ONLINE_NOTIFY_CONNECT: env.GLS_ONLINE_NOTIFY_CONNECT,
    GLS_NOTIFY_CONNECT: env.GLS_NOTIFY_CONNECT,
    GLS_OPTIONS_CONNECT: env.GLS_OPTIONS_CONNECT,
    GLS_PUSH_CONNECT: env.GLS_PUSH_CONNECT,
    GLS_MAIL_CONNECT: env.GLS_MAIL_CONNECT,
    GLS_REGISTRATION_CONNECT: env.GLS_REGISTRATION_CONNECT,
    GLS_RATES_CONNECT: env.GLS_RATES_CONNECT,
    GLS_PRISM_CONNECT: env.GLS_PRISM_CONNECT,
    GLS_PRISM_API_CONNECT: env.GLS_PRISM_API_CONNECT || env.GLS_PRISM_CONNECT,
    GLS_SEARCH_CONNECT: env.GLS_SEARCH_CONNECT,
    GLS_META_CONNECT: env.GLS_META_CONNECT,
    GLS_BANDWIDTH_PROVIDER_CONNECT: env.GLS_BANDWIDTH_PROVIDER_CONNECT,
    GLS_IFRAMELY_CONNECT: env.GLS_IFRAMELY_CONNECT,
    GLS_WALLET_CONNECT: env.GLS_WALLET_CONNECT,
    GLS_STATE_READER_CONNECT: env.GLS_STATE_READER_CONNECT,
    GLS_GEOIP_CONNECT: env.GLS_GEOIP_CONNECT,
    GLS_EMBEDS_CACHE_CONNECT: env.GLS_EMBEDS_CACHE_CONNECT,
    GLS_CONFIG_CONNECT: env.GLS_CONFIG_CONNECT,
    GLS_EXCHANGE_CONNECT: env.GLS_EXCHANGE_CONNECT,
};
