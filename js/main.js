(function (window, $, undefined) {
    'use strict';

    var Collection, // global object
        cache, // store references to DOM
        c, // alias to cache
        state; // store any references to state

    Collection = {
        Utilities: {}, // store any helper functions
        View: {}, // store any view functions
    };

    Collection.cache = c = cache = {
        $tab: $('.js-tab'),
        $mobileTab: $('.js-mobile-tab'),
        $entryList: $('.js-entry-list'),
        $all: $('.js-entry'),
        $startups: null,
        $companies: null,
        $investors: null,
        $events: null,
    };

    Collection.state = state = {
        filter: 'all',
    };

    // ==========================================================================
    // * Collection Functions
    // ==========================================================================

    Collection.updateFilterState = function (newFilter) {
        state.filter = newFilter;
    };

    Collection.callFilter = function (filter) {
        Collection.View.setActiveTabs(filter);
        Collection.View.filterEntries(filter);
        Collection.updateFilterState(filter);
    };

    // ==========================================================================
    // * Collection View Functions
    // ==========================================================================

    Collection.View.setActiveTabs = function (newFilter) {
        Collection.View._switchMobileTab(newFilter);
        Collection.View._switchTab(newFilter);
    };

    Collection.View.filterEntries = function (newFilter) {
        cache['$' + state.filter].hide();
        cache['$' + newFilter].show();
    };

    Collection.View._switchTab = function (newFilter) {
        var $newTab, // tab to make .active
            $oldTab; // currently active tab; remove .active

        $newTab = Collection.Utilities.findTabByFilter(newFilter);
        $newTab.parent().addClass('active');
        $oldTab = Collection.Utilities.findTabByFilter(state.filter);
        $oldTab.parent().removeClass('active');
    };

    Collection.View._switchMobileTab = function (newFilter) {
        var $newMobileTab, // mobile tab to make selected
            $oldMobileTab; // currently selected mobile tab; remove selected

        $newMobileTab = Collection.Utilities.findMobileTabByFilter(newFilter);
        $newMobileTab.attr('selected', true);
        $oldMobileTab = Collection.Utilities.findMobileTabByFilter(state.filter);
        $oldMobileTab.attr('selected', false);
    };

    // ==========================================================================
    // * Collection Utilities
    // ==========================================================================

    Collection.Utilities.findMobileTabByFilter = function (filterName) {
        return c.$mobileTab.find('[data-sort=' + filterName + ']');
    };

    Collection.Utilities.findTabByFilter = function (filterName) {
        return c.$tab.find('[data-sort=' + filterName + ']');
    };


    // on load
    $(function () {

        // cache references to each category
        cache.$startups = c.$all.filter('[data-category=startup]');
        cache.$companies = c.$all.filter('[data-category=company]');
        cache.$investors = c.$all.filter('[data-category=investor]');
        cache.$events = c.$all.filter('[data-category=event]');

        // initialize listener for desktop tabs
        c.$tab.on('click', 'a', function (event) {
            event.preventDefault();

            var filter = $(event.target).data('sort');
            Collection.callFilter(filter);

            return false;
        });

        // initialize listener for mobile tabs (select input)
        c.$mobileTab.on('change', function (event) {
            event.preventDefault();

            var filter = $(event.target.selectedOptions[0]).data('sort');
            Collection.callFilter(filter);

            return false;
        });

    });

    // export
    window.Collection = Collection;

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
                    transformWithPrefixes(cache.$title, scrollDistance/3.2);
                }
            });
        }
    });

})(window, jQuery);