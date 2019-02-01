$(document).on('click','#login_btn',function(){
	var email = $('#email_inp')
	var password = $('#password_inp')
	if (email.val() != '' &&  password.val() != '' ) {
		
		$('#login').submit()
		
	}

})


 jQuery(document).ready(function($) {
  $("body").keydown(function(event) {
    if (event.keyCode == 13 && event.shiftKey == 0) {
      event.preventDefault();
     $('#login').submit()
    }
  });
});

