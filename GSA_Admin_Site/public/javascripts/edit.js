var home = {
    section: null,
    selectors: null,
    selectForm: null,
    selectRow: null,
    selectSection: null,
    errors: {
        mustBeSelected: 'You must select a row and a section',
        firstRowAdd: 'Can\'t add section to first row.',
        firstRowDelete:'Can\'t delete section to first row.'
    }
};

var mode = {
    operation: '',
    page: '',
    info: null
};

$(function() {
    home.section = $('#home');
    home.selectForm = $('#homeSelectForm');
    home.selectRow = $('#selectRow');
    home.selectSection = $('#selectSection');


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
            home.selectRow.find(optionSelector).text("Select Row");
            home.selectSection.find(optionSelector).text("Select Section");
            for (var i in res.rows) {
                var row = res.rows[i];
                var rowEntry = $(document.createElement('option'));
                rowEntry.attr('value', row).text("Row " + row);
                home.selectRow.append(rowEntry);
            }
        },
        error: function(res) {
            if (res.status === 500)
                alert('There was an internal server error while getting the home selectors');
            else
                alert('Something went wrong while getting the home selectors');
        }
    });

    //Added clicked attribute to a submit input when clicked
    $("form input[type=submit]").click(function(event) {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
        //event.preventDefault();
    });

    //Home Selector Change Rules
    home.selectRow.change(function() {
        home.selectSection.find('option:gt(0)').remove();
        var rowSections = home.selectors.sections[home.selectRow.val() - 1];
        for (var i in rowSections) {
            var section = rowSections[i];
            var sectionEntry = $(document.createElement('option'));
            sectionEntry.attr('value', section).text("Section " + (parseInt(i) + 1) + " - " + section);
            home.selectSection.append(sectionEntry);
        }
    });

    //Home Selection Form Submit
    home.selectForm.submit(function(event) {
        event.preventDefault();
        var clickedButton = $('input[type=submit][clicked=true]');
        removeAllErrors();
        if (home.selectRow.val() === null || home.selectSection.val() === null) {
            prependError(home.section, home.errors.mustBeSelected);
            return;
        }
        if (clickedButton.attr('name') === 'edit') {
            console.log('edit');
            generateHomePageCustomizationDialog('edit', home.selectRow.val(), home.selectSection.val());
        } else if (clickedButton.attr('name') === 'add') {
            console.log('add');
            if (home.selectRow.val() === '1') {
                prependError(home.section, home.errors.firstRowAdd);
                return;
            }
            generateHomePageCustomizationDialog('add', home.selectRow.val(), home.selectSection.val());
        } else if (clickedButton.attr('name') === 'delete') {
            console.log('delete');
            if (home.selectRow.val() === '1') {
                prependError(home.section, home.errors.firstRowDelete);
                return;
            }
        }
    });
});

function generateHomePageCustomizationDialog(operation, row, section) {
    mode.page = 'home';
    mode.operation = operation;
    mode.info = {row: row, section: section};
}