
function onSubmit(token) {
    document.getElementById('contactForm').submit();
}
function onSubmitNews(token) {
    document.getElementById('joinemailForm').submit();
}

if ($('.joinEmail').length > 0) {
  $(document).ready(function() {

    jQuery.validator.addMethod("EmailVal", function (e, t) {
        var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.optional(t) || o.test(e)
    }, "Please enter a valid email address.")
    var validator = $('#joinemailForm').validate({
        rules: {
            email: {
                EmailVal: !0
            },
        },
        ignore: [],
        highlight: function (element, errorClass) {
            var selector = "#" + element.id;
            $(selector).addClass(errorClass);

            $(selector).parent().find("span.vd").removeClass('f-important f-success').addClass('f-error');
            $(selector).parent().removeClass("successForm");
            $(selector).parent().addClass("errorForm");
        },
        unhighlight: function (element, errorClass) {

            var selector = "#" + element.id;
            $(selector).removeClass(errorClass);
            $(selector).parent().removeClass("errorForm");
            $(selector).parent().find("span.vd").removeClass('f-important f-error').addClass('f-success');
            $(selector).parent().addClass("successForm");
            $('input[type="text"]').each(function () {
                if ($(this).val() == "") {
                    $(this).parent().removeClass("successForm");
                }
            });
        },
        submitHandler: function (form) {
            var reCaptchaID = GetReCaptchaID("capt_join");
            grecaptcha.reset(reCaptchaID);
            grecaptcha.execute(reCaptchaID);
        },
        errorPlacement: function (error, element) { }
    });

  });
}

// Home PopUP

setTimeout(function() {
  $('html').addClass('popUpOpen');
  if($('.popUpWrapper').length > 0){
      //console.log('open');
      setTimeout(function(){
        $('.popupWrap .wrap').addClass('Open');
      },100);
  }

},3500);
$('.close').click(function() {
  $('html.pop').removeClass('popUpOpen');
  $('.popupWrap .wrap').removeClass('Open');
});

$(document).ready(function() {
    $("#contactSucc").length > 0 && $("html, body").animate({
        scrollTop: $(".contactFormWrap").offset().top - 200
    }, "slow")
});
$(document).ready(function() {
    $("#joinSuccess").length > 0 && $("html, body").animate({
        scrollTop: $(".joinEmail").offset().top
    }, "slow")
});
function isInView(el) {
    if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];
    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return ((rect.left >= 0) && (rect.top >= 0) && ((rect.left + rect.width) <= windowWidth) && ((rect.top + rect.height) <= windowHeight));
}

$(".grecaptcha-badge").hide();
if ($('form.wpcf7-form').length > 0) {
    $(window).on("load resize scroll", function(e) {
        var visibleATview = false;
        $('form.wpcf7-form,form .wpcf7-form').each(function() {
            if (isInView($(this))) {
                visibleATview = true;
            }
        });
        if (visibleATview) {
            $(".grecaptcha-badge").show();
        } else {
            $(".grecaptcha-badge").hide();
        }
    });
}
function GetReCaptchaID(containerID) {
    var retval = -1;
    $(".g-recaptcha").each(function(index) {
        if(this.id == containerID)
        {
            retval = index;
            return;
        }
     });

     return retval;
}


function equalHeight(group) {
   tallest = 0;
   group.each(function() {
     $(this).css("height","auto");
      thisHeight = $(this).height();
      if(thisHeight > tallest) {
         tallest = thisHeight;
      }
   });
   group.height(tallest);
}


if ($('.eventsPannel').length > 0) {
  $(window).on('load resize', function () {
    equalHeight($(".evenhgt"));
  });
}

$(document).ready(function(){
    $(".scroll").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
          scrollTop: ($(target).offset().top)
        }, 500);
     });
});