const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async updateOne(req, res) {
        const id = req.params.id;
        await Type.update(req.body, { where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Type was updated successfully!",
                    });
                } else {
                    res.send({
                        message: `Cannot update Type with id = ${id}. Maybe Type was not found!`,
                    });
                }
            })
            .catch(() => {
                res.status(500).send({
                    message: "Could not update Type with id = " + id,
                });
            });
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        await Type.destroy({
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Type was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Cannot delete Type with id = ${id}. Maybe Type was not found!`,
                    });
                }
            })
            .catch(() => {
                res.status(500).send({
                    message: "Could not delete Type with id = " + id,
                });
            });
    }
}

module.exports = new TypeController();
