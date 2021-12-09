const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async updateOne(req, res) {
        const id = req.params.id;
        await Brand.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Brand was updated successfully!",
                    });
                } else {
                    res.send({
                        message: `Cannot update Brand with id = ${id}. Maybe Brand was not found!`,
                    });
                }
            })
            .catch(() => {
                res.status(500).send({
                    message: "Could not update Brand with id = " + id,
                });
            });
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        await Brand.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Brand was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Cannot delete Brand with id = ${id}. Maybe Brand was not found!`,
                    });
                }
            })
            .catch(() => {
                res.status(500).send({
                    message: "Could not delete Brand with id = " + id,
                });
            });
    }
}

module.exports = new BrandController();
