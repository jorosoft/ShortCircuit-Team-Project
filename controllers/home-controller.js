module.exports = function(data, models, validator) {
    return {
        getHome(req, res) {
            const result = {};
            result.title = 'MediLink+';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/home-view', { result });
        },
        getAbout(req, res) {
            const result = {};
            result.title = 'За системата';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/about-view', { result });
        },
        getPersonalDoctorsView(req, res) {
            const result = {};
            result.title = 'Лични лекари';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/personal-doctors-view', { result });
        },
        getPersonalDoctors(req, res) {
            Promise.all([data.getUsers(),
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

                    res.send(JSON.stringify(doctors));
                });
        },
        getDoctorsView(req, res) {
            const result = {};
            result.title = 'Специалисти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/doctors-view', { result });
        },
        getDoctors(req, res) {
            Promise.all([data.getUsers(),
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

                    res.send(JSON.stringify(doctors));
                });
        },
        getRecipesSearchView(req, res) {
            const result = {};
            result.title = 'Справка рецепти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/recipes-search-view', { result });
        },
        recipesSearch(req, res) {
            const pin = req.body.pin;
            const result = {};

            data.getPatient({ _pin: pin })
                .then((patient) => {
                    if (!patient) {
                        return Promise.reject('NOOO');
                    }

                    return Promise.all([
                        data.findUserById(patient._userId),
                        data.findRecipes(patient._id),
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
                        data.getUsers(),
                        data.getDoctors(),
                    ]);
                })
                .then(([users, doctors]) => {
                    result.recipes.forEach((recipe) => {
                        doctors.forEach((doc) => {
                            users.forEach((user) => {
                                if (doc._userId.toString() ===
                                    user._id.toString()) {
                                    recipe._doctorFirstName = user._firstName;
                                    recipe._doctorLastName = user._lastName;
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
