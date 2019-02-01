function login_validate(){
	
	if ($('#email_inp').val() == "" || $('#password_inp').val() == ""){
		$('#email_inp').val() == "" ?  $('#email_inp').css('border','2px solid #a84849') : $('#email_inp').css('border','2px solid #d9d9d9')
		$('#password_inp').val() == "" ?  $('#password_inp').css('border','2px solid #a84849') : $('#password_inp').css('border','2px solid #d9d9d9')
		$('.errors').text('All fields are required').css('color', ' #a84849')
		$('.errors').show()
		return false
	}else{
		if ( $('#password_inp').val().length < 5) {
			$('.errors').empty().append('The password is too short').css('color',' #a84849')
			$('.errors').show()
			return false
		}
	}	
	return true;
}

$(document).on('click','#login_btn',function(){
	event.preventDefault();
	if (!login_validate()) {
		return false
	}
	$('#login').submit()
})



  $(document).on('keydown','body',function(event) {
				console.log()
    if (event.keyCode == 13 && event.shiftKey == 0) {

									event.preventDefault();
									if (!login_validate()) {
														return false
									}
									$('#login').submit()

    }
  });


