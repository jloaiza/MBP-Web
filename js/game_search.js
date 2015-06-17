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

function setUserInfo(ranking, points, experience, victories, loses){
	$("#ranking").html(ranking);
	$("#points").html(points);
	$("#experience").html(experience);
	$("#victories").html(victories);
	$("#loses").html(loses);
}

/*///////////FORMATO DE CADA PARTIDA////////////
var match = new Object();
match.image = "";
match.owner = "";
match.visible = "";
match.shotsPerTurn = "";
match.shipAmount = "";
match.boardSize = "";
*/

function addImage(match, image){
	var tmpUserImage = $(document.createElement("div"));//Crea la imagen del usuario
	tmpUserImage.addClass("matchUserImage");
	//tmpUserImage.attr("style", "background:white");
	tmpUserImage.attr("style", "background:url(img/general/default_user.png)");
	match.append(tmpUserImage);
}

function addText(match, owner){
	var tmpContainer = $(document.createElement("div"));
	tmpContainer.addClass("matchTextContainer");
	var matchOf = $(document.createElement("div"));
	matchOf.addClass("computerFont");
	matchOf.html("Partida de ");
	matchOf.attr("style", "color:#008cab; float:left");
	var tmpUser = $(document.createElement("div"));
	tmpUser.addClass("aspace");
	tmpUser.html(owner);
	tmpUser.attr("style", "color:white; float:left; margin-left:5px; font-size:.9em");
	tmpContainer.append(matchOf);
	tmpContainer.append(tmpUser);
	match.append(tmpContainer);
}

function addVisibleIcon(match, visible){
	var visibleIcon = $(document.createElement("div"));
	visibleIcon.addClass("matchIcon");
	if(visible == "true") visibleIcon.attr("style",
		"background:url(img/game_search/view_icon.png) no-repeat");
	else visibleIcon.attr("style", 
		"background:url(img/game_search/no_view_icon.png) no-repeat");
	match.append(visibleIcon);
}

function addShotsPerTurn(match, shotsPerTurn){
	var shotsPTContainer = $(document.createElement("div"));
	shotsPTContainer.addClass("matchSubIconContainer");
	var shotsPerTurnIcon = $(document.createElement("div"));
	shotsPerTurnIcon.addClass("matchIcon");
	shotsPerTurnIcon.attr("style", "background:url(img/game_search/shot_icon.png) no-repeat");
	var shots = $(document.createElement("div"));
	shots.addClass("number");
	shots.attr("style", "color:white; text-indent:initial; float:left");
	shots.html(shotsPerTurn);
	shotsPTContainer.append(shotsPerTurnIcon);
	shotsPTContainer.append(shots);
	match.append(shotsPTContainer);
}

function addShipAmount(match, shipAmount){
	var shipAmountContainer = $(document.createElement("div"));
	shipAmountContainer.addClass("matchSubIconContainer");
	var shipAmountIcon = $(document.createElement("div"));
	shipAmountIcon.addClass("matchIcon");
	shipAmountIcon.attr("style", "background:url(img/game_search/rocket_icon.png) no-repeat");
	var ships = $(document.createElement("div"));
	ships.addClass("number");
	ships.attr("style", "color:white; text-indent:initial; float:left");
	ships.html(shipAmount);
	shipAmountContainer.append(shipAmountIcon);
	shipAmountContainer.append(ships);
	match.append(shipAmountContainer);
}

function addBoardSize(match, boardSize){
	var boardSizeContainer = $(document.createElement("div"));
	boardSizeContainer.addClass("matchSubIconContainer");
	var boardSizeIcon = $(document.createElement("div"));
	boardSizeIcon.addClass("matchIcon");
	boardSizeIcon.attr("style", "background:url(img/game_search/grid_icon.png) no-repeat");
	var board = $(document.createElement("div"));
	board.addClass("number");
	board.attr("style", "color:white; text-indent:initial; float:left");
	board.html(boardSize);
	boardSizeContainer.append(boardSizeIcon);
	boardSizeContainer.append(board);
	match.append(boardSizeContainer);
}

function addIcons(match, visible, shotsPerTurn, shipAmount, boardSize){
	var iconsContainer = $(document.createElement("div"));
	iconsContainer.addClass("matchIconsContainer");
	addVisibleIcon(iconsContainer, visible);
	addShotsPerTurn(iconsContainer, shotsPerTurn);
	addShipAmount(iconsContainer, shipAmount);
	addBoardSize(iconsContainer, boardSize);
	match.append(iconsContainer);
}

function drawRows(matches) {
	var availableMatches = $("#availableMatches");
	var matchCount;
	for ( matchCount = 0; matchCount < 15; matchCount++) {
		var tmpMatch = $(document.createElement("div"));//Crea contenedor de la partida
		tmpMatch.addClass("match");
		addImage(tmpMatch, matches[matchCount].image);
		addText(tmpMatch, matches[matchCount].owner);
		addIcons(tmpMatch, matches[matchCount].visible, matches[matchCount].shotsPerTurn,
			matches[matchCount].shipAmount, matches[matchCount].boardSize);
		
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

function loadNextPage(){
	//Se obtiene la lista de partidas y se llama a drawRows
}

function loadPrevPage(){
	//Se obtiene la lista de partidas y se llama a drawRows
}

function setUserName(user){
	$("#userNameTop").html(user);
}

function testMatchesGenerator(){
	var matches = [];
	for(i=0; i<15; i++){
		var match = new Object();
		match.image = "";
		match.owner = "me";
		match.visible = "true";
		match.shotsPerTurn = "3";
		match.shipAmount = "10";
		match.boardSize = "10";
		matches[i] = match;
	}
	return matches;
}

window.onload = function() {
	resizeElements();
	setUserName("RamboNTanga");
	drawAbilities("shield", "antiShield", "bomb", "extraShot", "lifeSaver", "plusHorizontal", "plusVertical", "spy");
	setUserInfo( "8", "1009", "1069", "100", "36");
	
	drawRows(testMatchesGenerator());
}

window.onresize = function() {
	resizeElements();
}
