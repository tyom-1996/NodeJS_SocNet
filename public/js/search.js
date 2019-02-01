$(document).on('input','.search-input',function(){
	var value = $(this).val()
	$('#wo_repeat_search').text(value)
	$('.dropdown .search-container').addClass('open')
				if (value.length > 1) {
								$.ajax({
									url:'/profile/search',
									type:'post',
									data:{value:value},
									success:function(r){
										r = r.data
										$('.search-dropdown-result').empty().append(r)
									}

								})
	}else{
					$('.search-dropdown-result').empty()
					$('.dropdown search-container').removeClass('open')
	}
})

