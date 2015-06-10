function resizeElements() {
	var width = 0;
	var height = 0;
	// get the width.. more cross-browser issues
	if (window.innerHeight) {
		width = window.innerWidth;
		height = window.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	} else if (document.body) {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	if (width < 1024) {
		$("#topBar").width(915);
	} else {
		$("#topBar").width(width - 100);
	}
	console.log("Width: ", width);
	console.log("Height: ", height);
}

function drawRows() {
	var availableMatches = $("#availableMatches");
	var matchCount;
	for ( matchCount = 0; matchCount < 15; matchCount++) {
		var tmpMatch = $(document.createElement("div"));
		tmpMatch.addClass("match");
		availableMatches.append(tmpMatch);
	}
}

function resetAbilities(bottomAvailableAbilities) {
	var tmpAbility = bottomAvailableAbilities.children("div:first");
	while (tmpAbility.attr("id") != "availableAbilitiesText") {
		tmpAbility.remove();
		tmpAbility = bottomAvailableAbilities.children("div:first");
	}
}

function drawAbilities() {
	var bottomAvailableAbilities = $("#bottomAvailableAbilities");
	resetAbilities(bottomAvailableAbilities);
	for ( i = 0; i < 8; i++) {
		var div = $(document.createElement("div"));
		div.addClass("ability");
		if (arguments[i] == "shield") {
			div.attr("id", "shield");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "antiShield") {
			div.attr("id", "antiShield");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "bomb") {
			div.attr("id", "bomb");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "extraShot") {
			div.attr("id", "extraShot");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "lifeSaver") {
			div.attr("id", "lifeSaver");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "plusHorizontal") {
			div.attr("id", "plusHorizontal");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "plusVertical") {
			div.attr("id", "plusVertical");
			bottomAvailableAbilities.prepend(div);
		} else if (arguments[i] == "spy") {
			div.attr("id", "spy");
			bottomAvailableAbilities.prepend(div);
		}
	}
}

window.onload = function() {
	resizeElements();
	drawRows();
	drawAbilities("shield", "antiShield", "bomb", "extraShot", "lifeSaver", "plusHorizontal", "plusVertical", "spy");
}

window.onresize = function() {
	resizeElements();
}
