/// <reference path="../DefinitelyTyped/irc.d.ts" />
var ServerStatus = require('../commands/ServerStatus');
var VehiclePrices = require('../commands/VehiclePrices');
var CommandRouter = (function () {
    function CommandRouter(ircClient) {
        this.gameServerHost = 'server.ls-rp.com';
        this.websiteHost = 'ls-rp.com';
        this.forumHost = 'forum.ls-rp.com';
        this.ircClient = ircClient;
        this.gameServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.gameServerHost);
        this.websiteServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.websiteHost);
        this.forumServerStatus = new ServerStatus.ServerStatus(this.ircClient, this.forumHost);
        this.vehiclePrices = new VehiclePrices.VehiclePrices(this.ircClient);
        this.commandMappings =
            {
                'server': this.gameServerStatus,
                'site': this.websiteServerStatus,
                'forum': this.forumServerStatus,
                'price': this.vehiclePrices,
            };
    }
    CommandRouter.prototype.ExtractCommand = function (message) {
        var ret = [];
        var space = message.indexOf(' ');
        if (space === -1) {
            ret.push(message.slice(1, message.length));
            ret.push('');
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
        var res = this.ExtractCommand(message);
        if (res[0] in this.commandMappings)
            this.commandMappings[res[0]].Execute(from, to, res[1]);
        return;
    };
    CommandRouter.prototype.IsCommand = function (message) {
        return message[0] === '!';
    };
    return CommandRouter;
})();
exports.CommandRouter = CommandRouter;
