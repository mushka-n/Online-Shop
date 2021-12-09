const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

router.post("/", productController.create);

router.patch("/:id", productController.updateOne);

router.delete("/:id", productController.deleteOne);

module.exports = router;
