import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Turn } from "../entities/Turn";
import Credential from "../entities/Credential";
import dotenv from "dotenv";

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

// Ensure all required environment variables exist
const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing environment variable: ${envVar}`);
    process.exit(1); // Stop execution if env vars are missing
  }
});

// Configuración de TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  synchronize: true, // Cambiar a false en producción
  logging: false,
  entities: [User, Turn, Credential],
  subscribers: [],
  // dropSchema: true, // Cambiar a true si deseas eliminar el esquema en cada inicio
});
