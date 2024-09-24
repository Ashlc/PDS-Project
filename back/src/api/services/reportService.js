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

    async filterReports({ status, locationId, startDate, endDate, userId, processNumber }) {
        const filters = {};
    
        // Validação dos parâmetros do status
        if (locationId) filters.locationId = Number(locationId);
        if (status && ['PENDING', 'IN_REVIEW', 'IN_PROGRESS', 'RESOLVED'].includes(status)) {
            filters.status = status;
        }
        if (userId) filters.userId = Number(userId);
        if (processNumber) filters.processNumber = processNumber;
    
        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) filters.createdAt.gte = new Date(startDate);
            if (endDate) filters.createdAt.lte = new Date(endDate);
        }
    
        // Log para depuração
        console.log("Filtros gerados para a consulta:", filters);
    
        try {
            return await prisma.report.findMany({
                where: filters,
                include: {
                    location: true,
                    user: true,
                },
            });
        } catch (error) {
            // Log do erro completo no console
            console.error("Erro de validação no Prisma:", error);
            throw new Error("Erro ao buscar relatórios: " + error.message);
        }
    }
}
module.exports = new ReportService();