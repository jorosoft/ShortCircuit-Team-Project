/* globals $ getData */

getData('/personal-doctors-all')
    .then((doctors) => {
        const $ul = $('<ul>');
        doctors.forEach((doctor) => {
            const $li = $('<li>');
            $li.html(doctor._regNumber + ' ' +
                doctor._firstName + ' ' +
                doctor._lastName + ' ' +
                doctor._speciality + ' ' +
                doctor._medCenter + ' ' +
                doctor._city);
            $ul.append($li);
        });

        $ul.appendTo($('.panel-body'));
    });
