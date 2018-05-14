window.addEventListener('load', inicio, false);

var form = document.forms['altaUsuario'];

var inputNom = form['inputNom'];
var divNom = document.getElementById('nom');
var comprobarNom = document.getElementById('comprobarNom');
var print_nom = document.getElementById('printnom');

var inputNaixement = form['inputData'];
var divNaixement = document.getElementById('dataNeix');
var comprobarData = document.getElementById('comprobarData');
var print_naixement = document.getElementById('printdataNeix');

var inputEdat = form['inputEdat'];
var divEdat = document.getElementById('edat');
var comprobarEdat = document.getElementById('comprobarEdat');
var print_edat = document.getElementById('printedat');
var eliminarEdat = form['eliminar'];

var inputMenjar = form["inputMenjar"];
var modal = document.getElementById("myBtn");
var afegirMenjar = document.getElementById("myBtn");
    

function inicio() {
    inputNom.addEventListener('keyup', validaNom, false);
    inputNaixement.addEventListener('keyup', validaNaixement, false);
    inputEdat.addEventListener('keyup', validaEdat,false);
    eliminarEdat.addEventListener("click", borrarEdat, false);
    inputMenjar.addEventListener("keyup", validaInputMenjar, false);
    afegirMenjar.addEventListener("click", showModal(), false);
    modal.addEventListener("click", showModal(), false);
    validaMenjar();
}

function validaNom() {
    var RegExPattern = /^[A-z]{3,15}$/;

    if (inputNom.value.match(RegExPattern)) {
        divNom.setAttribute('class', 'has-success');
        comprobarNom.innerHTML = 'El nom és correcte';
        print_nom.style.color = 'green';
        print_nom.innerHTML = '<strong>Nom: </strong>' + inputNom.value;
        return true;
    } else {
        divNom.setAttribute('class', 'has-danger');
        comprobarNom.innerHTML = 'El nom és incorrecte';
        print_nom.innerHTML = '<strong>Nom: </strong>El nom és incorrecte, només accepta entre 3 i 15 lletres';
        print_nom.style.color = 'red';
        return false;
    }
}

function validaNaixement() {
    var PatternDate = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;

    if (inputNaixement.value.match(PatternDate)) {
        divNaixement.setAttribute('class', 'has-success');
        comprobarData.innerHTML = 'Format data Correcte';
        print_naixement.innerHTML = '<strong>Data de naixement: </strong>' + inputNaixement.value;
        print_naixement.style.color = 'green';
        return true;
    } else {
        divNaixement.setAttribute('class', 'has-danger');
        comprobarData.innerHTML = 'Format data incorrecte';
        print_naixement.innerHTML = 'Format data incorrecte posi un format MM/DD/YYYY';
        print_naixement.style.color = 'red';
        return false;
    }
}

function validaEdat(){
    var RegAge = /^(0?[1-9]|[1-9][0-9])$/;
    
    if(inputEdat.value.match(RegAge) && inputEdat.value >=18){
        divEdat.setAttribute('class','has-success');
        comprobarEdat.innerHTML = 'Format edat correcte';
        print_edat.innerHTML = '<strong>Edat: </strong>' + inputEdat.value;
        print_edat.style.color = 'green';
        return true;
    } else {
        divEdat.setAttribute('class', 'has-danger');
        comprobarEdat.innerHTML = 'Format edat incorrecte o menor de 18 anys';
        print_edat.innerHTML = 'Edat incorrecte posi una edat superior a 18 anys';
        print_edat.style.color = 'red';
        return false;  
    }
}

function validaMenjar() {
    var checkboxs = form["menjar"];
    var count = 0;
    
    for (var k = 0; k < checkboxs.length; k++) {
        if (checkboxs[k].checked === true) {
            document.form["textarea"].innerHTML += " Menjar seleccionat correctament \n";
            document.getElementById("menjarList").style.borderColor = "green";
            count++;
            return true;
        }
    }
    if (count < 1) {
        document.form["textarea"].innerHTML += " ERROR: Cap menjar seleccionat \n";
        document.getElementById("menjarList").style.borderColor = "red";
        return false;
    }
}

function showModal() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    
    btn.onclick = function () {
        modal.style.display = "block";
    };
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function validaInputMenjar() {
    var inputMenjar = form["inputMenjar"];
    var RegExPattern = /^[A-z]{2,50}$/;
    
    if (inputMenjar.value.match(RegExPattern)) { 
        inputMenjar.style.border = "1px solid green";
        inputMenjar.nextElementSibling.innerHTML = "OK";
        inputMenjar.nextElementSibling.className = "ok";
        return true;
    } else {
        inputMenjar.style.border = "1px solid red";
        inputMenjar.nextElementSibling.innerHTML = "ERROR: s'ha de posar entre 2 i 50 lletres";
        inputMenjar.nextElementSibling.className = "error";
        return false;
    }
}

var listFood = document.getElementById('menjarList');
function addMenjar() {
    var newDiv = document.createElement('DIV');
    var inputMenjar = form["inputMenjar"];
   
    if (inputMenjar.value === "") {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    } else {
        listFood.appendChild(newDiv);
        newDiv.setAttribute("id", inputMenjar.value);

        var borrar = document.createElement('i');
        borrar.style.cursor = "pointer";
        borrar.className = "fas fa-ban";
        borrar.setAttribute('onclick', `eliminarMenjar('${inputMenjar.value}')`);
        newDiv.appendChild(borrar);

        var pujar = document.createElement('i');
        pujar.style.cursor = "pointer";
        pujar.style.marginLeft = "4.5px";
        pujar.className = "far fa-caret-square-up";
        pujar.setAttribute('onclick', `pujarMenjar('${inputMenjar.value}')`);
        newDiv.appendChild(pujar);

        var baixar = document.createElement('i');
        baixar.style.cursor = "pointer";
        baixar.style.marginLeft = "4.5px";
        baixar.className = "far fa-caret-square-down";
        baixar.setAttribute('onclick', `baixarMenjar('${inputMenjar.value}')`);
        newDiv.appendChild(baixar);

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "menjar";
        checkbox.style.marginLeft = "6.5px";
        checkbox.value = inputMenjar.value;
        checkbox.setAttribute('onchange', 'validaMenjar(this)');
        newDiv.appendChild(checkbox);

        var a = document.createElement('a');
        var text = document.createTextNode(inputMenjar.value);
        a.appendChild(text);
        newDiv.appendChild(a);
  
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
        var input = form["inputMenjar"];
        input.value = "";
    }
}

function eliminarMenjar(name) {
    var div = document.getElementById(name);
    if (div !== null) {
        var parent = div.parentElement;
        parent.removeChild(div);
    }
}

function pujarMenjar(name) {
    var div = document.getElementById(name);
    if (div.previousElementSibling) {
        div.parentNode.insertBefore(div, div.previousElementSibling);
    }
}

function baixarMenjar(name) {
    var div = document.getElementById(name);
    if (div.nextElementSibling)
        div.parentNode.insertBefore(div.nextElementSibling, div);
}

function borrarEdat(){
    var eliminarEdat = form["eliminar"];
    var parent = eliminarEdat.parentElement;
    parent.remove(eliminarEdat);
}

function validaFormulario() {
    if (validaNom() && validaNaixement() && validaEdat() && validaMenjar()) {
        alert("Registra't correctament");
        return true;
    } else {
        alert("Registre incorrecte, valor no vàlid o falta emplenar");
        return false;
    }
}

