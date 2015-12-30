var body;

$(function() {
    body = $('body');
    $('#loginForm').submit(function(event) {
        var data = {};
        var values = $(this).serializeArray();
        //console.log(values);
        for (var i in values) {
            var item = values[i];
            data[item.name] = item.value;
        }
        $(this).find('.loginError').remove();
        body.addClass('loading');
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                console.log(res);
                window.location.replace('/');
            },
            error: function(res) {
                if (res.status === 401)
                    loginError('Incorrect Username/Password');
                else if (res.status === 500)
                    loginError('There was an internal server error while logging in');
                else
                    loginError('Something went wrong while logging in');
            },
            complete: function(res) {
                body.removeClass('loading');
            }
        });
        event.preventDefault();
    });
});

function loginError(mesage) {
    var msg = $(document.createElement('p'));
    msg.addClass('loginError');
    msg.text(mesage);
    msg.insertBefore('#loginSubmit');
    //$(document.createElement('hr')).insertAfter('.loginError')
}