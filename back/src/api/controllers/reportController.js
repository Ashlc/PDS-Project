const reportService = require("../services/reportService");

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
            processNumber,
            status,
            resource,
            locationId,
            description,
            photos,
            userId,
        } = req.body;
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
}

module.exports = new ReportController();
