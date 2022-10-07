const addTaskButton = document.getElementById("submitNewTask");
const listOfTasks = document.getElementById("listOfTasks");
const listOfTasksContainer = document.getElementById(
	"title_and_list_container"
);
const filterRadios = document.getElementsByName("checkbox_filterList");
console.log(filterRadios);

addTaskButton.addEventListener("click", function () {
	let newTaskTitle = document.getElementById("inputNewTask").value;
	if (newTaskTitle && newTaskTitle.trim().length != 0) {
		filterRadios[0].checked = true;
		let ListItem = document.createElement("li");
		ListItem.classList.add("taskListItem");
		ListItem.setAttribute("draggable", true);
		// Drag n Drop Sortable list of tasks

		const draggablesTasks = document.querySelectorAll(".taskListItem");

		draggablesTasks.forEach((task) => {
			task.addEventListener("dragstart", () => {
				task.classList.add("dragging-state");
			});

			task.addEventListener("dragend", () => {
				task.classList.remove("dragging-state");
			});
		});

		listOfTasks.addEventListener("dragover", (e) => {
			e.preventDefault();
			const dropzone = dragDrop(listOfTasks, e.clientY);
			const draggableItemList = document.querySelector(".dragging-state");
			listOfTasks.appendChild(draggableItemList);
		});

		let taskTitleText = document.createElement("input");
		taskTitleText.classList.add("taskTitle_insideList");
		taskTitleText.value = `- ${newTaskTitle}`;
		taskTitleText.readOnly = true;
		// Edit Button
		let editTitleButton = document.createElement("button");
		editTitleButton.innerText = "Edit";
		editTitleButton.addEventListener("click", () => {
			if (editTitleButton.innerText === "Edit") {
				taskTitleText.readOnly = false;
				editTitleButton.innerText = "Save";
				taskTitleText.style.pointerEvents = "auto";
				taskTitleText.focus();
			} else if (editTitleButton.innerText === "Save") {
				if (taskTitleText.value.trim().length != 0) {
					taskTitleText.readOnly = true;
					editTitleButton.innerText = "Edit";
					taskTitleText.style.pointerEvents = "none";
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
				if (listOfTasks.childElementCount < 1) {
					filterRadios[0].checked = false;
					listOfTasksContainer.style.display = "none";
				}
			} else {
				return;
			}
		});
		// Completion validation
		let completedTaskCheckbox = document.createElement("input");
		completedTaskCheckbox.classList.add("checking");
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
		listOfTasksContainer.style.display = "flex";
	} else {
		alert("No Task");
	}
});

// Filtering tasks through status
document
	.querySelector(".filter_Tasks-Wrapper")
	.addEventListener("click", (event) => {
		let completionCheckboxes = document.getElementsByClassName("checking");

		if (
			event.target.name === "checkbox_filterList" &&
			event.target.value === "completed"
		) {
			console.log(event.target);
			for (let checkbox of completionCheckboxes) {
				if (!checkbox.checked) {
					checkbox.parentElement.style.display = "none";
				} else {
					checkbox.parentElement.style.display = "flex";
				}
			}
		} else if (
			event.target.name === "checkbox_filterList" &&
			event.target.value === "incompleted"
		) {
			for (let checkbox of completionCheckboxes) {
				if (checkbox.checked) {
					checkbox.parentElement.style.display = "none";
				} else {
					checkbox.parentElement.style.display = "flex";
				}
			}
		} else {
			for (let checkbox of completionCheckboxes) {
				checkbox.parentElement.style.display = "flex";
			}
		}
	});

// Removing Completed Tasks

const removeCompletedButton = document.getElementById("removeCompletedTasks");
let completionCheckboxes = document.getElementsByClassName("checking");
let completedTaskArray = [];
removeCompletedButton.addEventListener("click", () => {
	for (let checkbox of completionCheckboxes) {
		if (checkbox.checked) {
			completedTaskArray.push(checkbox.parentElement);
		}
	}
	for (task of completedTaskArray) {
		task.remove();
	}
});

// Function for dropping tasks on drag n drop

function dragDrop(container, vertical) {
	const draggableElements = [
		...container.querySelectorAll(".draggable:not(.dragging-state"),
	];
	return draggableElements.reduce((closest, child) => {
		const box = child.getBoundingClientRect();
		const offset = vertical - box.top - box.height / 2;
		console.log(box);
		if (offset < 0 && offset > closest.offset) {
			return { offset: offset, element: child };
		} else {
			return closest;
		}
	}, { offset: Number.NEGATIVE_INFINITY }.element);
}
