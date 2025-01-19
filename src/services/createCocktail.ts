import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.DB_CON!;
const DB_NAME = 'cocktails_db';
const COLLECTION_NAME = 'cocktails';

let client: MongoClient;

async function connectToDb() {
    if (!client) {
        client = new MongoClient(DB_URI);
        await client.connect();
        console.log('Connesso a MongoDB');
    }
    return client.db(DB_NAME).collection(COLLECTION_NAME);
}

export async function createCocktail(title: string, image: string, ingredients: { name: string; quantity: string }[]) {
    const collection = await connectToDb();
    const newCocktail = {
        title,
        image,
        ingredients,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const result = await collection.insertOne(newCocktail);
    return result.insertedId;
}

export async function getCocktails() {
    const collection = await connectToDb();
    return await collection.find().toArray();
}

export async function getCocktailById(cocktailId: string) {
    const collection = await connectToDb();
    return await collection.findOne({ _id: new ObjectId(cocktailId) });
}

export async function updateCocktail(cocktailId: string, updatedData: Partial<{ title: string; image: string; ingredients: { name: string; quantity: string }[] }>) {
    const collection = await connectToDb();
    const result = await collection.updateOne(
        { _id: new ObjectId(cocktailId) },
        { $set: { ...updatedData, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
}

export async function deleteCocktail(cocktailId: string) {
    const collection = await connectToDb();
    const result = await collection.deleteOne({ _id: new ObjectId(cocktailId) });
    return result.deletedCount > 0;
}

export async function closeDbConnection() {
    if (client) {
        await client.close();
        console.log('Connessione a MongoDB chiusa');
    }
}
