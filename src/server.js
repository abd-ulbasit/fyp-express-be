import express from "express";
import { MongoClient } from "mongodb";
// import { regoRouter } from "./modules/rego.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { regoRouter } from "./modules/rego/router.js";
import { kyvernoRouter } from "./modules/kyverno/router.js";
import { utilRouter } from "./modules/util/router.js";

// Configure dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GO_BE_URL = process.env.GO_VALIDATING_URL || "http://127.0.0.1:3333";
const FAST_API_URL = process.env.FAST_API_URL || "http://127.0.0.1:8081";

// Routes

// Middleware
// add cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// MongoDB Connection URI
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "myproject";

// MongoDB Client
let db;

// Connect to MongoDB
async function connectToMongo() {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log("Connected to MongoDB successfully");

    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

// Basic routes
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/rego", regoRouter);
app.use("/kyverno", kyvernoRouter);
app.use("/util", utilRouter);

app.post("/translate", async (req, res) => {
  try {
    console.log({ body: req.body });
    console.log(req.body.kyvernoPolicy);
    // Make sure you're passing the actual request body to FastAPI
    const response = await fetch(`${FAST_API_URL}/validate`, {
      method: "POST",
      body: JSON.stringify(req.body), // Convert JS object to JSON string
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log({ data });
    res.json(data);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start server
async function startServer() {
  //   await connectToMongo();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
