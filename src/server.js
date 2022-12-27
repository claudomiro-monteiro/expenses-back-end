"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
var prisma = new client_1.PrismaClient({});
app.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var expense;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.expenses.findMany()];
            case 1:
                expense = _a.sent();
                return [2 /*return*/, response.json(expense)];
        }
    });
}); });
app.get('/list', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var initialDate, finalDate, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initialDate = request.query.initialDate;
                finalDate = request.query.finalDate;
                console.log(initialDate, finalDate);
                return [4 /*yield*/, prisma.expenses.findMany({
                        where: {
                            createdAd: {
                                gte: new Date("".concat(initialDate !== null && initialDate !== void 0 ? initialDate : new Date('2022-01-01'))),
                                lte: new Date("".concat(finalDate !== null && finalDate !== void 0 ? finalDate : new Date()))
                            }
                        },
                        orderBy: {
                            createdAd: 'desc'
                        }
                    })
                    // console.log(initialDate) 
                    // console.log(finalDate)  
                ];
            case 1:
                list = _a.sent();
                // console.log(initialDate) 
                // console.log(finalDate)  
                return [2 /*return*/, response.status(200).json(list)];
        }
    });
}); });
app.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, description, type, category, price, expense;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, description = _a.description, type = _a.type, category = _a.category, price = _a.price;
                return [4 /*yield*/, prisma.expenses.create({
                        data: {
                            description: description,
                            type: type,
                            category: category,
                            price: price
                        }
                    })];
            case 1:
                expense = _b.sent();
                return [2 /*return*/, response.status(201).json(expense)];
        }
    });
}); });
app.listen(3333);
