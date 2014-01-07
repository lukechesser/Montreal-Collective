(function (window, $, undefined) {

    'use strict';

    var $window, // store reference to $(window)
        cache, // store references to $(DOM)
        scrollThreshold; // after scrolling a certain distance, don't bother calculating

    $window = $(window);

    cache = {
        $header: $('.js-header'),
        $title: $('.js-header-title'),
    };

    // set to header height
    // plus a little extra for padding
    scrollThreshold = cache.$header.height() + 80;

    // helper function transform element vertically by a certain distance
    function transformAndFadeElement($element, scrollDistance, transformMultiplier, opacityMultiplier) {
        var yDistance,
            opacity,
            cssObject = {};

        yDistance = scrollDistance * transformMultiplier;
        opacity = scrollThreshold / (scrollThreshold + scrollDistance * opacityMultiplier);

        if (!isNaN(yDistance)) {
            cssObject.transform = 'translateY(' + (yDistance) + 'px)';
        }
        if (!isNaN(opacity)) {
            cssObject.opacity = opacity;
        }

        $element.css(cssObject);
    }

    // tests for touch
    // if touch exists, we don't apply the scroll parallax
    var isTouchDevice = (function () {
        if (('ontouchstart' in window) || window.DocumentTouch) {
          return true;
        }
    })();

    // on load
    $(function () {
        // only do the parallax scrolling
        // for non-touch devices
        if (!isTouchDevice) {
            $window.on('scroll', function () {
                var scrollDistance = $window.scrollTop();

                // if the header is no longer in view, don't bother calculating parallax values
                // since no one can see it anymore
                if (scrollDistance < scrollThreshold) {
                    transformAndFadeElement(cache.$header, scrollDistance, 1, null);
                    transformAndFadeElement(cache.$title, scrollDistance, (-1/2.5), 5);
                }
            });
        }
    });

})(window, jQuery);