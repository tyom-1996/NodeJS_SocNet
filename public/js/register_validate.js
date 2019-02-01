$(document).on('click','#sign_submit',function(){
	var input_name = $('.input_name')
	var input_email = $('.input_email')
	var input_pass = $('.input_pass')
	var input_pass_confirm = $('.input_pass_confirm')
	if (input_name.val() == "" || input_email.val() == "" || input_pass.val() == "" || input_pass_confirm.val() == "" ) {
		if (input_name.val() == ""){
			 $('.input_name').css({
			 	'border':'2px solid #a84849'
			 })
		}else{
			$('.input_name').css({
				'border':'2px solid #d9d9d9'
			})
		}
		if (input_email.val() == ""){
			 $('.input_email').css({
			 	'border':'2px solid #a84849'
			 })
		}else{
			$('.input_email').css({
				'border':'2px solid #d9d9d9'
			})
		}
		if (input_pass.val() == ""){
			 $('.input_pass').css({
			 	'border':'2px solid #a84849'
			 })
			 $('.error_pass').empty()

		}else{
			$('.input_pass').css({
				'border':'2px solid #d9d9d9'
			})
		}
		if (input_pass_confirm.val() == ""){
			 $('.input_pass_confirm').css({
			 	'border':'2px solid #a84849'
			 })
			 $('.error_pass').empty()
		}else{
			$('.input_pass_confirm').css({
				'border':'2px solid #d9d9d9'
			})
		}
		if (!$('#accept_terms').hasClass('active')) {
			$('.terms label,.terms label a').css({
				'color':'#a84849'
			})
		}else{
			$('.terms label').css({
				'color':'#333'
			})
			$('.terms label a').css({
				'color':'#666'
			})


		}
		$('.error_p').text('All fields are required').css({
			'color': ' #a84849'
		})
		return false
	}else{
		$('.error_p').empty()
	}

	if (input_pass.val() != '' &&  input_pass_confirm.val() !='' &&  input_pass.val() != input_pass_confirm.val() ) {
		$('.error_pass').empty().append('<h6>Passwords do not match<h6>').css({
			'color': ' #a84849'
		})
		return false
	}
	var length_pass = input_pass.val()
	var length_pass_conf = input_pass_confirm.val()

	if (input_pass.val() != '' &&  input_pass_confirm.val() !='' && length_pass.length < 5 &&  length_pass_conf.length < 5  ) {
		$('.error_pass').empty().append('<h6>The password is too short<h6>').css({
			'color': ' #a84849'
		})
		return false
	}
})


$(document).on('change','#accept_terms',function(){
	$(this).toggleClass('active')
})