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
              alert('il na aucun category de ce nom');
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
          let item = criationitem(task, 'todo', index);
          todo.appendChild(item);   
      }

      for (let index = 0; index < doingtab.length; index++) {
          let task = doingtab[index];
          let item = criationitem(task, 'doing', index);
          doing.appendChild(item);
      }

      for (let index = 0; index < donetab.length; index++) {
          let task = donetab[index];
          let item = criationitem(task, 'done', index);
          done.appendChild(item);
      }
  }

  function criationitem(task, category, index) {
      let item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = task;
      let deleteIcon = document.createElement('i');
      deleteIcon.innerHTML = '❌';
      deleteIcon.addEventListener('click', function () {
          supprimer(category, index);
      });
      let modifier = document.createElement('i');
      modifier.innerHTML = '✏️';

      modifier.addEventListener('click', function () {
          let newValue = prompt('Entrez une nouvelle valeur');
                    if (newValue !== null) {
                        task[index].value = newValue;
                    }
      });
      let deplacerSelect = document.createElement('select');
      deplacerSelect.className = 'secl';
      deplacerSelect.addEventListener('change', function () {
          deplacer(category, index);
      });
      let choix1 = document.createElement('option');
      choix1.value = 'todo';
      choix1.text = 'À faire';
      let choix2 = document.createElement('option');
      choix2.value = 'doing';
      choix2.text = 'En cours';
      let choix3 = document.createElement('option');
      choix3.value = 'done';
      choix3.text = 'Terminé';
      deplacerSelect.appendChild(choix1);
      deplacerSelect.appendChild(choix2);
      deplacerSelect.appendChild(choix3);

      item.appendChild(deleteIcon);
      item.appendChild(modifier);
      item.appendChild(deplacerSelect);

      return item;
  }