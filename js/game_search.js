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
		//$("#topBar").width(915);
	} else {
		//$("#topBar").width(width - 100);
	}
	console.log("Width: ", width);
	console.log("Height: ", height);
}//Actualmente no se utiliza pero por el momento sirve para conocer las dimensiones de la ventana

function setUserInfo(ranking, points, experience, victories, loses){
	$("#ranking").html(ranking);
	$("#points").html(points);
	$("#experience").html(experience);
	$("#victories").html(victories);
	$("#loses").html(loses);
}//Coloca la infomacion del usuario como, ranking, puntos, experiencia, victorias y perdidas

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
}//Metodo que agrega la imagen correspondiente a cada partida que se muestra

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
}//Metodo que establece el texto de cada partida "Partida de...."

function addVisibleIcon(match, visible){
	var visibleIcon = $(document.createElement("div"));
	visibleIcon.addClass("matchIcon");
	if(visible == "true") visibleIcon.attr("style",
		"background:url(img/game_search/view_icon.png) no-repeat");
	else visibleIcon.attr("style", 
		"background:url(img/game_search/no_view_icon.png) no-repeat");
	match.append(visibleIcon);
}//Agrega el icono de visibilidad, dependiendo de la configuracion establecida

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
}//Agrega la cantidad de disparos por turno, junto con el icono correspondiente

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
}//Agrega la cantidad de naves para la partida, dependiendo de la manera que se configuro

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
}//Agrega el tamaño del teclado dependiendo de la manera que se configuro la partida

function addIcons(match, visible, shotsPerTurn, shipAmount, boardSize){
	var iconsContainer = $(document.createElement("div"));
	iconsContainer.addClass("matchIconsContainer");
	addVisibleIcon(iconsContainer, visible);
	addShotsPerTurn(iconsContainer, shotsPerTurn);
	addShipAmount(iconsContainer, shipAmount);
	addBoardSize(iconsContainer, boardSize);
	match.append(iconsContainer);
}//Agrega todos los iconos a la partida correspondiente

function addMatchEvent(match){
	match.click(function(event){
		$("#selectMatchContainer").fadeIn("slow");
	});
}//Agrega el evento que permite mostrar la pantalla de confimacion de partida

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
		addMatchEvent(tmpMatch);
		availableMatches.append(tmpMatch);
	}
}//Muestra las filas de partidas, recibe una lista de partidas. "matches" debe tener una
 //longitud de 15 elementos o menos.

function resetAbilities(bottomAvailableAbilities) {
	var tmpAbility = bottomAvailableAbilities.children("div:first");
	while (tmpAbility.attr("id") != "availableAbilitiesText") {
		tmpAbility.remove();
		tmpAbility = bottomAvailableAbilities.children("div:first");
	}
}//Permite redibujar los iconos de las habilidades disponibles

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
}//Permite colocar los iconos de las imagenes disponibles

function setEvents(){
	$("#closeSelectMatchContainer").click(function(){
		$("#selectMatchContainer").fadeOut("slow");
	});
	$("#btnRejectMatch").click(function(event){
		$("#selectMatchContainer").fadeOut("slow");
	});
	$("#btnAcceptMatch").click(function(event){
		//Se redirige a la partida seleccionada
	});
	$("#leftArrow").click(function (event){
		$("#availableMatches").fadeOut("slow", function(){
                    $("#availableMatches").html("");
                    drawRows(testMatchesGenerator());//Se carga las siguientes 15 partidas
                    $("#availableMatches").fadeIn("slow");
		});
	});
	$("#rightArrow").click(function(event){
		$("#availableMatches").fadeOut("slow", function(){
                    $("#availableMatches").html("");
                    drawRows(testMatchesGenerator());//Se carga las siguientes 15 partidas
                    $("#availableMatches").fadeIn("slow");
		});
	});

}//Establece eventos de los distintos items de la interfaz

function loadNextPage(){
	//Se obtiene la lista de partidas y se llama a drawRows
}//Permite cargar la siguiente pantalla de partidas

function loadPrevPage(){
	//Se obtiene la lista de partidas y se llama a drawRows
}//Permite cargar la pantalla anterior de partidas

function setUserName(user){
	$("#userNameTop").html(user);
}//Establece el nombre de usuario en la barra superior

function setTopBarUserPic(newUrl){
	//La url de la imagen de la barra superior del usuario debe tener un tamaño de
	//38px por 38px
	$("#userPic").css("background", "url(" + newUrl + ") no-repeat");
}//Establece la imagen del usuario en la barra superior

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
}//Metodo de prueba, para generar partidas genericas

window.onload = function() {
	setEvents();
	resizeElements();
	setUserName("RamboNTanga");
	drawAbilities("shield", "antiShield", "bomb", "extraShot", "lifeSaver", "plusHorizontal", "plusVertical", "spy");
	setUserInfo( "8", "1009", "1069", "100", "36");
	
	drawRows(testMatchesGenerator());
}

window.onresize = function() {
	resizeElements();
}
