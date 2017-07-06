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
        getPersonalDoctors(req, res) {
            const result = {};
            result.title = 'Лични лекари';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/personal-doctors-view', { result });
        },
        getDoctors(req, res) {
            const result = {};
            result.title = 'Специалисти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home/doctors-view', { result });
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
