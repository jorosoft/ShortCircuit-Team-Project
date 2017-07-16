/* globals $ postData */

$('#btnRecipeCheck').on('click', (ev) => {
    const $pin = $('#pin').val();
    postData('/recipes-search', { pin: $pin });
});
