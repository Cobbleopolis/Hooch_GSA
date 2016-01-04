var isNavShown = false;
var nav: JQuery;
var content: JQuery;
var overlay: JQuery;
var navButton: JQuery;
var navLabel: JQuery = $( '<span id=\'navLabel\'>&nbsp;&nbsp;&nbsp;Navigation</span>' );
navLabel.fadeOut();

var navSlideTime: number = 350;

$(document).ready( function() {
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

    navButton.hover(
        function () {
            navLabel.stop().animate({opacity: 'toggle', width: 'toggle'});
        }, function () {
            navLabel.stop().animate({opacity: 'toggle', width: 'toggle'});
        }
    );

    overlay.click(function () {
        if (isNavShown)
            toggleNav();
    });
});

function openNav() {
    //console.log('OPEN');
    if (!isNavShown) {
        content.stop().animate({'left': nav.outerWidth()}, navSlideTime);
        navButton.stop().animate({'left': nav.outerWidth()}, navSlideTime);
        overlay.stop().css('display', 'inline').animate({'left': nav.outerWidth(), 'opacity': '0.4'}, navSlideTime);
        isNavShown = true;
    }
}

function closeNav() {
    //console.log('CLOSE');
    if (isNavShown) {
        content.stop().animate({'left': '0'}, navSlideTime);
        navButton.stop().animate({'left': '0'}, navSlideTime);
        overlay.stop().animate({'left': '0', 'opacity': '0'}, {
            duration: navSlideTime,
            done: function() {
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
            console.log('Failed to logout')
        }
    });
    return false;
}

class ErrorHandle {

    static errorBefore(mount: JQuery, errorMsg: string): JQuery {
        var msg = $(document.createElement('p'));
        msg.addClass('message error');
        msg.text(errorMsg);
        msg.insertBefore(mount);
        return msg;
    }

    static errorAfter(mount: JQuery, errorMsg: string): JQuery {
        var msg = $(document.createElement('p'));
        msg.addClass('message error');
        msg.text(errorMsg);
        msg.insertAfter(mount);
        return msg;
    }

    static errorBeforeWithBreak(mount: JQuery, errorMsg: string): JQuery {
        var error = this.errorBefore(mount, errorMsg);
        $(document.createElement('hr')).insertAfter (error);
        return error;
    }

    static errorAfterWithBreak(mount: JQuery, errorMsg: string): JQuery {
        var error = this.errorAfter(mount, errorMsg);
        $(document.createElement('hr')).insertBefore(error);
        return error;
    }

    static removeError(error: JQuery) {
        error.remove();
    }

    static removeAllErrors() {
        $('p.message.error').remove();
    }
}

class Color {

    color: string;

    constructor (value: string) {this.color = value}

    toString(): string {return this.color}

    getDisplayString(): string {
        return this.color.substring(0, 1).toUpperCase() + this.color.substring(1);
    }

    static red: Color = new Color('red');
    static orange: Color = new Color('orange');
    static yellow: Color = new Color('yellow');
    static olive: Color = new Color('olive');
    static green: Color = new Color('green');
    static teal: Color = new Color('teal');
    static blue: Color = new Color('blue');
    static violet: Color = new Color('violet');
    static pink: Color = new Color('pink');
    static brown: Color = new Color('brown');
    static grey: Color = new Color('grey');
    static black: Color = new Color('black');

    static allColors: Color[] = [
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

}
