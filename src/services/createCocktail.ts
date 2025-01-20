import { Cocktail, ICocktail } from "../models/Cocktail";

export async function createCocktail(
    title: string,
    image: string,
    ingredients: { name: string; quantity: string }[]
): Promise<ICocktail> {
    const newCocktail = new Cocktail({
        title,
        image,
        ingredients,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return await newCocktail.save(); 
}

export async function getCocktails(): Promise<ICocktail[]> {
    return await Cocktail.find().lean();
}

export async function getCocktailById(cocktailId: string): Promise<ICocktail | null> {
    return await Cocktail.findById(cocktailId).lean();
}


export async function updateCocktail(
    cocktailId: string,
    updatedData: Partial<{ title: string; image: string; ingredients: { name: string; quantity: string }[] }>
): Promise<boolean> {
    const result = await Cocktail.findByIdAndUpdate(
        cocktailId,
        { ...updatedData, updatedAt: new Date() }, 
        { new: true } 
    );
    return result !== null; 
}


export async function deleteCocktail(cocktailId: string): Promise<boolean> {
    const result = await Cocktail.findByIdAndDelete(cocktailId); 
    return result !== null; 
}
