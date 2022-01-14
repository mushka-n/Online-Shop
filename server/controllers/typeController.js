const { Type } = require("../models/models");
const imgService = require("./services/imgService");

class TypeController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const { icon } = req.files;

            const fileName = imgService.addImg(icon, ".png");
            await Type.create({ name, icon: fileName });

            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.json(types);
        } catch (e) {
            next(e);
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const type = await Type.findOne({ where: { id } });
            if (req.files) {
                const { icon } = req.files;
                imgService.updateImg(icon, type.icon);
            }

            await type.update({ name });
            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            const type = await Type.findOne({ where: { id } });
            imgService.deleteImg(type.icon);
            await type.destroy();
            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TypeController();
