var irc = require('irc');
var CommandRouter = require('./Core/CommandRouter');
var ServerStatus = require('./commands/ServerStatus');
var VehiclePrices = require('./commands/VehiclePrices');
var client = new irc.Client('irc.tl', 'zazutest', {
    channels: ['#zazu'],
    userName: 'zazutest',
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
var gameServerHost = 'server.ls-rp.com';
var websiteHost = 'ls-rp.com';
var forumHost = 'forum.ls-rp.com';
var gameServerStatus = new ServerStatus.ServerStatus(client, gameServerHost);
var websiteServerStatus = new ServerStatus.ServerStatus(client, websiteHost);
var forumServerStatus = new ServerStatus.ServerStatus(client, forumHost);
var vehiclePrices = new VehiclePrices.VehiclePrices(client);
var commandMaps = {
    'server': gameServerStatus,
    'site': websiteServerStatus,
    'forum': forumServerStatus,
    'price': vehiclePrices,
};
var commandRouter = new CommandRouter.CommandRouter(client, commandMaps, gameServerStatus, websiteServerStatus, forumServerStatus, vehiclePrices);
var lastCommand = -1;
client.addListener('message', function (from, to, message) {
    if (Date.now() < lastCommand + 10000)
        return;
    commandRouter.RouteCommands(from, to, message);
    lastCommand = Date.now();
});
