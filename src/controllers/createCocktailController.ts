import { Request, Response } from 'express';
import { 
    createCocktail, 
    deleteCocktail, 
    getCocktailById, 
    getCocktails, 
    updateCocktail 
} from '../services/createCocktail';

export const createCocktailHandler = async (req: Request, res: Response): Promise<void> => {
    const { title, ingredients } = req.body;
    const image = req.file?.path || '';

    try {
        await createCocktail(title, image, ingredients);
        
        res.redirect('/cocktails');
    } catch (error) {
        console.error('Errore nella creazione del cocktail:', error);
        res.status(500).json({ success: false, message: 'Errore interno' });
    }
};

export const getCocktailsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const cocktails = await getCocktails();

        res.render('my-cocktails', { 
            cocktails, 
            title: 'Lista dei Cocktail' 
        });
    } catch (error) {
        console.error('Errore nel recupero dei cocktail:', error);
        res.status(500).json({ success: false, message: 'Errore interno' });
    }
};

export const getCocktailByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const cocktail = await getCocktailById(req.params.id);
        if (cocktail) {
            res.json(cocktail); 
        } else {
            res.status(404).json({ success: false, message: 'Cocktail non trovato' });
        }
    } catch (error) {
        console.error('Errore nel recupero del cocktail:', error);
        res.status(500).json({ success: false, message: 'Errore interno' });
    }
};

export const updateCocktailHandler = async (req: Request, res: Response): Promise<void> => {
    const updatedData = req.body;
    try {
        await updateCocktail(req.params.id, updatedData);

        res.status(200).json({ success: true, message: 'Cocktail modificato con successo' });

    } catch (error) {
        console.error('Errore nell\'aggiornamento del cocktail:', error);
        res.status(500).json({ success: false, message: 'Errore interno' });
    }
};

export const deleteCocktailHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteCocktail(req.params.id);

        // return 200
        res.status(200).json({ success: true, message: 'Cocktail eliminato con successo' });
    } catch (error) {
        console.error('Errore nell\'eliminazione del cocktail:', error);
        res.status(500).json({ success: false, message: 'Errore interno' });
    }
};
