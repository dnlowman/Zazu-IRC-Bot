var ServerStatus = require('../../Commands/ServerStatus');
describe('A Server Status Command', function () {
    describe('A Build Irc Message method', function () {
        it('should return the correct message if the server is up', function () {
            var from = 'Noble';
            var ircClient = null;
            var host = 'test';
            var serverStatus = new ServerStatus.ServerStatus(ircClient, host);
            var message = serverStatus.BuildIrcMessage(true, from);
            expect(message).toEqual('Hi der Noble test looks up from here!');
        });
        it('should return the correct message if the server is down', function () {
            var from = 'Noble';
            var ircClient = null;
            var host = 'test';
            var serverStatus = new ServerStatus.ServerStatus(ircClient, host);
            var message = serverStatus.BuildIrcMessage(false, from);
            expect(message).toEqual('Hi der Noble test looks down from here!');
        });
    });
});
