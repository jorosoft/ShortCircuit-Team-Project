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

        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            res.render('profile-view', {
                result: {
                    title: 'User profile',
                },
            });
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