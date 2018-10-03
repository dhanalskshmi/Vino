// Animation on scroll



$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  console.log('view');
  $('.animatable').each(function() {
      var activeColor = $(this).attr('class');
    if ($(this).isInViewport()) {
      $('.animatable').addClass('active');
    } else {
      $('.animatable').removeClass('active');
    }
  });
});
