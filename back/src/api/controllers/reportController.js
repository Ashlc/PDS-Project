const reportService = require("../services/reportService");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateUniqueProcessNumber() {
    let processNumber;
    do {
        processNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    } while (!isUnique(processNumber));

    return processNumber;
}

async function isUnique(processNumber) {
    const existingReport = await prisma.report.findUnique({
        where: { processNumber },
    });
    return !existingReport;
}

class ReportController {
    async getAllReports(req, res) {
        try {
            const reports = await reportService.getAllReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: "Error fetching reports", error });
        }
    }

    async getReportById(req, res) {
        const { id } = req.params;
        try {
            const report = await reportService.getReportById(id);
            if (!report) {
                return res.status(404).json({ message: "Report not found" });
            }
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: "Error fetching report", error });
        }
    }

    async createReport(req, res) {
        const {
            status,
            resource,
            locationId,
            description,
            photos,
            userId,
        } = req.body;

        const processNumber = generateUniqueProcessNumber();

        try {
            const newReport = await reportService.createReport({
                processNumber,
                status,
                resource,
                locationId,
                description,
                photos,
                userId,
            });
            res.status(201).json(newReport);
        } catch (error) {
            res.status(500).json({ message: "Error creating report", error });
        }
    }

    async updateReport(req, res) {
        const { id } = req.params;
        const {
            processNumber,
            status,
            resource,
            locationId,
            description,
            photos,
            userId,
        } = req.body;
        try {
            const updatedReport = await reportService.updateReport(id, {
                processNumber,
                status,
                resource,
                locationId,
                description,
                photos,
                userId,
            });
            res.status(200).json(updatedReport);
        } catch (error) {
            res.status(500).json({ message: "Error updating report", error });
        }
    }

    async deleteReport(req, res) {
        const { id } = req.params;
        try {
            await reportService.deleteReport(id);
            res.status(204).json({ message: "Report deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting report", error });
        }
    }

    async filterReports(req, res) {
        const { status, locationId, startDate, endDate, userId, processNumber } = req.body;

        const filters = {};

        // Log para verificar os parâmetros recebidos
        console.log("Parâmetros recebidos:", { status, locationId, startDate, endDate, userId, processNumber });

        // Aplica os filtros, se fornecidos
        if (status && ['PENDING', 'IN_REVIEW', 'IN_PROGRESS', 'RESOLVED'].includes(status)) {
            filters.status = status;
        }
        if (locationId) filters.locationId = Number(locationId);
        if (userId) filters.userId = Number(userId);
        if (processNumber) filters.processNumber = processNumber;
        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate) filters.createdAt.gte = new Date(startDate);
            if (endDate) filters.createdAt.lte = new Date(endDate);
        }

        // Log dos filtros gerados para depuração
        console.log("Filtros gerados para a consulta:", filters);

        try {
            // Consulta ao Prisma com os filtros aplicados
            const reports = await prisma.report.findMany({
                where: filters,
                include: {
                    location: true,  // Inclui a localização associada
                    user: true,      // Inclui o usuário associado
                },
            });

            // Verifica se relatórios foram encontrados
            if (reports.length === 0) {
                return res.status(404).json({ message: "Nenhum relatório encontrado" });
            }

            // Retorna os relatórios encontrados com código 200 (sucesso)
            return res.status(200).json({
                message: "Relatórios encontrados com sucesso",
                reports: reports  // Inclui os relatórios encontrados
            });
        } catch (error) {
            // Loga o erro completo no console para depuração
            console.error("Erro ao buscar relatórios:", error);

            // Retorna uma mensagem detalhada do erro para o cliente
            return res.status(500).json({
                message: "Erro ao buscar relatórios",
                error: error.message || "Erro desconhecido"
            });
        }
    }

    // Novo método para gerar o PDF com base nos filtros aplicados
    async downloadReportPDF(req, res) {
        console.log("Requisição para download de PDF recebida:", req.body);
        const {processNumber } = req.body;
        try {
            // Chama o serviço para gerar o PDF dos relatórios
            await reportService.generateReportPDF(processNumber , res);
        } catch (error) {
            console.error("Erro ao processar download de PDF:", error);
            res.status(500).json({ message: "Erro ao processar download de PDF", error: error.message });
        }
    }
}

module.exports = new ReportController();
