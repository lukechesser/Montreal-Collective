(function (window) {
	var cache;

	$(function () {
		cache = {
			$socialLinks: $('.js-social-link'),
			$toOoomf: $('.js-to-ooomf'),
			$toRepo: $('.js-to-repo'),
			$entryLink: $('.js-entry-link'),
		};

		analytics.trackLink(cache.$socialLinks, 'Clicked social link');
		analytics.trackLink(cache.$toOoomf, 'To ooomf');
		analytics.trackLink(cache.$toRepo, 'To repo');
		analytics.trackLink(cache.$entryLink, function (target) {
			return $(target).data('name');
		});
	});

})(window);