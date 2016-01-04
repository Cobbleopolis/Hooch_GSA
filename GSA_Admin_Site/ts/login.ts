
var body: JQuery;
var loginForm: JQuery;

$(function() {
    body = $('body');
    loginForm = $('#loginForm');

    loginForm.submit(function(event: JQueryEventObject) {
        event.preventDefault();
        ErrorHandle.removeAllErrors();
        let data = {};
        let values = $(this).serializeArray();
        //console.log(values);
        for (let i in values) {
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
                    //ErrorHandle.prependError(loginForm, 'Incorrect Username/Password');
                    ErrorHandle.errorBeforeWithBreak(loginForm, 'Incorrect Username/Password');
                else if (res.status === 500)
                    ErrorHandle.errorBeforeWithBreak(loginForm, 'There was an internal server error while logging in');
                else
                    ErrorHandle.errorBeforeWithBreak(loginForm, 'Something went wrong while logging in');
            },
            complete: function(res) {
                body.removeClass('loading');
            }
        });
    });
});

function loginError(message: string) {
    var msg = $(document.createElement('p'));
    msg.addClass('message error');
    msg.text(message);
    //msg.insertBefore('#loginSubmit');
}