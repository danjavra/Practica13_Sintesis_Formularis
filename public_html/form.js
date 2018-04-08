window.addEventListener('load',inicio,false);

const form = document.forms['formulario'];

const inputNom = form['inputNom'];
const divNom = document.getElementById('__nom');
const feedBackNom = document.getElementById('feedback-nom');
const print_nom = document.getElementById('print_nom');

const inputNaixement = form['inputNaixement'];
const divNaixement = document.getElementById('__naixement');
const feedBackNaixement = document.getElementById('feedback-naixement');
const print_naixement = document.getElementById('print_naixement');

const checkboxMenjar = document.getElementsByName('menjar');

const listaMenjar = document.getElementById('lista_menjar');

const arrayMenjar = ['chocolata','bledes','llenties'];



printListaMenjar();

function inicio(){
    inputNom.addEventListener('keyup',validaNom,false);
    inputNaixement.addEventListener('keyup',validaNaixement,false);
}

function validaNom(){
        const RegExPattern = /^[A-z]{5,10}$/;

        if(inputNom.value.match(RegExPattern)){
            divNom.setAttribute('class','has-success');
            feedBackNom.innerHTML = 'Nom correcte';
            print_nom.style.color = 'green';
            print_nom.innerHTML = '<strong>Nom: </strong>' + inputNom.value;
            return true
        }else{
            divNom.setAttribute('class','has-danger');
            feedBackNom.innerHTML = 'Nom incorrecte';
            print_nom.innerHTML = '<strong>Nom: </strong>nom incorrecte';
            print_nom.style.color = 'red';
            return false;
        }
}

function validaNaixement(){
    const PatternDate = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;

    if(inputNaixement.value.match(PatternDate)){
        divNaixement.setAttribute('class','has-success');
        feedBackNaixement.innerHTML = 'Naixement Correcte';
        print_naixement.innerHTML = '<strong>Naixement: </strong>' + inputNaixement.value;
        print_naixement.style.color = 'green';
        return true;
    }else{
        divNaixement.setAttribute('class','has-danger');
        feedBackNaixement.innerHTML = 'Format data incorrecte';
        print_naixement.innerHTML = 'Format data correcte';
        print_naixement.style.color = 'red';
        return false;
    }
}

function validaMenjarChecked(){
    var isChecked = false;

    for(var i=0;i<checkboxMenjar.length;i++){
        if(checkboxMenjar[i].checked===true){
            return true;
        }
    }
    return isChecked;
}

function printListaMenjar(){
    listaMenjar.innerHTML = '';
    for(var i=0;i<arrayMenjar.length;i++){
        var newDiv = document.createElement('DIV');
        var iconCircleDown = document.createElement('i');
        var iconCircleUp = document.createElement('i');
        var iconDelete = document.createElement('i');
        var inputCheckbox = document.createElement('input');
        iconCircleDown.classList.add('fa','fa-arrow-circle-down');
        iconCircleUp.classList.add('fa','fa-arrow-circle-up');
        iconDelete.classList.add('fa','fa-ban');
        inputCheckbox.setAttribute('type','checkbox');
        inputCheckbox.setAttribute('name','menjar');
        inputCheckbox.setAttribute('value',arrayMenjar[i]);
        iconDelete.setAttribute('onclick','eliminarMenjar(event)');
        iconCircleUp.setAttribute('onclick','pujarMenjar(event)');
        iconCircleDown.setAttribute('onclick','baixarMenjar(event)');
        newDiv.appendChild(iconCircleDown);
        newDiv.appendChild(iconCircleUp);
        newDiv.appendChild(iconDelete);
        newDiv.appendChild(inputCheckbox);
        newDiv.innerHTML += '<span>' + arrayMenjar[i] + '</span>';
        listaMenjar.appendChild(newDiv);
    }
}

function addEvent(){
    arrayMenjar.push(indicaNouMenjar());
    printListaMenjar();
}

function pujarMenjar(e){
    const menjar = e.path[1].lastElementChild.textContent;
    const posMenjar = arrayMenjar.indexOf(e.path[1].lastElementChild.textContent);
    arrayMenjar.splice(posMenjar,1);
    arrayMenjar.unshift(menjar);
    printListaMenjar();
}

function eliminarMenjar(e) {
    const posMenjar = arrayMenjar.indexOf(e.path[1].lastElementChild.textContent)
    arrayMenjar.splice(posMenjar,1);
    printListaMenjar();
}

function baixarMenjar(e){
    const menjar = e.path[1].lastElementChild.textContent;
    const posMenjar = arrayMenjar.indexOf(e.path[1].lastElementChild.textContent);
    arrayMenjar.splice(posMenjar,1);
    arrayMenjar.push(menjar);
    printListaMenjar();
}

function formSubmit(){
    if(validaNom() && validaNaixement() && validaMenjarChecked()){
        alert("Se ha enviado correctamente")
    }else{
        alert("Deberias selecionar mas de una comida");
    }
}

function indicaNouMenjar(){
    var nouMenjar = prompt('indica el nombre de nueva camida');
    return nouMenjar
}