const headerInput = document.querySelector('.header-input')
const todoControl = document.querySelector('.todo-control')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function (item, index) {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = `
        <span class="text-todo">${item.text}</span>
        <div class="todo-buttons">
			<button class="todo-remove"></button>
		    <button class="todo-complete"></button>
		</div>
        `

        if (item.complited) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.complited = !item.complited
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1)
            render()
        })

        localStorage.setItem('toDoList', JSON.stringify(toDoData))
    })
}

if (localStorage.toDoList) {
    toDoData = JSON.parse(localStorage.toDoList)
    render()
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()
    if (headerInput.value != '') {
        const newToDo = {
            text: headerInput.value,
            complited: false
        }

        toDoData.push(newToDo)
        headerInput.value = ''

        render()
    } 
})