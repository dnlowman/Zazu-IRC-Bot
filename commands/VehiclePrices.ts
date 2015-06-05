/// <reference path="../DefinitelyTyped/irc.d.ts" />

import irc = require('irc');
import ping = require('ping');
import ICommand = require('../Interfaces/ICommand');

export class VehiclePrices implements ICommand.ICommand
{
    private ircClient: irc.Client;

    private vehicles: any = {
        'Beagle': '$5,000,000',
        'Dodo': '$4,000,000',
        'Leviathan': '$1,000,000',
        'Maverick': '$3,500,000',
        'News Chopper': '$1,000,000',
        'Faggio': '$10,000',
        'Sanchez': '$165,000',
        'Freeway': '$50,000',
        'Quad': '$100,000',
        'BMX': '$700',
        'Bike': '$1,000',
        'FCR-900': '$200,000',
        'Wayfarer': '$50,000',
        'Comet': '$625,000',
        'Feltzer': '$65,000',
        'Windsor': '$450,000',
        'Linerunner': '$750,000',
        'Mule': '$175,000',
        'Packer': '$400,000',
        'Flatbed': '$500,000',
        'Yankee': '$250,000',
        'Boxville': '$110,000',
        'Tanker': '$800,000',
        'Roadtrain': '$900,000',
        'DFT-30': '$500,000',
        'Trashmaster': '$140,900',
        'Pony': '$110,000',
        'Bobcat': '$60,000',
        'Rumpo': '$100,000',
        'Berkley\'s RC Van': '$60,000',
        'Walton': '$40,000',
        'Burrito': '$120,000',
        'Benson': '$160,000',
        'Sadler': '$25,000',
        'Yosemite': '$110,000',
        'Newsvan': '$80,000',
        'Picador': '$38,000',
        'Voodoo': '$65,000',
        'Stallion': '$80,000',
        'Remington': '$75,000',
        'Slamvan': '$110,000',
        'Blade': '$65,000',
        'Tahoma': '$65,000',
        'Savanna': '$85,000',
        'Broadway': '$80,000',
        'Tornado': '$58,000',
        'Landstalker': '$180,000',
        'Rancher': '$110,000',
        'Mesa': '$140,000',
        'Huntley': '$300,000',
        'Bravura': '$40,000',
        'Sentinel': '$135,000',
        'Manana': '$35,000',
        'Esperanto': '$50,000',
        'Washington': '$100,000',
        'Premier': '$135,000',
        'Previon': '$40,000',
        'Admiral': '$45,000',
        'Glendale': '$50,000',
        'Oceanic': '$35,000',
        'Hermes': '$60,000',
        'Virgo': '$41,000',
        'Greenwood': '$47,000',
        'Elegant': '$155,000',
        'Nebula': '$40,000',
        'Majestic': '$65,000',
        'Buccaneer': '$45,000',
        'Fortune': '$55,000',
        'Cadrona': '$45,000',
        'Willard': '$45,000',
        'Vincent': '$51,000',
        'Clover': '$135,000',
        'Intruder': '$46,000',
        'Primo': '$38,000',
        'Tampa': '$38,000',
        'Sunrise': '$55,000',
        'Merit': '$150,000',
        'Sultan': '$785,000',
        'Elegy': '$220,000',
        'Stafford': '$200,000',
        'Emperor': '$60,000',
        'Buffalo': '$420,000',
        'Cheetah': '$850,000',
        'Banshee': '$850,000',
        'Sabre': '$160,000',
        'Blista Compact': '$140,000',
        'Bullet': '$1,200,000',
        'Uranus': '$330,000',
        'Jester': '$200,000',
        'Flash': '$180,000',
        'Euros': '$250,000',
        'Club': '$160,000',
        'Alpha': '$330,000',
        'Phoenix': '$650,000',
        'ZR-350': '$700,000',
        'Taxi': '$45,000',
        'Bus': '$70,000',
        'Coach': '$75,000',
        'Cabbie': '$50,000',
        'FBI Rancher': '$255,000',
        'Police Maverick': '$3,650,000',
        'HPV 1000': '$50,000',
        'FBI Truck': '$500,000',
        'Police Ranger': '$135,000',
        'S.W.A.T. Tank': '$750,000',
        'Perenniel': '$80,000',
        'Moonbeam': '$80,000',
        'Solair': '$90,000',
        'Regina': '$85,000',
        'Stratum': '$110,000',
        'Squalo': '$1,000,000',
        'Reefer': '$180,000',
        'Tropic': '$299,999',
        'Coastguard': '$150,000',
        'Dinghy': '$20,000',
        'Marquis': '$350,000',
        'Stretch': '$280,000',
        'Mr. Whoopee': '$80,000',
        'Camper': '$85,000',
        'Journey': '$180,000',
        'Tow Truck': '$30,000',
        'Combine': '$25,000',
        'Hustler': '$85,000',
        'Hotdog': '$80,000'
    };

    constructor(ircClient: irc.Client)
    {
        this.ircClient = ircClient;
    }

    public GetVehicle(vehicleName: string): string
    {
        for(var vehicle in this.vehicles)
        {
            if(vehicle.toLowerCase() === vehicleName.toLowerCase())
            {
                return vehicle;
            }
        }
        return '';
    }

    public BuildIrcMessage(from: string, to: string, message: string): string
    {
        var vehicle = this.GetVehicle(message);
        if(vehicle === '') return 'Oh noes ' + from + ', I couldn\'t find that vehicle!';
        return 'So ' + from + ', according to my trusty records a ' + vehicle + ' costs ' + this.vehicles[vehicle] + '.';
    }

    public Execute(from: string, to: string, message: string)
    {
        this.BuildIrcMessage(from, to, message);
    }
}
