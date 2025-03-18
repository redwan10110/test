import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./server";
import { config } from "./config/envs";

const PORT = config.port || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connection successful!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
