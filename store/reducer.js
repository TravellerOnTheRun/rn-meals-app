import { MEALS } from '../data/dummy-data';

import { TOGGLE_FAV, SET_FILTERS } from '../store/actions'; 

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAV:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {
                    ...state,
                    favoriteMeals: updatedFavMeals
                };
            } else {
                const mealToAdd = state.meals.find(meal => meal.id === action.mealId);
                return {
                    ...state, 
                    favoriteMeals: state.favoriteMeals.concat(mealToAdd)
                };
            };
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                };
                if(appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                };
                if(appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                };
                if(appliedFilters.vegan && !meal.isVegan) {
                    return false;
                };
                return true;
            }); 
            return {
                ...state,
                filteredMeals: updatedFilteredMeals
            };
        default:
            return state;
    }
};

export default reducer;