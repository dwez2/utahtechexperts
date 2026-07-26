/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.--- I disabled the hamburger on the main page enabled this if you want to add more pages to to the site 
			$(
				'<div id="titleBar">' +
				//	'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);


// Interactive Cyber Guardian.
(function () {
	var guardian = document.getElementById('cyber-guardian');

	if (!guardian) return;

	var figure = guardian.querySelector('.guardian-figure');
	var toggle = guardian.querySelector('.guardian-motion-toggle');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	var paused = reduceMotion.matches;
	var targetX = 0;
	var targetY = 0;
	var currentX = 0;
	var currentY = 0;
	var frame;

	function setPaused(nextPaused) {
		paused = nextPaused;
		guardian.classList.toggle('guardian-paused', paused);
		toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
		toggle.setAttribute(
			'aria-label',
			paused
				? 'Play Cyber Guardian animation'
				: 'Pause Cyber Guardian animation'
		);

		if (paused) {
			targetX = 0;
			targetY = 0;
		}
	}

	function trackPointer(event) {
		if (
			paused ||
			window.matchMedia('(pointer: coarse)').matches
		) {
			return;
		}

		var bounds = guardian.getBoundingClientRect();
		var centerX = bounds.left + bounds.width / 2;
		var centerY = bounds.top + bounds.height * 0.34;

		targetX = Math.max(
			-1,
			Math.min(
				1,
				(event.clientX - centerX) /
					(window.innerWidth * 0.34)
			)
		);

		targetY = Math.max(
			-1,
			Math.min(
				1,
				(event.clientY - centerY) /
					(window.innerHeight * 0.34)
			)
		);

		guardian.classList.add('guardian-engaged');
	}

	function releasePointer() {
		targetX = 0;
		targetY = 0;
		guardian.classList.remove('guardian-engaged');
	}

	function render() {
		currentX += (targetX - currentX) * 0.09;
		currentY += (targetY - currentY) * 0.09;

		figure.style.setProperty(
			'--guardian-look-x',
			currentX.toFixed(3)
		);

		figure.style.setProperty(
			'--guardian-look-y',
			currentY.toFixed(3)
		);

		frame = window.requestAnimationFrame(render);
	}

	toggle.addEventListener('click', function () {
		setPaused(!paused);
	});

	window.addEventListener(
		'pointermove',
		trackPointer,
		{ passive: true }
	);

	document.documentElement.addEventListener(
		'mouseleave',
		releasePointer
	);

	window.addEventListener('blur', releasePointer);

	if (typeof reduceMotion.addEventListener === 'function') {
		reduceMotion.addEventListener(
			'change',
			function (event) {
				setPaused(event.matches);
			}
		);
	}

	setPaused(paused);
	frame = window.requestAnimationFrame(render);

	window.addEventListener('pagehide', function () {
		window.cancelAnimationFrame(frame);
	});
}());
