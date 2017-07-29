/* globals __dirname */

const fs = require('fs');
const path = require('path');

module.exports = function(app, data, models, constants) {
    fs.readdirSync('./routers/')
        .filter((x) => x.includes('-router'))
        .forEach((file) => {
            require(path.join(__dirname, file))(app, data, models, constants);
        });
};
