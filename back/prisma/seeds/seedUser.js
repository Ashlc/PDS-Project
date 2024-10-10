const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

async function seedUser() {
    // Usuário original
    const originalUser = {
        email: "teste@teste.com",
        password: "$2b$10$TUkRm4/YIOcFYOyKZhdo.2hPVdo/XZZ/.NJIfGQpcd2CxgXO5ngC", // senha 123
        role: "admin"
    };

    // Adiciona o usuário original
    await prisma.user.upsert({
        where: { email: originalUser.email },
        update: {},
        create: originalUser
    });

    // Gerando 5 novos usuários aleatórios
    const newUsers = [];
    for (let i = 0; i < 5; i++) {
        newUsers.push({
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(['admin', 'user']),
        });
    }

    for (const userData of newUsers) {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: userData
        });
    }

    console.log('Users populated');
}

module.exports = { seedUser };
