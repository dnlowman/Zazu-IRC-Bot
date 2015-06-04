var irc = require('irc');
var ping = require('ping');

var client = new irc.Client('irc.tl', 'zazu', {
    channels: ['#zazu'],
    userName: 'zazu',
    realName: 'zazu by noble',
    port: 6667,
    localAddress: null,
    debug: false,
    showErrors: false,
    autoRejoin: true,
    autoConnect: true,
    secure: false,
    selfSigned: false,
    certExpired: false,
    floodProtection: true,
    floodProtectionDelay: 1000,
    sasl: false,
    stripColors: false,
    channelPrefixes: "&#",
    messageSplit: 512,
});

var commandRouter = require('./commandRouter')(client, ping);
var lastCommand = -1;

client.addListener('message', function (from, to, message) {
    if(Date.now() < lastCommand + 10000) return;
    commandRouter.routeCommands(from, to, message);
    lastCommand = Date.now();
});
