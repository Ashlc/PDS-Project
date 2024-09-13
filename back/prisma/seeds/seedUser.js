const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedUser() {
    const user = await prisma.user.upsert({
        where: { email: "teste@teste.com" },
        update: {},
        create: {
            email: "teste@teste.com",
            password: "$2b$10$5TUkRm4/YI0cFYOyKZhdo.2hPVdO/XZZ/.NJIfGQpcd2CXgXO5ngC", // 123
            role: "admin",
        },
    });
    return user;
}

module.exports = { seedUser };
