const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
mongoose.connect(
  "mongodb+srv://tradEstimate:Tradestimate1802@cluster0.h3sdezg.mongodb.net/tradEstimateDB"
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

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
