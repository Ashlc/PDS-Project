const locationService = require("../services/locationService");

class LocationController {
    async getAllLocations(req, res) {
        try {
            const locations = await locationService.getAllLocations();
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching locations",
                error,
            });
        }
    }

    async getLocationById(req, res) {
        const { id } = req.params;
        try {
            const location = await locationService.getLocationById(id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            res.status(200).json(location);
        } catch (error) {
            res.status(500).json({ message: "Error fetching location", error });
        }
    }

    async createLocation(req, res) {
        const { address, complement, latitude, longitude } = req.body;
        try {
            const newLocation = await locationService.createLocation({
                address,
                complement,
                latitude,
                longitude,
            });
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ message: "Error creating location", error });
        }
    }

    async updateLocation(req, res) {
        const { id } = req.params;
        const { address, complement, latitude, longitude } = req.body;
        try {
            const updatedLocation = await locationService.updateLocation(id, {
                address,
                complement,
                latitude,
                longitude,
            });
            res.status(200).json(updatedLocation);
        } catch (error) {
            res.status(500).json({ message: "Error updating location", error });
        }
    }

    async deleteLocation(req, res) {
        const { id } = req.params;
        try {
            await locationService.deleteLocation(id);
            res.status(204).json({ message: "Location deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting location", error });
        }
    }
}

module.exports = new LocationController();
