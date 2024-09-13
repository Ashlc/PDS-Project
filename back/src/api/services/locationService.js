const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LocationService {
    async getAllLocations() {
        return await prisma.location.findMany();
    }

    async getLocationById(id) {
        return await prisma.location.findUnique({
            where: { id: Number(id) },
        });
    }

    async createLocation(data) {
        return await prisma.location.create({
            data,
        });
    }

    async updateLocation(id, data) {
        return await prisma.location.update({
            where: { id: Number(id) },
            data,
        });
    }

    async deleteLocation(id) {
        return await prisma.location.delete({
            where: { id: Number(id) },
        });
    }
}

module.exports = new LocationService();
