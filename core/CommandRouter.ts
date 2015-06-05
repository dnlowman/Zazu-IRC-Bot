/// <reference path="../DefinitelyTyped/irc.d.ts" />

import irc = require('irc');
import ServerStatus = require('../commands/ServerStatus');
import VehiclePrices = require('../commands/VehiclePrices');

export class CommandRouter
{
    /* Fields */
    private ircClient: irc.Client;
    private gameServerStatus: ServerStatus.ServerStatus;
    private websiteServerStatus: ServerStatus.ServerStatus;
    private forumServerStatus: ServerStatus.ServerStatus;
    private vehiclePrices: VehiclePrices.VehiclePrices;
    private commandMappings: any;

    constructor(ircClient: irc.Client, commandMaps: any, gameServerStatus: ServerStatus.ServerStatus, websiteServerStatus: ServerStatus.ServerStatus, forumServerStatus: ServerStatus.ServerStatus, vehiclePrices: VehiclePrices.VehiclePrices)
    {
        this.ircClient = ircClient;
        this.gameServerStatus = gameServerStatus;
        this.websiteServerStatus = websiteServerStatus;
        this.forumServerStatus = forumServerStatus;
        this.vehiclePrices = vehiclePrices;
        this.commandMappings = commandMaps;
    }

    public ExtractMessage(message: string): Array<string>
    {
        var ret: Array<string> = [];
        var space = message.indexOf(' ');
        if(space === -1)
        {
            ret.push(message.slice(1, message.length));
        }
        else
        {
            ret.push(message.slice(1, space));
            ret.push(message.slice(space + 1, message.length));
        }
        return ret;
    }

    public RouteCommands(from: string, to: string, message: string)
    {
        if(!this.IsCommand(message)) return;
        var extracted = this.ExtractMessage(message);
        var command = extracted[0];
        var parameters = extracted[1] || '';
        var func = this.commandMappings[command];
        if(command in this.commandMappings) func.Execute(from, to, parameters);
    }

    public IsCommand(message: String)
    {
        return message[0] === '!' && message.length > 1;
    }
}
