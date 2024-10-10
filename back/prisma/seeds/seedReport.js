const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function seedReport() {
    // Relatório original
    const originalReport = {
        processNumber: "0123456789",
        status: "PENDING",
        resource: "RAMP",
        description: "Rampa inacessível",
        photos: [],
        userId: 1,  // Sabemos que o usuário com id 1 existe
        locationId: 1  // Sabemos que a localização com id 1 existe
    };

    // Adiciona o relatório original
    await prisma.report.upsert({
        where: { processNumber: originalReport.processNumber },
        update: {},
        create: originalReport
    });

    // Buscar todas as localizações existentes
    const allLocations = await prisma.location.findMany();
    const locationIds = allLocations.map(location => location.id); // Lista de IDs de localizações existentes

    // Verifica se há localizações válidas
    if (locationIds.length === 0) {
        throw new Error("Nenhuma localização encontrada no banco de dados.");
    }

    // Gerando 5 novos relatórios aleatórios com locationId válidos
    const newReports = [];
    for (let i = 0; i < 5; i++) {
        newReports.push({
            processNumber: faker.string.uuid(),  // Gera um UUID único
            status: faker.helpers.arrayElement(['PENDING', 'IN_REVIEW', 'IN_PROGRESS', 'RESOLVED']),
            resource: faker.helpers.arrayElement(['RAMP', 'ELEVATOR', 'PARKING', 'ACCESS']),
            description: faker.lorem.sentence(),
            photos: [],
            userId: faker.number.int({ min: 1, max: 6 }),  // Gera userId entre 1 e 6
            locationId: faker.helpers.arrayElement(locationIds)  // Seleciona um locationId válido da lista de IDs
        });
    }

    for (const reportData of newReports) {
        await prisma.report.upsert({
            where: { processNumber: reportData.processNumber },  // Usa processNumber único
            update: {},
            create: reportData
        });
    }

    console.log('Reports populated');
}

module.exports = { seedReport };
