/* globals $ postData */

$('#addResBtn').on('click', (ev) => {
    const $pin = $('#pin').val();
    const $content = $('#content').val();

    postData('/add-patient-result', { pin: $pin, content: $content });
});
