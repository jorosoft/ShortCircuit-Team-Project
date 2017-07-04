/* globals __dirname */

const fs = require('fs');
const path = require('path');

module.exports = function(app, data) {
    fs.readdirSync('./models/')
        .filter((x) => x.includes('-model'))
        .forEach((file) => {
            require(path.join(__dirname, file))(app, data);
        });
};
