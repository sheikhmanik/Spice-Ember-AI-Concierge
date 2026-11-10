"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const menu_routes_1 = require("./routes/menu.routes");
const chat_routes_1 = require("./routes/chat.routes");
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default, {
    origin: true, // Allows requests from Vercel frontend and local development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});
app.register(menu_routes_1.menuRoutes);
app.register(chat_routes_1.chatRoutes);
app.get("/", async () => {
    return { message: "Server is running 🚀" };
});
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "4000", 10);
        await app.listen({ port, host: "0.0.0.0" });
        console.log("🚀 http://localhost:" + port);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};
start();
