var UserSchema = require('../Models/UserSchema');
var LastSeen = (function () {
    function LastSeen(ircClient) {
        var _this = this;
        this.OnUserQuit = function (nick, reason, channels, message) {
            _this.UpdateUserLastSeen(nick);
        };
        this.OnUserPart = function (channel, nick, reason, message) {
            _this.UpdateUserLastSeen(nick);
        };
        this.UpdateUserLastSeen = function (nick) {
            UserSchema.findOne({ Name: nick }, function (err, user) {
                if (!user) {
                    user = new UserSchema({
                        Name: nick,
                        LastSeen: new Date(Date.now())
                    });
                }
                else
                    user.set('LastSeen', new Date(Date.now()));
                user.save();
            });
        };
        this.IsUserConnected = function (from, nick) {
            return (nick in _this.IrcClient.chans[from]['users']);
        };
        if (ircClient === null)
            return;
        this.IrcClient = ircClient;
        this.IrcClient.on('quit', this.OnUserQuit);
        this.IrcClient.on('part', this.OnUserPart);
    }
    LastSeen.prototype.BuildIrcMessage = function (from, to, nick, lastSeen) {
        if (from === nick)
            return 'Yes I can see you ' + from + '.';
        else if (this.IsUserConnected(to, nick))
            return 'According to my amazing vision ' + from + ' I can see ' + nick + ' currently in the channel!';
        else if (lastSeen === null)
            return 'Oh no ' + from + ', I could not find ' + nick + ' in my records!';
        return 'Okay ' + from + ', according to my diary ' + nick + ' was last seen on ' + lastSeen.toString() + '.';
    };
    LastSeen.prototype.Execute = function (from, to, message) {
        var _this = this;
        UserSchema.findOne({ 'Name': message }, function (err, user) {
            _this.IrcClient.say(to, _this.BuildIrcMessage(from, to, message, (user !== null) ? user.get('LastSeen') : null));
        });
    };
    return LastSeen;
})();
exports.LastSeen = LastSeen;
