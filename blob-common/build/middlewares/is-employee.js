"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmployee = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const user_type_1 = require("../types/user-type");
const isEmployee = (req, res, next) => {
    var _a;
    if (req.currentUser && ((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.role) == user_type_1.UserType.CUSTOMER) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.isEmployee = isEmployee;
