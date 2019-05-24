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
    // crea las li
    listItem = document.createElement('li')
    //var input = cretae input;
    //input.value = task.text
    //input.disabled = true (fijate)
    //input.classlist.add('hidden')

    listItem.innerText = task.text
    listItem.classList.add('task')
    var toggleImage;

    allButtons = document.createElement('div')
    allButtons.classList.add('task-btns')
    //condicional para cambiar icono pending por completed cuando clickeas
    if(!task.isCompleted){
        toggleImage = 'pending'
    } else {        //gracias mike por tu magia
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


var editItem = function(){
    // input.disabled = false;
    // input.classList.remove('hidden')
    // input.onKeyPress = function(event){ actuallyEditItem(e, input) }
}

var actuallyEditItem = function(e, input){
    // valida que sea el enter
    // allTasks[btn.id].text = input.value
    // reimprime todo al carajo
}

var toggleTask = function (btn) {
    allTasks[btn.id].isCompleted = !allTasks[btn.id].isCompleted

    printTask()
}

var deleteTask = function (btn) {
    allTasks.splice(btn.id, 1)
    printTask()
}

var printTask = function () {
    toDo = document.getElementById('todo')
    toDo.innerHTML = ''
    completed = document.getElementById('completed')
    completed.innerHTML = ''

    allTasks.map(function (task, index) {
        task.isCompleted ? completed.appendChild(createLi(task, index)) : todo.appendChild(createLi(task, index))
    })
    blankText(toDo, '¡Excelente!' + '\n\nNo tenés ninguna tarea pendiente')
    blankText(completed, '¡Ánimo!' + '\n\nCuando completes tus tareas van a aparecer acá')
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
