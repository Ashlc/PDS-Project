const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function seedLocation() {
    // Localização original
    const originalLocation = {
        id: 1,
        address: "Avenida Fernandes Lima, Maceió - AL",
        complement: "Próximo ao McDonald's",
        latitude: -9.648921,
        longitude: -35.717239
    };

    // Adiciona a localização original
    await prisma.location.upsert({
        where: { id: originalLocation.id },
        update: {},
        create: originalLocation
    });

    // Gerando 5 novas localizações aleatórias
    const newLocations = [];
    for (let i = 0; i < 5; i++) {
        newLocations.push({
            id: faker.number.int({ min: 2, max: 1000 }), // Gera IDs únicos aleatórios
            address: faker.location.streetAddress(),
            complement: faker.location.secondaryAddress(),
            latitude: parseFloat(faker.location.latitude()),
            longitude: parseFloat(faker.location.longitude())
        });
    }

    for (const locationData of newLocations) {
        await prisma.location.upsert({
            where: { id: locationData.id },  // Use o campo id que é @id
            update: {},
            create: locationData
        });
    }

    // Log para verificar as localizações criadas
    const allLocations = await prisma.location.findMany();
    console.log('Localizações criadas:', allLocations);

    console.log('Locations populated');
}

module.exports = { seedLocation };
