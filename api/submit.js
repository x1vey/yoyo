import { MongoClient } from "mongodb";

const uri = "YOUR_MONGODB_ATLAS_CONNECTION_STRING"; // <-- CHANGE THIS
const dbName = "mywebsite"; // <-- CHANGE THIS if your DB name is different
const collectionName = "submissions"; // <-- CHANGE THIS if your collection is different

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    await db.collection(collectionName).insertOne({ name, email, createdAt: new Date() });
    await client.close();
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error.message });
  }
}
