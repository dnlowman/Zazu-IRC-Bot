var serverStatus = function(ircClient, ping, host) {
    /* Fields */
    this.ircClient = ircClient;
    this.ping = ping;
    this.host = host;
};

serverStatus.prototype.execute = function(from, to, message){
    var _this = this;
    this.ping.sys.probe(this.host, function(isAlive){
        _this.ircClient.say(to, "Hi der " + from + ((isAlive) ? " " + _this.host + " looks up from here!" : " " + _this.host + " looks down from here!"));
    });
};

module.exports = serverStatus;
