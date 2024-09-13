var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Const } from './../const.js';
import fetch from 'node-fetch';
export var Methods;
(function (Methods) {
    Methods["sendPhoto"] = "sendPhoto";
    Methods["sendMessage"] = "sendMessage";
})(Methods || (Methods = {}));
var SendMessage = /** @class */ (function () {
    function SendMessage(telegaToken, method) {
        this.method = Methods.sendMessage;
        this.telegaToken = telegaToken;
        this.method = method;
    }
    SendMessage.prototype.changeMethod = function (method) {
        this.method = method;
    };
    SendMessage.prototype.telegaUrl = function () {
        return "".concat(Const.TELEGA_URL).concat(this.telegaToken, "/").concat(this.method);
    };
    SendMessage.prototype.sendMessage = function (userId_1, data_1) {
        return __awaiter(this, arguments, void 0, function (userId, data, mode) {
            var payload, response, resData, err_1;
            if (mode === void 0) { mode = 'HTML'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        payload = __assign({ chat_id: userId, parse_mode: mode }, (!(data === null || data === void 0 ? void 0 : data.photo) ? {
                            text: data.text
                        } : {
                            caption: data.text,
                            photo: data.photo
                        }));
                        if (data.buttons.length) {
                            payload.reply_markup = JSON.stringify({
                                inline_keyboard: data.buttons.map(function (item) { return [{
                                        text: item.buttonTitle,
                                        url: item.buttonUrl
                                    }]; })
                            });
                        }
                        return [4 /*yield*/, fetch(this.telegaUrl(), {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        resData = _a.sent();
                        return [2 /*return*/, {
                                userId: userId,
                                status: true,
                                resData: resData
                            }];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                userId: userId,
                                status: false,
                                resData: err_1
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SendMessage.prototype.sendMessages = function (userIds_1, data_1) {
        return __awaiter(this, arguments, void 0, function (userIds, data, mode) {
            var response, _i, userIds_2, userId, messageData, err_2;
            if (mode === void 0) { mode = 'HTML'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        response = [];
                        _i = 0, userIds_2 = userIds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < userIds_2.length)) return [3 /*break*/, 4];
                        userId = userIds_2[_i];
                        return [4 /*yield*/, this.sendMessage(userId, data, mode)];
                    case 2:
                        messageData = _a.sent();
                        response.push(messageData);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, response];
                    case 5:
                        err_2 = _a.sent();
                        throw new Error("Terminal error: ".concat(err_2));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SendMessage;
}());
export { SendMessage };
