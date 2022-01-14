const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

class ImgService {
    addImg(img, extension = ".jpg") {
        try {
            const fileName = uuid.v4() + extension;
            img.mv(path.resolve(__dirname, "../..", "static", fileName));
            return fileName;
        } catch (e) {
            return new Error(e);
        }
    }

    updateImg(newImg, imgName) {
        try {
            const imgPath = path.resolve(__dirname, "../..", "static", imgName);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
            newImg.mv(imgPath);
        } catch (e) {
            throw new Error(e);
        }
    }

    deleteImg(img) {
        try {
            const imgPath = path.resolve(__dirname, "../..", "static", img);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new ImgService();
