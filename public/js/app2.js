let inputValue = document.getElementById('inputValue');
let todo = document.getElementById('todo');
let doing = document.getElementById('doing');
let done = document.getElementById('done');

  let todotab = [];
  let doingtab = [];
  let donetab = [];

  function pushtab() {
      let element = inputValue.value.trim();
      if (element !== '') {
          todotab.push(element);
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
      let element;
      switch (category) {
          case 'todo':
              element = todotab.splice(index, 1);
              break;
          case 'doing':
              element = doingtab.splice(index, 1);
              break;
          case 'done':
              element = donetab.splice(index, 1);
              break;
      }

      let category_tb = prompt('Déplacez la tâche vers la catégorie (todo/doing/done):');
      if (category_tb.trim() === '') {
          return;
      }

      switch (category_tb) {
          case 'todo':
              todotab.push(element);
              break;
          case 'doing':
              doingtab.push(element);
              break;
          case 'done':
              donetab.push(element);
              break;
          default:
              alert('il na aucun category de ce nom');
              return;
      }

      modifier();
  }

  function modifier() {


      // Efface les éléments précédents
      todo.innerHTML = '';
      doing.innerHTML = '';
      done.innerHTML = '';

      
      for (let index = 0; index < todotab.length; index++) {
          let element = todotab[index];
          let item = criationitem(element, 'todo', index);
          todo.appendChild(item);   
      }

      for (let index = 0; index < doingtab.length; index++) {
          let element = doingtab[index];
          let item = criationitem(element, 'doing', index);
          doing.appendChild(item);
      }

      for (let index = 0; index < donetab.length; index++) {
          let element = donetab[index];
          let item = criationitem(element, 'done', index);
          done.appendChild(item);
      }
  }

  function criationitem(element, category, index) {
      let item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = element;
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
                        element[index].value = newValue;
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