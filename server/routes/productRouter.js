const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

router.post("/", checkRole("ADMIN"), productController.create);

router.patch("/:id", checkRole("ADMIN"), productController.updateOne);

router.delete("/:id", checkRole("ADMIN"), productController.deleteOne);

module.exports = router;
