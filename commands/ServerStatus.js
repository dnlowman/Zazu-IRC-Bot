var ping = require('ping');
var ServerStatus = (function () {
    function ServerStatus(ircClient, host) {
        this.ircClient = ircClient;
        this.host = host;
    }
    ServerStatus.prototype.Execute = function (from, to, message) {
        var _this = this;
        ping.sys.probe(this.host, function (isAlive) {
            _this.ircClient.say(to, "Hi der " + from + ((isAlive) ? " " + _this.host + " looks up from here!" : " " + _this.host + " looks down from here!"));
        });
    };
    return ServerStatus;
})();
exports.ServerStatus = ServerStatus;
