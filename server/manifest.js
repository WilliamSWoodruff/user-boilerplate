'use strict';

const Config = require('./config');

// Glue manifest
const manifest = module.exports = {

    server: {
        app: {
            config: Config
        }
    },

    connections: [
        {
            host: Config.server.host,
            port: Config.server.port,
            labels: 'api'
        }
    ],

    registrations: [
        {
            plugin: {
                register: 'schwifty',
                options: Config.schwifty
            }
        },
        {
            plugin: {
                register: 'bassmaster',
                options: {
                    batchEndpoint: '/',
                    tags: ['bassmaster', 'batch']
                }
            }
        },
        {
            plugin: './plugins/swagger'
        },
        {
            plugin: './plugins/pinger'
        },
        {
            plugin: {
                register: '../lib',
                options: Config.main
            }
        }
    ]

};

if (process.env.NODE_ENV === 'development') {
    manifest.server.debug = {
        log: ['error', 'implementation', 'internal'],
        request: ['error', 'implementation', 'internal']
    };
}
