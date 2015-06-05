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

    public BuildIrcMessage(serverStatus: boolean, from: string)
    {
        return 'Hi der ' + from + ((serverStatus) ? ' ' + this.host + ' looks up from here!' : ' ' + this.host + ' looks down from here!');
    }

    public Execute(from: string, to: string, message: string)
    {
        ping.sys.probe(this.host, (isAlive: boolean) => this.ircClient.say(to, this.BuildIrcMessage(isAlive, from)));
    }
}
