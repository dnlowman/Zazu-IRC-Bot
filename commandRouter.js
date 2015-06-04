var serverStatus = require('./commands/server-status');
var vehiclePrices = require('./commands/vehicle-prices');

module.exports = function(ircClient, ping) {
    /* Dependencies */
    this.ircClient = ircClient;
    this.ping = ping;

    /* Fields */
    this.gameServerHost = 'server.ls-rp.com';
    this.websiteHost = 'ls-rp.com';
    this.forumHost = 'forum.ls-rp.com';
    this.gameServerStatus = new serverStatus(this.ircClient, this.ping, this.gameServerHost);
    this.websiteServerStatus = new serverStatus(this.ircClient, this.ping, this.websiteHost);
    this.forumServerStatus = new serverStatus(this.ircClient, this.ping, this.forumHost);
    this.vehiclePrices = new vehiclePrices(this.ircClient, this.ping);


    this.commandMappings = {
        'server': this.gameServerStatus,
        'site': this.websiteServerStatus,
        'forum': this.forumServerStatus,
        'price': this.vehiclePrices,
    };

    /* Methods */
    this.extractCommand = function(message) {
        var ret = [];
        var space = message.indexOf(' ');
        if(space == -1){
            ret.push(message.slice(1, message.length));
            ret.push('');
        }
        else {
            ret.push(message.slice(1, space));
            ret.push(message.slice(space + 1, message.length));
        }
        return ret;
    };

    this.routeCommands = function(from, to, message) {
        if(!this.isCommand(message)) return;
        res = this.extractCommand(message);
        if(res[0] in this.commandMappings) this.commandMappings[res[0]].execute(from, to, res[1]);
        return;
    };

    this.isCommand = function(message) {
        return message[0] === '!';
    };

    return this;
};
