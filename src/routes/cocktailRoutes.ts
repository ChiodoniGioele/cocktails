import { Router } from 'express';
import multer from 'multer';
import * as cocktailController from '../controllers/cocktailController';
import * as createCocktailController from '../controllers/createCocktailController';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', cocktailController.searchCocktail);
router.get('/search-suggestions', cocktailController.searchSuggestions);
router.get('/cocktail-details/:id', cocktailController.getCocktailDetails);

router.post(
    '/create-cocktail',
    upload.single('image'),
    createCocktailController.createCocktailHandler
);

router.get('/cocktails', createCocktailController.getCocktailsHandler);

router.get('/cocktail/:id', createCocktailController.getCocktailByIdHandler);

router.put('/cocktail/:id', createCocktailController.updateCocktailHandler);

router.delete('/cocktail/:id', createCocktailController.deleteCocktailHandler);

export default router;
