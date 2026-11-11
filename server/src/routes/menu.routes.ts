import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fs from "fs";
import path from "path";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  dietary: string;
  allergens: string[];
  spiceLevel?: string;
  isFeatured?: boolean;
  image?: string;
}

interface MenuData {
  restaurant: Record<string, any>;
  categories: string[];
  dietaryOptions: string[];
  items: MenuItem[];
}

function getMenuData(): MenuData {
  // Resolves relative to the server project root regardless of src vs dist compilation
  const possiblePaths = [
    path.join(process.cwd(), 'src/data/menu.json'),
    path.join(process.cwd(), 'data/menu.json'),
    path.join(__dirname, '../data/menu.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    }
  }

  throw new Error(`menu.json could not be located in any known path from ${process.cwd()}`);
}

export async function menuRoutes(app: FastifyInstance) {
  // GET /api/menu - Full menu dataset
  app.get("/api/menu", async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const menuData = getMenuData();
      return reply.send(menuData);
    } catch (err) {
      app.log.error("Failed to load menu data: " + (err as Error).message);
      return reply.status(500).send({ error: "Failed to load menu data" });
    }
  });

  // GET /api/menu/items - Filtered menu items
  app.get("/api/menu/items", async (req: FastifyRequest<{
    Querystring: { category?: string; dietary?: string; search?: string }
  }>, reply: FastifyReply) => {
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
        items = items.filter(
          (i) =>
            i.name.toLowerCase().includes(query) ||
            i.description.toLowerCase().includes(query) ||
            i.category.toLowerCase().includes(query)
        );
      }

      return reply.send(items);
    } catch (err) {
      app.log.error("Failed to filter menu items: " + (err as Error).message);
      return reply.status(500).send({ error: "Failed to fetch menu items" });
    }
  });

  // GET /api/menu/featured - Featured dishes
  app.get("/api/menu/featured", async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const menuData = getMenuData();
      const featured = menuData.items.filter((i) => i.isFeatured);
      // Fallback to first 6 items if no explicit flags
      return reply.send(featured.length > 0 ? featured : menuData.items.slice(0, 6));
    } catch (err) {
      app.log.error("Failed to fetch featured menu items: " + (err as Error).message);
      return reply.status(500).send({ error: "Failed to fetch featured items" });
    }
  });

  // GET /api/menu/categories - Category list
  app.get("/api/menu/categories", async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const menuData = getMenuData();
      return reply.send(menuData.categories);
    } catch (err) {
      return reply.status(500).send({ error: "Failed to fetch categories" });
    }
  });

  // GET /api/menu/items/:id - Get single item by ID
  app.get("/api/menu/items/:id", async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const menuData = getMenuData();
      const item = menuData.items.find((i) => i.id === req.params.id);
      if (!item) {
        return reply.status(404).send({ error: "Menu item not found" });
      }
      return reply.send(item);
    } catch (err) {
      return reply.status(500).send({ error: "Failed to fetch menu item" });
    }
  });
}