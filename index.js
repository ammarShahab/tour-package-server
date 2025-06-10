require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
/* const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmunlsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; */

const uri =
  "mongodb+srv://tripNestdb:RNHIaMGFYGlF7DXG@cluster0.bmunlsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const packagesCollections = client
      .db("tripNestdb")
      .collection("packagesCollections");

    // Save data to the database
    app.post("/packages", async (req, res) => {
      const newAddedPackage = req.body;
      console.log(newAddedPackage);
      const result = await packagesCollections.insertOne(newAddedPackage);
      res.send(result);
    });

    // show featured Packages
    app.get("/featured-packages", async (req, res) => {
      const result = await packagesCollections.find().limit(6).toArray();
      console.log(result);
      res.send(result);
    });

    // show all recipes to the ui
    app.get("/recipes", async (req, res) => {
      const result = await recipesCollections.find().toArray();
      res.send(result);
    });

    // show each recipe details
    app.get("/recipes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recipesCollections.findOne(query);
      res.send(result);
    });

    // show myrecipes to ui that i added

    app.get("/recipes-email/:email", async (req, res) => {
      // console.log(req.params);

      const email = req.params.email;
      // console.log(email);
      // const query = { email: email };
      const result = await recipesCollections.find({ email: email }).toArray();
      // console.log(result);

      res.send(result);
    });

    // delete api
    app.delete("/recipes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recipesCollections.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running tour packages in server");
});

app.listen(port, () => {
  console.log(`tour packages are running on port ${port}`);
});
