module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static CustomMessage(message) {
        return new ApiError(500, message);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static Forbidden() {
        return new ApiError(403, "Нет прав доступа");
    }

    static InternalServerError(message) {
        return new ApiError(500, "Непредвиденная ошибка на сервере");
    }
};
