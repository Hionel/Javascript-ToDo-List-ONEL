let addTaskButton = document.getElementById("submitNewTask");
let listOfTasks = document.getElementById("listOfTasks");
let listOfTasksContainer = document.getElementById("title_and_list_container");

addTaskButton.addEventListener("click", function () {
	let newTaskTitle = document.getElementById("inputNewTask").value;
	if (newTaskTitle && newTaskTitle.trim().length != 0) {
		let ListItem = document.createElement("li");
		ListItem.classList.add("taskListItem");

		let taskTitleText = document.createElement("input");
		taskTitleText.value = newTaskTitle;
		taskTitleText.readOnly = true;
		// Edit Button
		let editTitleButton = document.createElement("button");
		editTitleButton.innerText = "Edit";
		editTitleButton.addEventListener("click", () => {
			if (editTitleButton.innerText === "Edit") {
				taskTitleText.readOnly = false;
				editTitleButton.innerText = "Save Changes";
				taskTitleText.focus();
			} else if (editTitleButton.innerText === "Save Changes") {
				if (taskTitleText.value.trim().length != 0) {
					taskTitleText.readOnly = true;
					editTitleButton.innerText = "Edit";
				} else {
					taskTitleText.focus();
					return alert("Invalid Task Title");
				}
			}
		});
		// 	Remove Button
		let removeTaskButton = document.createElement("button");
		removeTaskButton.innerText = "Remove";
		removeTaskButton.addEventListener("click", () => {
			let confirmPrompt = window.confirm(
				"Are you sure you want to delete this task?"
			);
			if (confirmPrompt) {
				ListItem.remove();
			} else {
				return;
			}
		});
		// Completion validation
		let completedTaskCheckbox = document.createElement("input");
		completedTaskCheckbox.setAttribute("type", "checkbox");
		let taskCompletion = false;
		completedTaskCheckbox.addEventListener("click", () => {
			if (completedTaskCheckbox) {
				taskCompletion = !taskCompletion;
			}
		});

		// Appending elements inside the list item
		ListItem.appendChild(completedTaskCheckbox);
		ListItem.appendChild(editTitleButton);
		ListItem.appendChild(removeTaskButton);

		ListItem.appendChild(taskTitleText);
		listOfTasks.appendChild(ListItem);
	} else {
		alert("No Task");
	}
	listOfTasksContainer.style.transform = "translateY(0%)";
});

let content = `<li class="taskListItem></li>`;
