const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

// retrieve from localStorage
const savedData = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedData.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedData[i].task;
  newTodo.isCompleted = savedData[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let removeBt = document.createElement("button");
  removeBt.innerText="close";
  let newTodo = document.createElement("li");
  let taskValue = document.getElementById("task").value;
  newTodo.innerText = taskValue;
  newTodo.isCompleted = false;
  
  todoList.appendChild(newTodo);
  newTodo.appendChild(removeBt);
  
  
  // save to localStorage
  savedData.push({ task: taskValue, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedData));
  todoForm.reset();
});

todoList.addEventListener("click", function(event) {
  let clickedListItem = event.target;
  //handle delete item
  if (clickedListItem.tagName.toLowerCase() ==="button") 
    {
        event.target.parentNode.remove();
        savedData.splice(savedData.length-1,1);
        console.log(savedData);
        localStorage.setItem("todos", JSON.stringify(savedData));
    } 
  if (!clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isCompleted = true;
  } else {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isCompleted = false;
  }

  // mark/un-mark duplicate items
  for (let i = 0; i < savedData.length; i++) {
    if (savedData[i].task === clickedListItem.innerText) {
      savedData[i].isCompleted = !savedData[i].isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedData));
    }
  }
});
