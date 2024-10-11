const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedLocation() {
    const location = await prisma.location.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            address: "Avenida Fernandes Lima, Maceió - AL",
            complement: "Próximo ao McDonald's",
            latitude: -9.648921,
            longitude: -35.717239,
        },
    });
    return location;
}

module.exports = { seedLocation };