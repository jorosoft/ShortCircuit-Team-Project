const constants = require('./common/constants');
const app = require('./config/app-config');
const data = require('./data/data');
require('./routers')(app, data);

app.listen(constants.APP_PORT,
    () => console.log(`Server running at :${constants.APP_PORT}`));
