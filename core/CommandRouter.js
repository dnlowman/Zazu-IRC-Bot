var CommandRouter = (function () {
    function CommandRouter(ircClient, commandMaps, gameServerStatus, websiteServerStatus, forumServerStatus, vehiclePrices) {
        this.ircClient = ircClient;
        this.gameServerStatus = gameServerStatus;
        this.websiteServerStatus = websiteServerStatus;
        this.forumServerStatus = forumServerStatus;
        this.vehiclePrices = vehiclePrices;
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
