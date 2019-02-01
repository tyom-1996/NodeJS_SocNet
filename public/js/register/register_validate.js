$(document).on('click','#sign_submit',function(){

	if ($('.input_name').val() == "" || $('.input_email').val() == "" || $('.input_pass').val() == "" || $('.input_pass_confirm').val() == "" || $('.input_surname').val() == "" ) {
		
		$('.input_name').val() == "" ?  $('.input_name').css('border','2px solid #a84849') : $('.input_name').css('border','2px solid #d9d9d9')
		$('.input_surname').val() == "" ?  $('.input_surname').css('border','2px solid #a84849') : $('.input_surname').css('border','2px solid #d9d9d9')
		$('.input_email').val() == "" ?  $('.input_email').css('border','2px solid #a84849') : $('.input_email').css('border','2px solid #d9d9d9')
		
		$('.input_pass').val() == "" ? (
		   $('.input_pass').css('border','2px solid #a84849'),
		   $('.error_pass').empty()
		) : (
		   $('.input_pass').css('border','2px solid #d9d9d9')
		);
		$('.input_pass_confirm').val() == "" ?(
			$('.input_pass_confirm').css('border','2px solid #a84849'),
			$('.error_pass').empty()
		):(
			$('.input_pass_confirm').css('border','2px solid #d9d9d9')
		);

		$('.errors').text('All fields are required').css('color', ' #a84849')
		$('.errors ').show()

		return false
	}else{
		$('.errors').empty()
		$('.errors ').hide()
	}

	if ($('.input_pass').val() != '' &&  $('.input_pass_confirm').val() !='' &&  $('.input_pass').val() != $('.input_pass_confirm').val() ) {
		$('.errors').empty().append('Passwords do not match').css('color', ' #a84849')
		$('.errors ').show()
		return false
	}

	if ($('.input_pass').val() != '' &&  $('.input_pass_confirm').val() !='' && $('.input_pass').val().length < 5 &&  $('.input_pass_confirm').val().length < 5  ) {
		$('.errors').empty().append('The password is too short').css('color',' #a84849')
		$('.errors ').show()
		return false
	}


})