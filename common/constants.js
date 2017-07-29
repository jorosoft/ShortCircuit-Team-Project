module.exports = {
    APP_PORT: 3001,
    DB_URL: 'mongodb://localhost:27017/mediLinkDB',
    RULES_PIN: {
        'pin': {
            notEmpty: {
                options: true,
                errorMessage: 'ЕГН е необходим!',
            },
            isLength: {
                options: 10,
                errorMessage: 'Невалиден брой цифри!',
            },
            // isValidPin: {
            //     options: true,
            //     errorMessage: 'Невалиден ЕГН!',
            // },
        },
    },
};
