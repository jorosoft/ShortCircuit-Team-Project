/* globals $ */

function getData(url, headers) {
    return $.ajax({
        method: 'GET',
        dataType: 'JSON',
        url: url,
        headers: headers,
    });
}

function postData(url, data, headers) {
    return $.ajax({
        method: 'POST',
        dataType: 'JSON',
        url: url,
        headers: headers,
        data: data,
    });
}
