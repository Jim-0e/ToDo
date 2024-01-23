const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')

const tasksList = document.querySelector('#tasksList')

const emptyList = document.querySelector('#emptyList')

let tasks = []


if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTash(task))
}

checkEmptyList()



// if (localStorage.getItem('tasksHTML')){
//     tasksList.innerHTML = localStorage.getItem('tasksHTML')
// }

// Добавление задачи


form.addEventListener('submit', addTask)

// удаление задачи
tasksList.addEventListener('click', deleteTask)

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

function addTask(e){
    // отмена отправки формы
    e.preventDefault()
    // достать текст
    const text = taskInput.value 
    
    // описываем в виде объекта
    const newTask = {
        id: Date.now(),
        text: text,
        done: false,
    }
    // добавление в массив
    tasks.push(newTask)
    
    saveLocal()

    // формируем css класс
    renderTash(newTask)

    // очистка input
    taskInput.value = ''
    // фокус
    taskInput.focus()

  
    checkEmptyList()
    // if(tasksList.children.length > 1){
    //     emptyList.classList.add('none')
    // }
    saveLocal()
}

function deleteTask(event){
    // если был клик не по кнопке
    if (event.target.dataset.action !== 'delete') return 

    // console.log(event.target) // по какому элементу мы кликнули
    const parentNode = event.target.closest('li') // удалить род. эл.
    
    const id = Number(parentNode.id)

    // const index = tasks.findIndex((task)=> task.id === id)
    // tasks.splice(index, 1)

    // удаляем задачу черрез фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id)
    saveLocal()

    parentNode.remove() // удалить
   
    // if (tasksList.children.length === 1){
    //     emptyList.classList.remove('none')
    // }
    checkEmptyList()
}
function doneTask(event) {
    if (event.target.dataset.action !== 'done' ) return

    const parentNode = event.target.closest('.list-group-item')

    // id задачи
    const id = Number(parentNode.id)

    const task = tasks.find((task)=> task.id === id )
    task.done = !task.done

    saveLocal()

    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
}

function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }
    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl? emptyListEl.remove(): null
    }

}


function saveLocal(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}



function renderTash(task){
    const cssClass = task.done ? "task-title task-title--done":"task-title"

    const taskHTML = `
                <li id=${task.id} class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
                `
    // добавить на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML)
}

// function saveHTMLtoLS(){
//     localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }