import express from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { errorHandler } from "./src/middlewares/error-handler";
import { UnableToDeleteError } from "./src/errors/UnableToDeleteError";
import { ResourceNotFoundError } from "./src/errors/ResourceNotFoundError";
import { UnableToModifyError } from "./src/errors/UnableToModifyError";
import { PayloadValidationError } from "./src/errors/PayloadValidationError";
import {
  deleteOne,
  find,
  findOne,
  insertOne,
  updateOne,
} from "./src/adapters/mongo";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ShoppingLists = "shopping-lists";

app.get("/api/v1/shopping-lists", async (req, res, next) => {
  try {
    const docs = await find(ShoppingLists);
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
    const doc = await findOne(ShoppingLists, { _id: new ObjectId(id) });
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
    const result = await insertOne(ShoppingLists, { name });
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
    const result = await updateOne(
      ShoppingLists,
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
    const doc = await deleteOne(ShoppingLists, { _id: new ObjectId(id) });
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
