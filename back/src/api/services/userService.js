const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserService {
    async getAllUsers() {
        return await prisma.user.findMany();
    }

    async getUserById(id) {
        return await prisma.user.findUnique({
            where: { id: Number(id) },
        });
    }

    async getUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async createUser(data) {
        return await prisma.user.create({
            data,
        });
    }

    async updateUser(id, data) {
        return await prisma.user.update({
            where: { id: Number(id) },
            data,
        });
    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: { id: Number(id) },
        });
    }
}

module.exports = new UserService();
