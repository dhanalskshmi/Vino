// Animation on scroll



$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
  $('.animatable ').each(function() {
      var activeColor = $(this).attr('class');
    if ($(this).isInViewport()) {
      $(this).addClass('animate-in');
    } else {
      //$('.animatable').removeClass('animate-in');
    }
  });
});


/*jQuery(function($) {

  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {

    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');

    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
       var $animatable = $(this);

      // Items that are "above the fold"
			if (($animatable.offset().top + $animatable.height() + 30) < offset) {

        // Item previously wasn't marked as "above the fold": mark it now
        if (!$animatable.hasClass('animate-in')) {
          $animatable.removeClass('animate-out').addClass('animate-in');
        }

			}

      // Items that are "below the fold"
      else if (($animatable.offset().top + $animatable.height() + 30) > offset) {

        // Item previously wasn't marked as "below the fold": mark it now
        if ($animatable.hasClass('animate-in')) {
          $animatable.removeClass('animate-in').addClass('animate-out');
        }

      }

    });

	};

  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
  $(window).trigger('scroll');

});*/
