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
var MessageHandle;
(function (MessageHandle) {
    var MessageType;
    (function (MessageType) {
        MessageType.NEUTRAL = 'neutral';
        MessageType.INFO = 'info';
        MessageType.POSITIVE = 'positive';
        MessageType.NEGATIVE = 'negative';
    })(MessageType = MessageHandle.MessageType || (MessageHandle.MessageType = {}));
    function messageBefore(mount, errorMsg, messageType, callback) {
        var msg = $(document.createElement('p'));
        msg.addClass('message ' + messageType);
        msg.text(errorMsg);
        msg.insertBefore(mount);
        if (callback)
            callback(msg, mount);
        return msg;
    }
    MessageHandle.messageBefore = messageBefore;
    function messageAfter(mount, errorMsg, messageType, callback) {
        var msg = $(document.createElement('p'));
        msg.addClass('message ' + messageType);
        msg.text(errorMsg);
        msg.insertAfter(mount);
        if (callback)
            callback(msg, mount);
        return msg;
    }
    MessageHandle.messageAfter = messageAfter;
    function messageBeforeWithBreak(mount, errorMsg, messageType, callback) {
        var message = MessageHandle.messageBefore(mount, errorMsg, messageType, callback);
        $(document.createElement('hr')).insertAfter(message);
        return message;
    }
    MessageHandle.messageBeforeWithBreak = messageBeforeWithBreak;
    function messageAfterWithBreak(mount, errorMsg, messageType, callback) {
        var message = MessageHandle.messageAfter(mount, errorMsg, messageType, callback);
        $(document.createElement('hr')).insertBefore(message);
        return message;
    }
    MessageHandle.messageAfterWithBreak = messageAfterWithBreak;
    function messageError(message, callback) {
        message.remove();
        if (callback)
            callback();
    }
    MessageHandle.messageError = messageError;
    function removeAllMessages(callback) {
        $('p.message').remove();
        if (callback)
            callback();
    }
    MessageHandle.removeAllMessages = removeAllMessages;
})(MessageHandle || (MessageHandle = {}));
var Color = (function () {
    function Color(value) {
        this.color = value;
    }
    Color.prototype.toString = function () { return this.color; };
    Color.prototype.getDisplayString = function () {
        return this.color.substring(0, 1).toUpperCase() + this.color.substring(1);
    };
    Color.red = new Color('red');
    Color.orange = new Color('orange');
    Color.yellow = new Color('yellow');
    Color.olive = new Color('olive');
    Color.green = new Color('green');
    Color.teal = new Color('teal');
    Color.blue = new Color('blue');
    Color.violet = new Color('violet');
    Color.pink = new Color('pink');
    Color.brown = new Color('brown');
    Color.grey = new Color('grey');
    Color.black = new Color('black');
    Color.allColors = [
        Color.red,
        Color.orange,
        Color.yellow,
        Color.olive,
        Color.green,
        Color.teal,
        Color.blue,
        Color.violet,
        Color.pink,
        Color.brown,
        Color.grey,
        Color.black
    ];
    return Color;
})();
//# sourceMappingURL=global.js.map