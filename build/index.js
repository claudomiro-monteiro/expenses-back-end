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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3333;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient({});
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield prisma.expenses.findMany();
    return response.json(expense);
}));
app.get('/list', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { initialDate } = request.query;
    const { finalDate } = request.query;
    const list = yield prisma.expenses.findMany({
        where: {
            createdAd: {
                gte: new Date(`${initialDate !== null && initialDate !== void 0 ? initialDate : new Date('2022-01-01')}`),
                lte: new Date(`${finalDate !== null && finalDate !== void 0 ? finalDate : new Date()}`),
            },
        },
        orderBy: {
            createdAd: 'desc'
        }
    });
    return response.status(200).json(list);
}));
app.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, type, category, price } = request.body;
    const expense = yield prisma.expenses.create({
        data: {
            description,
            type,
            category,
            price
        }
    });
    return response.status(201).json(expense);
}));
app.listen(PORT, () => {
    console.log(`Api running in PORT ${PORT}`);
});
