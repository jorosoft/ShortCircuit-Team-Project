/* globals $ */

const $wrapper = $('#reg-wrapper');

function showPatientForm() {
    const $pin = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3">
                <span class="glyphicon glyphicon-record"></span>
            </span>
            <input type="text" class="form-control" name="pin" 
                placeholder="ЕГН" aria-describedby="sizing-addon3" />    
    </div>`);

    $wrapper.html('');
    $wrapper.append($pin);
}

function showDoctorForm() {
    const $regNumber = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3">
                <span class="glyphicon glyphicon-record"></span>
            </span>
            <input type="text" class="form-control" name="regNumber" 
                placeholder="Рег. номер" aria-describedby="sizing-addon3" />
    </div>`);
    const $speciality = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3">
                <span class="glyphicon glyphicon-certificate"></span>
            </span>
            <input type="text" class="form-control" name="speciality" 
                placeholder="Специалност" aria-describedby="sizing-addon3" />  
    </div>`);

    const $medCenter = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3">
                <span class="glyphicon glyphicon-home"></span>
            </span>
            <input type="text" class="form-control" name="medCenter" 
                placeholder="Медицински център" 
                aria-describedby="sizing-addon3" />
    </div>`);

    const $city = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3">
                <span class="glyphicon glyphicon-globe"></span>
            </span>
            <input type="text" class="form-control" name="city" 
                placeholder="Населено място" aria-describedby="sizing-addon3" />
    </div>`);

    $wrapper.html('');
    $wrapper.append($regNumber);
    $wrapper.append($speciality);
    $wrapper.append($medCenter);
    $wrapper.append($city);
}

$('.radio-inline').on('click', (ev) => {
    if ($(ev.target).attr('id') === 'doctor') {
        showDoctorForm();
    }

    if ($(ev.target).attr('id') === 'patient') {
        showPatientForm();
    }
});
