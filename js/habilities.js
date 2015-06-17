var selectedRow;


function selectFromTable (){
    
}

function addEditEvent(button){
    button.click(function(){
        var tedes = selectedRow;
        var i;
        for(i=0; i<6; i++){
            console.log("Fila: ", tedes.html());
            switch(i){
                case 0:
                {
                    $("#name").val(tedes.html());
                    break;
                }
                case 1:
                {
                    $("#points").val(tedes.html());
                    break;
                }
                case 2:
                {
                    $("#experience").val(tedes.html());
                    break;
                }
                case 3:
                {
                    $("#losses").val(tedes.html());
                    break;
                }
                case 4:
                {
                    $("#wins").val(tedes.html());
                    break;
                }
                case 5:
                {
                    $("#ranking").val(tedes.html());
                    break;
                }
            }
            tedes = tedes.next();
        }
        $("#modifyAbilityContainer").fadeIn("slow");
    });
}

function Events(){
    $("tr").click(function( event ) {
        console.log(event.target.nodeName);
        if(event.target.nodeName !== "TH"){
            selectedRow = $(this).children();
            var editButton = $(document.createElement("div"));
            editButton.addClass("editIcon");
            editButton.css("margin-top", $(this).position().top-90);
            $("#editButtonContainer").html(editButton);
            editButton.hide();
            addEditEvent(editButton);
            editButton.fadeIn("slow");
        }
    });
    $("#closeAbilityContainer").click(function(){
        //Logica de actualizacion de datos
        $("#modifyAbilityContainer").fadeOut("slow");
    });
}

function insertIntoTable(row){
    var table = $("#abilitiesTable");
    var tmpRow = $(document.createElement("tr"));
    for(i=0; i<6; i++){
        var tmpCell = $(document.createElement("td"));
        tmpRow.append(tmpCell.text(row[i]));
        table.append(tmpRow);
    }
}


window.onload = function (){
    var i;
    for(i=0; i<10; i++){
        var t = [];
        t[0] = "Nave "+i;
        t[1] = i+69;
        t[2] = i+69;
        t[3] = i+69;
        t[4] = i+69;
        t[5] = i+69;
        insertIntoTable(t);
    }
    Events();
};