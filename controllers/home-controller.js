module.exports = function(data) {
    return {
        getHome(req, res) {
            const result = {};
            result.title = 'Our App';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('home-view', { result });
        },
    };
};
