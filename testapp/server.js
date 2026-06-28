const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.static("public"));

// Change username/password according to your MongoDB
const URL = "mongodb://admin:querty@localhost:27017/?authSource=admin";

const client = new MongoClient(URL);

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log(err);
    }
}

connectDB();

// GET Users
app.get("/getUsers", async (req, res) => {
    try {
        const db = client.db("usern-db");

        const data = await db.collection("users").find({}).toArray();

        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// ADD User
app.post("/addUser", async (req, res) => {

    try {

        const userObj = req.body;

        console.log("Received:", userObj);

        const db = client.db("usern-db");

        const result = await db.collection("users").insertOne(userObj);

        console.log(result);

        res.json({
            success: true,
            message: "User Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});