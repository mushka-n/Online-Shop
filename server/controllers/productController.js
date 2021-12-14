const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { Product, ProductInfo, ProductVersion } = require("../models/models");
const ApiError = require("../error/ApiError");
const productService = require("./services/productService");

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, versions } = req.body;
            const { img } = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            let wholeStock = 0;
            if (versions) {
                versions = JSON.parse(versions);
                versions.forEach((v) => {
                    wholeStock += parseInt(v.stock);
                });
            }

            const product = await Product.create({
                name,
                price,
                brandId,
                typeId,
                stock: wholeStock,
                img: fileName,
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id,
                    })
                );
            }

            if (versions) {
                versions.forEach((v) => {
                    wholeStock += parseInt(v.stock);
                    ProductVersion.create({
                        title: v.title,
                        stock: v.stock,
                        productId: product.id,
                    });
                });
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
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
        } else if (brandId && !typeId) {
            products = await Product.findAndCountAll({
                where: { brandId },
                limit,
                offset,
            });
        } else if (!brandId && typeId) {
            products = await Product.findAndCountAll({
                where: { typeId },
                limit,
                offset,
            });
        } else if (brandId && typeId) {
            products = await Product.findAndCountAll({
                where: { brandId, typeId },
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

    // Update Single Product
    async updateOne(req, res) {
        try {
            const id = req.params.id;
            let { name, price, brandId, typeId, info, versions } = req.body;
            const updatedProduct = { name, price, brandId, typeId };

            // If Image Is Provided
            if (req.files) {
                // Add New Image To Params To Update
                const { img } = req.files;
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, "..", "static", fileName));
                updatedProduct.img = fileName;

                // Destroy Old Image
                const oldProduct = await Product.findOne({ where: { id } });
                const oldImg = oldProduct.img;
                let filePath = path.resolve(__dirname, "..", "static", oldImg);
                fs.unlinkSync(filePath);
            }

            await productService.updateInfo(id, info);
            const stock = await productService.updateVersions(id, versions);
            updatedProduct.stock = stock;
            await Product.update(updatedProduct, { where: { id } });

            return res.send(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;

            const oldProduct = await Product.findOne({ where: { id } });
            const oldImg = oldProduct.img;
            let filePath = path.resolve(__dirname, "..", "static", oldImg);
            fs.unlinkSync(filePath);

            await Product.destroy({ where: { id: id } });
            await ProductInfo.destroy({ where: { productId: id } });
            await ProductVersion.destroy({ where: { productId: id } });
            res.send(200);
        } catch (e) {
            res.send(e.message);
        }
    }
}

module.exports = new ProductController();
