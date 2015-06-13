import irc = require('irc');
import ICommand = require('../Interfaces/ICommand');
import mongoose = require('mongoose');
import UserSchema = require('../Models/UserSchema');

export class LastSeen implements ICommand.ICommand
{
    private IrcClient: irc.Client;

    constructor(ircClient: irc.Client)
    {
        if(ircClient === null) return;
        this.IrcClient = ircClient;
        this.IrcClient.on('quit', this.OnUserQuit);
        this.IrcClient.on('part', this.OnUserPart);
    }

    private OnUserQuit: (nick: string, reason: string, channels: string, message: string) => void = (nick: string, reason: string, channels: string, message: string) =>
    {
        this.UpdateUserLastSeen(nick);
    }

    private OnUserPart: (channel: string, nick: string, reason: string, message: string) => void = (channel: string, nick: string, reason: string, message: string) =>
    {
        this.UpdateUserLastSeen(nick);
    }

    public BuildIrcMessage(from: string, to: string, nick: string, lastSeen: Date): string
    {
        if(from === nick) return 'Yes I can see you ' + from + '.';
        else if(this.IsUserConnected(to, nick)) return 'According to my amazing vision ' + from + ' I can see ' + nick + ' currently in the channel!';
        else if(lastSeen === null) return 'Oh no ' + from + ', I could not find ' + nick + ' in my records!';
        return 'Okay ' + from + ', according to my diary ' + nick + ' was last seen on ' + lastSeen.toString() + '.';
    }

    public Execute(from: string, to: string, message: string)
    {
        UserSchema.findOne({ 'Name': message }, (err, user) =>
        {
            this.IrcClient.say(to, this.BuildIrcMessage(from, to, message, (user !== null) ? user.get('LastSeen') : null));
        });
    }

    public UpdateUserLastSeen: (nick: string) => void = (nick: string) =>
    {
        UserSchema.findOne({ Name: nick }, (err, user) =>
        {
            if(!user)
            {
                user = new UserSchema({
                    Name: nick,
                    LastSeen: new Date(Date.now())
                });
            }
            else user.set('LastSeen', new Date(Date.now()));
            user.save();
        });
    };

    public IsUserConnected: (from: string, nick: string) => boolean = (from: string, nick: string) =>
    {
        return (nick in this.IrcClient.chans[from]['users']);
    }
}
