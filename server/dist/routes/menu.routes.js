"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRoutes = menuRoutes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function menuRoutes(app) {
    app.get("/api/menu", async (_req, reply) => {
        try {
            const menuPath = fs_1.default.existsSync(path_1.default.join(__dirname, "../data/menu.json"))
                ? path_1.default.join(__dirname, "../data/menu.json")
                : path_1.default.join(__dirname, "../../src/data/menu.json");
            const raw = fs_1.default.readFileSync(menuPath, "utf8");
            const menuData = JSON.parse(raw);
            app.log.info("Menu data loaded successfully from " + menuPath);
            return reply.send(menuData);
        }
        catch (err) {
            app.log.error("Failed to load menu data: " + err.message);
            return reply.status(500).send({ error: "Failed to load menu data" });
        }
    });
}
