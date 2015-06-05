import irc = require('irc');
import ping = require('ping');
import CommandRouter = require('./Core/CommandRouter');
import ServerStatus = require('./commands/ServerStatus');
import VehiclePrices = require('./commands/VehiclePrices');

var client: irc.Client = new irc.Client('irc.tl', 'zazutest',
{
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

var gameServerHost: string = 'server.ls-rp.com';
var websiteHost: string = 'ls-rp.com';
var forumHost: string = 'forum.ls-rp.com';
var gameServerStatus = new ServerStatus.ServerStatus(client, gameServerHost);
var websiteServerStatus = new ServerStatus.ServerStatus(client, websiteHost);
var forumServerStatus = new ServerStatus.ServerStatus(client, forumHost);
var vehiclePrices = new VehiclePrices.VehiclePrices(client);

var commandMaps: any =
{
    'server': gameServerStatus,
    'site': websiteServerStatus,
    'forum': forumServerStatus,
    'price': vehiclePrices,
}

var commandRouter = new CommandRouter.CommandRouter(client, commandMaps, gameServerStatus, websiteServerStatus, forumServerStatus, vehiclePrices);
var lastCommand: number = -1;

client.addListener('message', (from: string, to: string, message: string) =>
{
    if(Date.now() < lastCommand + 10000) return;
    commandRouter.RouteCommands(from, to, message);
    lastCommand = Date.now();
});
