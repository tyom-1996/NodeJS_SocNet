

socket.on('i-am-online',(data)=>{
					$('.chat_user_item').each(function(i){
										let data_id = $(this).find('.type_hiden_inp').attr('data_id');
										if (data_id == data.id  ){
															$(this).find('.user_status_inactive').attr('class','user_status_active')

															$('.guest_page.sun_status').removeClass('offline').addClass('online')
										}


					})
})


socket.on('i-am-offline',(data) =>{
				$('.chat_user_item').each(function(i){
											let data_id = $(this).find('.type_hiden_inp').attr('data_id');
									if (data_id == data.id  ){
														console.log(data_id)
														$(this).find('.user_status_active').attr('class','user_status_inactive')
									}
				})
})