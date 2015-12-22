var isNavShown = false;
var nav = null;
var content = null;
var overlay = null;
var navButton = null;
var navLabel = $( "<span id=\"navLabel\">&nbsp;&nbsp;&nbsp;Navigation</span>" );
navLabel.fadeOut();

var navSlideTime = 350;

$(document).ready( function() {
    content = $("#content");
    overlay = $("#overlay");
    nav = $("#nav");
    navButton = $("#navButton");

    navButton.css("height", window.getComputedStyle(document.getElementById("navButton"), null).getPropertyValue("height"));
    navButton.append(navLabel);

    var overlayHeight = window.getComputedStyle(document.getElementById("content"), null).getPropertyValue("height");
    overlay.css('height', overlayHeight === 'auto' ? '100%' : overlayHeight);

    navButton.click(function () {
        toggleNav();
    });

    navButton.hover(
        function () {
            navLabel.stop().animate({opacity: "toggle", width: "toggle"});
        }, function () {
            navLabel.stop().animate({opacity: "toggle", width: "toggle"});
        }
    );

    overlay.click(function () {
        if (isNavShown)
            toggleNav();
    });



});

function openNav() {
    //console.log("OPEN");
    if (!isNavShown) {
        content.stop().animate({"left": nav.outerWidth()}, navSlideTime);
        navButton.stop().animate({"left": nav.outerWidth()}, navSlideTime);
        overlay.stop().css("display", "inline").animate({"left": nav.outerWidth(), "opacity": "0.4"}, navSlideTime);
        isNavShown = true;
    }
}

function closeNav() {
    //console.log("CLOSE");
    if (isNavShown) {
        content.stop().animate({"left": "0"}, navSlideTime);
        navButton.stop().animate({"left": "0"}, navSlideTime);
        overlay.stop().animate({"left": "0", "opacity": "0"}, {
            duration: navSlideTime,
            done: function() {
                overlay.css("display", "none");
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
    content.toggleClass("darken");
}
