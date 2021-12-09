const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", brandController.getAll);

router.post("/", brandController.create);

router.patch("/:id", brandController.updateOne);

router.delete("/:id", brandController.deleteOne);

module.exports = router;
