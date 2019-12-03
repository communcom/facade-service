const core = require('cyberway-core-service');
const { Basic } = core.controllers;

class Content extends Basic {
    createCallProxy(methodName) {
        return async ({ auth, params, clientInfo }) => {
            let serviceName;

            switch (methodName) {
                case 'waitForBlock':
                case 'waitForTransaction':
                    serviceName = 'prism';
                    break;
                case 'search':
                    serviceName = 'search';
                    break;
                default:
                    serviceName = 'prismApi';
            }

            return await this.callService(serviceName, methodName, params, auth, clientInfo);
        };
    }
}

module.exports = Content;
