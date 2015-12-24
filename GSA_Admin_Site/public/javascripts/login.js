$(function() {
    $('#loginForm').submit(function(event) {
        var data = {};
        var values = $(this).serializeArray();
        //console.log(values);
        for (var i in values) {
            var item = values[i];
            data[item.name] = item.value;
        }
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                console.log(res);
                window.location.replace('/');
            },
            error: function(res) {
                console.log('Failed to login')
            }
        });
        event.preventDefault();
    });
});