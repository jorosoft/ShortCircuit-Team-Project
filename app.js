/* globals global */

const constants = require('./common/constants');
const models = require('./models')();
const repository = require('./data/repository')(constants);
const data = require('./data')(repository, models);
const app = require('./config/app-config')(data);
const socket = require('socket.io');

const io = socket.listen(app.listen(constants.APP_PORT,
    () => console.log(`Server running at :${constants.APP_PORT}`)));

global.io = io;