import irc = require('irc');
import ping = require('ping');
import CommandRouter = require('./Core/CommandRouter');
import ServerStatus = require('./commands/ServerStatus');
import VehiclePrices = require('./commands/VehiclePrices');
import mongoose = require('mongoose');
import LastSeen = require('./Commands/LastSeen');

mongoose.connect('mongodb://localhost:27017');

var client: irc.Client = new irc.Client('irc.tl', 'zazu',
{
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

var gameServerHost: string = 'server.ls-rp.com';
var websiteHost: string = 'ls-rp.com';
var forumHost: string = 'forum.ls-rp.com';
var gameServerStatus = new ServerStatus.ServerStatus(client, gameServerHost);
var websiteServerStatus = new ServerStatus.ServerStatus(client, websiteHost);
var forumServerStatus = new ServerStatus.ServerStatus(client, forumHost);
var vehiclePrices = new VehiclePrices.VehiclePrices(client);
var lastSeen = new LastSeen.LastSeen(client);

var commandMaps: any =
{
    'server': gameServerStatus,
    'site': websiteServerStatus,
    'forum': forumServerStatus,
    'price': vehiclePrices,
    'lastseen': lastSeen,
}

var commandRouter = new CommandRouter.CommandRouter(client, commandMaps, gameServerStatus, websiteServerStatus, forumServerStatus, vehiclePrices);

client.addListener('message', (from: string, to: string, message: string) =>
{
    commandRouter.RouteCommands(from, to, message);
});

console.log('Woo I\'m up and running!');
