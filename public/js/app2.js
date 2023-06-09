let inputValue = document.getElementById("inputValue");
let todo = document.getElementById("todo");
let doing = document.getElementById("doing");
let done = document.getElementById("done");

let todotab = [];
let doingtab = [];
let donetab = [];

// function ajouter dans le tableau
function pushtab() {
    let element = inputValue.value;
    if (element != '') {
        todotab.push(element);
        inputValue.value = '';
        modifier();
    }
}

// function suuprimer un element
function supprimer(category, index) {
    if (category== "todo") {
        todotab.splice(index, 1);
    } else {
        if (category== 'doing') {
            doingtab.splice(index, 1);
        } else {
            if (category== "done") {
                donetab.splice(index, 1);
            }
        }
    }

    modifier();
}

// cette function je veux l'appeler qu'on je peut modifier 
function modifier() {


// Efface les éléments 
    todo.innerHTML = '';
    doing.innerHTML = '';
    done.innerHTML = '';

    
    // Ajoute element du tableau todotab  à todo
    for (let index = 0; index < todotab.length; index++) {
        let element = todotab[index];
        let item = ajouteritem(element, "todo", index);
        todo.appendChild(item);
    }

    for (let index = 0; index < doingtab.length; index++) {
        let element = doingtab[index];
        let item = ajouteritem(element, "doing", index);
        doing.appendChild(item);
    }

    for (let index = 0; index < donetab.length; index++) {
        let element = donetab[index];
        let item = ajouteritem(element, "done", index);
        done.appendChild(item);
    }
}

function deplacer(category, index, newSelectVal) {
    let element;
    // stocker l'element supprimer dans la variable
    if (category== "todo") {
        element = todotab.splice(index, 1);
    } else {
        if (category== "doing") {
            element = doingtab.splice(index, 1);
        } else {
            if (category== "done") {
                element = donetab.splice(index, 1);
            }
        }
    }



    if (newSelectVal== "todo") {
        todotab.push(element);
    } else {
        if (newSelectVal== "doing") {
            doingtab.push(element);
        } else {
            if (newSelectVal== "done") {
                donetab.push(element);
            } else {
                return;
            }
        }
    }


    modifier();
}


function ajouteritem(element, category, index) {
    let item = document.createElement("div");
    item.className = "item";
    item.innerHTML = element;
    let deleteIcon = document.createElement("i");
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash" style="color: #ff0000;"></i>';
    deleteIcon.addEventListener("click", function () {
        supprimer(category, index);
    });
    let modifierIcon = document.createElement("i");
    modifierIcon.innerHTML = '<i class="fa-solid fa-marker" style="color: #0b25ea;"></i>';

    modifierIcon.addEventListener("click", function () {

        let newValue = prompt("Entrez une nouvelle valeur");

        if (newValue !== null) {


            if (category== "todo") {
                todotab[index] = newValue
            } else {
                if (category== "doing") {
                    doingtab[index] = newValue
                } else {
                    if (category== "done") {
                        donetab[index] = newValue
                    }
                }
            }

            modifier()
        }
    });




    // creation d'un nouveau select qui peut deplacer à  l'autre tableaux
    let deplacerSelect = document.createElement("select");
    deplacerSelect.className = "secl";
    deplacerSelect.addEventListener("change", function () {
        let newSelectVal = document.querySelector(".secl").value
        deplacer(category, index, newSelectVal);
    });
    let choix1 = document.createElement("option");
    choix1.value = "todo";
    choix1.text = "box1";

    let choix2 = document.createElement("option");
    choix2.value = "doing";
    choix2.text = "En cours";

    let choix3 = document.createElement("option");
    choix3.value = "done";
    choix3.text = "Terminé";

    deplacerSelect.appendChild(choix1);
    deplacerSelect.appendChild(choix2);
    deplacerSelect.appendChild(choix3);

    item.appendChild(deleteIcon);
    item.appendChild(modifierIcon);
    item.appendChild(deplacerSelect);

    return item;
}