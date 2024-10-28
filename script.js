// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const todoInput = document.querySelector('#todoInput');
const searchInput = document.querySelector('#searchInput');
const eraseButton = document.querySelector('#eraseButton');
const divToolbar = document.querySelector('.toolbar')
const divListTask = document.querySelector('.div-add-hide')
const divFormList = document.querySelector('.form-todo-list');
const divFormEdit = document.querySelector('.form-edit-form');
const divTodoList = document.querySelector('.div-todo-list');
const editInput = document.querySelector('#edit-input');
const addNewTask = document.querySelector('#addNewTask')
const todos = document.querySelectorAll('.todo');
const filterSelect = document.querySelector('#filter-select');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

const tarefas = []
// Adiciona uma tarefa na lista
function addTask(newTask) {
    tarefas.push(newTask)

}

let inputValue = '';

todoInput.addEventListener('input', (e) => {
    inputValue = e.target.value

})

// Remove uma tarefa da lista
function removeTask(newTask) {
    tarefas.splice(newTask, 1)
}

// Função de apagar toda a pesquisa digitada
eraseButton.addEventListener('click', (event) => {
    event.preventDefault();
    searchInput.value = '';
});

// Adiciona a tarefa na lista de tarefas
addNewTask.addEventListener('click', () => {
    if (inputValue) {
        addTask(inputValue)

        if (tarefas.length >= 1) {
            document.querySelector('.hide-no-task-task').classList.add('hide')
        }
    }

})

// Cria a tarefa na lista de tarefas
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    const todoList = document.querySelector('#todo-list');

    if (inputValue) {

        todoList.innerHTML += `
                <div class="todo">
                    <h3 class="todo-list-title">${inputValue}</h3>
                    <div class="todo-buttons">
                        <button class="finish-todo" onclick="finishTask(this)"><i class="ph ph-check"></i></button>
                        <button class="edit-todo" onclick="editTask(this)"><i class="ph ph-pen"></i></button>
                        <button class="delete-todo" onclick="deleteTask(this)"><i class="ph ph-x"></i></button>
                    </div>
                </div>
        `

        todoInput.value = '';
        console.log(tarefas)
    }

});

// Função de dar check na Tarefa
function finishTask(element) {
    const todoElement = element.closest('.todo');
    const todoTitle = todoElement.querySelector('h3');

    if (todoElement) {
        const isChecked = todoElement.classList.toggle('done');
        todoElement.style.background = isChecked ? '#ffffff38' : '';
        todoTitle.style.textDecoration = isChecked ? 'line-through' : '';
    }
};

// Função de deletar tarefa
function deleteTask(element) {
    const todoList = document.querySelector('#todo-list');
    const todoElement = element.closest('.todo');

    if (todoElement) {
        const todoTitle = todoElement.querySelector('h3').innerText;

        todoList.removeChild(todoElement);

        const indexToRemove = tarefas.indexOf(todoTitle);
        if (indexToRemove !== -1) {
            tarefas.splice(indexToRemove, 1);
        } if (tarefas.length == 0) {
            document.querySelector('.hide-no-task-task').classList.remove('hide')
            console.log('0')
        }

        console.log(tarefas)
    }
}

// Função de cancelar a edit
function cancelEdit() {
    event.preventDefault();

    toggleHideEdit();
    editInput.value = '';
}

function toggleHideEdit() {
    divFormList.classList.toggle('hide');
    divFormEdit.classList.toggle('hide');
    divListTask.classList.toggle('hide')

};

// Função de EDITAR nome da task
function editTask(element) {
    const todoElement = element.closest('.todo');

    if (todoElement) {
        toggleHideEdit();
    }
};

// Função de confirmar a alteração do nome da task
function confirmEdiTask(element) {
    event.preventDefault();
    const todoElement = element.closest('.todo');

    if (editInput.value == '') {
        return;
    } else {
        todos.querySelector('h3').innerText = editInput.value;
        toggleHideEdit();

    }
};

// Filtrar tarefas
filterSelect.addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const todos = document.querySelectorAll('.todo');

    todos.forEach(todo => {
        if (filterValue === 'done') {
            todo.style.display = todo.classList.contains('done') ? 'flex' : 'none';
        } else if (filterValue === 'todo') {
            todo.style.display = !todo.classList.contains('done') ? 'flex' : 'none';
        } else {
            todo.style.display = 'flex';
        }
    });
});

// Função de pesquisar tarefas
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase()
    const todos = document.querySelectorAll('.todo');

    todos.forEach(todo => {
        const todoTitle = todo.querySelector('h3').innerText.toLowerCase();


        if (todoTitle.includes(searchValue)) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });

});

