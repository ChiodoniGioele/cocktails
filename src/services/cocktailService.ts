import axios from 'axios';
import { Cocktail } from '../types/cocktail';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.COCKTAILS_API_URL!;
const API_KEY = process.env.API_KEY!;

export const searchCocktailByName = async (name: string): Promise<Cocktail[]> => {
    const response = await axios.get(`${API_URL}/search.php?s=${name}&apiKey=${API_KEY}`);
    return response.data.drinks || [];
};

export const searchCocktailByIngredient = async (ingredient: string): Promise<Cocktail[]> => {
    try {
        const response = await axios.get(`${API_URL}/filter.php?i=${ingredient}&apiKey=${API_KEY}`);
        if (response.data && response.data.drinks) {
            return response.data.drinks;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Errore nella ricerca dei cocktail:', error);
        return [];
    }
};

export const searchCocktailsContainsName = async (name: string) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?s=${name}`);
        const cocktails = response.data.drinks || [];
        return cocktails.filter((cocktail: any) =>
            cocktail.strDrink.toLowerCase().includes(name.toLowerCase())
        );
    } catch (error) {
        console.error('Errore nella ricerca dei cocktail:', error);
        return [];
    }
};

export const searchIngredientsContainsName = async (name: string) => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?i=${name}`);
        const ingredients = response.data.ingredients || [];
        return ingredients.filter((ingredient: any) =>
            ingredient.strIngredient.toLowerCase().includes(name.toLowerCase())
        );
    } catch (error) {
        console.error('Errore nella ricerca degli ingredienti:', error);
        return [];
    }
};


export async function getCocktailDetails(cocktailId: string) {
    try {
        const response = await axios.get(`${API_URL}/lookup.php?i=${cocktailId}&apiKey=${API_KEY}`);
        if (response.data && response.data.drinks && response.data.drinks.length > 0) {
            const cocktail = response.data.drinks[0];
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                const measure = cocktail[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push({
                        name: ingredient,
                        quantity: measure || 'N/A'
                    });
                }
            }
            return { ingredients };
        } else {
            throw new Error('Cocktail non trovato');
        }
    } catch (error) {
        console.error('Errore nel recupero dei dettagli del cocktail:', error);
        throw new Error('Errore nel recupero dei dettagli del cocktail');
    }
}
