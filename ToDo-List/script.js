let addTaskButton = document.getElementById("submitNewTask");
let listOfTasks = document.getElementById("listOfTasks");

addTaskButton.addEventListener("click", function () {
	let taskTitle = document.getElementById("inputNewTask").value;
	let taskListItem = document.createElement("li");
	if (taskTitle) {
		taskListItem.innerText = taskTitle;
		listOfTasks.appendChild(taskListItem);
		console.log(taskListItem.innerText);
	} else {
		alert("No Task");
	}
});
