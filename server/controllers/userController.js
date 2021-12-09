const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { User } = require("../models/models");
const mailService = require("./services/mailService");
const tokenService = require("./services/tokenService");
const UserDTO = require("./DTOs/userDTO");
const { validationResult } = require("express-validator");

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest("Ошибка при валидации", errors.array())
                );
            }

            if (!email || !password) {
                return next(ApiError.BadRequest("Неверный email или пароль"));
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError.BadRequest("Email уже зарегестрирован"));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const activationLink = uuid.v4();

            const user = await User.create({
                email,
                password: hashPassword,
                role,
                activationLink,
            });

            const mail = await mailService.sendActivationLink(
                email,
                `${process.env.API_URL}/api/user/activate/${activationLink}`
            );

            const userDTO = new UserDTO(user); // id email isActivated
            const tokens = tokenService.generateTokens({ ...userDTO });
            await tokenService.saveToken(userDTO.id, tokens.refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.send({ ...tokens, user: userDTO });
        } catch (e) {
            next(e);
        }
    }

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

            const userDTO = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTO });
            await tokenService.saveToken(userDTO.id, tokens.refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({ ...tokens, user: userDTO });
        } catch (e) {
            next(e);
        }
    }

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

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) throw ApiError.BadRequest("No Refresh Token");

            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);

            if (!tokenFromDb) throw ApiError.CustomMessage("NO TOKEN FROM DB");
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }

            const user = await User.findOne({ where: { id: userData.id } });

            const userDTO = new UserDTO(user);
            const tokens = tokenService.generateTokens({ ...userDTO });
            await tokenService.saveToken(userDTO.id, tokens.refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({ ...tokens, user: userDTO });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
