/* globals $ getData */

getData('/doctors-all')
    .then((doctors) => {
        const $ul = $('<ul>');
        doctors.forEach((doctor) => {
            const $li = $('<li>');
            $li.html(doctor._regNumber + ' ' + doctor._speciality);
            $ul.append($li);
        });

        $ul.appendTo($('.panel-body'));
    });
