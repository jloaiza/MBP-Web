/*
<div style="width: 400.4px; height: 79.0667px;" class="boardShip" data-x-size="11" data-y-size="2"></div>
*/

_boardSize = 0;

//abilities
_extraShotActive = false;
_bombActive = false;
_lifesaverShipActive = false;
_antishieldActive = false;
_shieldActive = false;
_spyActive = false;
_verticalOnePlusActive = false;
_horizontalOnePlusActive = false;

_visibleChat = false;

function hideWaiting () {
	time = 150;
	$('#waitingWrapper').fadeOut(time, function () {
		$(this).hide();
	});
}

function showVictory(pVictory, pPoints) {
	"use strict";
	var finnishClass;
	var finnishInfo;
	if (pVictory) {
		finnishClass = "victory";
		finnishInfo = "Victoria";
	} else {
		finnishClass = "defeat";
		finnishInfo = "Derrota";
	}
	$("#waitingInner").html('<div class = "finnishInfo ' + finnishClass + '">'
			+ '<div>' + finnishInfo + '</div>'
			+ '<div class = "' + finnishClass + 'Bkg finnishInfoBkg"></div>'
		+ '</div>'
		+ '<div class = "finnishStat">'
			+ '<span id = "finnishPointsTitle">puntos: </span>' 
			+ '<span class = "number">' + pPoints + '</span>'
		+ '</div>' 
	);
	$("#waitingWrapper").show();
	$("#waitingWrapper").fadeIn(150);
}

function showWaiting(pMessage) {
	/*<div id = "waitingMsg">en espera de oponente</div>
	<div id = "waitingImg"></div>*/
	$("#waitingInner").html('<div id = "waitingMsg">' + pMessage +'</div>'
		+ '<div id = "waitingImg"></div>' 
	);
	$("#waitingWrapper").show();
	$("#waitingWrapper").fadeIn(150);
}

function extraShotClick(evt) {
	extraShotSwitch($(evt.delegateTarget));
}

function bombClick(evt) {
	bombSwitch($(evt.delegateTarget));
}

function lifesaverClick(evt) {
	lifesaverSwitch($(evt.delegateTarget));
}

function antishieldClick(evt) {
	antishieldSwitch($(evt.delegateTarget));
}

function shieldClick(evt) {
	shieldSwitch($(evt.delegateTarget));
}

function spyClick(evt) {
	spySwitch($(evt.delegateTarget));
}

function horizontalOnePlusClick(evt) {
	horizontalOnePlusSwitch($(evt.delegateTarget));
}

function verticalOnePlusClick(evt) {
	verticalOnePlusSwitch($(evt.delegateTarget));
}

function setListeners(){

	$(".abilityButton[data-ability = oneShotTurn]").click(extraShotClick);
	$(".abilityButton[data-ability = bomb]").click(bombClick);
	$(".abilityButton[data-ability = lifesaver]").click(lifesaverClick);
	$(".abilityButton[data-ability = antishield]").click(antishieldClick);
	$(".abilityButton[data-ability = shield]").click(shieldClick);
	$(".abilityButton[data-ability = spy]").click(spyClick);
	$(".abilityButton[data-ability = verticalPlus]").click(verticalOnePlusClick);
	$(".abilityButton[data-ability = horizontalPlus]").click(horizontalOnePlusClick);

	$("#surrenderButton").mouseleave(changeToExecutionInfo);
	$("#onExecutionInfo").mouseenter(changeToSurrender);
	$("#messageButton").click(showChat);
	$("#chatTopLine").click(hideChat);
	$("#newMsgTextBox").keypress(keyPressChatMsg);
	$(".boardCell").click(boardClick);
	$(window).resize(resizeHandler);
}

//----------------GENERAL INFO------------------------

function changeToSurrender() {
	$("#onExecutionInfo").hide();
	$("#surrenderButton").show();
}

function changeToExecutionInfo() {
	$("#surrenderButton").hide();
	$("#onExecutionInfo").show();
}

function changeToInTurn(){
	$("#opponentTurn").hide();
	$("#inTurn").show();
}

function changeToOpponentTurn(){
	$("#inTurn").hide();
	$("#opponentTurn").show();
}

//------------------BOARD---------------------------

function resizeShips() {
	$ships = $(".boardShip");
	for (i = 0; i < $ships.size(); i++){
		xSize = $($ships[i]).attr("data-x-size");
		ySize = $($ships[i]).attr("data-y-size");
		cellHeight = $(".boardRow")[1].getBoundingClientRect().height;
		cellWidth = $(".boardCell")[1].getBoundingClientRect().width;
		$($ships[i]).width(xSize*cellWidth);
		$($ships[i]).height(ySize*cellHeight);
	}
}

function resizeBoardCells(){
	"use strict";
	var height = $("#boardsContent").height();
	var width = $("#boardsContent").width();
	if ((width)/2 < height){
		$(".board").width(width/2 - 74); //-20 extra - 30margen - 24 nick
		$(".boardRow").height((width - 94)/(2*_boardSize)); //-20 coord -20 extra - 24 nick -30 margen
	} else {
		$(".board").width(height-74);
		$(".boardRow").height((height - 94)/_boardSize); //20 coord + 24 name + 20 extra
	}
}

function boardClick() {
	//$(this).parent() = row
	//$(this).parent().parent() = board
	if($(this).parent().parent().attr("data-is-enemy") == "true"){

	} else {

		if (_shieldActive) {
			//llamada magica

			//esto dentro de un for con las posiciones, de momento solo deonde hace click
			$innerCell = $(this).find(".innerCell");
			$innerCell.removeClass("boardCellActive");
			$innerCell.addClass("shieldCell");


			count = $("#shieldAbilityCount").html();
			$("#shieldAbilityCount").html(count - 1);
			shieldSwitch();

		} if (_lifesaverShipActive) {
			//llamada magica
			count = $("#lifesaverAbilityCount").html();
			$("#lifesaverAbilityCount").html(count - 1);
			lifesaverSwitch();
		}
	}
}

function generateBoard(pBoardSize, pNickName, pIsEnemmy) {
	$table = $(document.createElement('div'));
	$table.addClass("board");
	$table.attr("data-is-enemy", pIsEnemmy);
	$table.attr("data-nick", pNickName);

	$firstRow = $(document.createElement('div'));
	$firstRow.addClass("boardRow topCoordRow");

	//Añadir la primera casilla nula
	$firstPoint = $(document.createElement('div'));
	$firstPoint.addClass("boardCell leftCoordCell topCoordCell");
	$firstRow.append($firstPoint);

	//Añadir las letras del tablero
	for (i = 0; i < pBoardSize; i++){
		$rowCol = $(document.createElement('div'));
		$rowCol.addClass("boardCell topCoordCell");
		letter = String.fromCharCode("A".charCodeAt(0) + i);
		$rowCol.html(letter);
		$firstRow.append($rowCol);
	}
	$table.append($firstRow); //Añadir la fila a la tabla

	//Añadir el resto de filas
	for (i = 1; i <= pBoardSize; i++){
		$row = $(document.createElement('div'));
		$row.addClass("boardRow");
		for (j = 0; j <= pBoardSize; j++){
			$rowCol = $(document.createElement('div'));
			if (j == 0){
				$rowCol.addClass("leftCoordCell");
				$rowCol.html(i);
			} else {
				$rowCol.attr("data-x", j);
				$rowCol.attr("data-y", i);
				$cellActive = $(document.createElement('div'));
				$cellActive.addClass("innerCell");
				$cellActive.addClass("boardCellActive");
				$rowCol.append($cellActive);
			}
			$rowCol.addClass("boardCell");
			$row.append($rowCol);
		}
		$table.append($row);
	}
	return $table;
}

function createBoards(pBoardSize, pPlayerNick, pEnemmyNick) {
	"use strict";
	_boardSize = pBoardSize;
	var $container1 = $(document.createElement('div'));
	$container1.addClass("boardContainer");
	var $board1 = generateBoard(pBoardSize, pPlayerNick, false);
	var $nick1 = $(document.createElement('div'));
	$nick1.addClass("boardNickname");
	$nick1.html(pPlayerNick);
	$container1.append($board1, $nick1);

	var $container2 = $(document.createElement('div'));
	$container2.addClass("boardContainer");
	var $board2 = generateBoard(pBoardSize, pEnemmyNick, true);
	var $nick2 = $(document.createElement('div'));
	$nick2.addClass("boardNickname");
	$nick2.html(pEnemmyNick);
	$container2.append($board2, $nick2);

	$("#boardsContent").append($container1, $container2);
	resizeBoardCells();
}

//---------------------BOTTOM------------------------

//abilities
function changeAbilityState($pAbilityWrapper, pState){
	"use strict";
	var borderColor;
	if (pState){
		borderColor = "#147605";
		$pAbilityWrapper.css("box-shadow", "0 0 2px #0F0");
	} else {
		borderColor = "#631201";
		$pAbilityWrapper.css("box-shadow", "none");
	}
	$pAbilityWrapper.css("border-color", borderColor);
}

function extraShotSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = oneShotTurn]");
	}

	if (_extraShotActive){
		_extraShotActive = false;
		changeAbilityState($pButton, false);
	} else {
		_extraShotActive = true;
		changeAbilityState($pButton, true);
	}
}

function bombSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = bomb]");
	}

	if (_bombActive){
		_bombActive = false;
		changeAbilityState($pButton, false);
	} else {
		_bombActive = true;
		changeAbilityState($pButton, true);
	}
}

function lifesaverSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = lifesaver]");
	}

	if (_lifesaverShipActive){
		_lifesaverShipActive = false;
		changeAbilityState($pButton, false);
	} else {
		_lifesaverShipActive = true;
		changeAbilityState($pButton, true);
	}
}

function antishieldSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = antishield]");
	}

	if (_antishieldActive){
		_antishieldActive = false;
		changeAbilityState($pButton, false);
	} else {
		_antishieldActive = true;
		changeAbilityState($pButton, true);
	}
}

function shieldSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = shield]");
	}
	if (_shieldActive){
		_shieldActive = false;
		changeAbilityState($pButton, false);
	} else {
		_shieldActive = true;
		changeAbilityState($pButton, true);
	}
}

function spySwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = spy]");
	}

	if (_spyActive){
		_spyActive = false;
		changeAbilityState($pButton, false);
	} else {
		_spyActive = true;
		changeAbilityState($pButton, true);
	}
}

function verticalOnePlusSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = verticalPlus]");
	}

	if (_verticalOnePlusActive){
		_verticalOnePlusActive = false;
		changeAbilityState($pButton, false);
	} else {
		_verticalOnePlusActive = true;
		changeAbilityState($pButton, true);
	}
}

function horizontalOnePlusSwitch($pButton) {
	"use strict";
	if ($pButton == undefined){
		$pButton = $(".abilityButton[data-ability = horizontalPlus]");
	}

	if (_horizontalOnePlusActive){
		_horizontalOnePlusActive = false;
		changeAbilityState($pButton, false);
	} else {
		_horizontalOnePlusActive = true;
		changeAbilityState($pButton, true);
	}
}

//------------------RESIZE GENERAL--------------------

function resizeHandler() {
	"use strict";
	var maxheigt = $("html").height();
	var boardsWrapper = $("#boardsWrapper");
	var position = boardsWrapper.position().top;
	var newHeight = maxheigt - position - $("#bottomWrapper").outerHeight(true);
	if (newHeight < 300){
		newHeight = 300;
	}
	boardsWrapper.height(newHeight);
	resizeBoardCells();
	resizeShips();
}

//---------------CHAT------------------------


function hideChat(){
	_visibleChat = false;
	$("#chatWrapper").animate({opacity: 0}, 500, 
		function () {$("#chatWrapper").hide();
	});
}

function showChat(){
	$("#chatWrapper").show();
	$("#chatWrapper").animate({opacity: 1}, 500);
	$("#messageButtonCount").html(0);
	$("#messageButtonCount").hide();
	_visibleChat = true;
	$("#newMsgTextBox").focus();
}

function keyPressChatMsg(pEvent){
	if (pEvent.which == 13) { //13 es el codigo para enter
		sendChatMessage();
	} 
}

function sendChatMessage(){
	msg = $("#newMsgTextBox").val().trim();
	if (msg.length > 0){
		//aqui va la linea para enviar el msj
		$("#newMsgTextBox").val("");
		addChatMsg(msg);
	}
}

function addChatMsg(pMsg, pNickname){
	"use strict";
	var $msgWrapper = $(document.createElement('div'));
	var user = "";
	if (pNickname === undefined){ //Mensaje del usuario
		$msgWrapper.addClass("yourMsg");
		user = "tu:"
	} else { //Mensaje del oponente
		$msgWrapper.addClass("opponentMsg");
		user = pNickname + ":";
	}
	var htmlStr = "";
	htmlStr += "<div class = 'chatNickMsg chatMsgElement'>" + user + "</div>";
	htmlStr += "<div class = 'chatMsg chatMsgElement'>" + pMsg + "</div>";
	$msgWrapper.html(htmlStr);
	$("#chatContent").append($msgWrapper);
	$("#chatContent").scrollTop($("#chatContent").height());
}


function addChatFeedMsg(pMsg, pNickname) {
	if (!_visibleChat){
		$("#messageButtonCount").show();
		count = Number($("#messageButtonCount").html());
		$("#messageButtonCount").html(count+1);
	}
	addChatMsg(pMsg, pNickname);
}


//--------------------CALLS---------------------------------

$(document).ready(changeToExecutionInfo);
$(document).ready(changeToOpponentTurn);
$(document).ready(function () {
	$("#chatWrapper").hide();
	hideChat();
});
$(document).ready(function () {
	createBoards(25, "2", "22");
});
$(document).ready(setListeners);
$(document).ready(resizeHandler);
$(document).ready(hideWaiting);