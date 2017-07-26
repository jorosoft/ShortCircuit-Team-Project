/* globals $ getData Set io */

const $selectPanel = $('.reservation');
const $schedule = $('.schedule');
let selectedDoctor;
let selectedDate;
const host = document.location.protocol + '//' + document.location.host;
const socket = io.connect(host);

socket.on('new-reservation', function(reservation) {
    if (reservation._doctorId === selectedDoctor._id &&
        reservation._date === selectedDate) {
        renderDoctorSchedule();
    }
});

function prepareReservation(userId, doctorId, date, hour) {
    const $userId = $('<input name="userId" type="hidden">')
        .attr('value', userId);
    const $doctorId = $('<input name="doctorId" type="hidden">')
        .attr('value', doctorId);
    const $date = $('<input name="date" type="hidden">')
        .attr('value', date);
    const $hour = $('<input name="hour" type="hidden">')
        .attr('value', hour);

    $('#reservation').prepend($userId);
    $('#reservation').prepend($doctorId);
    $('#reservation').prepend($date);
    $('#reservation').prepend($hour);
}

function selectHour($hour) {
    $hour.siblings().removeClass('well-selected');
    if (!$hour.hasClass('well-red')) {
        $hour.toggleClass('well-selected');
    }
}

function getDayName() {
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    const dateArray = $('#datepicker').val().split('.');
    const d = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);

    return days[d.getDay()];
}

function getReservations(doctorId) {
    const dateParts = $('#datepicker').val().split('.');
    const newDate =
        new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 12, 0, 0, 0)
        .toISOString();

    return getData('/reservations/doctorId=' + doctorId + ';date=' + newDate);
}

function renderDoctorSchedule() {
    $('.schedule').html('');
    $('#reservation').remove();
    const $table = $('<div>');
    if (selectedDoctor.hasOwnProperty('_scheduleSchema')) {
        const $currentDay = $('<div class="row">');
        const dayName = getDayName();
        if (dayName === 'saturday' || dayName === 'sunday') {
            $table.html('Неработен ден!');
            $table.appendTo($schedule);

            return;
        }

        const from = selectedDoctor._scheduleSchema[dayName].begin;
        const to = selectedDoctor._scheduleSchema[dayName].end;

        getReservations(selectedDoctor._id)
            .then((res) => {
                for (let i = from; i <= to; i += 1) {
                    const $hour = $('<div>')
                        .addClass('btn col-md-1 well well-sm text-center')
                        .html(i + ':00');
                    res.result.forEach((reservation) => {
                        if (reservation._hour === (i + ':00')) {
                            $hour.removeClass('btn');
                            $hour.addClass('well-red');
                        }
                    });

                    $hour.appendTo($currentDay);
                }

                $currentDay.appendTo($table);
                $table.appendTo($schedule);
                $schedule.appendTo($('form'));
                const $submitBtn = $('<button class="btn btn-success">')
                    .attr('type', 'submit')
                    .attr('id', 'reservation')
                    .html('Резервирай');

                $table.on('click', (ev) => {
                    const $hour = $(ev.target);
                    selectHour($hour);
                    if ($hour.hasClass('well-selected')) {
                        getData('/user')
                            .then((user) => {
                                $submitBtn.appendTo($('form'));

                                const selectedHour = $hour.html();

                                prepareReservation(
                                    user.result._id,
                                    selectedDoctor._id,
                                    selectedDate,
                                    selectedHour);
                            });
                    } else {
                        $submitBtn.remove();
                    }
                });
            });
    } else {
        $table.html('Този лекар няма публикувано приемно време!');
        $table.appendTo($schedule);
    }
}

Promise.all([
        getData('/doctors-all'),
        getData('/personal-doctors-all'),
    ])
    .then(([doctors, personalDoctors]) => {
        const allDoctors = doctors.result.concat(personalDoctors.result);
        const cities = [...new Set(allDoctors.map((doc) => doc._city))];
        const $citySelect = $('<select id="city">');
        const $centerSelect = $('<select id="center">');
        const $doctorSelect = $('<select id="doctor">');
        $('<option>').html('Изберете град').appendTo($citySelect);
        cities.forEach((city) => {
            $('<option>').html(city).appendTo($citySelect);
        });

        $citySelect.appendTo($selectPanel);

        $citySelect.on('change', () => {
            const selectedCity = $('#city').val();
            const docsByCity = allDoctors
                .filter((doc) => doc._city === selectedCity);
            $centerSelect.html('');
            $doctorSelect.html('');
            $('.schedule').html('');
            $centerSelect.remove();
            $doctorSelect.remove();
            $('#datepicker').remove();
            const centres = [
                ...new Set(docsByCity.map((doc) => doc._medCenter)),
            ];
            $('<option>').html('Медицински център').appendTo($centerSelect);
            centres.forEach((center) => {
                $('<option>').html(center).appendTo($centerSelect);
            });

            $centerSelect.appendTo($selectPanel);

            $centerSelect.on('change', () => {
                const selectedCenter = $('#center').val();
                const docsByCenter = allDoctors
                    .filter((doc) => doc._medCenter === selectedCenter);
                $doctorSelect.html('');
                $('.schedule').html('');
                $doctorSelect.remove();
                $('#datepicker').remove();

                $('<option>').html('Лекар').appendTo($doctorSelect);
                docsByCenter.forEach((doc) => {
                    const currentDoctor =
                        'д-р ' +
                        doc._firstName +
                        ' ' + doc._lastName +
                        ' - ' + doc._speciality;
                    $('<option>')
                        .attr('id', doc._id)
                        .html(currentDoctor)
                        .appendTo($doctorSelect);
                });

                $doctorSelect.appendTo($selectPanel);

                $doctorSelect.on('change', () => {
                    $('.schedule').html('');
                    $('#datepicker').remove();
                    $('<input type="text" id="datepicker" readonly>')
                        .attr('placeholder', 'Изберете дата')
                        .appendTo($($selectPanel));
                    $(function() {
                        $('#datepicker').datepicker({ minDate: 0 });
                    });

                    $('#datepicker').on('change', (ev) => {
                        const dateParts = $('#datepicker').val().split('.');
                        selectedDate = new Date(
                            dateParts[2],
                            dateParts[1] - 1,
                            dateParts[0],
                            12, 0, 0, 0).toISOString();
                        const selectedDoctorId = $doctorSelect
                            .children(':selected')
                            .attr('id');
                        selectedDoctor = docsByCenter
                            .filter((doc) => doc._id === selectedDoctorId)[0];

                        renderDoctorSchedule();
                    });
                });
            });
        });
    });
