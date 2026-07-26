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
