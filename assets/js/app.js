$( document ).ready(function() {

	/* Sidebar height set */
	$('.sidebar').css('min-height',$(document).height());

	/* Secondary contact links */
	var scontacts = $('#contact-list-secondary');
	var contact_list = $('#contact-list');
	
	scontacts.hide();
	
	contact_list.mouseenter(function(){ scontacts.fadeIn(); });
	
	contact_list.mouseleave(function(){ scontacts.fadeOut(); });

    // Activate tab automatically on page load
    $('a[href="' + window.location.hash + '"]').trigger('click');
    $('a[data-toggle=tab]').on('click', function() {
        window.scrollTo(0, 0);
    });

});
