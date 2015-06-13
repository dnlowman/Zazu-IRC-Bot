import irc = require('irc');
import LastSeen = require('../../commands/LastSeen');

describe('A Last Seen Command', () =>
{
    describe('A Build Irc Message method', () =>
    {
        it('should return the correct message if the user was not found', () =>
        {
            // Arrange
            var ircClient: irc.Client = null;
            var from = 'Noble';
            var nick = 'TestName';
            var lastSeen: Date = null;
            var to = '';
            var lastSeenCommand = new LastSeen.LastSeen(ircClient);
            lastSeenCommand.IsUserConnected = jasmine.createSpy("IsUserConnected spy").and.callFake(() => { return false; });

            // Act
            var result = lastSeenCommand.BuildIrcMessage(from, to, nick, lastSeen);

            // Assert
            expect(result).toEqual('Oh no Noble, I could not find TestName in my records!');
        });

        it('should return the correct message if the user was found', () =>
        {
            // Arrange
            var ircClient: irc.Client = null;
            var from = 'Noble';
            var nick = 'TestName';
            var to = '';
            var lastSeen = new Date(2015, 6, 13, 17, 0, 0, 0);
            var lastSeenCommand = new LastSeen.LastSeen(ircClient);
            lastSeenCommand.IsUserConnected = jasmine.createSpy("IsUserConnected spy").and.callFake(() => { return false; });

            // Act
            var result = lastSeenCommand.BuildIrcMessage(from, to, nick, lastSeen);

            // Assert
            expect(result).toEqual('Okay Noble, according to my diary TestName was last seen on Mon Jul 13 2015 17:00:00 GMT+0000 (UTC).');
        });

        it('should return the correct message if the users name is passed as the parameter', () =>
        {
            // Arrange
            var ircClient: irc.Client = null;
            var from = 'Noble';
            var nick = 'Noble';
            var to = '';
            var lastSeen = new Date(2015, 6, 13, 17, 0, 0, 0);
            var lastSeenCommand = new LastSeen.LastSeen(ircClient);
            lastSeenCommand.IsUserConnected = jasmine.createSpy("IsUserConnected spy").and.callFake(() => { return true; });

            // Act
            var result = lastSeenCommand.BuildIrcMessage(from, to, nick, lastSeen);

            // Assert
            expect(result).toEqual('Yes I can see you Noble.');
        });

        it('should return the correct message if the user is connected to the current channel', () =>
        {
            // Arrange
            var ircClient: irc.Client = null;
            var from = 'Noble';
            var nick = 'TestName';
            var to = '#test';
            var lastSeen = new Date(2015, 6, 13, 17, 0, 0, 0);
            var lastSeenCommand = new LastSeen.LastSeen(ircClient);

            lastSeenCommand.IsUserConnected = jasmine.createSpy("IsUserConnected spy").and.callFake(() => { return true; });

            // Act
            var result = lastSeenCommand.BuildIrcMessage(from, to, nick, lastSeen);

            // Assert
            expect(result).toEqual('According to my amazing vision Noble I can see TestName currently in the channel!');
        });
    });
});
