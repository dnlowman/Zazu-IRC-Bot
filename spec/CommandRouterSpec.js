/// <reference path="../DefinitelyTyped/jasmine.d.ts" />
/// <reference path="../DefinitelyTyped/irc.d.ts" />
var CommandRouter = require('../core/CommandRouter');
describe('A Command Router', function () {
    describe('A ExtractMessage method', function () {
        it('should extract the command string when only the command is passed', function () {
            var command = '!random';
            var commandMaps = null;
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.ExtractMessage(command);
            expect(result).not.toBeNull();
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual('random');
        });
        it('should extract the command string when parameters are passed', function () {
            var command = '!random param1 param2';
            var commandMaps = null;
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.ExtractMessage(command);
            expect(result).not.toBeNull();
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual('random');
            expect(result[1]).toEqual('param1 param2');
        });
    });
    describe('A IsCommand method', function () {
        it('should return true when the first character of a string is ! and the length of the command is greater than 1', function () {
            var command = '!rt';
            var commandMaps = null;
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.IsCommand(command);
            expect(result).not.toBeNull();
            expect(result).toBeTruthy();
        });
        it('should return false when the first character of a string is not !', function () {
            var command = 'rt';
            var commandMaps = null;
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.IsCommand(command);
            expect(result).not.toBeNull();
            expect(result).not.toBeTruthy();
        });
        it('should return false when the first character of a string is ! and the length is not 1', function () {
            var command = '!';
            var commandMaps = null;
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.IsCommand(command);
            expect(result).not.toBeNull();
            expect(result).not.toBeTruthy();
        });
    });
    describe('A RouteCommands method', function () {
        var testCommand;
        beforeEach(function () {
            testCommand = {
                Execute: function (from, to, message) { }
            };
            spyOn(testCommand, 'Execute');
        });
        it('should invoke the correct function which is mapped', function () {
            var commandMaps = {
                'test': testCommand
            };
            var from = 'noble';
            var to = '#test';
            var command = '!test';
            var ircClient = null;
            var commandRouter = new CommandRouter.CommandRouter(ircClient, commandMaps);
            var result = commandRouter.RouteCommands(from, to, command);
            expect(testCommand.Execute).toHaveBeenCalled();
        });
    });
});
