const { PrismaClient } = require("@prisma/client");
const { seedUser } = require("./seeds/seedUser");
const { seedLocation } = require("./seeds/seedLocation");
const { seedReport } = require("./seeds/seedReport");

const prisma = new PrismaClient();

async function main() {
    await seedUser();
    await seedLocation();
    await seedReport();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
