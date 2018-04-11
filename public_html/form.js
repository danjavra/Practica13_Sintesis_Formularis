window.addEventListener('load',inicio,false);

var form = document.forms['altaUsuario'];

var inputNom = form['inputNom'];
var divNom = document.getElementById('nom');
var comprobarNom = document.getElementById('comprobarNom');
var print_nom = document.getElementById('printnom');

var inputNaixement = form['inputData'];
var divNaixement = document.getElementById('dataNeix');
var comprobarData = document.getElementById('comprobarData');
var print_naixement = document.getElementById('printdataNeix');

var checkboxMenjar = document.getElementsByName('menjar');

var llistaMenjar = document.getElementById('llistaMenjar');

var arrayMenjar = ['xocolata','bledes','llenties'];



printListMenjar();

function inicio(){
    inputNom.addEventListener('keyup',validaNom,false);
    inputNaixement.addEventListener('keyup',validaNaixement,false);
}

function validaNom(){
        var RegExPattern = /^[A-z]{3,15}$/;

        if(inputNom.value.match(RegExPattern)){
            divNom.setAttribute('class','has-success');
            comprobarNom.innerHTML = 'El nom és correcte';
            print_nom.style.color = 'green';
            print_nom.innerHTML = '<strong>Nom: </strong>' + inputNom.value;
            return true;
        }else{
            divNom.setAttribute('class','has-danger');
            comprobarNom.innerHTML = 'El nom és incorrecte';
            print_nom.innerHTML = '<strong>Nom: </strong>El nom és incorrecte, només accepta entre 3 i 15 lletres';
            print_nom.style.color = 'red';
            return false;
        }
}

function validaNaixement(){
    var PatternDate =/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;

    if(inputNaixement.value.match(PatternDate)){
        divNaixement.setAttribute('class','has-success');
        comprobarData.innerHTML = 'Format data Correcte';
        print_naixement.innerHTML = '<strong>Data de naixement: </strong>' + inputNaixement.value;
        print_naixement.style.color = 'green';
        return true;
    }else{
        divNaixement.setAttribute('class','has-danger');
        comprobarData.innerHTML = 'Format data incorrecte';
        print_naixement.innerHTML = 'Format data incorrecte posi un format MM/DD/YYYY';
        print_naixement.style.color = 'red';
        return false;
    }
}

function validaMenjar(){
    var validat = false;

    for(var i=0;i<checkboxMenjar.length;i++){
        if(checkboxMenjar[i].checked===true){
            return true;
        }
    }
    return validat;
}

function printListMenjar(){
    llistaMenjar.innerHTML = '';
    for(var i=0;i<arrayMenjar.length;i++){
        
        var newDiv = document.createElement('DIV');
        var Borrar = document.createElement('i');
        var flechaAbajo = document.createElement('i');
        var flechaArriba = document.createElement('i');
        var inputCheckbox = document.createElement('input');
        
        flechaAbajo.style.marginLeft="5px";
        flechaArriba.style.marginLeft="5px";
        Borrar.style.marginRight="10px";
        inputCheckbox.style.marginLeft="15px";
        Borrar.classList.add('fa','fa-ban');
        flechaAbajo.classList.add('fa','fa-arrow-down');
        flechaArriba.classList.add('fa','fa-arrow-up');
        inputCheckbox.setAttribute('type','checkbox');
        inputCheckbox.setAttribute('name','menjar');
        inputCheckbox.setAttribute('value',arrayMenjar[i]);
        
        Borrar.setAttribute('onclick','eliminarMenjar(event)');
        flechaArriba.setAttribute('onclick','pujarMenjar(event)');
        flechaAbajo.setAttribute('onclick','baixarMenjar(event)');
        
        newDiv.appendChild(Borrar);
        newDiv.appendChild(flechaAbajo);
        newDiv.appendChild(flechaArriba);
        newDiv.appendChild(inputCheckbox);
        newDiv.innerHTML += '<span style="margin-left:5px;" >' + arrayMenjar[i] + '</span>';
        llistaMenjar.appendChild(newDiv);
    }
}

function addEvent(){
    arrayMenjar.push(indicaNouMenjar());
    printListMenjar();
}

function pujarMenjar(e){
    var totalMenjar = arrayMenjar.length;
    arrayMenjar2 = [];
    var posMenjar = arrayMenjar.indexOf(e.target.parentNode.lastElementChild.textContent);
    if(posMenjar===0){
        arrayMenjar2 = arrayMenjar;
    }else{
       var menjarReplace = arrayMenjar.splice(posMenjar, 1);
       var posReplace = posMenjar-1;
       for(var i = 0; i<totalMenjar-1;i++){
           if(i===posReplace){
               arrayMenjar2.push(menjarReplace[0]);
           }
           arrayMenjar2.push(arrayMenjar[i]);
       }
    }
    arrayMenjar = arrayMenjar2;
    printListMenjar();
}

function eliminarMenjar(e) {
    var posMenjar = arrayMenjar.indexOf(e.path[1].lastElementChild.textContent);
    arrayMenjar.splice(posMenjar,1);
    printListMenjar();
}

function baixarMenjar(e){
    var totalMenjar = arrayMenjar.length;
    arrayMenjar2 = [];
    var posMenjar = arrayMenjar.indexOf(e.target.parentNode.lastElementChild.textContent);
    if(posMenjar===totalMenjar-1){
        arrayMenjar2 = arrayMenjar;
    }else{
        var menjarReplace = arrayMenjar.splice(posMenjar,1);
        var posReplace = posMenjar+1;
        console.log(posReplace);
        console.log(totalMenjar-1);
        for(var i=0;i<totalMenjar-1;i++){
            if(i===posReplace){
                arrayMenjar2.push(menjarReplace[0]);
            }
            arrayMenjar2.push(arrayMenjar[i]);
        }
        if(posReplace===totalMenjar-1){
            arrayMenjar2.push(menjarReplace[0]);
        }

    }
    arrayMenjar = arrayMenjar2;
    printListMenjar();
    }
    
   
 function indicaNouMenjar(){
    var nouMenjar = prompt('Índica el nom del nou menjar');
    return nouMenjar;
}

function validaFormulario(){
    if(validaNom() && validaNaixement() && validaMenjar()){
        alert("Registra't correctament");
    }else{
        alert("Hauríes de seleccionar més d'un menjar");
    }
}

