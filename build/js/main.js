(function (window, $, undefined) {
    'use strict';

    var Collective = window.Collective;

    $(function () {
        console.log(Collective.entries);
    });

})(window, jQuery);;(function (window, $, undefined) {

    'use strict';

    var $body,
        cache;

    $body = $(document.body);

    cache = {
        $header: $('.js-header'),
        $title: $('.js-header-title'),
    };

    // makes transform cross-browser
    function transformWithPrefixes($element, yDistance) {
        $element.css({
            WebkitTransform: createTranslationString(yDistance),
            MozTransform: createTranslationString(yDistance),
            MsTransform: createTranslationString(yDistance),
            OTransform: createTranslationString(yDistance),
            transform: createTranslationString(yDistance)
        });
    }

    // helper to return the string value for transform
    function createTranslationString(yDistance) {
        return 'translateY(' + (yDistance) + 'px)';
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
            $(window).on('scroll', function () {
                var scrollDistance = $(window).scrollTop();

                // if the header is no longer in view, don't bother calculating parallax values
                // since no one can see it anymore
                if (scrollDistance < 400) {
                    transformWithPrefixes(cache.$title, scrollDistance/2);
                }
            });
        }
    });

})(window, jQuery);