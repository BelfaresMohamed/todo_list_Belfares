// recup les elements byId
let input = document.querySelector('#input');
let button = document.querySelector('#Button_ajouter');
let select = document.querySelector('#Select');
let box = document.querySelector('#box');


let elements = [];


// push dans le tableaux 
button.addEventListener('click', () => {
   let value = input.value;
    if (value !== '') {
        elements.push({ value, completed: false });
        rendre();
        input.value = '';
    }
});

function rendre() {
    let selectVl = select.value;
    let selectelemnts=[];

    if (selectVl === 'compler') {
        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            if (element.completed ==true) {
              selectelemnts.push(element);
            }
          }
          
    } else if (selectVl === 'no compler') {
        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];

            if (element.completed == false) {
              selectelemnts.push(element);
            }
          }
    } else {
        selectelemnts = elements;
    }
    box.innerHTML = '';
    for (let index = 0; index < selectelemnts.length; index++) {
        let element = selectelemnts[index];
      
        let item = document.createElement('div');
        if (element.completed) {
            item.className = 'box-item completed';
          } else {
            item.className = 'box-item';
          }
          
        item.innerHTML = '<p>' + element.value + '</p>';
      
        // j'ai creer cette div pour mait tout mais span
        let actionsDiv = document.createElement('div');
      
        let completeIcon = document.createElement('span');
        completeIcon.className = 'action-icon';
        completeIcon.innerHTML = '<i class="fa-solid fa-check" style="color: #25511f;"></i>';
        completeIcon.addEventListener('click', () => {
          elements[index].completed = !elements[index].completed;
          rendre();
        });
        actionsDiv.appendChild(completeIcon);
      
        let deleteIcon = document.createElement('span');
        deleteIcon.className = 'action-icon';
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash" style="color: #ff0000;"></i>';
        deleteIcon.addEventListener('click', () => {
          elements.splice(index, 1);
          rendre();
        });
        actionsDiv.appendChild(deleteIcon);
      
        let editIcon = document.createElement('span');
        editIcon.className = 'action-icon';
        editIcon.innerHTML = '<i class="fa-solid fa-marker" style="color: #0b25ea;"></i>';
        editIcon.addEventListener('click', () => {
          let newValue = prompt('Entrez une nouvelle valeur', elements[index].value);
          if (newValue !== null) {
            elements[index].value = newValue.trim();
            rendre();
          }
        });
        actionsDiv.appendChild(editIcon);
      
        item.appendChild(actionsDiv);
      
        box.appendChild(item);
      }
      
}