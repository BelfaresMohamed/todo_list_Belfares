  // Tableaux pour stocker les tâches dans chaque catégorie
  let todotab = [];
  let doingtab = [];
  let donetab = [];

  function pushtab() {
      let inputValue = document.getElementById('inputValue');
      let task = inputValue.value.trim();
      if (task !== '') {
          todotab.push(task);
          inputValue.value = '';
          modifier();
      }
  }

  function supprimer(category, index) {
      switch (category) {
          case 'todo':
              todotab.splice(index, 1);
              break;
          case 'doing':
              doingtab.splice(index, 1);
              break;
          case 'done':
              donetab.splice(index, 1);
              break;
      }
      modifier();
  }

  function deplacer(category,index) {
      let task;
      switch (category) {
          case 'todo':
              task = todotab.splice(index, 1);
              break;
          case 'doing':
              task = doingtab.splice(index, 1);
              break;
          case 'done':
              task = donetab.splice(index, 1);
              break;
      }

      let category_tb = prompt('Déplacez la tâche vers la catégorie (todo/doing/done):');
      if (category_tb === null || category_tb.trim() === '') {
          return;
      }

      switch (category_tb) {
          case 'todo':
              todotab.push(task);
              break;
          case 'doing':
              doingtab.push(task);
              break;
          case 'done':
              donetab.push(task);
              break;
          default:
              alert('Catégorie invalide!');
              return;
      }

      modifier();
  }

  function modifier() {
      let todo = document.getElementById('todo');
      let doing = document.getElementById('doing');
      let done = document.getElementById('done');

      // Efface les éléments précédents
      todo.innerHTML = '';
      doing.innerHTML = '';
      done.innerHTML = '';

      // Met à jour la liste des tâches pour chaque catégorie
      for (let index = 0; index < todotab.length; index++) {
          let task = todotab[index];
          let item = createTaskItem(task, 'todo', index);
          todo.appendChild(item);
      }

      for (let index = 0; index < doingtab.length; index++) {
          let task = doingtab[index];
          let item = createTaskItem(task, 'doing', index);
          doing.appendChild(item);
      }

      for (let index = 0; index < donetab.length; index++) {
          let task = donetab[index];
          let item = createTaskItem(task, 'done', index);
          done.appendChild(item);
      }
  }

  function createTaskItem(task, category, index) {
      let item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = task;
      let deleteIcon = document.createElement('i');
      deleteIcon.innerHTML = '❌';
      deleteIcon.addEventListener('click', function () {
          supprimer(category, index);
      });
      let editIcon = document.createElement('i');
      editIcon.innerHTML = '✏️';

      editIcon.addEventListener('click', function () {
          let newValue = prompt('Entrez une nouvelle valeur');
                    if (newValue !== null) {
                        task[index].value = newValue.trim();
                    }
      });
      let deplacerSelect = document.createElement('select');
      deplacerSelect.addEventListener('change', function () {
          deplacer(category, index);
      });
      let option1 = document.createElement('option');
      option1.value = 'todo';
      option1.text = 'À faire';
      let option2 = document.createElement('option');
      option2.value = 'doing';
      option2.text = 'En cours';
      let option3 = document.createElement('option');
      option3.value = 'done';
      option3.text = 'Terminé';
      deplacerSelect.appendChild(option1);
      deplacerSelect.appendChild(option2);
      deplacerSelect.appendChild(option3);

      item.appendChild(deleteIcon);
      item.appendChild(editIcon);
      item.appendChild(deplacerSelect);

      return item;
  }