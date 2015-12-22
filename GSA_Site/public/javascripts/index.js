var animTime = 500;

$(function() {
    //$('#form').submit(function(event) {
    //    $.post('/api/insert',
    //        {
    //            text: $('input:first').val(),
    //            success: alert('SUBMITTED!')
    //        }
    //    );
    //    event.preventDefault()
    //});

    $('#slideShow').find('> img:gt(0)').hide();
    setInterval(function() {
        var first = $('#slideShow').find('img:first');
        first.fadeOut(animTime);
        first.next().delay(animTime).fadeIn(animTime);
        first.appendTo('#slideShow');
    }, 4000);
});
