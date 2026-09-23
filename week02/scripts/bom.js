const input = document.querySelector('#favchap');
const button = document.querySelector('button')
const list = document.querySelector('#list');


button.addEventListener('click', function(){
    if (input.value.trim() !== '' ){

        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', 'Remove ${');

        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            input.focus();
        });

        li.append(deleteButton);
        list.append(li);

        input.value = '';
        input.focus();
    } else{
        input.focus();
    }
});

