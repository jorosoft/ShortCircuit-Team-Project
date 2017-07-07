module.exports = function(repository, models) {
    return {
        addDoctor(doctor) {
            repository.add('doctors', doctor);
        },
        getDoctors() {
            return repository.find('doctors', {});
        },
    };
};
