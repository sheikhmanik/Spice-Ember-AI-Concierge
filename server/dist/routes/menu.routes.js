"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRoutes = menuRoutes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getMenuData() {
    const possiblePaths = [
        path_1.default.join(__dirname, "../data/menu.json"),
        path_1.default.join(__dirname, "../../src/data/menu.json"),
        path_1.default.join(process.cwd(), "src/data/menu.json"),
        path_1.default.join(process.cwd(), "data/menu.json")
    ];
    for (const menuPath of possiblePaths) {
        if (fs_1.default.existsSync(menuPath)) {
            const raw = fs_1.default.readFileSync(menuPath, "utf8");
            return JSON.parse(raw);
        }
    }
    throw new Error("menu.json file not found");
}
async function menuRoutes(app) {
    // GET /api/menu - Full menu dataset
    app.get("/api/menu", async (_req, reply) => {
        try {
            const menuData = getMenuData();
            return reply.send(menuData);
        }
        catch (err) {
            app.log.error("Failed to load menu data: " + err.message);
            return reply.status(500).send({ error: "Failed to load menu data" });
        }
    });
    // GET /api/menu/items - Filtered menu items
    app.get("/api/menu/items", async (req, reply) => {
        try {
            const menuData = getMenuData();
            let items = menuData.items;
            const { category, dietary, search } = req.query;
            if (category && category !== "All") {
                items = items.filter((i) => i.category.toLowerCase() === category.toLowerCase());
            }
            if (dietary && dietary !== "All") {
                items = items.filter((i) => i.dietary.toLowerCase() === dietary.toLowerCase());
            }
            if (search) {
                const query = search.toLowerCase();
                items = items.filter((i) => i.name.toLowerCase().includes(query) ||
                    i.description.toLowerCase().includes(query) ||
                    i.category.toLowerCase().includes(query));
            }
            return reply.send(items);
        }
        catch (err) {
            app.log.error("Failed to filter menu items: " + err.message);
            return reply.status(500).send({ error: "Failed to fetch menu items" });
        }
    });
    // GET /api/menu/featured - Featured dishes
    app.get("/api/menu/featured", async (_req, reply) => {
        try {
            const menuData = getMenuData();
            const featured = menuData.items.filter((i) => i.isFeatured);
            // Fallback to first 6 items if no explicit flags
            return reply.send(featured.length > 0 ? featured : menuData.items.slice(0, 6));
        }
        catch (err) {
            app.log.error("Failed to fetch featured menu items: " + err.message);
            return reply.status(500).send({ error: "Failed to fetch featured items" });
        }
    });
    // GET /api/menu/categories - Category list
    app.get("/api/menu/categories", async (_req, reply) => {
        try {
            const menuData = getMenuData();
            return reply.send(menuData.categories);
        }
        catch (err) {
            return reply.status(500).send({ error: "Failed to fetch categories" });
        }
    });
    // GET /api/menu/items/:id - Get single item by ID
    app.get("/api/menu/items/:id", async (req, reply) => {
        try {
            const menuData = getMenuData();
            const item = menuData.items.find((i) => i.id === req.params.id);
            if (!item) {
                return reply.status(404).send({ error: "Menu item not found" });
            }
            return reply.send(item);
        }
        catch (err) {
            return reply.status(500).send({ error: "Failed to fetch menu item" });
        }
    });
}
