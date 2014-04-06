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

})(window);