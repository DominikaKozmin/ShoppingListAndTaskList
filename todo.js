"use strict"

let taskList;
let todoTable;

let taskForm;
let todoError;

document.addEventListener('DOMContentLoaded', ()=>{
    taskList = document.getElementById('taskList');
    taskForm = document.getElementById('taskForm');


    let todoNameError = document.getElementById('todoNameError');
    let todoDescError = document.getElementById('todoDescError');

    getTodoTable();

    taskForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        let todoName = event.target.elements[0];
        let todoDesc = event.target.elements[1];

        if (todoName.value.length > 2) {

            todoName.classList.remove('inputDanger');
            todoNameError.innerText = "";
        }

        if (todoDesc.value.length > 20) {

            todoDesc.classList.remove('inputDanger');
            todoDescError.innerText = "";
        }


        if (todoName.value.length > 2 && todoDesc.value.length > 20) {

            let todo = {
                name: todoName.value,
                desc: todoDesc.value,
                done: false
            }  

            for (let task of todoTable) {
                if (todo.name === todoName.value && todoDesc === todoDesc.value) {
                    return;
                }
            }
            
            todoTable.push(todo);

            localStorage.setItem('todoTable', JSON.stringify(todoTable));

            todoName.value = "";
            todoDesc.value = "";
            renderList();

        }else {
            if (todoName.value.length < 3) {
                todoName.classList.add('inputDanger');
                todoNameError.innerText = "Nazwa musi zawierać min. 3 znaki!";
            }

            if (todoDesc.value.length < 20) {
                todoDesc.classList.add('inputDanger');
                todoDescError.innerText = "Opis musi zawierać min. 20 znaków!";
            }

        }

    })

})


const renderList = () => {
    let liList = Array.from(taskList.getElementsByTagName('li'));

    liList.forEach((li) => {
        let button = li.getElementsByTagName('button')[0];
        button.removeEventListener("click", changeTaskStatus);
    })

    taskList.innerHTML = "";

    todoTable.forEach ((task, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-cente');

        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let button = document.createElement('button');

        button.addEventListener("click", changeTaskStatus)
        button.dataset.taskId = index;

        if (!task.done) {
            button.innerText = "Finish";
            button.classList.add('btn', 'btn-success', 'btn-sm');
        }else {
            button.innerText = "Revert";
            button.classList.add('btn', 'btn-danger', 'btn-sm');
            main.style.textDecoration = "line-through";
        }

        heading.innerText = task.name;
        paragraph.innerText = task.desc;

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        li.appendChild(button);

        taskList.appendChild(li);
    })
}

const changeTaskStatus = (event) => {
    let todo = todoTable[Math.round(event.target.dataset.taskId)];

    if (todo.done) {
        todo.done = false;
    }else {
        todo.done = true;
    }

    renderList();
}

const getTodoTable = () => {
    if (localStorage.getItem('todoTable')) {;
    } else {
    todoTable = [];
    }
}