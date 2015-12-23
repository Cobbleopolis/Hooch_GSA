var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var fs = require('fs');

var nav = [
    {
        text: 'Home',
        icon: 'home',
        link: '/'
    },
    {
        text: 'Flags',
        icon: 'flag',
        link: '/flags'
    }
];

function groupped(list, size) {
    return list.reduce(function (prev, item, i) {
        if(i % size === 0)
            prev.push([item]);
        else
            prev[prev.length - 1].push(item);

        return prev;
    }, []);

}

/* GET home page. */
router.get('/', function (req, res, next) {
    var dbOut = {
        topSection: {},
        sections: []
    };

    var isFirst = true;
    var current = [];
    var currentSection = null;
    db.query('select * from homePage order by section asc;', function(err, row, fields) {
        if (err)
            throw err;

        for (var i in row) {
            var item = row[i];
            console.log(item);
            if (isFirst) {
                dbOut.topSection = item;
                isFirst = false;
            } else {
                if (!currentSection) {
                    currentSection = item.section;
                }
                if (currentSection != item.section) {
                    currentSection = item.section;
                    dbOut.sections.push(current);
                    current = [];
                }
                current.push(item);
            }
        }
        dbOut.sections.push(current);
        res.render('index', {title: 'Chattahoochee GSA', banner: "Chattahoochee Gay-Straight Alliance", nav: nav, slideshow: fs.readdirSync(__dirname + '/../public/images/slideshow'), db: dbOut});
    });

});

router.get("/flags", function(req, res, next) {
    res.render('flags', {title: 'Chattahoochee GSA', banner: "Flags", nav: nav});
});


module.exports = router;

//if (err)
//    throw err;
////console.log(row);
//var info = {header: row.header, content: row.content};
//if (isFirst) {
//    dbOut.topSection = info;
//    isFirst = false;
//} else {
//    if (!currentSection) {
//        currentSection = row.section;
//    }
//    if (currentSection != row.section) {
//        currentSection = row.section;
//        dbOut.sections.push(current);
//        current = [];
//    }
//    current.push(row);
//}
//
//}, function() {
//    dbOut.sections.push(current);
//    res.render('index', {title: 'Chattahoochee GSA', banner: "Chattahoochee Gay-Straight Alliance", nav: nav, slideshow: fs.readdirSync(__dirname + '/../public/images/slideshow'), db: dbOut});
//}