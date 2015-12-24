function logOut() {
    $.ajax({
        type: 'GET',
        url: '/api/logout',
        success: function(res) {
            window.location.replace('/');
        },
        error: function(res) {
            console.log('Failed to logout')
        }
    });
}
