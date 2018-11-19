
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
var isshow = window.localStorage.getItem('isshow');
var isshowalert = window.localStorage.getItem('isshowalert');
if(isshow == null){

    setTimeout(function() {
    $('html').addClass('popUpOpen');
    if($('.popUpWrapper').length > 0){
        setTimeout(function(){
          $('.popupWrap .wrap,.popUpWrapper').addClass('Open');
        },100);
    }

  },3500);
}
if(isshowalert == null){
    $(".alertsPannel").fadeIn();
    $(".floatingAlerts").fadeIn();
}

$('.close').click(function() {
  $('html').removeClass('popUpOpen');
  $('.popupWrap .wrap,.popUpWrapper').removeClass('Open');
  window.localStorage.setItem('isshow', 1);
});
$('.close-alerts').click(function() {
    $(this).closest(".alertsPannel").fadeOut();
    $(this).closest(".floatingAlerts").fadeOut();
    window.localStorage.setItem('isshowalert', 1);
    setTimeout(function(){
      //alert($('header').outerHeight());
      $('.SubmenuWrapper').css({'top': ''});
  	},100);

});
$('.contiLnk').on('click',function(){
    window.localStorage.setItem('isshow', 1);
    $('html').removeClass('popUpOpen');
    $('.popupWrap .wrap,.popUpWrapper').removeClass('Open');

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
    $(".warnAlert").length > 0 && $("html, body").animate({
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
        var top_of_element = $("form.wpcf7-form").offset().top;
        var bottom_of_element = $("form.wpcf7-form").offset().top + $("form.wpcf7-form").outerHeight();
        var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
        var top_of_screen = $(window).scrollTop();
        var top_of_element1 = $("form#joinemailForm").offset().top;
        var bottom_of_element1 = $("form#joinemailForm").offset().top + $("form#joinemailForm").outerHeight();
        var bottom_of_screen1 = $(window).scrollTop() + window.innerHeight;
        var top_of_screen1 = $(window).scrollTop();

        if(((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) || ((bottom_of_screen1 > top_of_element1) && (top_of_screen1 < bottom_of_element1))){
            $("form.wpcf7-form .grecaptcha-badge").show();
        }
        else {
            $("form.wpcf7-form .grecaptcha-badge").hide();
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
  var headHgt = $('header').height();
  //console.log(headHgt);
    $(".scroll").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
          scrollTop: ($(target).offset().top) - headHgt
        }, 500);
     });
     if ($('.warnAlert').length > 0) {
        setTimeout(function() {
            $('.warnAlert').fadeOut();
          },7000);
     }
});
$(document).ready(function(){
    "use strict";
    var form = $(".form-login"),
        url = {
            protocol: "https://",
            roDomain: "web1.secureinternetbank.com",
            ro: "/pbi_pbi1961/pbi1961.ashx?wci=RemoteLogin&logonby=connect3&prmaccess=Portfolio&rt=",
            boDomain: "web1.secureinternetbank.com",
            bo: "/ebc_ebc1961/ebc1961.ashx?wci=Process&wce=RemoteLogon&irl=T&mfa=2&rt=",
            rt: "221272167"
        };
    form.on("submit", function() {
        if (!this.AccessID.value) {
            //alert("Please enter a valid Access ID. Thank you!");
            return false
        }
        this.nmUID.value = this.AccessID.value;
        this.nmRTN.value = url.rt;
        this.action = url.protocol + (this.app.value == 0 ? url.roDomain + url.ro : url.boDomain + url.bo) + url.rt
    })
});


/*       Speedbump     */
$('body').on('click', 'a.speedbump', function(e){
    e.preventDefault();
    var link = $(this);
    $("#SpdBump_Popup").modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#leaveThispage").attr('href', link.attr('href'));
});
$(document).ready(function(){
    $('a.speedbump').click(function(){
        $("#SpdBump_Popup").modal('show');
    });
    $('#stayOn').click(function(e){
        e.preventDefault();
        $("#SpdBump_Popup").modal('hide');
    });
    $('#leaveThispage').click(function(e){
        $("#SpdBump_Popup").modal('hide');
    });
});