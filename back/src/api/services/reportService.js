const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');
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
    }   async getReportprocessNumber(processNumber) {
        console.log(processNumber);
        return await prisma.report.findMany({
            where: { processNumber: processNumber },

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

    async filterReports(filters) {
        // Filtro de relatórios com base nos parâmetros fornecidos
        return await prisma.report.findMany({
            where: filters,
            include: {
                location: true,
                user: true,
            },
        });
    }

    // Método para gerar PDF
    async generateReportPDF(processNumber, res) {
        const reports = await this.getReportprocessNumber(processNumber);
        console.log(reports);
        
        if (reports.length === 0) {
            return res.status(404).json({ message: "Nenhum relatório encontrado" });
        }

        // Inicia a criação do PDF
        const doc = new PDFDocument();

        // Definindo cabeçalhos para o arquivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reports.pdf');

        // Envia o conteúdo do PDF como resposta
        doc.pipe(res);

        // Conteúdo do PDF
        doc.fontSize(18).text('Relatórios Filtrados', { align: 'center' });
        doc.moveDown();

        reports.forEach(report => {
            doc.fontSize(14).text(`ID: ${report.id}`);
            doc.text(`Status: ${report.status}`);
            doc.text(`Localização: ${report.location.address}`);
            doc.text(`Usuário: ${report.user.email}`);
            doc.text(`Descrição: ${report.description}`);
            doc.moveDown();
        });

        doc.end(); // Finaliza a criação do PDF
    }
}

module.exports = new ReportService();
