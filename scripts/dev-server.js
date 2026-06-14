import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../api/database/newDbConnection.js";

const apiRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../api");
config({ path: path.join(apiRoot, ".env") });

const { app } = await import("../api/index.js");

try {
  await connectDB();
} catch {
  console.error("\nCould not connect to MongoDB. Check api/.env MONGO_URI.\n");
  process.exit(1);
}

const PORT = process.env.PORT || 5110;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
