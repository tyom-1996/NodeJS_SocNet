
         

   $(document).on('click','.postText',function(){
    $('.publisher-box-footer').show()
    $('body').addClass('pub-focus')
   })      

   $(document).on('click','#focus-overlay',function(){
    $('.publisher-box-footer').toggle()
    $('body').toggleClass('pub-focus')
   })      


    jQuery(document).ready(function($) {
	  $("body").keydown(function(event) {
	    if (event.keyCode == 27 && event.shiftKey == 0) {
	      event.preventDefault();
	      if($('body').hasClass('pub-focus')){
	      	$('body').removeClass('pub-focus')
	      	 $('.publisher-box-footer').toggle()
	      }

	    }
	  });
	});



   $(document).ready(function(){
   		$('.postText ').attr('maxlength','5000')
   })


	$(document).on('input','.postText',function(){
		let chars = 5000;
		let length =  $(this).val().length;
		chars -= length;
		$('#charsLeft').text(chars)
	})



// ADD POST

		function imgToData(input) {
    if (input.files) {
    	$('#image-holder').empty()
	 		 $('#photo-form').show()

      if (input.files.length <= 5) {

        $.each(input.files, function(i, v) {
            var n = i + 1;
            var File = new FileReader();
            File.onload = function(event) {
																$('<img/>').attr({
																		src: event.target.result,
																		class: 'img',
																		id: 'img-' + n + '-preview',
																}).appendTo('#image-holder');
            };
            File.readAsDataURL(input.files[i]);
          });

	        		var numFiles = input.files.length;
											$("#photo-form input").val(numFiles + ' photo(s) selected').css('color','#555');
											$("#photo-form").slideDown(200);

        }else{
        	$("#photo-form input").val('');
        	$('#publisher-photos').val('')
									$("#photo-form").slideUp(200);
        }
        
      }
  }


 $(document).on('change','#publisher-photos', function() {

    imgToData(this);
    $("#publisher-music").val('');
				$("#music-form").slideUp(200);
				$("#publisher-video").val('');
				$("#video-form").slideUp(200);

				$('#publisher-camera').val('')

  });


 $(document).on('click','#camera-button-btn',function(){

    $('.publisher-box-footer').show()
    $('body').addClass('pub-focus')

 })


			function get_file_name(inp_file){
								var filename = ''
								for (let i = 0; i < inp_file.length; i++) {
													if ( inp_file.length == 1 || i == inp_file.length - 1){
																		filename +=  inp_file[i].name+'.'
																		break
													}
													filename +=  inp_file[i].name+',  '
								}
								return filename
			}





	$(document).on('change','#publisher-video', function() {
						if ($(this).prop('files').length > 1){
											console.log($(this).prop('files'))

											$("#video-form input[type='text']").val('You can upload only one video at a time.').css('color','red');
											$("#video-form").slideDown(200);
											$("#publisher-video").val('');

											$("#photo-form input").val('');
											$('#publisher-photos').val('')
											$("#photo-form").slideUp(200);

											$("#publisher-music").val('');
											$("#music-form").slideUp(200);

											setTimeout(()=>{
																$("#video-form input[type='text']").val('')
																$("#video-form").slideUp();
											},3000)

											$('#publisher-camera').val('')

						}else{
											$("#video-form input[type='text']").val(get_file_name($(this).prop('files'))).css('color','black');
											$("#video-form").slideDown(200);
											console.log($(this).prop('files'))

											$("#photo-form input").val('');
											$('#publisher-photos').val('')
											$("#photo-form").slideUp(200);

											$("#publisher-music").val('');
											$("#music-form").slideUp(200);

											$('#publisher-camera').val('')
						}


	});




$(document).on('change','#publisher-music', function() {
					if ($(this).prop('files').length > 1){

										$("#music-form input").val('You can upload only one music at a time.').css('color','red');
										$("#music-form").slideDown(200);
										$("#publisher-music").val('');

										$("#publisher-photos").val('');
										$("#photo-form").slideUp(200);

										$("#publisher-video").val('');
										$("#video-form").slideUp(200);

										$('#publisher-camera').val('')

										setTimeout(()=>{
															$("#music-form input").val('');
															$("#music-form").slideUp();
										},3000)

					}else{
										$("#music-form input").val(get_file_name($(this).prop('files'))).css('color','black');
										$("#music-form").slideDown(200);

										$("#publisher-photos").val('');
										$("#photo-form").slideUp(200);

										$("#publisher-video").val('');
										$("#video-form").slideUp(200);
										$('#publisher-camera').val('')
					}


});


  $(document).on('submit','#publisher-box-focus', function(e) {
    e.preventDefault();
    if($('#publisher-camera').val().length > 0){
					$.ajax({
							url:'/post/new_camera_post',
							type:'post',
							data:{base64:JSON.stringify($('#publisher-camera').val()),text:$('#post_textarea').val() },
							success:function(r){
									console.log(r)
												$('#post_textarea').val('')
									$('#publisher-camera').val('')
									$('#photo-form').hide()
									$('#image-holder').empty()
									$('body').removeClass('pub-focus')
									$('.publisher-box-footer').toggle()
									webcamStream.stop();
									return false;
							}
					})
				}else{

					if ( $('#publisher-music').val().length == 0  &&  $('#publisher-camera').val().length == 0
								&&  $('.postText ').val().length == 0
								&&  $('#publisher-photos').val().length == 0 &&  $('#publisher-video').val().length == 0
					){
								$('.publisher-box-footer').toggle();
								$('body').toggleClass('pub-focus');
								return false;
					}

					$(this).ajaxSubmit({

							error: function(xhr) {
									status('Error: ' + xhr.status);
							},
							success: function(r) {
									console.log(r)
									$("#publisher-photos").val('');
									$("#post_textarea").val('');
									$("#photo-form").slideUp(200);
									$("#publisher-video").val('');
									$("#video-form").slideUp(200);
									$("#publisher-music").val('');
									$("#music-form").slideUp(200);
									$('body').removeClass('pub-focus')
									$('.publisher-box-footer').toggle()
							}
					});

					return false;
				}
    
    

});


  //==------------------------------CAMERA SCRIPT-----------------------------==//



			navigator.getUserMedia = ( navigator.getUserMedia ||	navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||		navigator.msGetUserMedia);

			var video;
			var webcamStream;
			var canvas
			var ctx;

			$(document).ready(function(){
								canvas = document.getElementById("myCanvas");
								ctx = canvas.getContext('2d');
			})

			$(document).on('click','.start_webcam',function(){

					if (navigator.getUserMedia) {
							navigator.getUserMedia ({
									video: true,
									audio: false
							},
							function(stream) {
									// $('#video_bl img').remove()
									$('video').show()
									$('.snap_shot').css('display','flex')
									$('.close_video_bl').css('display','flex')
									video = document.querySelector('video');
									video.srcObject=stream;
									webcamStream = stream.getTracks()[0];
							},
							function(err) {
									console.log(`The following error occured: ${err}`);
							});
					}
					else {
										console.log('getUserMedia not supported');
					}
			})



			$(document).on('click','.snap_shot',function(){
								ctx.drawImage(video, 0,0,400,300);
								var base64dataUrl = canvas.toDataURL('image/png');
								// ctx.setTransform(1, 0, 0, 1, 0, 0);
								var image = new Image();
								image.src = canvas.toDataURL("image/png");
								image.id = 'camera_img'


								$('#publisher-camera').val(base64dataUrl);
								// $('#video_bl img').remove()
								$('#image-holder').empty().append(image)
								$('#photo-form').show()
								$("#photo-form input").val(1 + ' photo(s) selected').css('color','#555');
								$("#publisher-photos").val('');


								$('#video').hide()
								$('.snap_shot').hide()
								$('.close_video_bl').hide()

								$("#music-form").slideUp(200);
								$("#publisher-music").val('');

								// $("#photo-form").slideUp(200);

								$("#publisher-video").val('');
								$("#video-form").slideUp(200);

			})


			$(document).on('click','.close_video_bl',function(){
					$('#publisher-camera').val('')
					$('#photo-form').hide()
					$('#image-holder').empty()

				$('video').hide()
				$('.snap_shot').hide()
				$('.close_video_bl').hide()
					webcamStream.stop();
			})







































