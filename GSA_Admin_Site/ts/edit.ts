class EditSection {
    section: JQuery;
    selectors: any = {};
    selectForm: JQuery;
    formOptions: any = {};
    errors: any = {};
}

var home = new EditSection();
home.errors = {
    mustBeSelected: 'You must select a row and a section',
    firstRowAdd: 'Can\'t add section to first row.',
    firstRowDelete:'Can\'t delete section to first row.'
};

class Mode {
    static operation: string;
    static page: string;
    static info: any;
}

$(function() {
    home.section = $('#home');
    home.selectForm = $('#homeSelectForm');
    home.formOptions.selectRow = $('#selectRow');
    home.formOptions.selectSection = $('#selectSection');

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });

    $.ajax({
        type: 'GET',
        url: '/api/edit/homeEditSelectors',
        success: function(res) {
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
        error: function(res) {
            if (res.status === 500)
                alert('There was an internal server error while getting the home selectors');
            else
                alert('Something went wrong while getting the home selectors');
        }
    });

    //Add clicked attribute to a submit input when clicked
    $("form input[type=submit]").click(function(event) {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
        //event.preventDefault();
    });

    //Home Selector Change Rules
    home.formOptions.selectRow.change(function() {
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
    home.selectForm.submit(function(event) {
        event.preventDefault();
        var clickedButton = $('input[type=submit][clicked=true]');
        ErrorHandle.removeAllErrors();
        if (home.formOptions.selectRow.val() === null || home.formOptions.selectSection.val() === null) {
            ErrorHandle.errorBefore(home.selectForm, home.errors.mustBeSelected);
            return;
        }
        if (clickedButton.attr('name') === 'edit') {
            console.log('edit');
            generateHomePageCustomizationDialog('edit', home.formOptions.selectRow.val(), home.formOptions.selectSection.val());


        } else if (clickedButton.attr('name') === 'add') {
            console.log('add');
            if (home.formOptions.selectRow.val() === '1') {
                ErrorHandle.errorBefore(home.selectForm, home.errors.firstRowAdd);
                return;
            }
            generateHomePageCustomizationDialog('add', home.formOptions.selectRow.val(), home.formOptions.selectSection.val());


        } else if (clickedButton.attr('name') === 'delete') {
            console.log('delete');
            if (home.formOptions.selectRow.val() === '1') {
                ErrorHandle.errorBefore(home.selectForm, home.errors.firstRowDelete);
                return;
            }
        }
    });
});

function generateHomePageCustomizationDialog(operation, row, section) {
    Mode.page = 'home';
    Mode.operation = operation;
    Mode.info = {row: row, section: section};

}