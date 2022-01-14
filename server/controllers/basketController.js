const ApiError = require("../error/ApiError");
const {
    Basket,
    BasketProduct,
    ProductVersion,
    Product,
} = require("../models/models");

class BasketController {
    // creates basket for new user
    async createBasket(req, res, next) {
        try {
            const { userId } = req.body;
            await Basket.create({ userId });
            return res.send(200);
        } catch (e) {
            next(e);
        }
    }

    // returns list of products from user's the basket with extra data
    async getBasketProducts(req, res, next) {
        try {
            const { userId } = req.query;
            const basket = await Basket.findOne({ where: { userId } });
            const basketProducts = await BasketProduct.findAll({
                where: { basketId: basket.id },
            });

            // returns all products that are added to the basket
            const products = await Product.findAll({
                where: { id: basketProducts.map((bp) => bp.productId) },
            });

            // returns all versions of all products that are added to the basket
            const versions = await ProductVersion.findAll({
                where: { id: basketProducts.map((bp) => bp.versionId) },
            });

            // returns array of products with added {amount} and {versionTitle}
            const result = basketProducts.map((bp) => {
                const [product] = products.filter((obj) => {
                    return obj.id === bp.productId;
                });
                const [version] = versions.filter((obj) => {
                    return obj.id === bp.versionId;
                });
                return {
                    id: bp.productId,
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    rating: product.rating,
                    versionId: version.id,
                    versionTitle: version.title,
                    amount: bp.amount,
                    addedToBasket: bp.createdAt,
                };
            });

            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    // creates BasketProduct or increases it's {amount} param
    async addProduct(req, res, next) {
        try {
            const { userId, productId, versionId } = req.body;
            const basket = await Basket.findOne({ where: { userId } });
            const basketId = basket.id;

            const version = await ProductVersion.findOne({
                where: { id: versionId },
            });

            if (version.stock === 0)
                throw ApiError.BadRequest("Товар закончился");
            version.stock = version.stock - 1;
            await version.save();

            const basketProduct = await BasketProduct.findOne({
                where: { basketId, productId, versionId },
            });

            if (basketProduct) {
                basketProduct.amount = basketProduct.amount + 1;
                await basketProduct.save();
            } else {
                await BasketProduct.create({
                    basketId,
                    productId,
                    versionId,
                });
            }

            return res.send(200);
        } catch (e) {
            next(e);
        }
    }

    // deletes BasketProduct or lowers it's {amount} param
    async removeProduct(req, res, next) {
        try {
            const { userId, productId, versionId } = req.body;
            const basket = await Basket.findOne({ where: { userId } });
            const basketId = basket.id;

            const version = await ProductVersion.findOne({
                where: { id: versionId },
            });

            const basketProduct = await BasketProduct.findOne({
                where: { basketId, productId, versionId },
            });

            if (basketProduct) {
                basketProduct.amount = basketProduct.amount - 1;
                if (basketProduct.amount === 0) {
                    await basketProduct.destroy();
                }
                await basketProduct.save();

                version.stock = version.stock + 1;
                await version.save();
            }

            return res.send(200);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController();
