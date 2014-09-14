(function (window) {
	var cache;

	$(function () {
		cache = {
			$socialLinks: $('.js-social-link'),
			$toCrew: $('.js-to-crew'),
			$toRepo: $('.js-to-repo'),
			$entryLink: $('.js-entry-link'),
		};

		analytics.trackLink(cache.$socialLinks, 'Clicked social link');
		analytics.trackLink(cache.$toCrew, 'To Crew');
		analytics.trackLink(cache.$toRepo, 'To repo');
		analytics.trackLink(cache.$entryLink, function (target) {
			return $(target).data('name');
		});
	});

})(window);;(function (window, $, undefined) {
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
        $companies: null,
        $agencies: null,
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
        cache.$companies = c.$all.filter('[data-category=company]');
        cache.$agencies = c.$all.filter('[data-category=agency]');
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