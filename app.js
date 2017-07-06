const constants = require('./common/constants');
const validator = require('./common/validator');
const models = require('./models')(constants, validator);
const repository = require('./data/repository')(constants);
const app = require('./config/app-config');
const data = require('./data')(repository, models);
require('./routers')(app, data, models, validator);

app.listen(constants.APP_PORT,
    () => console.log(`Server running at :${constants.APP_PORT}`));
