/* globals $ getData Set */

const $wrapper = $('.reservation');

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

        $citySelect.appendTo($wrapper);

        $('#city').on('change', () => {
            const selectedCity = $('#city').val();
            const docsByCity = allDoctors
                .filter((doc) => doc._city === selectedCity);
            $centerSelect.html('');
            $doctorSelect.html('');
            $centerSelect.remove();
            $doctorSelect.remove();
            const centres = [
                ...new Set(docsByCity.map((doc) => doc._medCenter)),
            ];
            $('<option>').html('Медицински център').appendTo($centerSelect);
            centres.forEach((center) => {
                $('<option>').html(center).appendTo($centerSelect);
            });

            $centerSelect.appendTo($wrapper);

            $('#center').on('change', () => {
                const selectedCenter = $('#center').val();
                const docsByCenter = allDoctors
                    .filter((doc) => doc._medCenter === selectedCenter);
                $doctorSelect.html('');
                $doctorSelect.remove();

                $('<option>').html('Лекар').appendTo($doctorSelect);
                docsByCenter.forEach((doc) => {
                    const currentDoctor =
                        'д-р ' +
                        doc._firstName +
                        ' ' + doc._lastName +
                        ' - ' + doc._speciality;
                    $('<option>').html(currentDoctor).appendTo($doctorSelect);
                });

                $doctorSelect.appendTo($wrapper);
            });
        });
    });
