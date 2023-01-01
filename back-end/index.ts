import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;

const connectToMongo = async () => {
  try {
    const database = "shopping-list-app";
    const scheme = "mongodb";
    const host = "localhost";
    const port = 27017;
    const connectionString = `${scheme}://${host}:${port}`;
    const client = new MongoClient(connectionString);
    await client.connect();
    const result = client.db(database);
    return result;
  } catch (error) {
    console.error({
      message: "Cannot create Mongo client",
      description: (error as Error).message,
    });
    throw error;
  }
};

app.use(cors());
app.use(express.json());

app.get("/api/v1/shopping-lists", async (req, res) => {
  const db = await connectToMongo();
  const collection = db.collection("shopping-lists");
  const cursor = await collection.find();
  const docs = await cursor.toArray();
  res.status(200).json(docs);
});

app.get("/api/v1/shopping-lists/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Shopping list id was not provided.");
  }
  const db = await connectToMongo();
  const collection = db.collection("shopping-lists");
  const doc = await collection.findOne({ _id: new ObjectId(id) });
  if (!doc) {
    throw new Error("Could not find shopping list matching provided Id");
  }
  res.status(200).json(doc);
});

app.post("/api/v1/shopping-lists", async (req, res) => {
  const { name } = req.body;
  const db = await connectToMongo();
  const collection = db.collection("shopping-lists");
  const result = await collection.insertOne({ name, items: [] });
  res.status(201).json({ _id: result.insertedId, name, items: [] });
});

app.put("/api/v1/shopping-lists/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Shopping list id was not provided.");
  }
  const { name } = req.body;
  const db = await connectToMongo();
  const collection = db.collection("shopping-lists");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name } }
  );
  if (result.modifiedCount !== 1) {
    throw new Error("Unable to modify shopping list.");
  }
  res.status(201).json(result);
});

app.delete("/api/v1/shopping-lists/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Shopping list id was not provided.");
  }
  const db = await connectToMongo();
  const collection = db.collection("shopping-lists");
  const doc = await collection.deleteOne({ _id: new ObjectId(id) });
  if (doc.deletedCount !== 1) {
    throw new Error("Could not delete shopping list matching provided Id");
  }
  res.status(200).json(doc);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
