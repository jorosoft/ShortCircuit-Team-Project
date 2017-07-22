getData('/show-patient-results')
    .then((res) => {
        const $ul = $('<ul>').addClass('list-group');
        res.result.forEach((result) => {
            const $li = $('<li>').addClass('list-group-item');
            $li.html(result._content + ' ' + result._date);
            $ul.append($li);
        });

        $ul.appendTo($('.panel-body'));
    });
