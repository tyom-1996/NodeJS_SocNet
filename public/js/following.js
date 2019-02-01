



$(document).on('click','.cancel_following_btn',function(){
			var user_id = $('#user_data').val()
			$.ajax({
				url:'/follower/cancel_follow',
				type:'POST',
				data:{'id':user_id},
				success:function(r){
									r= JSON.parse(r);

						$('.follow_btn_block').empty().append(`
										<button  type="button"  class="btn btn-default btn-sm get_following_btn" id="wo_useract_btn">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
										stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round">
										<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle>
										<line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
										</svg><span class="button-text"> Follow</span></button>
							`)

									$('.online-users').empty().append(r)
				}
			})
})



$(document).on('click','.get_following_btn',function(){
		var user_id = $('#user_data').val()
		var my_email = $('#user_email_socket').val()
		$.ajax({
		url:'/follower/new_follow',
		type:'POST',
		data:{'id':user_id,'my_email':my_email},
			success:function(r){
							r = JSON.parse(r)
								console.log()
					$('.follow_btn_block').empty().append(`
							<button type="button" class="btn-active btn btn-default btn-sm cancel_following_btn" 
							id="wo_useract_btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
							viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
							stroke-linecap="round" stroke-linejoin="round">
							<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
							<span class="button-text"> Following</span>	</button>
					`)


						$('.online-users').empty().append(r)

			}
		})
})





