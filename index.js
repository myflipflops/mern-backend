// index.js

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const port = process.env.PORT || 5000; // Keep for local development reference

app.use(express.json());

// --- START OF CORRECTED CORS CONFIGURATION ---
// This regex allows any URL ending with 'mern-book-store-frontend' followed by an optional
// Vercel deployment hash (e.g., -gi3g) and then '.vercel.app'.
// This is the solution for your changing frontend Vercel URLs.
app.use(cors({
    origin: [
        'http://localhost:5173',                               // For local frontend development
        /^https:\/\/mern-book-store-frontend(-\w+)*\.vercel\.app$/ // Allows: https://mern-book-store-frontend.vercel.app, https://mern-book-store-frontend-gi3g.vercel.app, etc.
    ],
    credentials: true
}));
// --- END OF CORRECTED CORS CONFIGURATION ---

const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminStatsRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminStatsRoutes);

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    },
};

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.DB_URL, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Mongodb connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

connectToMongoDB();

app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
});

// --- START OF VERCEL DEPLOYMENT FIX ---
// REMOVE the app.listen(...) line, as Vercel handles this automatically
// app.listen(port, () => {
//     console.log(`Book Store Server listening on port ${port}`);
// });

// Export the Express app for Vercel's serverless function environment
module.exports = app;
// --- END OF VERCEL DEPLOYMENT FIX ---
