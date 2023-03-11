const addBtn = document.querySelector('#add');
const inputField = document.querySelector('input[type="text"]');
const taskList = document.querySelector('#list');

// create array to store tasks for each list
const taskArr = [];

// event listener that creates a new topic or task
  addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const inputText = inputField.value.trim();

    if (inputText) {
      const newElement = `
        <span class="task-text">${inputText}</span>
        <button class="delete-btn no-strike">Delete</button>
      `;

        taskArr.push(newElement);
        renderList(taskList, taskArr);
      

      inputField.value = '';    
  };
});

// function that renders the topics/tasks from the array
function renderList(list, arr) {
  list.innerHTML = '';

  arr.forEach((element) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = element;

    list.appendChild(listItem);
  });
}

// when clicked, move the task to the end of its list and toggle the checked class
function moveToEndAndCheck(event) {
  const clickedTask = event.target.closest('li');
  
  if (clickedTask && clickedTask.closest('#list')) {
    clickedTask.classList.toggle('checked');

    if (clickedTask.classList.contains('checked')) {
      taskList.appendChild(clickedTask);
        
    } else {
      taskList.insertBefore(clickedTask, taskList.lastElementChild);
    }
  }
}

// add functionality to delete Button in task list
function deleteListElement(event) {
  if (event.target.classList.contains('delete-btn')) { // check if the clicked element is the delete button
    const listItem = event.target.parentElement;
    const list = listItem.closest('ul');
    const index = [...list.children].indexOf(listItem);

   
    taskArr.splice(index, 1);
    

    listItem.remove(); // remove the parent li element
  }
}


taskList.addEventListener('click', moveToEndAndCheck);
taskList.addEventListener('click', deleteListElement);


