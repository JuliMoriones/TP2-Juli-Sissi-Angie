var allTasks = []
var completed, allButtons, item, listItem, newTask


var keyPress = function (event) {
    if (event.keyCode === 13) {
        addTask()
    }
}

var blankText = function (list, noText) {
    if (list.getElementsByTagName("li").length < 1) {
        var text = document.createElement("li")
        text.classList.add("blank")
        text.innerText = noText
        list.appendChild(text)
    }
}


var createLi = function (task, index) {
    listItem = document.createElement('li')
    listItem.innerText = task.text
    listItem.classList.add('task')
    var toggleImage;

    allButtons = document.createElement('div')
    allButtons.classList.add('task-btns')
    if(!task.isCompleted){
        toggleImage = 'pending'
    } else {  
        toggleImage = 'completed'
        listItem.classList.add('line')
    }

    allButtons.appendChild(createButton('trash', index, deleteTask))
    allButtons.appendChild(createButton(toggleImage, index, toggleTask))
    listItem.appendChild(allButtons)
    return listItem

}


var createButton = function (classBtn, index, btnFunction) {
    btn = document.createElement('button')
    btn.innerHTML = '<img src="styles/images/' + classBtn + '.svg">'
    btn.id = index
    btn.onclick = function () { btnFunction(this) }
    return btn
}

var toggleTask = function (btn) {
    allTasks[btn.id].isCompleted = !allTasks[btn.id].isCompleted
    printTask()
}


var deleteTask = function (btn) {
    var deleteTask = confirm('¿Estás segurx de borrar esta tarea?');
    if (deleteTask){
    allTasks.splice(btn.id, 1)
        return printTask();
    } else {
    return false;
    }

}

var printTask = function () {
    toDo = document.getElementById('todo')
    toDo.innerHTML = ''
    completed = document.getElementById('completed')
    completed.innerHTML = ''

    allTasks.map(function (task, index) {
        if (task.isCompleted){ 
         completed.appendChild(createLi(task, index)) 
        } else { 
         todo.appendChild(createLi(task, index))
        }
    })
    blankText(toDo, '¡Excelente!' + '\n\nNo tenés ninguna tarea pendiente')
    blankText(completed, '¡Ánimo!' + '\n\nCuando completes tus tareas van a aparecer acá')
    guardarTarea();
}

var addTask = function () {
    item = document.getElementById('item')
    newTask = item.value

    if (newTask !== '') {
        item.value = ''
        allTasks.unshift({ text: newTask, isCompleted: false })
        printTask()
    }

}

var guardarTarea = function(){
    localStorage.setItem('tareas', JSON.stringify(allTasks))
}

var prinTarea = function(){
    var toDo = document.getElementById('todo');
    toDo.innerHTML = '' ;
    allTasks = JSON.parse(localStorage.getItem('tareas'));
    if (allTasks == null){
        allTasks = [];
    }
    
}

var onLoad = function(){
    prinTarea();
    printTask()
}

