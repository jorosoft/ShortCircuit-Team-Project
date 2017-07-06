module.exports = function(repository, models) {
    return {
        addDoctor(doctor) {
            repository.add('doctors', doctor);
        },
    };
};
