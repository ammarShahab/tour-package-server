require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bmunlsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const tourPackagesCollections = client
      .db("tripNestdb")
      .collection("packagesCollections");

    const myBookingsCollections = client
      .db("tripNestdb")
      .collection("bookingsCollections");

    // Save data to the database
    app.post("/packages", async (req, res) => {
      const newAddedPackage = req.body;
      // console.log(newAddedPackage);
      const result = await tourPackagesCollections.insertOne(newAddedPackage);
      res.send(result);
    });

    // show featured Packages
    app.get("/featured-packages", async (req, res) => {
      const result = await tourPackagesCollections.find().limit(6).toArray();
      // console.log(result);
      res.send(result);
    });

    // show all packages to the ui
    app.get("/packages", async (req, res) => {
      const { searchParams } = req.query;
      let query = {};

      if (searchParams) {
        query = { tour_name: { $regex: searchParams, $options: "i" } };
      }
      // console.log(searchParams);

      const result = await tourPackagesCollections.find(query).toArray();
      res.send(result);
    });

    // show each package details and also for update package for primarily get the data from db
    app.get("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tourPackagesCollections.findOne(query);
      res.send(result);
    });

    // update my packages api
    app.put("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const {
        tour_name,
        image,
        duration,
        departure,
        destination,
        departure_date,
        price,
        package_details,
        guide_contact_no,
      } = req.body;
      // console.log(req.body);
      const updatedPackage = {
        $set: {
          tour_name: tour_name,
          image: image,
          duration: duration,
          departure: departure,
          destination: destination,
          price: price,
          departure_date: departure_date,
          package_details: package_details,
          guide_contact_no: guide_contact_no,
        },
      };
      const result = await tourPackagesCollections.updateOne(
        query,
        updatedPackage
      );
      res.send(result);
    });

    // show my added packages in ui

    app.get("/manage-myPackages/:email", async (req, res) => {
      // console.log(req.params);

      const email = req.params.email;
      console.log(email);
      const query = { guide_email: email };
      const result = await tourPackagesCollections.find(query).toArray();
      console.log(result);

      res.send(result);
    });

    // delete api
    app.delete("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tourPackagesCollections.deleteOne(query);
      res.send(result);
    });

    // save my Bookings Collections in db
    app.post("/bookings/:packageId", async (req, res) => {
      const myBooking = req.body;
      const result = await myBookingsCollections.insertOne(myBooking);

      const id = req.params.packageId;
      const query = { _id: new ObjectId(id) };

      if (result.acknowledged) {
        await tourPackagesCollections.updateOne(query, {
          $inc: {
            bookingCount: +1,
          },
        });
      }
      res.send(result);
    });

    // show my Booking collection api from db

    app.get("/my-bookings/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { buyerEmail: email };
      const result = await myBookingsCollections.find(filter).toArray();
      res.send(result);
      console.log(result);
    });

    //
    app.patch("/bookings/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      const result = await myBookingsCollections.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            status: "completed",
          },
        }
      );
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    /* console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    ); */
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
