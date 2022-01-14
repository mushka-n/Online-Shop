const {
    Product,
    ProductInfo,
    ProductVersion,
    Comment,
    BasketProduct,
} = require("../models/models");
const productService = require("./services/productService");
const Op = require("sequelize").Op;
const imgService = require("./services/imgService");

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, versions } = req.body;

            const productBody = { name, price, brandId, typeId, img: "" };
            const product = await Product.create(productBody);
            const id = product.id;

            const { img } = req.files;
            const fileName = imgService.addImg(img);

            await productService.createInfo(id, info);
            const stock = await productService.createVersions(id, versions);

            await product.update({ img: fileName, stock });
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({
                where: { brandId },
                limit,
                offset,
            });
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({
                where: { typeId },
                limit,
                offset,
            });
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({
                where: { typeId, brandId },
                limit,
                offset,
            });
        }
        return res.json(products);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [
                { model: ProductInfo, as: "info" },
                { model: ProductVersion, as: "versions" },
            ],
        });
        return res.json(product);
    }

    async updateOne(req, res) {
        try {
            const id = req.params.id;
            let { name, price, brandId, typeId, info, versions } = req.body;

            const product = await Product.findOne({ where: { id } });
            if (req.files) {
                const { img } = req.files;
                imgService.updateImg(img, product.img);
            }

            await productService.updateInfo(id, info);
            const stock = await productService.updateVersions(id, versions);

            await product.update({ name, price, brandId, typeId, stock });
            return res.send(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;

            await BasketProduct.destroy({ where: { productId: id } });
            await Comment.destroy({ where: { productId: id } });
            productService.deleteInfo(id);
            productService.deleteVersions(id);

            const product = await Product.findOne({ where: { id } });
            imgService.deleteImg(product.img);
            await product.destroy();

            res.send(200);
        } catch (e) {
            res.send(e.message);
        }
    }

    // Comments

    async addComment(req, res) {
        try {
            const { userId, productId, message, rate } = req.body;

            const product = await Product.findOne({ where: { id: productId } });

            const oldOverallRating = product.rating;
            const oldRatings = await Comment.findAndCountAll({
                where: { productId, rate: { [Op.not]: null } },
            });

            const newOverallRating =
                Math.floor(
                    ((oldOverallRating * oldRatings.count + rate) /
                        (oldRatings.count + 1)) *
                        100
                ) / 100;

            await Comment.create({ userId, productId, rate, message });

            await Product.update(
                { rating: newOverallRating },
                { where: { id: productId } }
            );

            return res.json(newOverallRating);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req, res) {
        try {
            const { commentId } = req.body;
            await Comment.destroy({ where: { id: commentId } });
            return res.send(200);
        } catch (e) {
            next(e);
        }
    }

    async getComments(req, res) {
        const productId = +req.params.productId;
        const comments = await Comment.findAndCountAll({
            where: { productId },
        });
        return res.json(comments);
    }
}

module.exports = new ProductController();
