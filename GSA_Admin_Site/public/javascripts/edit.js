var home = {
    section: null,
    selectors: null,
    selectRow: null,
    selectSection: null
};

$(function() {
    home.section = $('#home');
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
            console.log(res);
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
    home.selectRow.change(function() {
        home.selectSection.find('option:gt(0)').remove();
        var rowSections = home.selectors.sections[home.selectRow.val() - 1];
        for (var i in rowSections) {
            var section = rowSections[i];
            var sectionEntry = $(document.createElement('option'));
            sectionEntry.attr('value', section).text("Section " + (parseInt(i) + 1) + " - " + section);
            home.selectSection.append(sectionEntry);
        }
    })
});
