module.exports = function(repository, models) {
    return {
        addRecipe(recipe) {
            return repository.add('recipes', recipe);
        },
        getrecipe(filter) {
            return repository.findOne('recipes', filter);
        },
        getRecipes(filter) {
            return repository.find('recipes', filter);
        },
        updateRecipe(recipe) {
            return repository.update('recipes', recipe);
        },
    };
};
