"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const ingredientInput = document.getElementById('ingredient');
    const suggestionsList = document.getElementById('ingredientSuggestions');
    if (ingredientInput && suggestionsList) {
        ingredientInput.addEventListener('input', (event) => __awaiter(void 0, void 0, void 0, function* () {
            const target = event.target;
            const query = target.value.trim();
            if (query.length === 0) {
                suggestionsList.innerHTML = '';
                suggestionsList.classList.remove('show');
                return;
            }
            try {
                const response = yield fetch(`/api/ingredients?query=${query}`);
                const data = yield response.json();
                suggestionsList.innerHTML = '';
                if (data.ingredients && data.ingredients.length > 0) {
                    suggestionsList.classList.add('show');
                    data.ingredients.forEach((ingredient) => {
                        const li = document.createElement('li');
                        li.className = 'dropdown-item';
                        li.textContent = ingredient.strIngredient;
                        li.addEventListener('click', () => {
                            ingredientInput.value = ingredient.strIngredient;
                            suggestionsList.innerHTML = '';
                            suggestionsList.classList.remove('show');
                        });
                        suggestionsList.appendChild(li);
                    });
                }
                else {
                    suggestionsList.classList.remove('show');
                }
            }
            catch (error) {
                console.error('Errore durante il completamento automatico:', error);
                suggestionsList.classList.remove('show');
            }
        }));
        // Nascondi il menu se clicchi altrove
        document.addEventListener('click', (event) => {
            if (!suggestionsList.contains(event.target) && event.target !== ingredientInput) {
                suggestionsList.classList.remove('show');
            }
        });
    }
});
