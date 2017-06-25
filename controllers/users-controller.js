module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('login-view', {
                result: {
                    title: 'Login',
                },
            });
        },
        getRegisterForm(req, res) {
            res.render('register-view', {
                result: {
                    title: 'Register',
                },
            });
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password,
            };

            data.addUser(user);
            res.redirect('/login');
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            const result = {};
            result.title = 'User profile';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('profile-view', { result });
        },
        unauthorized(req, res) {
            res.render('unauthorized-view', {
                result: {
                    title: 'Unauthorized',
                },
            });
        },
    };
};
