module.exports = function(data) {
    return {
        login(req, res) {
            res.render('login-view', {
                result: {
                    title: 'Login',
                },
            });
        },
        register(req, res) {
            res.render('register-view', {
                result: {
                    title: 'Register',
                },
            });
        },
    };
};