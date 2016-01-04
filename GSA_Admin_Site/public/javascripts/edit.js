var EditSection = (function () {
    function EditSection() {
        this.selectors = {};
        this.formOptions = {};
        this.errors = {};
    }
    return EditSection;
})();
var home = new EditSection();
var animationTime = 500;
home.errors = {
    mustBeSelected: 'You must select a row and a section',
    firstRowAdd: 'Can\'t add section to first row.',
    firstRowDelete: 'Can\'t delete section to first row.'
};
var Mode = (function () {
    function Mode() {
    }
    return Mode;
})();
function handleError(error, mount) {
    $('.tab-content.current').css('height', '+=' + error.outerHeight(true));
}
function handleAllErrorRemove() {
    home.section.css('height', $('.section.currentSection').outerHeight(true));
}
$(function () {
    home.section = $('#home');
    home.selectDiv = $('#homeSelection');
    home.selectForm = $('#homeSelectForm');
    home.editDiv = $('#homeEdit');
    home.editForm = $('#headerForm');
    home.formOptions.selectRow = $('#selectRow');
    home.formOptions.selectSection = $('#selectSection');
    home.editDiv.css('top', -home.selectDiv.height());
    home.section.css('height', home.selectDiv.height());
    tinymce.init({
        selector: '#homeContentOption',
        plugins: 'advlist,anchor,autolink,autoresize,autosave,bbcode,charmap,code,codesample,colorpicker,contextmenu,directionality,emoticons,fullpage,fullscreen,hr,image,imagetools,importcss,insertdatetime,layer,legacyoutput,link,lists,media,nonbreaking,noneditable,pagebreak,paste,preview,print,save,searchreplace,spellchecker,tabfocus,table,template,textcolor,textpattern,visualblocks,visualchars,wordcount'
    });
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });
    $.ajax({
        type: 'GET',
        url: '/api/edit/homeEditSelectors',
        success: function (res) {
            var optionSelector = $('option');
            home.selectors = res;
            home.formOptions.selectRow.find(optionSelector).text("Select Row");
            home.formOptions.selectSection.find(optionSelector).text("Select Section");
            for (var i in res.rows) {
                var row = res.rows[i];
                var rowEntry = $(document.createElement('option'));
                rowEntry.attr('value', row).text("Row " + row);
                home.formOptions.selectRow.append(rowEntry);
            }
        },
        error: function (res) {
            if (res.status === 500)
                alert('There was an internal server error while getting the home selectors');
            else
                alert('Something went wrong while getting the home selectors');
        }
    });
    //Add clicked attribute to a submit input when clicked
    $("form input[type=submit]").click(function (event) {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
        //event.preventDefault();
    });
    //Home Selector Change Rules
    home.formOptions.selectRow.change(function () {
        home.formOptions.selectSection.find('option:gt(0)').remove();
        var rowSections = home.selectors.sections[home.formOptions.selectRow.val() - 1];
        for (var i in rowSections) {
            var section = rowSections[i];
            var sectionEntry = $(document.createElement('option'));
            sectionEntry.attr('value', section).text("Section " + (parseInt(i) + 1) + " - " + section);
            home.formOptions.selectSection.append(sectionEntry);
        }
    });
    //Home Selection Form Submit
    home.selectForm.submit(function (event) {
        event.preventDefault();
        var clickedButton = $('input[type=submit][clicked=true]');
        ErrorHandle.removeAllErrors(handleAllErrorRemove);
        if (home.formOptions.selectRow.val() === null || home.formOptions.selectSection.val() === null) {
            ErrorHandle.errorBefore(home.selectForm, home.errors.mustBeSelected, handleError);
            return;
        }
        if (clickedButton.attr('name') === 'edit') {
            console.log('edit');
            generateHomePageCustomizationDialog('edit', home.formOptions.selectRow.val(), home.formOptions.selectSection.val());
        }
        else if (clickedButton.attr('name') === 'add') {
            console.log('add');
            if (home.formOptions.selectRow.val() === '1') {
                ErrorHandle.errorBefore(home.selectForm, home.errors.firstRowAdd, handleError);
                return;
            }
            generateHomePageCustomizationDialog('add', home.formOptions.selectRow.val(), home.formOptions.selectSection.val());
        }
        else if (clickedButton.attr('name') === 'delete') {
            console.log('delete');
            if (home.formOptions.selectRow.val() === '1') {
                ErrorHandle.errorBefore(home.selectForm, home.errors.firstRowDelete, handleError);
                return;
            }
        }
    });
    home.editForm.submit(function (event) {
        console.log('Submit');
        event.preventDefault();
        var clickedButton = $('input[type=submit][clicked=true]');
        ErrorHandle.removeAllErrors(handleAllErrorRemove);
        //if (clickedButton.attr('name') === 'cancel') {
        home.section.children().removeClass('currentSection');
        home.selectForm.addClass('currentSection');
        var animWidth = parseFloat(home.selectDiv.css('left'));
        //home.editDiv.fadeIn(animationTime);
        home.selectDiv.delay(100).animate({ left: 0, opacity: 1 }, animationTime);
        home.editDiv.delay(100).animate({ left: -animWidth, opacity: 0 }, animationTime);
        setTimeout(function () {
            var h = home.selectDiv.height();
            home.section.animate({ height: h }, animationTime);
        }, 100);
        //}
    });
});
function generateHomePageCustomizationDialog(operation, row, section) {
    Mode.page = 'home';
    Mode.operation = operation;
    Mode.info = { row: row, section: section };
    home.section.children().removeClass('currentSection');
    home.editDiv.addClass('currentSection');
    var animWidth = parseFloat(home.editDiv.css('left'));
    home.selectDiv.delay(100).animate({ left: -animWidth, opacity: 0 }, animationTime);
    home.editDiv.delay(100).animate({ left: 0, opacity: 1 }, animationTime);
    setTimeout(function () {
        var h = home.editDiv.height();
        home.section.animate({ height: h }, animationTime);
    }, 100);
}
//# sourceMappingURL=edit.js.map