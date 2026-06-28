const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.static("public"));

const URL = "mongodb://root:MyPass123@localhost:27017";
const client = new MongoClient(URL);

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db("usern-db");
    const data = await db.collection("users").find({}).toArray();

    // client.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    const userObj = req.body;
    console.log(req.body);

    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db("usern-db");
    const data = await db.collection("users").insertOne(userObj);

    console.log(data);
    console.log("Data inserted in DB");

    // client.close();
    res.send({message:"User added"});
  } catch(err){
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
