const Router = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/create", authMiddleware, basketController.createBasket);

router.get("/", authMiddleware, basketController.getBasketProducts);

router.post("/addProduct", authMiddleware, basketController.addProduct);
router.post("/removeProduct", authMiddleware, basketController.removeProduct);

module.exports = router;
