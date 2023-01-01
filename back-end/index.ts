import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import { errorHandler } from "./src/middlewares/error-handler";
import { UnableToDeleteError } from "./src/errors/UnableToDeleteError";
import { ResourceNotFoundError } from "./src/errors/ResourceNotFoundError";
import { UnableToModifyError } from "./src/errors/UnableToModifyError";
import { PayloadValidationError } from "./src/errors/PayloadValidationError";
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

app.get("/api/v1/shopping-lists", async (req, res, next) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection("shopping-lists");
    const cursor = await collection.find();
    const docs = await cursor.toArray();
    res.status(200).json(docs);
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/shopping-lists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new PayloadValidationError("Shopping list id was not provided.");
    }
    const db = await connectToMongo();
    const collection = db.collection("shopping-lists");
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) {
      throw new ResourceNotFoundError(
        "Could not find shopping list matching provided Id"
      );
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

app.post("/api/v1/shopping-lists", async (req, res, next) => {
  try {
    const { name } = req.body;
    const db = await connectToMongo();
    const collection = db.collection("shopping-lists");
    const result = await collection.insertOne({ name, items: [] });
    res.status(201).json({ _id: result.insertedId, name, items: [] });
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/shopping-lists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new PayloadValidationError("Shopping list id was not provided.");
    }
    const { name } = req.body;
    const db = await connectToMongo();
    const collection = db.collection("shopping-lists");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name } }
    );
    if (result.modifiedCount !== 1) {
      throw new UnableToModifyError("Unable to modify shopping list.");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/v1/shopping-lists/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new PayloadValidationError("Shopping list id was not provided.");
    }
    const db = await connectToMongo();
    const collection = db.collection("shopping-lists");
    const doc = await collection.deleteOne({ _id: new ObjectId(id) });
    if (doc.deletedCount !== 1) {
      throw new UnableToDeleteError(
        "Could not delete shopping list matching provided Id."
      );
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
