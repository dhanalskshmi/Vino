
if ($('.timelineWrappers').length > 0) {

function windowSize(){

  var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 return x;

}



function windowHeight(){

  var w = window,
   d = document,
   e = d.documentElement,
   g = d.getElementsByTagName('body')[0],
   x = w.innerWidth || e.clientWidth || g.clientWidth,
   y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 return y;

}


function animate_time_line() {

     if(!$('.decade-wrapper').hasClass('scrolling')){

       $('ul.timeline.active .timeline-panel').each(function() {

         var e = 0;

         if ($(window).scrollTop() + windowHeight() > $(this).offset().top && $(this).hasClass("is-hidden")) {

             var a = $(this);
             setTimeout(function() {
             a.removeClass("is-hidden").addClass("animated swing");
             }, e);
         }
         e += 300;
       });

       }

     }


function auto_video_height(){


   if($('.homeBanner-wrapper video').length>0){



      if(windowSize()>=768)
       {
         $('.timelineWrapper .homeBanner-wrapper').attr("style","");
         var h=windowHeight();
         $('header,header .homeBanner-wrapper').css({'height':h});

       }
       else{
         $('header,header .homeBanner-wrapper').attr("style","");
         var h=windowHeight() - $('header').innerHeight();
         $('.timelineWrapper .homeBanner-wrapper').css({'height':h});

       }





   }


}




 function make_position_margin()
 {

   var w=$('header .container').width();
   $('.footer-wrapper').css('width',w);

 }



function indexOfMax(arr) {
   if (arr.length === 0) {
       return -1;
   }

   var max = arr[0];
   var maxIndex = 0;

   for (var i = 1; i < arr.length; i++) {
       if (arr[i] > max) {
           maxIndex = i;
           max = arr[i];
       }
   }

   return maxIndex;
}


 function auto_position_timeline(){


   var leftTopMargin=0;
   var rightTopMargin=0;
   var pos=[];
   var key=0;


   $('.timeline.active li').each(function(){

     if(!$(this).hasClass('clearfix'))
     {
       $(this).attr('style','');

     }

   });

   $('.timeline.active li:not(".timeline-inverted")').each(function(){

         var gap=0;
         if(windowSize()>=1360)
         {
           if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
           {

             var top=$(this).offset().top;
             var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

             gap=Math.round(top-prevTop);
               if(gap>60){

               gap=gap-60;
               //$(this).css({'position':'relative','top':'-'+gap});
               $(this).css({'margin-top':'-'+gap});

             }

             leftTopMargin=$(this).offset().top+$(this).outerHeight();
             pos[key]=leftTopMargin;
             key++;

           }
         } else if(windowSize()>=1024){

               if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
                 {

                   var top=$(this).offset().top;
                   var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

                   gap=Math.round(top-prevTop);
                     if(gap>30){

                     gap=gap-30;
                     //$(this).css({'position':'relative','top':'-'+gap});
                     $(this).css({'margin-top':'-'+gap});

                   }

                   leftTopMargin=$(this).offset().top+$(this).outerHeight();
                   pos[key]=leftTopMargin;
                   key++;

                 }

         }
         else if(windowSize()<=1023 && !$(this).hasClass('clearfix'))
         {

           $(this).attr('style','');
         }



   });



   $('.timeline.active li.timeline-inverted').each(function(){

         var gap=0;


         if(windowSize()>=1360)
         {
           if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
           {

             var top=$(this).offset().top;
             var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

             gap=Math.round(top-prevTop);
               if(gap>60){

               gap=gap-60;
               //$(this).css({'position':'relative','top':'-'+gap});
               $(this).css({'margin-top':'-'+gap});

             }

             rightTopMargin=$(this).offset().top+$(this).outerHeight();
             pos[key]=rightTopMargin;
             key++;


           }
         } else if(windowSize()>=1024){

               if($(this).prev().prev().prop('tagName')=="LI" && !$(this).hasClass('clearfix'))
                 {

                   var top=$(this).offset().top;
                   var prevTop=$(this).prev().prev().offset().top+$(this).prev().prev().outerHeight();

                   gap=Math.round(top-prevTop);
                     if(gap>30){

                     gap=gap-30;
                     //$(this).css({'position':'relative','top':'-'+gap});
                     $(this).css({'margin-top':'-'+gap});

                   }
                 rightTopMargin=$(this).offset().top+$(this).outerHeight();
                 pos[key]=rightTopMargin;
                 key++;


                 }

         }
         else if(windowSize()<=1023 && !$(this).hasClass('clearfix'))
         {

           $(this).attr('style','');
         }





   });


}



 var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
   var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
   var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
   var is_safari = navigator.userAgent.indexOf("Safari") > -1;
   var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
   if ((is_chrome)&&(is_safari)) {is_safari=false;}
   if ((is_chrome)&&(is_opera)) {is_chrome=false;}

$(document).ready(function(){


 // Find all data-toggle="sticky-onscroll" elements
 $('.decade-wrapper').each(function() {
   var sticky = $(this);
   var stickyWrapper = $('<div>').addClass('sticky-wrapper').addClass('hidden-xs'); // insert hidden element to maintain actual top offset on page
   sticky.prepend(stickyWrapper);

 });

 $('.decade-year-dropdown').selectmenu();

 //$("a.watch_video").YouTubePopUp();


 $('li.audio').click(function(){

     if($(this).data('mute')){

       $(this).find('.audio').hide();
       $(this).find('.audioMute').css({
         "opacity":"0",
         "display":"block",
       }).show().animate({opacity:1});
       $(this).data('mute',false);

        $("video").prop('muted', false) ;

     }else{
       $(this).find('.audioMute').hide();
       $(this).find('.audio').css({
         "opacity":"0",
         "display":"block",
       }).show().animate({opacity:1});

       $(this).data('mute',true);
        $("video").prop('muted', true)
     }

 });


 $('.arrow-down a').click(function(e){
 var tab_id = $(this).attr('href');

  /*$('html, body').animate({
       scrollTop: $(tab_id).offset().top
   }, 2000);*/

 e.preventDefault();
 });


 $('.arrow-up a').click(function(e){
 var tab_id = $(this).attr('href');

  $('html, body').animate({
       scrollTop: 0
   }, 2000);

 e.preventDefault();
 });


 $( "body").on( "click", 'ul.tabs li:nth-child(even) a,.ui-widget.ui-widget-content li:nth-child(even)', function( event ) {
   $('body').removeClass('odd').addClass('even');
 });


 $( "body").on( "click", 'ul.tabs li:nth-child(odd) a,.ui-widget.ui-widget-content li:nth-child(odd)', function( event ) {
   $('body').removeClass('even').addClass('odd');
 });


 $('ul.tabs li a').click(function(e){

   if(!$(this).hasClass('active')){


       var tab_id = $(this).attr('href');

       $('ul.tabs li a').removeClass('active');

       $(this).addClass('active');

       $(".timeline").removeClass('active');

       $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $(tab_id+'_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $('.timeline li:not(".clearfix")').attr('style','');


       var overlapHeight=0;
       if($('.decade-wrapper').hasClass('sticky'))
       {

         overlapHeight=$('.decade-wrapper').outerHeight()/2;
       }

       $('.sticky-wrapper').attr('style','');
       $('.decade-wrapper').removeClass( "sticky");
       $('.decade-wrapper').addClass('scrolling');
       $(tab_id).addClass('active');
       $(tab_id+'_flex').addClass('active');
       tab_id=tab_id.replace("#","");
       $('.decade-year-dropdown').val(tab_id);
       $('.decade-year-dropdown').selectmenu("refresh");

       if(overlapHeight!=0)
       {
        $('html, body').stop().animate({
           scrollTop: $('.decade-wrapper').offset().top-overlapHeight
         },750, function() {
           //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);

            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

             });
         }
         else
         {

            $('html, body').stop().animate({
              scrollTop: $('.decade-wrapper').offset().top-overlapHeight
             },750, function() {


             });

              $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();
         }




    }
   e.preventDefault();

 });


 $('.decade-year-dropdown').on('selectmenuchange', function() {

     var tab_id="#"+$(this).val();
     $('ul.tabs li a').removeClass('active');

     $("ul.tabs li a[href='"+tab_id+"']").addClass('active');

     $(".timeline").removeClass('active');
     $(tab_id).find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');
       $(tab_id+'_flex').find('.timeline-panel').removeClass('animated').removeClass('swing').addClass('is-hidden');

       //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);
       $(tab_id).addClass('active');
       $(tab_id+'_flex').addClass('active');
       $('.decade-wrapper').addClass('scrolling');

       var overlapHeight=0;
       if($('.decade-wrapper').hasClass('sticky'))
       {

         overlapHeight=$('.decade-wrapper').outerHeight()/2;
       }


       $('.sticky-wrapper').attr('style','');
       $('.decade-wrapper').removeClass( "sticky");
       $('.ui-selectmenu-menu').removeClass( "sticky");
       $('.ui-selectmenu-button').removeClass("sticky_select");




        if(overlapHeight!=0)
       {
        $('html, body').stop().animate({
           scrollTop: $('.decade-wrapper').offset().top
         },750, function() {
           //$(tab_id).addClass('active').addClass('in').hide().slideDown(1000);

            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

         });
         }
         else{


            $('html, body').stop().animate({
              scrollTop: $('.decade-wrapper').offset().top-overlapHeight
             },750, function() {


             });


            $('.decade-wrapper').removeClass('scrolling');


               //make_sticky_nav();
               auto_position_timeline();
               animate_time_line();

         }




 });

 //make_sticky_nav();
 make_position_margin();

 //auto_video_height();
 animate_time_line();
 //scrolltobottomarrowfit();

 $(window).on("load resize scroll",function(e){
   //make_sticky_nav();
   //console.log("test");
 animate_time_line();
 auto_position_timeline();
 //scrolltobottomarrowfit();
 });

 var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

 if(isMobile && $('video').length>0) {

     var posterUrl=$('header .homeBanner-wrapper video').attr('poster');
     $('header .homeBanner-wrapper video').remove();
     $('header .homeBanner-wrapper').html('<img src="'+posterUrl+'" alt="banner" />');
   }

 $(window).on("load resize",function(e){
 animate_time_line();
   make_position_margin();
 //auto_video_height();
 });


 $(function () {
    $("#timeline_dropdown-menu").addClass('timeline_dropdown');
    $('#timeline_dropdown-button').addClass('timelineselectNav');
    $('#decade-year-dropdown').selectmenu( 'menuWidget' ).addClass('mtimeline');
    $(".ui-selectmenu-menu").addClass( 'mtimelineLst' );
  });





 });
}
