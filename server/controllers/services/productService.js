const ApiError = require("../../error/ApiError");
const { ProductInfo, ProductVersion } = require("../../models/models");

class ProductService {
    // Destroys old ProductInfo-s and posts new ones if they are given
    async updateInfo(productId, info) {
        try {
            await ProductInfo.destroy({ where: { productId } });
            if (info) {
                info = JSON.parse(info);
                info.forEach(
                    async (i) =>
                        await ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: id,
                        })
                );
            }
        } catch (e) {
            return new Error();
        }
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

            ProductVersion.destroy({
                where: { id: deletedVersions.map((dv) => dv.id) },
            });
        } catch (e) {
            return new Error();
        }
        return wholeStock;
    }
}

module.exports = new ProductService();
