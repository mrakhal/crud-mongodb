const express = require("express");
const httpServer = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 2021;

const app = express();
app.use(cors());
app.use(express.json());

const server = httpServer.createServer(app);

server.listen(PORT, () => console.log("Connect MongoDB", PORT));

app.get("/", (req, res) => {
  res.status(200).send(`<h4>CRUD Mongo API</h4>`); //HTML awal pengaksesan domain
});

//config mongodb

let { MongoClient, ObjectID } = require("mongodb");
let urlConnection = `mongodb+srv://mrakhalf-5293:q1r58sv4123@mongo-mrakhalf.oyuby.mongodb.net/toko?retryWrites=true&w=majority`;

let mongo = new MongoClient(urlConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongo.connect((err, results) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MongoDB Server");
});

app.post("/add-data", (req, res) => {
  mongo.connect((err, connectdb) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    const db = connectdb.db("toko");
    db.collection("messages").insertMany([req.body], (errInsert, results) => {
      if (err) {
        console.log(errInsert);
        res.status(500).send(err);
      }
      console.log("Insert Success");
      res.status(200).send(results);
    });
  });
});

app.get("/get-data", (req, res) => {
  mongo.connect((err, connectdb) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    const db = connectdb.db("toko");
    db.collection("messages")
      .find({})
      .toArray((errGet, results) => {
        if (errGet) {
          console.log(errGet);
          res.status(500).send(errGet);
        }
        res.status(200).send(results);
      });
  });
});

app.patch("/update-data", (req, res) => {
  mongo.connect((err, connectdb) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    const db = connectdb.db("toko");
    db.collection("messages").updateOne(
      { id: req.body.id },
      { $set: { nama: req.body.nama, usia: req.body.usia } },
      (errUpdate, results) => {
        if (errUpdate) {
          console.log(errUpdate);
          res.status(500).send(errUpdate);
        }
        res.status(200).send(results);
      }
    );
  });
});

app.delete("/delete-data", (req, res) => {
  mongo.connect((err, connectdb) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    const db = connectdb.db("toko");
    db.collection("messages").deleteOne(
      { id: req.body.id },
      (errDelete, results) => {
        if (errDelete) {
          console.log(errDelete);
          res.status(500).send(errDelete);
        }
        res.status(200).send(results);
      }
    );
  });
});

// app.listen(PORT, () => console.log(`API Mongo is Running : ${PORT}`));
