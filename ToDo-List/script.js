let addTaskButton = document.getElementById("submitNewTask");
let listOfTasks = document.getElementById("listOfTasks");

addTaskButton.addEventListener("click", function () {
	let newTaskTitle = document.getElementById("inputNewTask").value;
	if (newTaskTitle) {
		let ListItem = document.createElement("li");
		ListItem.classList.add("taskListItem");

		let taskTitleText = document.createElement("p");
		taskTitleText.innerText = newTaskTitle;
		// Edit Button
		let editTitleButton = document.createElement("button");
		editTitleButton.innerText = "Edit";
		editTitleButton.addEventListener("click", () => {
			if (editTitleButton.innerText === "Edit") {
				// INPUT WITH READ ONLY INSTEAD OF CONTENTEDITABLE ON PARAGRAPH
				taskTitleText.setAttribute("contentEditable", "true");
				editTitleButton.innerText = "Save Changes";
				taskTitleText.focus();
			} else if (editTitleButton.innerText === "Save Changes") {
				if (taskTitleText.innerText !== "") {
					taskTitleText.setAttribute("contentEditable", "false");
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

		let completedTaskCheckbox = document.createElement("input");
		completedTaskCheckbox.setAttribute("type", "checkbox");

		// Appending elements inside the list item
		ListItem.appendChild(completedTaskCheckbox);
		ListItem.appendChild(editTitleButton);
		ListItem.appendChild(removeTaskButton);

		ListItem.appendChild(taskTitleText);
		listOfTasks.appendChild(ListItem);
	} else {
		alert("No Task");
	}
});
