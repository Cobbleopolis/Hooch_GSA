var isNavShown = false;
var nav;
var content;
var overlay;
var navButton;
var navLabel = $('<span id=\'navLabel\'>&nbsp;&nbsp;&nbsp;Navigation</span>');
navLabel.fadeOut();
var navSlideTime = 350;
$(document).ready(function () {
    content = $('#content');
    overlay = $('#overlay');
    nav = $('#nav');
    navButton = $('#navButton');
    navButton.append(navLabel);
    var overlayHeight = window.getComputedStyle(document.getElementById('content'), null).getPropertyValue('height');
    overlay.css('height', overlayHeight === 'auto' ? '100%' : overlayHeight);
    navButton.click(function () {
        toggleNav();
    });
    navButton.hover(function () {
        navLabel.stop().animate({ opacity: 'toggle', width: 'toggle' });
    }, function () {
        navLabel.stop().animate({ opacity: 'toggle', width: 'toggle' });
    });
    overlay.click(function () {
        if (isNavShown)
            toggleNav();
    });
});
function openNav() {
    //console.log('OPEN');
    if (!isNavShown) {
        content.stop().animate({ 'left': nav.outerWidth() }, navSlideTime);
        navButton.stop().animate({ 'left': nav.outerWidth() }, navSlideTime);
        overlay.stop().css('display', 'inline').animate({ 'left': nav.outerWidth(), 'opacity': '0.4' }, navSlideTime);
        isNavShown = true;
    }
}
function closeNav() {
    //console.log('CLOSE');
    if (isNavShown) {
        content.stop().animate({ 'left': '0' }, navSlideTime);
        navButton.stop().animate({ 'left': '0' }, navSlideTime);
        overlay.stop().animate({ 'left': '0', 'opacity': '0' }, {
            duration: navSlideTime,
            done: function () {
                overlay.css('display', 'none');
            }
        });
        isNavShown = false;
    }
}
function toggleNav() {
    if (isNavShown)
        closeNav();
    else
        openNav();
    content.toggleClass('darken');
}
function logOut() {
    console.log('logout');
    $.ajax({
        type: 'GET',
        url: '/api/logout',
        success: function (res) {
            window.location.replace('/');
        },
        error: function (res) {
            console.log('Failed to logout');
        }
    });
    return false;
}
var ErrorHandle = (function () {
    function ErrorHandle() {
    }
    ErrorHandle.errorBefore = function (mount, errorMsg) {
        var msg = $(document.createElement('p'));
        msg.addClass('message error');
        msg.text(errorMsg);
        msg.insertBefore(mount);
        return msg;
    };
    ErrorHandle.errorAfter = function (mount, errorMsg) {
        var msg = $(document.createElement('p'));
        msg.addClass('message error');
        msg.text(errorMsg);
        msg.insertAfter(mount);
        return msg;
    };
    ErrorHandle.errorBeforeWithBreak = function (mount, errorMsg) {
        var error = this.errorBefore(mount, errorMsg);
        $(document.createElement('hr')).insertAfter(error);
        return error;
    };
    ErrorHandle.errorAfterWithBreak = function (mount, errorMsg) {
        var error = this.errorAfter(mount, errorMsg);
        $(document.createElement('hr')).insertBefore(error);
        return error;
    };
    ErrorHandle.removeError = function (error) {
        error.remove();
    };
    ErrorHandle.removeAllErrors = function () {
        $('p.message.error').remove();
    };
    return ErrorHandle;
})();
//# sourceMappingURL=global.js.map