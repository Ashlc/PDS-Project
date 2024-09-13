const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ReportService {
    async getAllReports() {
        return await prisma.report.findMany({
            include: {
                location: true,
                user: true,
            },
        });
    }

    async getReportById(id) {
        return await prisma.report.findUnique({
            where: { id: Number(id) },
            include: {
                location: true,
                user: true,
            },
        });
    }

    async createReport(data) {
        return await prisma.report.create({
            data,
        });
    }

    async updateReport(id, data) {
        return await prisma.report.update({
            where: { id: Number(id) },
            data,
        });
    }

    async deleteReport(id) {
        return await prisma.report.delete({
            where: { id: Number(id) },
        });
    }
}

module.exports = new ReportService();
