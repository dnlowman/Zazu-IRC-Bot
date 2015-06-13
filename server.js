var irc = require('irc');
var CommandRouter = require('./Core/CommandRouter');
var ServerStatus = require('./commands/ServerStatus');
var VehiclePrices = require('./commands/VehiclePrices');
var mongoose = require('mongoose');
var LastSeen = require('./Commands/LastSeen');
mongoose.connect('mongodb://localhost:27017');
var client = new irc.Client('irc.tl', 'zazu', {
    channels: ['#ls-rp'],
    userName: 'zazu',
    realName: 'zazu by Noble',
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
var lastSeen = new LastSeen.LastSeen(client);
var commandMaps = {
    'server': gameServerStatus,
    'site': websiteServerStatus,
    'forum': forumServerStatus,
    'price': vehiclePrices,
    'lastseen': lastSeen,
};
var commandRouter = new CommandRouter.CommandRouter(client, commandMaps, gameServerStatus, websiteServerStatus, forumServerStatus, vehiclePrices);
client.addListener('message', function (from, to, message) {
    commandRouter.RouteCommands(from, to, message);
});
console.log('Woo I\'m up and running!');
