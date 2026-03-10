// server/seed/clearDb.js
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const collectionsToClear = ["users", "stores", "menuitems", "orders"];

async function clearDatabase() {
  try {
    const envPath = path.resolve(__dirname, "../../.env");

    if (!process.env.MONGO_URI) {
      throw new Error(`MONGO_URI is missing in ${envPath}`);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const db = mongoose.connection.db;
    const existingCollections = await db.listCollections().toArray();
    const existingNames = new Set(existingCollections.map((c) => c.name));

    for (const name of collectionsToClear) {
      if (existingNames.has(name)) {
        await db.collection(name).drop();
        console.log(`Dropped collection: ${name}`);
      } else {
        console.log(`Skipped missing collection: ${name}`);
      }
    }

    console.log("Database cleanup complete");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Failed to clear database:", error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

clearDatabase();
