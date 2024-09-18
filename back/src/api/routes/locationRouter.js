const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const middleware = require("../../middleware/authenticantionHandler");


router.get("/", middleware(["admin", "user"]), locationController.getAllLocations);
router.get("/:id", middleware(["admin", "user"]), locationController.getLocationById);
router.post("/", middleware(["admin", "user"]), locationController.createLocation);
router.put("/:id", middleware(["admin", "user"]), locationController.updateLocation);
router.delete("/:id", middleware(["admin", "user"]), locationController.deleteLocation);

module.exports = router;
