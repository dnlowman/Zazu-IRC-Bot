/// <reference path="../DefinitelyTyped/jasmine.d.ts" />
/// <reference path="../DefinitelyTyped/irc.d.ts" />

import irc = require('irc');
import CommandRouter = require('../core/CommandRouter');

describe('A Command Router', () =>
{
    describe('A ExtractMessage method', () =>
    {
        it('should extract the command string when only the command is passed', () =>
        {
            // Arrange
            var command: string = '!random';
            var commandMaps: any = null;
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.ExtractMessage(command);

            // Assert
            expect(result).not.toBeNull();
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual('random');
        });

        it('should extract the command string when parameters are passed', () =>
        {
            // Arrange
            var command: string = '!random param1 param2';
            var commandMaps: any = null;
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.ExtractMessage(command);

            // Assert
            expect(result).not.toBeNull();
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual('random');
            expect(result[1]).toEqual('param1 param2');
        });
    });

    describe('A IsCommand method', () =>
    {
        it('should return true when the first character of a string is ! and the length of the command is greater than 1', () =>
        {
            // Arrange
            var command: string = '!rt';
            var commandMaps: any = null;
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.IsCommand(command);

            // Assert
            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
        });

        it('should return false when the first character of a string is not !', () =>
        {
            // Arrange
            var command: string = 'rt';
            var commandMaps: any = null;
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.IsCommand(command);

            // Assert
            expect(result).not.toBeNull();
            expect(result).not.toBeTruthy();
        });

        it('should return false when the first character of a string is ! and the length is not 1', () =>
        {
            // Arrange
            var command: string = '!';
            var commandMaps: any = null;
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.IsCommand(command);

            // Assert
            expect(result).not.toBeNull();
            expect(result).not.toBeTruthy();
        });
    });

    describe('A RouteCommands method', () =>
    {
        var testCommand: any;

        beforeEach(function() {
            testCommand = {
                Execute: (from: string, to: string, message: string) => {}
            };

            spyOn(testCommand, 'Execute');
        });

        it('should invoke the correct function which is mapped', () =>
        {
            // Arrange
            var commandMaps: any =
            {
                'test': testCommand
            };

            var from: string = 'noble';
            var to: string = '#test';
            var command: string = '!test';
            var ircClient: irc.Client = null;
            var commandRouter: CommandRouter.CommandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);

            // Act
            var result = commandRouter.RouteCommands(from, to, command);

            // Assert
            expect(testCommand.Execute).toHaveBeenCalled();
        });
    });
});
