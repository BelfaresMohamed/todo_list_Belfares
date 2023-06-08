// recup les elements byId
let input = document.querySelector('#input');
let button = document.querySelector('#Button_ajouter');
let select = document.querySelector('#Select');
let box = document.querySelector('#box');
let elements = [];


// push dans le tableaux 
button.addEventListener('click', () => {
    value = input.value;
    if (value !== '') {
        elements.push({ value, completed: false });
        rendre();
        input.value = '';
    }
});

function rendre() {
    let selectVl = select.value;
    let selectelemnt;

    if (selectVl === 'completed') {
        selectelemnt = elements.filter(element => element.completed);
    } else if (selectVl === 'uncompleted') {
        selectelemnt = elements.filter(element => !element.completed);
    } else {
        selectelemnt = elements;
    }
    box.innerHTML = '';
    selectelemnt.forEach((element, index) => {
        let item = document.createElement('div');
        item.className = 'box-item' + (element.completed ? ' completed' : '');
        item.innerHTML = element.value;


        // VERIFIER   
        let completeIcon = document.createElement('span');
        completeIcon.className = 'action-icon';
        completeIcon.innerHTML = '✔️';
        completeIcon.addEventListener('click', () => {
            elements[index].completed = !elements[index].completed;
            rendre();
        });
        // SUPPRIMER
        let deleteIcon = document.createElement('span');
        deleteIcon.className = 'action-icon';
        deleteIcon.innerHTML = '❌';
        deleteIcon.addEventListener('click', () => {
            elements.splice(index, 1);
            rendre();
        });

        let editIcon = document.createElement('span');
        editIcon.className = 'action-icon';
        editIcon.innerHTML = '✏️';
        editIcon.addEventListener('click', () => {
            let newValue = prompt('Entrez une nouvelle valeur', elements[index].value);
            if (newValue !== null) {
                elements[index].value = newValue.trim();
                rendre();
            }
        });

        item.appendChild(completeIcon);
        item.appendChild(deleteIcon);
        item.appendChild(editIcon);
        box.appendChild(item);
    });
}