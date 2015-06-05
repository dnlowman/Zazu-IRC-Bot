/// <reference path="DefinitelyTyped/node.d.ts" />
/// <reference path="DefinitelyTyped/irc.d.ts" />
/// <reference path="DefinitelyTyped/ping.d.ts" />

import irc = require('irc');
import ping = require('ping');
import CommandRouter = require('./core/CommandRouter');

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

var commandMaps: any =
{
    'server': this.gameServerStatus,
    'site': this.websiteServerStatus,
    'forum': this.forumServerStatus,
    'price': this.vehiclePrices,
}

var commandRouter = new CommandRouter.CommandRouter(client, commandMaps);
var lastCommand: number = -1;

client.addListener('message', (from: string, to: string, message: string) =>
{
    if(Date.now() < lastCommand + 10000) return;
    commandRouter.RouteCommands(from, to, message);
    lastCommand = Date.now();
});
