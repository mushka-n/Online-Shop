const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", typeController.getAll);

router.post("/", typeController.create);

router.patch("/:id", typeController.updateOne);

router.delete("/:id", typeController.deleteOne);

module.exports = router;
