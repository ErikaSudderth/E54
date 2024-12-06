require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "REMOVED FOR GITHUB";
const MONGO_URI = "REMOVED FOR GITHUB";
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined.");
  process.exit(1);
}

app.use(bodyParser.json());
app.use(cors({ origin: "http://147.182.166.163" }));
app.use(morgan("dev"));

// Authentication routes
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "Erika" && password === "REMOVED FOR GITHUB") {
    const token = jwt.sign({ username }, "your_secret_key", {
      expiresIn: "1h"
    });
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

app.get("/api/auth/verify", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    res.status(200).json({ message: "Token valid" });
  });
});

// Middleware for protecting routes
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    req.user = decoded;
    next();
  });
};

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch(error => {
    console.error("Database connection error:", error);
  });

const CountriesSchema = new mongoose.Schema({
  country: String,
  percentage: Number
});

const CountriesCollection = mongoose.model(
  "Countries",
  CountriesSchema,
  "Countries"
);

app.get("/countryData", async (req, res) => {
  try {
    const data = await CountriesCollection.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

const ResultsSchema = new mongoose.Schema({
  drugName: String,
  percentageCellsDisplaced: Number
});

const ResultsCollection = mongoose.model("Results", ResultsSchema, "Results");

app.get("/resultsData", async (req, res) => {
  try {
    const data = await ResultsCollection.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API is running at http://0.0.0.0:${port}`);
});
