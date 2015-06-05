/// <reference path="../DefinitelyTyped/irc.d.ts" />
var ServerStatus = require('../commands/ServerStatus');
var VehiclePrices = require('../commands/VehiclePrices');
var CommandRouter = (function () {
    function CommandRouter(ircClient, commandMaps) {
        this.gameServerHost = 'server.ls-rp.com';
        this.websiteHost = 'ls-rp.com';
        this.forumHost = 'forum.ls-rp.com';
        this.ircClient = ircClient;
        this.gameServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.gameServerHost);
        this.websiteServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.websiteHost);
        this.forumServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.forumHost);
        this.vehiclePrices = new VehiclePrices.VehiclePrices(this.ircClient);
        this.commandMappings = commandMaps;
    }
    CommandRouter.prototype.ExtractMessage = function (message) {
        var ret = [];
        var space = message.indexOf(' ');
        if (space === -1) {
            ret.push(message.slice(1, message.length));
        }
        else {
            ret.push(message.slice(1, space));
            ret.push(message.slice(space + 1, message.length));
        }
        return ret;
    };
    CommandRouter.prototype.RouteCommands = function (from, to, message) {
        if (!this.IsCommand(message))
            return;
        var extracted = this.ExtractMessage(message);
        var command = extracted[0];
        var parameters = extracted[1] || '';
        var func = this.commandMappings[command];
        if (command in this.commandMappings)
            func.Execute(from, to, parameters);
    };
    CommandRouter.prototype.IsCommand = function (message) {
        return message[0] === '!' && message.length > 1;
    };
    return CommandRouter;
})();
exports.CommandRouter = CommandRouter;
