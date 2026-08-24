"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
var client_js_1 = require("../generated/prisma/client.js");
var adapter_pg_1 = require("@prisma/adapter-pg");
var adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
exports.prisma = new client_js_1.PrismaClient({
    adapter: adapter,
});
