const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { Product, ProductInfo, ProductVersion } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, versions } = req.body;
            const { img } = req.files;

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const product = await Product.create({
                name,
                price,
                brandId,
                typeId,
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
                versions = JSON.parse(versions);
                versions.forEach((v) =>
                    ProductVersion.create({
                        title: v.title,
                        productId: product.id,
                    })
                );
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
        const id = req.params.id;
        let { name, price, brandId, typeId, info, versions } = req.body;
        let updatedProduct = { name, price, brandId, typeId };

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

        // Update Product
        await Product.update(updatedProduct, { where: { id } });

        // Destroy Old Info
        await ProductInfo.destroy({ where: { productId: id } })
            .then(() => {
                // If Info Is Given Post It Into Database
                if (info) {
                    info = JSON.parse(info);

                    info.forEach((i) =>
                        ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: id,
                        })
                    );
                }

                return res.send({ message: "all good" });
            })
            .catch(() => {});

        await ProductVersion.destroy({ where: { productId: id } }).then(() => {
            // If Versions Are Given Post It Into Database
            if (versions) {
                versions = JSON.parse(versions);

                versions.forEach((v) =>
                    ProductVersion.create({
                        title: v.title,
                        productId: id,
                    })
                );
            }

            return res.send({ message: "all good" });
        });
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
            res.send({ message: "all good" });
        } catch (e) {
            res.send(e.message);
        }
    }
}

module.exports = new ProductController();
