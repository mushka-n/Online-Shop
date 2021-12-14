const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", typeController.getAll);

router.post("/", checkRole("ADMIN"), typeController.create);

router.patch("/:id", checkRole("ADMIN"), typeController.updateOne);

router.delete("/:id", checkRole("ADMIN"), typeController.deleteOne);

module.exports = router;
