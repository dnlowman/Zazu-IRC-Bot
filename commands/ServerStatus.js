var ping = require('ping');
var ServerStatus = (function () {
    function ServerStatus(ircClient, host) {
        this.ircClient = ircClient;
        this.host = host;
    }
    ServerStatus.prototype.BuildIrcMessage = function (serverStatus, from) {
        return 'Hi der ' + from + ((serverStatus) ? ' ' + this.host + ' looks up from here!' : ' ' + this.host + ' looks down from here!');
    };
    ServerStatus.prototype.Execute = function (from, to, message) {
        var _this = this;
        ping.sys.probe(this.host, function (isAlive) { return _this.ircClient.say(to, _this.BuildIrcMessage(isAlive, from)); });
    };
    return ServerStatus;
})();
exports.ServerStatus = ServerStatus;
