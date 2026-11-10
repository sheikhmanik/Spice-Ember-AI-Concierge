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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
});


app.register(menuRoutes);
app.register(chatRoutes);

app.get("/", async () => {
  return { message: "Server is running 🚀" };
});

const PORT = Number(process.env.PORT) || 4000;
const HOST = '0.0.0.0';

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`🚀 http://${HOST}:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();