const jwt = require("jsonwebtoken");
const { Token } = require("../../models/models");
const UserDTO = require("../DTOs/userDTO");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        return { accessToken, refreshToken };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId: userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        await Token.create({
            userId: userId,
            refreshToken: refreshToken,
        });
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refreshToken } });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken } });
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    saveResults(res, user) {
        const userDTO = new UserDTO(user); // id email isActivated
        const tokens = this.generateTokens({ ...userDTO });
        this.saveToken(userDTO.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return { ...tokens, user: userDTO };
    }
}

module.exports = new TokenService();
