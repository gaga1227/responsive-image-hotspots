// Main interaction function
// This loops through the hot spots data and create individual hotspots
function initHotspotInteraction(data) {
	if (data.length) {
		hotspotData = {};
		for (var i = 0; i < data.length; i++) {
			hotspotData = data[i];
			createHotSpot(hotspotData);
		}
	}
}

// This is where individual hotspot is created and initiated
function createHotSpot(hotspotData) {
	if (!$.isPlainObject(hotspotData)) {
		window.alert("Invalid hotspot data!");
	}

	// html template
	var htmlString = '<a href="" class="hotspot"><i class="fa fa-volume-up"></i><audio preload="auto"></audio></a>';

	var $overlay = $('#overlay');
	var $hotspot = $(htmlString);
	var $audio = $hotspot.find('audio');

	// on click handler
	var onHotspotClickHandler = function (e) {
		e.preventDefault();

		var $this = $(this);
		var audioElem = $this.find('audio')[0];

		// play audio
		if (audioElem) {
			audioElem.play();
			console.log('click');
		}
	};

	// position hotspot based on position data
	$hotspot
		.attr('id', 'hotspot-' + hotspotData.title.toLowerCase())
		.css({
			'top': hotspotData.posy * 100 + '%',
			'left': hotspotData.posx * 100 + '%'
		});

	// set extra attributes for audio playback
	$audio
		.attr({
			'id': 'audio-' + hotspotData.title.toLowerCase(),
			'src': 'media/' + hotspotData.media
		});

	// register click handler to hotspot
	$hotspot
		.off('click')
		.on('click', onHotspotClickHandler);

	// append hotspot to DOM
	$overlay.append($hotspot);
}

// start interaction when html doc is ready
$(document).ready(function () {
	// load hotspots data and start interaction
	$.get('media/hotspots.json',
		function (data) {
			initHotspotInteraction(data);
		})
		.fail(function () {
			window.alert("Please make sure you view this page from a HTTP server.");
		});
});
