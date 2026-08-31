import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

const MONGODB_URI = process.env.MONGODB_URI;

dotenv.config();
const client = new MongoClient(MONGODB_URI, { maxPoolSize: 10 });
export const db = client.db('sonora');

export const connectDB = () => client.connect();


