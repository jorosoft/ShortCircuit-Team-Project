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
        getReciepesSearch(req, res) {
            const result = {};
            result.title = 'Справка рецепти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/reciepes-search-view', { result });
        },
    };
};
