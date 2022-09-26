import taskManager from "./task-manager";

export default function createStatic() {
  const content = document.getElementById("content");

  const header = document.createElement("header");
  const titleContainer = document.createElement("div");
  const logoImage = document.createElement("img");
  const title = document.createElement("h1");

  title.textContent = "Tsk Mng";
  titleContainer.id = "title-container";

  const navBar = document.createElement("nav");
  const displaySelector = document.createElement("button");
  const treeImage = document.createElement("span");
  const taskListContainer = document.createElement("div");
  const taskList = document.createElement("ul");

  taskListContainer.id = "task-list-container";
  taskList.id = "task-list";

  const addTaskButton = document.createElement("button");
  addTaskButton.id = "add-task-button";
  addTaskButton.textContent = "New Task";
  addTaskButton.classList.add = "add-button";

  taskListContainer.append(addTaskButton, taskList);

  treeImage.id = "tree-image";

  displaySelector.appendChild(treeImage);
  navBar.append(displaySelector);
  header.append(navBar);

  titleContainer.append(logoImage, title);
  header.append(titleContainer);

  const contentDisplay = document.createElement("div");
  contentDisplay.id = "content-display";

  content.append(header, taskListContainer, contentDisplay);

  displaySelector.addEventListener("click", toggleTaskList);
  addTaskButton.addEventListener("click", addNewTaskForm);

  updateTaskList();
}

function toggleTaskList() {
  clearContainer(document.getElementById("content-display"));
  updateTaskList();
  const taskListContainer = document.getElementById("task-list-container");
  if (taskListContainer.style.display === "flex") {
    taskListContainer.style.display = "none";
  } else {
    taskListContainer.style.display = "flex";
  }
}

function clearContainer(container) {
  while (container.firstChild != null) {
    container.removeChild(container.firstChild);
  }
}

function addNewTaskForm() {
  toggleTaskList();
  const contentDisplay = document.getElementById("content-display");
  // Create Form
  const newTaskForm = document.createElement("form");
  newTaskForm.name = "addNewTask";
  newTaskForm.action = "";
  newTaskForm.classList.add("form-container");

  // Add form info
  const formTitle = document.createElement("h2");
  formTitle.id = "form-title";
  formTitle.textContent = "Create New Task";

  const formInfoContainer = document.createElement("p");
  formInfoContainer.textContent = "Required fields are followed by ";
  const requiredAbbreviation = document.createElement("abbr");
  requiredAbbreviation.title = "Required";
  requiredAbbreviation.textContent = "*";
  formInfoContainer.append(requiredAbbreviation);

  // Add form title
  const titleFormContainer = document.createElement("p");
  const titleLabel = document.createElement("label");
  titleLabel.for = "title";
  titleLabel.textContent = "Title ";
  titleLabel.appendChild(requiredAbbreviation.cloneNode(true));
  const titleInput = document.createElement("input");
  titleInput.id = "title";
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.setAttribute("required", "");
  titleFormContainer.append(titleLabel, titleInput);

  // Add form description
  const descriptionFormContainer = document.createElement("p");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "description";
  descriptionLabel.textContent = "Description ";
  descriptionLabel.appendChild(requiredAbbreviation.cloneNode(true));
  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description";
  descriptionInput.name = "description";
  descriptionInput.setAttribute("required", "");
  descriptionFormContainer.append(descriptionLabel, descriptionInput);

  // Add form due date
  const dateFormContainer = document.createElement("p");
  const dateLabel = document.createElement("label");
  dateLabel.for = "date";
  dateLabel.textContent = "Date ";
  dateLabel.appendChild(requiredAbbreviation.cloneNode(true));
  const dateInput = document.createElement("input");
  dateInput.id = "date";
  dateInput.type = "date";
  dateInput.name = "date";
  dateInput.setAttribute("required", "");
  dateFormContainer.append(dateLabel, dateInput);

  // Add form priority
  const priorityFormContainer = document.createElement("fieldset");
  const priorityFormLegend = document.createElement("legend");
  priorityFormLegend.textContent = "Priority:";

  const priortyGroupOne = document.createElement("div");
  const priorityOneLabel = document.createElement("label");
  priorityOneLabel.textContent = " High";
  const priorityOneInput = document.createElement("input");
  priorityOneInput.id = "priorityOne";
  priorityOneInput.type = "radio";
  priorityOneInput.name = "priority";
  priorityOneInput.value = "1";
  priorityOneLabel.prepend(priorityOneInput);
  priortyGroupOne.append(priorityOneLabel);

  const priortyGroupTwo = document.createElement("div");
  const priorityTwoLabel = document.createElement("label");
  priorityTwoLabel.textContent = " Medium";
  const priorityTwoInput = document.createElement("input");
  priorityTwoInput.id = "priorityTwo";
  priorityTwoInput.type = "radio";
  priorityTwoInput.name = "priority";
  priorityTwoInput.value = "2";
  priorityTwoLabel.prepend(priorityTwoInput);
  priortyGroupTwo.append(priorityTwoLabel);

  const priortyGroupThree = document.createElement("div");
  const priorityThreeLabel = document.createElement("label");
  priorityThreeLabel.textContent = " Low";
  const priorityThreeInput = document.createElement("input");
  priorityThreeInput.id = "priorityThree";
  priorityThreeInput.type = "radio";
  priorityThreeInput.name = "priority";
  priorityThreeInput.value = "2";
  priorityThreeLabel.prepend(priorityThreeInput);
  priortyGroupThree.append(priorityThreeLabel);

  priorityFormContainer.append(
    priorityFormLegend,
    priortyGroupOne,
    priortyGroupTwo,
    priortyGroupThree
  );

  // Add task project
  const projectList = taskManager.allProjects();
  const projectDataList = document.createElement("datalist");
  projectDataList.id = "projectList";
  if (projectList.length > 0) {
    projectList.forEach((project) => {
      const dataListOption = document.createElement("option");
      dataListOption.value = project;
      projectDataList.append(dataListOption);
    });
  }

  const projectFormContainer = document.createElement("p");
  const projectLabel = document.createElement("label");
  projectLabel.for = "project";
  projectLabel.textContent = "Project ";
  const projectInput = document.createElement("input");
  projectInput.id = "project";
  projectInput.type = "text";
  projectInput.setAttribute("list", "projectList");
  projectInput.name = "project";
  projectFormContainer.append(projectLabel, projectInput, projectDataList);

  // Add submit button
  const formSubmitButton = document.createElement("button");
  formSubmitButton.id = "submit-form";
  formSubmitButton.type = "button";
  formSubmitButton.textContent = "Create";
  formSubmitButton.addEventListener("click", submitForm);

  // Append all form elements
  newTaskForm.append(
    formTitle,
    formInfoContainer,
    titleFormContainer,
    descriptionFormContainer,
    dateFormContainer,
    priorityFormContainer,
    projectFormContainer,
    formSubmitButton
  );
  contentDisplay.append(newTaskForm);
}

function submitForm() {
  // check to see if title, description and date are filled, then submit form, otherwise do nothing
  if (
    document.getElementById("title").value &&
    document.getElementById("description").value &&
    document.getElementById("date").value
  ) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    let priority;
    document.getElementById("priorityOne").checked
      ? (priority = "1")
      : document.getElementById("priorityTwo").checked
      ? (priority = "2")
      : document.getElementById("priorityThree").checked
      ? (priority = "3")
      : (priority = "1");
    let project;
    if (document.getElementById("project").value) {
      project = document.getElementById("project").value;
    } else {
      project = "-";
    }

    taskManager.addNewTask(title, description, date, priority, false, project);
    clearContainer(document.getElementById("content-display"));
    toggleTaskList();
  }
}

function updateTaskList() {
  const taskList = document.getElementById("task-list");
  clearContainer(taskList);
  let tasks;
  const projects = taskManager.allProjects();
  if (projects.length > 0) {
    projects.forEach((project) => {
      const taskListItem = document.createElement("li");
      const taskListProject = document.createElement("h3");
      taskListItem.classList.add = "task-list-item";
      taskListProject.textContent = project;
      taskListProject.classList.add = "project-header";
      taskListItem.appendChild(taskListProject);

      tasks = taskManager.tasksOfProject(project);
      Object.values(tasks).forEach((task) => {
        const taskInList = document.createElement("p");
        taskInList.classList.add = "task";
        taskInList.textContent = task.title;
        taskInList.setAttribute("taskdata", JSON.stringify(task));
        taskInList.addEventListener("click", displayTask);
        taskListItem.appendChild(taskInList);
      });
      taskList.appendChild(taskListItem);
    });
  }
}

function displayTask(event) {
  const task = JSON.parse(event.currentTarget.getAttribute("taskdata"));
  // create container
  const container = document.createElement("div");
  container.id = "task-container";
  // create header block containing title, project, delete, edit
  const headerBlock = document.createElement("div");
  headerBlock.id = "task-header";

  const titleDisplay = document.createElement("h2");
  titleDisplay.textContent = task.title;

  const projectDisplay = document.createElement("span");
  projectDisplay.textContent = task.project;

  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  headerBlock.append(titleDisplay, deleteButton, projectDisplay, editButton);
  // create main body containing due date, priority, complete toggle
  const bodyBlock = document.createElement("div");
  bodyBlock.id = "task-body";

  const dateDisplay = document.createElement("p");
  dateDisplay.textContent = `Due: ${task.dueDate}`;

  const priorityDisplay = document.createElement("p");
  const priorityValueStr =
    task.priority === "1" ? "High" : task.priority === "2" ? "Medium" : "Low";
  priorityDisplay.textContent = `Priority: ${priorityValueStr}`;

  const completeToggle = document.createElement("input");
  completeToggle.type = "checkbox";
  completeToggle.id = "complete-toggle";
  task.complete
    ? (completeToggle.checked = true)
    : (completeToggle.checked = false);
  const completeLabel = document.createElement("label");
  completeLabel.for = "complete-toggle";
  completeLabel.textContent = "Complete: ";

  bodyBlock.append(dateDisplay, priorityDisplay, completeLabel, completeToggle);
  // add event listener to delete
  deleteButton.setAttribute("taskData", JSON.stringify(task));
  deleteButton.addEventListener("click", deleteTask);
  // add event listener to edit
  editButton.setAttribute("taskData", JSON.stringify(task));
  editButton.addEventListener("click", editTask);
  // add event listener to complete toggle
  completeToggle.setAttribute("taskData", JSON.stringify(task));
  completeToggle.addEventListener("click", toggleTaskComplete);
  // append header block, main body to container
  container.append(headerBlock, bodyBlock);
  // append container to main content including clearing view
  toggleTaskList();
  const contentDisplay = document.getElementById("content-display");
  clearContainer(contentDisplay);
  contentDisplay.appendChild(container);
}

function deleteTask(event) {
  // get the task
  const task = JSON.parse(event.currentTarget.getAttribute("taskdata"));
  // delete the task from the data store
  taskManager.removeTask(task);
  // clear the window
  clearContainer(document.getElementById("content-display"));
  // open the task list
  toggleTaskList();
}
function editTask(event) {
  toggleTaskList();
  // get the task
  const task = JSON.parse(event.currentTarget.getAttribute("taskdata"));
  // delete the task from the data store
  taskManager.removeTask(task);
  // clear the window
  clearContainer(document.getElementById("content-display"));
  // create new task form
  addNewTaskForm();
  // fill in values with task info
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("date").value = task.dueDate;
  switch (task.priority) {
    case "1":
      document.getElementById("priorityOne").setAttribute("checked", "");
      break;
    case "2":
      document.getElementById("priorityTwo").setAttribute("checked", "");
      break;
    case "3":
      document.getElementById("priorityThree").setAttribute("checked", "");
      break;
    default:
      break;
  }
  document.getElementById("project").value = task.project;
  // add warning about quitting without submitting
  const warning = document.createElement("p");
  warning.textContent =
    "WARNING: Leaving before submitting task will result in task being deleted.";
  document.getElementById("content-display").prepend(warning);
}
function toggleTaskComplete(event) {
  // get task data
  const task = JSON.parse(event.currentTarget.getAttribute("taskdata"));
  // check if the complete button is checked
  const oldTask = task;
  const newTask = task;
  event.currentTarget.checked
    ? (newTask.complete = true)
    : (newTask.complete = false);
  newTask.checked
    ? document.getElementById("task-container").classList.add("complete")
    : document.getElementById("task-container").classList.remove("complete");
  taskManager.updateTask(oldTask, newTask);
}
