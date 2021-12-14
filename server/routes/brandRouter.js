const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", brandController.getAll);

router.post("/", checkRole("ADMIN"), brandController.create);

router.patch("/:id", checkRole("ADMIN"), brandController.updateOne);

router.delete("/:id", checkRole("ADMIN"), brandController.deleteOne);

module.exports = router;
