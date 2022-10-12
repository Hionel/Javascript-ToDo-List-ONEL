const addTaskButton = document.getElementById("submitNewTask");
const listOfTasks = document.getElementById("listOfTasks");
const listOfTasksContainer = document.getElementById(
	"title_and_list_container"
);
const filterRadios = document.getElementsByName("checkbox_filterList");
console.log(filterRadios);

addTaskButton.addEventListener("click", function () {
	let newTaskTitle = document.getElementById("inputNewTask").value;
	if (newTaskTitle && newTaskTitle.trim().length !== 0) {
		filterRadios[0].checked = true;
		let ListItem = document.createElement("li");
		ListItem.classList.add("taskListItem");
		ListItem.setAttribute("draggable", true);

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
				if (taskTitleText.value.trim().length !== 0) {
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

		// Dnd
		const taskListItems = document.querySelectorAll(".taskListItem");
		let draggedEl = null;
		let dropTargetEl = null;
		// let draggedselected = null;
		for (let listItem of taskListItems) {
			listItem.addEventListener("dragstart", (e) => {
				draggedEl = e.target;
				// console.log(draggedEl);
				for (let notDragged of taskListItems) {
					if (notDragged !== draggedEl) {
						notDragged.classList.add("nodrag-hint");
					}
				}
			});

			listItem.addEventListener("dragenter", (e) => {
				dropTargetEl = e.target;
				for (let notDragged of taskListItems) {
					if (notDragged !== dropTargetEl) {
						listItem.classList.add("drag-active");
					}
				}
			});

			listItem.addEventListener("dragleave", () => {
				listItem.classList.remove("drag-active");
			});

			listItem.addEventListener("dragend", () => {
				for (let el of taskListItems) {
					el.classList.remove("drag-active");
					el.classList.remove("nodrag-hint");
				}
			});

			listItem.addEventListener("dragover", (e) => {
				e.preventDefault();
			});

			listItem.addEventListener("drop", (e) => {
				// console.log(draggedEl);
				// console.log(dropTargetEl);
				console.log("dropped");
				if (dropTargetEl != draggedEl) {
					let allItems = document.querySelectorAll(".taskListItem");
					let dragPosition = 0;
					let dropPosition = 0;
					console.log(allItems);
					let newSortList = [];
					// Determine drag and drop items positions
					for (let i = 0; i < allItems.length; i++) {
						if (allItems[i] === draggedEl) {
							dragPosition = i;
							console.log(dragPosition);
						}
						if (allItems[i] === dropTargetEl) {
							dropPosition = i;
							console.log(dropPosition);
						}
					}
					// Delete old list
					for (let item of taskListItems) {
						item.remove();
					}
					// Insert list in the new order inside the array
					for (let i = 0; i < allItems.length; i++) {
						if (i === dragPosition) {
							newSortList.push(dropTargetEl);
						} else if (i === dropPosition) {
							newSortList.push(draggedEl);
						} else {
							newSortList.push(allItems[i]);
						}
					}
					// Insert list in new order after dnd
					for (let i = 0; i < newSortList.length; i++) {
						listOfTasks.append(newSortList[i]);
						console.log(newSortList[i]);
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				} else {
					return;
				}
			});
		}
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

// function dnd(list) {}
