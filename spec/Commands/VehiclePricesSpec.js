var VehiclePrices = require('../../commands/VehiclePrices');
describe('A Vehicle Prices Command', function () {
    describe('A IsValidVehicle method', function () {
        it('should return true if the vehicle is valid', function () {
            var vehicleName = 'Sultan';
            var ircClient = null;
            var vehicleCommand = new VehiclePrices.VehiclePrices(ircClient);
            var result = vehicleCommand.GetVehicle(vehicleName);
            expect(result).not.toBeNull();
            expect(result).toEqual('Sultan');
        });
        it('should return false if the vehicle is invalid', function () {
            var vehicleName = 'Ford';
            var ircClient = null;
            var vehicleCommand = new VehiclePrices.VehiclePrices(ircClient);
            var result = vehicleCommand.GetVehicle(vehicleName);
            expect(result).not.toBeNull();
            expect(result).toEqual('');
        });
    });
    describe('A Build Irc Message method', function () {
        it('should return the correct message if the vehicle is valid', function () {
            var vehicleName = 'Sultan';
            var ircClient = null;
            var from = 'Noble';
            var to = null;
            var vehicleCommand = new VehiclePrices.VehiclePrices(ircClient);
            var result = vehicleCommand.BuildIrcMessage(from, to, vehicleName);
            expect(result).not.toBeNull();
            expect(result).toEqual('So Noble, according to my trusty records a Sultan costs $785,000.');
        });
        it('should return the correct message if the vehicle is invalid', function () {
            var vehicleName = 'Ford';
            var ircClient = null;
            var from = 'Noble';
            var to = null;
            var vehicleCommand = new VehiclePrices.VehiclePrices(ircClient);
            var result = vehicleCommand.BuildIrcMessage(from, to, vehicleName);
            expect(result).not.toBeNull();
            expect(result).toEqual('Oh noes Noble, I couldn\'t find that vehicle!');
        });
    });
});
