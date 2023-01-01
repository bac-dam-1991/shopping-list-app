import { MongoClient } from "mongodb";

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

export const find = async (collectionName: string) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    const cursor = await collection.find();
    return await cursor.toArray();
  } catch (error) {
    console.error({
      message: "Unable to find documents",
      description: (error as Error).message,
      collectionName,
    });
    throw error;
  }
};

export const findOne = async (collectionName: string, filter: object) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    return await collection.findOne({ ...filter });
  } catch (error) {
    console.error({
      message: "Unable to find document",
      description: (error as Error).message,
      collectionName,
      filter,
    });
    throw error;
  }
};

export const insertOne = async (collectionName: string, document: object) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    return await collection.insertOne({ ...document });
  } catch (error) {
    console.error({
      message: "Unable to insert document",
      description: (error as Error).message,
      collectionName,
      document,
    });
    throw error;
  }
};

export const updateOne = async (
  collectionName: string,
  filter: object,
  document: object
) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    return await collection.updateOne({ ...filter }, { ...document });
  } catch (error) {
    console.error({
      message: "Unable to update document",
      description: (error as Error).message,
      collectionName,
      document,
      filter,
    });
    throw error;
  }
};

export const deleteOne = async (collectionName: string, filter: object) => {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    return await collection.deleteOne({ ...filter });
  } catch (error) {
    console.error({
      message: "Unable to delete document",
      description: (error as Error).message,
      collectionName,
      filter,
    });
    throw error;
  }
};
