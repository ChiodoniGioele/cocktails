import mongoose, { Schema, Document } from 'mongoose';

export interface ICocktail extends Document {
    title: string;
    image: string;
    ingredients: { name: string; quantity: string }[];
    createdAt: Date;
    updatedAt: Date;
}

const cocktailSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Cocktail = mongoose.model<ICocktail>('Cocktail', cocktailSchema);
