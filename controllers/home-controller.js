module.exports = function(data) {
    return {
        getHome(req, res) {
            res.render("home-view", {
                result: {
                    title: "Hometo yeee"
                }
            });
        }
    };
};