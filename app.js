const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");

const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/fullstackdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Try again later."
});

app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Temporary messages storage (keeps your old Task 5 working)
let messages = [];

// Contact Form API
app.post("/api/contact", (req, res) => {
    messages.push(req.body);
    res.json({
        message: "Message Saved Successfully",
        data: req.body
    });
});

app.get("/api/messages", (req, res) => {
    res.json(messages);
});

// Authentication Routes
app.use("/auth", authRoutes);

app.use("/api/github", weatherRoutes);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});