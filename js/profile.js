//
function setPersonalInfo(user, name, lastName, birthDate, gender, country,
	email, registrationDate, description){
	$("#userNameTop").html(user);
	$("#user").html(user);
	$("#name").html(name);
	$("#lastName").html(lastName);
	$("#birthDate").html(birthDate);
	$("#gender").html(gender);
	$("#country").html(country);
	$("#email").html(email);
	$("#registrationDate").html(registrationDate);
	$("#description").html(description);
	console.log("Boom: ", user);
}

function setExtraInfo(ranking, points, effectiveness){
	$("#ranking").html(ranking);
	$("#points").html(points);
	$("#effectiveness").html(effectiveness);
}

function resetAbilities(abilitiesContainer) {
	var tmpAbility = abilitiesContainer.children("div:first");
	while (tmpAbility.attr("class") == "ability") {
		tmpAbility.remove();
		tmpAbility = abilitiesContainer.children("div:first");
	}
}

function setAbilities(){
	var abilitiesContainer = $("#abilitiesIconsContainer");
	resetAbilities(abilitiesContainer);
	for(i=0; i<8; i++){
		var div = $(document.createElement("div"));
		div.addClass("ability");
		if (arguments[i] == "shield") {
			div.attr("id", "shield");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "antiShield") {
			div.attr("id", "antiShield");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "bomb") {
			div.attr("id", "bomb");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "extraShot") {
			div.attr("id", "extraShot");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "lifeSaver") {
			div.attr("id", "lifeSaver");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "plusHorizontal") {
			div.attr("id", "plusHorizontal");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "plusVertical") {
			div.attr("id", "plusVertical");
			abilitiesContainer.prepend(div);
		} else if (arguments[i] == "spy") {
			div.attr("id", "spy");
			abilitiesContainer.prepend(div);
		}
	}
}

function setStatistics(matches, wins, loses, winsEffect, shots, hits, misses,
	shotsEffect){
	$("#matchNumber").html(matches);
	$("#winNumber").html(wins);
	$("#lossNumber").html(loses);
	$("#winPercNumber").html(winsEffect);
	$("#shotNumber").html(shots);
	$("#hitNumber").html(hits);
	$("#missNumber").html(misses);
	$("#shotEfecNumber").html(shotsEffect);
}


window.onload = function(){
	setPersonalInfo("ElChavo", "Chavito", "Nose", "Tampoco", "Macho, eh digo Masculino",
	"Mexico", "semechispoteo@ppp.com", "11/3/2000", "El Chavo del 8 es una serie de "+
	"televisión cómica mexicana creada y protagonizada por Roberto Gómez Bolaños, producida "+
	"por Televisión Independiente de México (más tarde, Televisa). Fue emitida por primera vez"+
	" el 20 de junio de 1971 por Canal 8.2 El programa trata sobre las vivencias de un grupo de "+
	"personas que habitan en una vecindad mexicana donde su protagonista, el Chavo, lleva a cabo"+
	" travesuras junto con sus amigos que ocasionan malentendidos y discusiones entre los mismos"+
	" vecinos, por lo general de tono cómico. El guion surgió de un sketch escrito por Gómez "+
	"Bolaños en donde un niño pobre de ocho años discute con un vendedor de globos en un parque.4 "+
	"Se le prestó una mayor importancia al desarrollo de los personajes, a los cuales se les asignó "+
	"una personalidad distintiva. Desde un comienzo, su creador contempló que El Chavo estaría "+
	"dirigido al público adulto, no al infantil, aun cuando se tratara de adultos interpretando "+
	"a niños.2 El elenco principal estuvo integrado por Gómez Bolaños, Ramón Valdés, Carlos "+
	"Villagrán, María Antonieta de las Nieves, Florinda Meza, Rubén Aguirre, Angelines Fernández y "+
	"Édgar Vivar, que interpretaron al Chavo, Don Ramón, Quico, la Chilindrina, Doña Florinda, el "+
	"profesor Jirafales, Doña Clotilde y el señor Barriga, respectivamente. La dirección y producción "+
	"de la serie recayeron en Enrique Segoviano y en Carmen Ochoa.");
	setExtraInfo("8", "508069", "69%");
	setAbilities("shield", "antiShield", "bomb", "extraShot", "lifeSaver", "plusHorizontal", "plusVertical", "spy");
	setStatistics("100", "69", "31", "69", "1000", "600", "300", "60");
}
