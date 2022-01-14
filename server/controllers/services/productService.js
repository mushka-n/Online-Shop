const { ProductInfo, ProductVersion } = require("../../models/models");

class ProductService {
    // Info

    async createInfo(productId, info) {
        if (info) {
            info = JSON.parse(info);
            info.forEach(
                async (i) =>
                    await ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId,
                    })
            );
        }
    }

    async updateInfo(productId, info) {
        try {
            await this.deleteInfo(productId);
            await this.createInfo(productId, info);
        } catch (e) {
            return new Error();
        }
    }

    async deleteInfo(productId) {
        await ProductInfo.destroy({ where: { productId } });
    }

    // Versions

    async createVersions(productId, versions) {
        let stock = 0;
        if (versions) {
            versions = JSON.parse(versions);
            versions.forEach((v) => {
                stock += parseInt(v.stock);
                ProductVersion.create({
                    title: v.title,
                    stock: v.stock,
                    productId,
                });
            });
        }
        return stock;
    }

    async updateVersions(productId, versions) {
        let wholeStock = 0;
        try {
            if (versions) {
                versions = JSON.parse(versions);
                versions.forEach(async (v) => {
                    wholeStock += parseInt(v.stock);
                    await ProductVersion.update(
                        {
                            stock: v.stock,
                            title: v.title,
                        },
                        { where: { id: v.id } }
                    );
                });
            }

            const allVersions = await ProductVersion.findAll({
                where: { productId },
            });

            const deletedVersions = allVersions.filter((allV) => {
                return !versions.find((v) => allV.id === v.id);
            });

            await ProductVersion.destroy({
                where: { id: deletedVersions.map((dv) => dv.id) },
            });
        } catch (e) {
            return new Error();
        }
        return wholeStock;
    }

    async deleteVersions(productId) {
        await ProductVersion.destroy({ where: { productId } });
    }
}

module.exports = new ProductService();
