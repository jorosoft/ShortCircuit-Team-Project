module.exports = function(data) {
    return {
        getHome(req, res) {
            const result = {};
            result.title = 'MediLink+';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home-view', { result });
        },
        getAbout(req, res) {
            const result = {};
            result.title = 'За системата';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('about-view', { result });
        },
        getPersonalDoctors(req, res) {
            const result = {};
            result.title = 'Лични лекари';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('personal-doctors-view', { result });
        },
        getDoctors(req, res) {
            const result = {};
            result.title = 'Специалисти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('doctors-view', { result });
        },
        getReciepesSearch(req, res) {
            const result = {};
            result.title = 'Справка рецепти';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('reciepes-search-view', { result });
        },
    };
};