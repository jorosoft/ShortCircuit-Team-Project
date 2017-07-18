module.exports = function(data, models, validator) {
    function init(req, result) {
        if (req.isAuthenticated()) {
            result.user = req.user.username;
            if (req.user._userType === 'doctorType') {
                result.isDoctor = true;
            }

            if (req.user._userType === 'patientType') {
                result.isPatient = true;
            }
        }

        return result;
    }

    return {
        getHome(req, res) {
            const result = init(req, {});
            result.title = 'MediLink+';

            res.render('home/home-view', { result });
        },
        getAbout(req, res) {
            const result = init(req, {});
            result.title = 'За системата';

            res.render('home/about-view', { result });
        },
        getPersonalDoctorsView(req, res) {
            const result = init(req, {});
            result.title = 'Лични лекари';

            res.render('home/personal-doctors-view', { result });
        },
        getPersonalDoctors(req, res) {
            Promise.all([data.getUsers({}),
                    data.getDoctors({ _hasPatients: true }),
                ])
                .then(([users, doctors]) => {
                    doctors.forEach((doc) => {
                        users.forEach((user) => {
                            if (doc._userId.toString() ===
                                user._id.toString()) {
                                doc._firstName = user._firstName;
                                doc._lastName = user._lastName;
                            }
                        });
                    });

                    res.send(JSON.stringify({ result: doctors }));
                });
        },
        getDoctorsView(req, res) {
            const result = init(req, {});
            result.title = 'Специалисти';

            res.render('home/doctors-view', { result });
        },
        getDoctors(req, res) {
            Promise.all([data.getUsers({}),
                    data.getDoctors({ _hasPatients: false }),
                ])
                .then(([users, doctors]) => {
                    doctors.forEach((doc) => {
                        users.forEach((user) => {
                            if (doc._userId.toString() ===
                                user._id.toString()) {
                                doc._firstName = user._firstName;
                                doc._lastName = user._lastName;
                            }
                        });
                    });

                    res.send(JSON.stringify({ result: doctors }));
                });
        },
        getRecipesSearchView(req, res) {
            const result = init(req, {});
            result.title = 'Справка рецепти';

            res.render('home/recipes-search-view', { result });
        },
        recipesSearch(req, res) {
            const pin = req.body.pin;
            const result = init(req, {});
            result.title = 'Справка рецепти';

            req.checkBody('pin', 'ЕГН е необходим!').notEmpty();
            const errors = req.validationErrors();

            if (errors) {
                result.flash = { type: 'alert-danger', messages: errors };

                res.render('home/recipes-search-view', { result });
            }

            data.getPatient({ _pin: pin })
                .then((patient) => {
                    if (!patient) {
                        return Promise.reject('NOOO');
                    }

                    return Promise.all([
                        data.findUserById(patient._userId),
                        data.getRecipes({ _patientId: patient._id }),
                    ]);
                })
                .then(([user, recipes]) => {
                    result._patientFirstName = user._firstName;
                    result._patientLastName = user._lastName;
                    result.recipes = recipes;
                    result.title = 'Справка рецепти';

                    if (req.isAuthenticated()) {
                        result.user = req.user.username;
                    }

                    return Promise.all([
                        data.getUsers({}),
                        data.getDoctors(),
                    ]);
                })
                .then(([users, doctors]) => {
                    result.recipes.forEach((recipe) => {
                        recipe._expirationDate = recipe._expirationDate
                            .toLocaleDateString();
                        doctors.forEach((doc) => {
                            users.forEach((user) => {
                                if ((doc._userId.toString() ===
                                        user._id.toString()) &&
                                    recipe._doctorId.toString() ===
                                    doc._id.toString()) {
                                    recipe._doctorFirstName = user._firstName;
                                    recipe._doctorLastName = user._lastName;
                                    recipe._doctorSpeciality = doc._speciality;
                                    recipe._doctorRegNumber = doc._regNumber;
                                }
                            });
                        });
                    });

                    res.render('home/recipes-search-view', { result });
                })
                .catch((err) => {
                    res.render('home/recipes-search-view', { result });
                });
        },
    };
};