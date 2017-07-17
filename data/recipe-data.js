module.exports = function(repository, models) {
    return {
        addRecipe(recipe) {
            return repository.add('recipes', recipe);
        },
        findRecipes(patientId) {
            return repository.find('recipes', { _patientId: patientId });
        },
        updateRecipe(recipe) {
            return repository.update('recipes', recipe);
        },
    };
};
