const Router = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

//router.get("/", basketController.getProducts);
router.get("/", basketController.getBasket);

router.post("/", authMiddleware, basketController.createBasket);
router.post("/:productId", authMiddleware, basketController.addOneProduct);

module.exports = router;
