var body;
var loginForm;
$(function () {
    body = $('body');
    loginForm = $('#loginForm');
    loginForm.submit(function (event) {
        event.preventDefault();
        MessageHandle.removeAllMessages();
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
            success: function (res) {
                console.log(res);
                window.location.replace('/');
            },
            error: function (res) {
                if (res.status === 401)
                    //ErrorHandle.prependError(loginForm, 'Incorrect Username/Password');
                    MessageHandle.messageBeforeWithBreak(loginForm, 'Incorrect Username/Password', MessageHandle.MessageType.NEGATIVE);
                else if (res.status === 500)
                    MessageHandle.messageBeforeWithBreak(loginForm, 'There was an internal server error while logging in', MessageHandle.MessageType.NEGATIVE);
                else
                    MessageHandle.messageBeforeWithBreak(loginForm, 'Something went wrong while logging in', MessageHandle.MessageType.NEGATIVE);
            },
            complete: function (res) {
                body.removeClass('loading');
            }
        });
    });
});
function loginError(message) {
    var msg = $(document.createElement('p'));
    msg.addClass('message error');
    msg.text(message);
    //msg.insertBefore('#loginSubmit');
}
//# sourceMappingURL=login.js.map