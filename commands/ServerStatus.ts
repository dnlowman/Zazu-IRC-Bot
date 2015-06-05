import irc = require('irc');
import ping = require('ping');
import ICommand = require('../Interfaces/ICommand');

export class ServerStatus implements ICommand.ICommand
{
    private ircClient: irc.Client;
    private host: string;

    constructor(ircClient: irc.Client, host: string)
    {
        this.ircClient = ircClient;
        this.host = host;
    }

    public Execute(from: string, to: string, message: string)
    {
        ping.sys.probe(this.host, (isAlive: Boolean) =>
        {
            this.ircClient.say(to, "Hi der " + from + ((isAlive) ? " " + this.host + " looks up from here!" : " " + this.host + " looks down from here!"));
        });
    }
}
