import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.DB_CON!;

export async function connectToDb() {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connesso a MongoDB con Mongoose');
    } catch (error) {
        console.error('Errore di connessione a MongoDB:', error);
        process.exit(1);
    }
}

export async function closeDbConnection() {
    try {
        await mongoose.connection.close();
        console.log('Connessione a MongoDB chiusa');
    } catch (error) {
        console.error('Errore durante la chiusura della connessione:', error);
    }
}
