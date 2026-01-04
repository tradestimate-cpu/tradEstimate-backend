const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
mongoose.connect(
  "mongodb+srv://trdEstimate:Tradestimate1802@cluster0.h3sdezg.mongodb.net/tradEstimateDB"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err.message));


// SCHEMA & MODEL
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  mobile: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/contact", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ message: "Saved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/test-db", async (req, res) => {
  await Contact.create({
    name: "Test User",
    email: "test@test.com",
    mobile: "9999999999",
    message: "Test entry from API"
  });
  res.send("Test data inserted");
});
app.get("/__debug_insert__", async (req, res) => {
  try {
    const doc = await Contact.create({
      name: "DEBUG USER",
      email: "debug@test.com",
      mobile: "1111111111",
      message: "This is a forced debug insert"
    });

    res.json({
      success: true,
      id: doc._id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
