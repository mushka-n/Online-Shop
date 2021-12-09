const { Basket, BasketProduct, User } = require("../models/models");

class BasketController {
    async createBasket(req, res) {
        try {
            const userId = req.body.userId;
            const basket = await Basket.create({ userId });
            return res.json(basket);
        } catch (e) {
            res.send(e.message);
        }
    }

    async getBasket(req, res) {
        try {
            const userId = req.body.userId;
            const basket = await Basket.findOne({ where: { userId } });
            return res.json(basket);
        } catch (e) {
            res.send(e.message);
        }
    }

    async getProducts(req, res) {
        try {
            const { basketId } = req.body;
            let basketProducts = BasketProduct.findAll({
                where: { basketId },
            });
            return res.json(basketProducts);
        } catch (e) {
            res.send(e.message);
        }
    }

    async addOneProduct(req, res) {
        try {
            const { productId } = req.params;
            const { basketId } = req.body;

            const basketProduct = await BasketProduct.findOne({
                where: { productId, basketId },
            });

            if (!basketProduct) {
                basketProduct = await BasketProduct.create({
                    productId,
                    basketId,
                });
            }

            return res.json(basketProduct);
        } catch (e) {
            res.send(e.message);
        }
    }
}

module.exports = new BasketController();
