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
            isNumeric: {
                options: true,
                errorMessage: 'ЕГН с невалидни символи',
            },
            // isValidPin: {
            //     options: true,
            //     errorMessage: 'Невалиден ЕГН!',
            // },
        },
    },
    RULES_USERNAME: {
        'username': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва потребителско име!',
            },
            isLength: {
                options: [{ min: 4, max: 16 }],
                errorMessage: 'Невалидна дължина на потребителско име!',
            },
        },
    },
    RULES_PASSWORD: {
        'password': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва парола!',
            },
            isLength: {
                options: [{ min: 4, max: 16 }],
                errorMessage: 'Невалидна дължина на парола!',
            },
        },
    },
    RULES_FIRSTNAME: {
        'firstName': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва име!',
            },
            isLength: {
                options: [{ min: 2, max: 16 }],
                errorMessage: 'Невалидна дължина на име!',
            },
        },
    },
    RULES_LASTNAME: {
        'lastName': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва фамилия!',
            },
            isLength: {
                options: [{ min: 2, max: 16 }],
                errorMessage: 'Невалидна дължина на фамилия!',
            },
        },
    },
    RULES_OPTRADIO: {
        'optradio': {
            notEmpty: {
                options: true,
                errorMessage: 'Не е избран тип потребител!',
            },
        },
    },
    RULES_REGNUMBER: {
        'regNumber': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва УИН!',
            },
            isLength: {
                options: [{ min: 2, max: 10 }],
                errorMessage: 'Невалиден брой цифри на УИН!',
            },
            isNumeric: {
                options: true,
                errorMessage: 'УИН е с невалидни символи',
            },
        },
    },
    RULES_SPECIALITY: {
        'speciality': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва специалност!',
            },
            isLength: {
                options: [{ min: 4, max: 16 }],
                errorMessage: 'Невалидна дължина на специалност!',
            },
        },
    },
    RULES_CENTER: {
        'medCenter': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва мед. център!',
            },
            isLength: {
                options: [{ min: 2, max: 16 }],
                errorMessage: 'Невалидна дължина на МЦ!',
            },
        },
    },
    RULES_CITYNAME: {
        'city': {
            notEmpty: {
                options: true,
                errorMessage: 'Липсва населено място!',
            },
            isLength: {
                options: [{ min: 2, max: 16 }],
                errorMessage: 'Невалидна дължина на нас. място!',
            },
        },
    },
};
