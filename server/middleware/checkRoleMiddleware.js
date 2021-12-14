const jwt = require("jsonwebtoken");
const tokenService = require("../controllers/services/tokenService");
const ApiError = require("../error/ApiError");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const { refreshToken } = req.cookies;
            const userData = tokenService.validateRefreshToken(refreshToken);

            if (!userData) {
                throw ApiError.UnauthorizedError();
            } else if (userData.role !== role) {
                throw ApiError.Forbidden();
            }

            req.user = userData;
            next();
        } catch (e) {
            return res(new ApiError.InternalServerError(e.message));
        }
    };
};
