module.exports = function(repository, models) {
    return {
        addResult(result) {
            return repository.add('results', result);
        },
        getResult(filter) {
            return repository.findOne('results', filter);
        },
        getResults(filter) {
            return repository.find('results', filter);
        },
        updateResult(result) {
            return repository.update('results', result);
        },
    };
};
