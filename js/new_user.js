
function resetForm(){
    $("#name").val("");
    $("#lastName").val("");
    $("#userName").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $("#birthDate").val("");
    $("#email").val("");
    $("#description").val("");
    $("#entertainmentCenter").val("");
    resetErrorList();
}

function resetErrorList(){
    $("#errorList").html("");
    $("#errorMessage").hide();
}

function showPlayerForm(){
    $("#entertainmentCenterContainer").hide("slow");
    $("#genderContainer").show("slow");
    $("#countriesContainer").show("slow");
    $("#birthDateContainer").show("slow");
    $("#descriptionContainer").show("slow");
    $("#imageUploadContainer").show("slow");
}

function showModForm(){
    $("#descriptionContainer").hide("slow");
    $("#genderContainer").show("slow");
    $("#countriesContainer").show("slow");
    $("#birthDateContainer").show("slow");
    $("#entertainmentCenterContainer").show("slow");
    $("#imageUploadContainer").show("slow");
}

function showAdminForm(){
    $("#descriptionContainer").hide("slow");
    $("#genderContainer").hide("slow");
    $("#countriesContainer").hide("slow");
    $("#birthDateContainer").hide("slow");
    $("#entertainmentCenterContainer").hide("slow");
    $("#imageUploadContainer").hide("slow");
}

function loadForm(){
    resetForm();
    $("#errorMessage").fadeOut();
    var item = $("#userType").val();
    switch (item) {
        case "player":
        {
            showPlayerForm();
            break;
        }
        case "moderator":
        {
            showModForm();
            break;
        }
        case "administrator":
        {
            showAdminForm();
            break;
        }
    }
}

function updateImage(input){
	if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#userImageToUpload')
                    .attr('src', e.target.result)
                    .width(400)
                    .height(400);
            };

            reader.readAsDataURL(input.files[0]);
        }
}

function checkBasicInputs(){//Verifica los inputs comunes para los 3 tipos de usuarios
    var validation = true;
    var errorList = $("#errorList");
    if($("#name").val() === "") {
        errorList.append("<li>Nombre está vacío</li>");
        validation = false;
    }
    if($("#lastName").val() === "") {
        errorList.append("<li>Appelido está vacío</li>");
        validation = false;
    }
    if($("#userName").val() === "") {
        errorList.append("<li>El Nombre de Usuario está vacío</li>");
        validation = false;
    }
    var tmpValidation = verifyPassword();
    validation = (validation) ? tmpValidation : validation;
    tmpValidation = verifyConfirmPassword();
    validation = (validation) ? tmpValidation : validation;
    tmpValidation = verifyEmail();
    validation = (validation) ? tmpValidation : validation;
    return validation;
}

function verifyPassword(){
    var validation = true;
    var errorList = $("#errorList");
    var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var password = $("#password").val();
    if(password === "") {
        errorList.append("<li>La contraseña está vacía</li>");
        validation = false;
    }
    if(regExp.test(password)){
        $("#passwordVerif").hide();
        $("#passwordVerif").show("slow");
        $("#passwordVerif").attr("style", "background: url(img/new_user/check.png);");
    }
    else{
        $("#passwordVerif").hide();
        $("#passwordVerif").show("slow");
        $("#passwordVerif").attr("style", "background: url(img/new_user/cross.png);");
        errorList.append("<li>La contraseña debe contener al menos una "+
            "mayúscula y al menos un número y como mínimo debe contener 8"+
            "caracteres.</li>");
        validation = false;
    }
    return validation;
}

function verifyConfirmPassword(){
    var validation = true;
    var errorList = $("#errorList");
    if($("#confirmPassword").val() === $("#password").val()){
        $("#confirmPasswordVerif").hide();
        $("#confirmPasswordVerif").show("slow");
        $("#confirmPasswordVerif").attr("style", "background: url(img/new_user/check.png);");
        
    }
    else{
        $("#confirmPasswordVerif").hide();
        $("#confirmPasswordVerif").show("slow");
        $("#confirmPasswordVerif").attr("style", "background: url(img/new_user/cross.png);");
        errorList.append("<li>Debes confirmar la contraseña</li>");
        validation = false;
    }
    return validation;
}

function verifyEmail(){
    var validation = true;
    var errorList = $("#errorList");
    var regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        if(regExp.test($("#email").val())){
            $("#emailVerif").hide();
            $("#emailVerif").show("slow");
            $("#emailVerif").attr("style", "background: url(img/new_user/check.png);");
        }
        else{
            $("#emailVerif").hide();
            $("#emailVerif").show("slow");
            $("#emailVerif").attr("style", "background: url(img/new_user/cross.png);");
            errorList.append("<li>El formato del correo es incorrecto</li>");
            validation = false;
        }
    return validation;
}

function verifyUserName(){
    //Logica para revisar el nombre de usuario
}

function Events() {
    $("#userType").change(loadForm);
    $("#password").change(verifyPassword);
    $("#confirmPassword").change(verifyConfirmPassword);
    $("#email").change(verifyEmail);
    $("#userNameVerif").change(verifyUserName);
    $("#newUser").submit(function(event){
        resetErrorList();
        var validated = checkBasicInputs();
        var userType = $("#userType").val();
        if(userType === "moderator"){
            if($("#entertainmentCenter").val() === ""){
                $("#errorList").append("<li>El Local no debe estar vacio</li>");
                validated = false;
            }
        }
        if(!validated){
            $("#errorMessage").fadeIn(1500);
        }
        else $("#errorMessage").fadeOut(1500);
        return false;
    });
}


window.onload = function (){
    loadForm();
    Events();
};
