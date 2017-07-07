module.exports = function(repository, models) {
    return {
        addDoctor(doctor) {
            repository.add('doctors', doctor);
        },
        getDoctors(filter) {
            return repository.find('doctors', filter);
        },
    };
};
