import { Request, Response } from 'express';
import * as cocktailService from '../services/cocktailService';
import { Cocktail } from '../types/cocktail';

export const searchCocktail = async (req: Request, res: Response): Promise<void> => {
    const name: string = req.query.name as string;

    let cocktails: Cocktail[] = [];
    if (name) {
        cocktails = await cocktailService.searchCocktailByName(name);
        cocktails.concat(await cocktailService.searchCocktailByIngredient(name));
    }

    res.render('home', { cocktails });
};

export const searchSuggestions = async (req: Request, res: any): Promise<void> => {
    const query: string = req.query.q as string;

    if (!query) {
        return res.json({ cocktails: [], ingredients: [] });
    }

    try {
        const cocktailsByName = await cocktailService.searchCocktailsContainsName(query);
        const cocktailsByIngredient = await cocktailService.searchIngredientsContainsName(query);

        res.json({
            cocktails: cocktailsByName.map((cocktail: any) => cocktail.strDrink),
            ingredients: cocktailsByIngredient.map((ingredient: any) => ingredient.strIngredient),
        });
    } catch (error) {
        console.error('Errore durante la ricerca delle suggestioni:', error);
        res.json({ cocktails: [], ingredients: [] });
    }
};


export const getCocktailDetails = async (req: Request, res: Response): Promise<void> => {
    const cocktailId: string = req.params.id;

    try {
        const cocktailDetails = await cocktailService.getCocktailDetails(cocktailId);
        res.json(cocktailDetails);
    } catch (error) {
        console.error('Errore nel recupero dei dettagli del cocktail:', error);
        res.status(500).json({ error: 'Errore nel recupero dei dettagli' });
    }
};