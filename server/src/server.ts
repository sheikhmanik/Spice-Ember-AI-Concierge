import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { menuRoutes } from "./routes/menu.routes";
import { chatRoutes } from "./routes/chat.routes";

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true, // Allows requests from Vercel frontend and local development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});


app.register(menuRoutes);
app.register(chatRoutes);

app.get("/", async () => {
  return { message: "Server is running 🚀" };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "4000", 10);
    await app.listen({ port, host: "0.0.0.0" });
    console.log("🚀 http://localhost:" + port);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();