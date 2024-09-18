const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const middleware = require("../../middleware/authenticantionHandler");


router.get("/", middleware(["admin", "user"]), reportController.getAllReports);
router.get("/:id", middleware(["admin", "user"]), reportController.getReportById);
router.post("/", middleware(["admin", "user"]), reportController.createReport);
router.put("/:id", middleware(["admin", "user"]), reportController.updateReport);
router.delete("/:id", middleware(["admin", "user"]), reportController.deleteReport);
router.post('/filter/', middleware(["admin", "user"]), reportController.filterReports);

module.exports = router;
