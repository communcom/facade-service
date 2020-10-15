# Facade service

#### Clone the repository

```bash
git clone https://github.com/communcom/facade-service.git
cd facade-service
```

#### Create .env file

```bash
cp .env.example .env
```

Add variables

```bash
GLS_FRONTEND_GATE_CONNECT=http://fgate-node:3000
GLS_NOTIFICATION_CONNECT=http://notification-node:3000
GLS_NOTIFICATION_SENDER_CONNECT=http://notification-sender-node:3000
GLS_OPTIONS_CONNECT=http://options-node:3000
GLS_PUSH_CONNECT=http://puah-node:3000
GLS_MAIL_CONNECT=http://mail-node:3000
GLS_REGISTRATION_CONNECT=http://registration-node:3000
GLS_PRISM_CONNECT=http://prism-node:3000
GLS_PRISM_API_CONNECT=http://prism-api-node:3000
GLS_SEARCH_CONNECT=http://search-node:3000
GLS_META_CONNECT=http://meta-node:3000
GLS_IFRAMELY_CONNECT=http://iframely-node:3000
GLS_WALLET_CONNECT=http://wallet-node:3000
GLS_WALLET_WRITER_CONNECT=http://wallet-writer-node:3000
GLS_GEOIP_CONNECT=http://geoip-node:3000
GLS_COMMUNITY_SERVICE_CONNECT=http://community-node:3000
GLS_AUTH_SERVICE_CONNECT=http://auth-node:3000
```

#### Create docker-compose file

```bash
cp docker-compose.example.yml docker-compose.yml
```

#### Run

```bash
docker-compose up -d --build
```
