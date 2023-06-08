       let inputValue = document.getElementById('inputValue');
        let addButton = document.getElementById('addButton');
        let filterSelect = document.getElementById('filterSelect');
        let box = document.getElementById('box');
        let elements = [];

        addButton.addEventListener('click',()=>{
             value = inputValue.value.trim();
            if (value !== '') {
                elements.push({ value, completed: false });
                renderElements();
                inputValue.value = '';
            }
        });

        function renderElements() {
            let filterValue = filterSelect.value;
            let filteredElements = filterValue === 'completed' ? elements.filter(element => element.completed) :
                filterValue === 'uncompleted' ? elements.filter(element => !element.completed) :
                    elements;

            box.innerHTML = '';
            filteredElements.forEach((element, index) => {
                let item = document.createElement('div');
                item.className = 'box-item' + (element.completed ? ' completed' : '');
                item.innerHTML = element.value;
                
                let completeIcon = document.createElement('span');
                completeIcon.className = 'action-icon';
                completeIcon.innerHTML = '✔️';
                completeIcon.addEventListener('click', () => {
                    elements[index].completed = !elements[index].completed;
                    renderElements();
                });
                
                let deleteIcon = document.createElement('span');
                deleteIcon.className = 'action-icon';
                deleteIcon.innerHTML = '❌';
                deleteIcon.addEventListener('click', () => {
                    elements.splice(index, 1);
                    renderElements();
                });
                
                let editIcon = document.createElement('span');
                editIcon.className = 'action-icon';
                editIcon.innerHTML = '✏️';
                editIcon.addEventListener('click', () => {
                    let newValue = prompt('Entrez une nouvelle valeur', elements[index].value);
                    if (newValue !== null) {
                        elements[index].value = newValue.trim();
                        renderElements();
                    }
                });
                
                item.appendChild(completeIcon);
                item.appendChild(deleteIcon);
                item.appendChild(editIcon);
                
                box.appendChild(item);
            });
        }