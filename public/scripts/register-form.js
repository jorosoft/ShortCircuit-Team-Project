/* globals $ */

const $wrapper = $('#reg-wrapper');

function showPatientForm() {
    const $pin = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3"></span>
            <input type="text" class="form-control" name="pin" 
                placeholder="ЕГН" aria-describedby="sizing-addon3" />    
    </div>`);

    $wrapper.html('');
    $wrapper.append($pin);
}

function showDoctorForm() {
    const $regNumber = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3"></span>
            <input type="text" class="form-control" name="regNumber" 
                placeholder="Рег. номер" aria-describedby="sizing-addon3" />
    </div>`);
    const $speciality = $(`<div class="form-group input-group input-group-sm">
            <span class="input-group-addon" id="sizing-addon3"></span>
            <input type="text" class="form-control" name="speciality" 
                placeholder="Специалност" aria-describedby="sizing-addon3" />  
    </div>`);

    $wrapper.html('');
    $wrapper.append($regNumber);
    $wrapper.append($speciality);
}

$('.radio-inline').on('click', (ev) => {
    if ($(ev.target).attr('id') === 'doctor') {
        showDoctorForm();
    }

    if ($(ev.target).attr('id') === 'patient') {
        showPatientForm();
    }
});
