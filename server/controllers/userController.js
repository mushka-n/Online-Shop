const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { User } = require("../models/models");
const mailService = require("./services/mailService");
const tokenService = require("./services/tokenService");
const { validationResult } = require("express-validator");

class UserController {
    // creates new User and JWT tokens and returns them
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest(
                    "Ошибка при валидации",
                    errors.array()
                );
            }

            const { email, password, role } = req.body;
            if (!email || !password) {
                throw ApiError.BadRequest("Неверный email или пароль");
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                throw ApiError.BadRequest("Email уже зарегестрирован");
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const activationLink = uuid.v4();
            const user = await User.create({
                email,
                password: hashPassword,
                role,
                activationLink,
            });

            // await mailService.sendActivationLink(
            //     email,
            //     `${process.env.API_URL}/api/user/activate/${activationLink}`
            // );

            const data = tokenService.saveResults(res, user);
            return res.send(data);
        } catch (e) {
            next(e);
        }
    }

    // creates JWT tokens and returns them and existing User
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.BadRequest("Пользователь не найден"));
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.BadRequest("Указан неверный пароль"));
            }
            const data = tokenService.saveResults(res, user);
            return res.send(data);
        } catch (e) {
            next(e);
        }
    }

    // clears user's cookies and deletes Refresh Token from DB
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const num = await tokenService.removeToken(refreshToken);
            if (num != 1) throw ApiError.UnauthorizedError();
            res.clearCookie("refreshToken");
            return res.json({ message: "Successful logout" });
        } catch (e) {
            next(e);
        }
    }

    // activates user's account from activation link
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({
                where: { activationLink: activationLink },
            });
            if (!user) {
                return next(
                    ApiError.BadRequest("Некорректная ссылка активации")
                );
            }
            user.update({ isActivated: true });
            res.send(user);
        } catch (e) {
            next(e);
        }
    }

    // creates JWT tokens for authorized user and returns them and user data
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);

            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }

            const user = await User.findOne({ where: { id: userData.id } });

            const data = tokenService.saveResults(res, user);
            return res.send(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
