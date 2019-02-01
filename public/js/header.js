// SEARCH PAGE

//  jQuery(document).ready(function($) {
//   $(".search-input").keydown(function(event) {
//     if (event.keyCode == 13 && event.shiftKey == 0) {
//       event.preventDefault();
     
//       window.location = location.origin+'/user/search?query=' + $(this).val()
//     }
//   });
// });





// **------------------------------

   // Top RIGHT MENU

   $(document).on('click','.dropdown-toggle.user-menu-combination',function(){
      var id = $('#dropdown_menu').attr('id')

      $('.header_item').each(function(i){
            if ($(this).attr('id') != id ) {
              $(this).removeClass('open')
            }
      })
     
      $('#dropdown_menu').toggleClass('open')
   })



   $(document).on('click','.dropdown-toggle.sixteen-font-size',function(){
       var id = $(this).parent().attr('id')

      $('.header_item').each(function(i){
          if ($(this).attr('id') != id ) {
            $(this).removeClass('open')
          }
      })

      $(this).parent().toggleClass('open')
   })




jQuery(function($){
    $(document).mouseup(function (e){ 
        
        if (!$(".dropdown-menu.clearfix.notifications-dropdown").is(e.target)  && $(".dropdown-menu.clearfix.notifications-dropdown").has(e.target).length === 0 && $('#notification').hasClass('open')) { 
            $('#notification').removeClass('open'); 
        }
        if (!$("#messages-list").is(e.target)  && $("#messages-list").has(e.target).length === 0 && $('#messages').hasClass('open')) {
        	$('#messages').removeClass('open')
        }

        if (!$(".dropdown-menu ani-acc-menu").is(e.target)  && $(".dropdown-menu ani-acc-menu").has(e.target).length === 0 && $('#dropdown_menu').hasClass('open')) {
        	$('#dropdown_menu').removeClass('open')
        }

        if (!$("#requests-list").is(e.target)  && $("#requests-list").has(e.target).length === 0 && $('#requests').hasClass('open')) {
        	$('#requests').removeClass('open')
        }

        if (!$(".dropdown-menu.clearfix.create_head_menu").is(e.target)  && $(".dropdown-menu.clearfix.create_head_menu").has(e.target).length === 0 && $('#head_name_links').hasClass('open')) {
        	$('#head_name_links').removeClass('open')
        }

        if (!$(".dropdown.search-container").is(e.target)  && $(".dropdown.search-container").has(e.target).length === 0 && $('.dropdown.search-container').hasClass('open')) {
        	$('.dropdown.search-container').removeClass('open')
        }

    });
});


// /--------------------

   // SEARCH INPUT

   $(document).on('click','.form-control.search-input',function(){
    $('.dropdown.search-container').toggleClass('open')
   })





  $(document).on('click', '#night_mode_toggle', function(event) {
     mode = $(this).attr('data-mode');
     if (mode == 'night') {
         $('head').append('<link rel="stylesheet" href="/css/dark_style.css" id="night-mode-css">');
         $('#night_mode_toggle').attr('data-mode', 'day');
         $('#night-mode-text').text('Day mode');
          localStorage["dark"] = 'true'
     } else {
         $('#night-mode-css').remove();
         $('#night_mode_toggle').attr('data-mode', 'night');
         $('#night-mode-text').text('Night mode');
         // localStorage.setItem('dark','false')
          localStorage["dark"] = 'false'
     }
   });


// function Wo_RegisterFollow(){
  
// }