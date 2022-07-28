import taskManager from './task-manager.js';

export function createStatic () {
    const content = document.getElementById("content");

    const header = document.createElement('header');
    const titleContainer = document.createElement('div');
    const logoImage = document.createElement('img');
    const title = document.createElement('h1');

    title.textContent = 'Tsk Mng';
    titleContainer.id = 'title-container';

    const navBar = document.createElement('nav');
    const displaySelector = document.createElement('button');
    const treeImage = document.createElement('span');
    const taskListContainer = document.createElement('div');
    const taskListHeader = document.createElement('h3');
    const taskList = document.createElement('ul');

    taskListContainer.id = 'task-list-container';
    taskListHeader.id = 'task-list-header';
    taskListHeader.textContent = 'Tasks:';
    taskList.id = "task-list";

    const addTaskButton = document.createElement('button');
    addTaskButton.id = 'add-task-button';
    addTaskButton.textContent = 'New Task';
    addTaskButton.classList.add = 'add-button';


    taskListContainer.append(addTaskButton, taskListHeader, taskList);

    treeImage.id = 'tree-image';

    displaySelector.appendChild(treeImage);
    navBar.append(displaySelector);
    header.append(navBar);

    titleContainer.append(logoImage, title);
    header.append(titleContainer);

    const contentDisplay = document.createElement('div');
    contentDisplay.id = "content-display";

    content.append(header, taskListContainer, contentDisplay);

    displaySelector.addEventListener('click', toggleTaskList);
    addTaskButton.addEventListener('click', addNewTaskForm);

    updateTaskList();
}

function toggleTaskList () {
    const taskListContainer = document.getElementById('task-list-container');
    if (taskListContainer.style.display === "block") {
        taskListContainer.style.display = "none";
    }
    else {
        taskListContainer.style.display = "block";
    }
}

function addNewTaskForm () {
    toggleTaskList();
    const contentDisplay = document.getElementById('content-display');
    // Create Form
    const newTaskForm = document.createElement('form');
    newTaskForm.name = "addNewTask";
    newTaskForm.action = "";
    newTaskForm.classList.add("form-container");

    // Add form info
    const formInfoContainer = document.createElement('p');
    formInfoContainer.textContent = "Required fields are followed by ";
    const requiredAbbreviation = document.createElement('abbr');
    requiredAbbreviation.title = "Required";
    requiredAbbreviation.textContent = "*";
    formInfoContainer.append(requiredAbbreviation);

    // Add form title
    const titleFormContainer = document.createElement('p');
    const titleLabel = document.createElement('label');
    titleLabel.for = "title";
    titleLabel.textContent = "Title ";
    titleLabel.appendChild(requiredAbbreviation.cloneNode(true));
    const titleInput = document.createElement('input');
    titleInput.id = "title";
    titleInput.type = "text";
    titleInput.name = "title";
    titleFormContainer.append(titleLabel, titleInput);

    // Add form description
    const descriptionFormContainer = document.createElement('p');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = "description";
    descriptionLabel.textContent = "Description ";
    descriptionLabel.appendChild(requiredAbbreviation.cloneNode(true));
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionFormContainer.append(descriptionLabel, descriptionInput);

    // Add form due date
    const dateFormContainer = document.createElement('p');
    const dateLabel = document.createElement('label');
    dateLabel.for = "date";
    dateLabel.textContent = "Date ";
    dateLabel.appendChild(requiredAbbreviation.cloneNode(true));
    const dateInput = document.createElement('input');
    dateInput.id = "date";
    dateInput.type = "date";
    dateInput.name = "date";
    dateFormContainer.append(dateLabel, dateInput);

    // Append all form elements
    newTaskForm.append(formInfoContainer, titleFormContainer, descriptionFormContainer, dateFormContainer);
    contentDisplay.append(newTaskForm);
}

function updateTaskList () {
    const taskList = document.getElementById('task-list');
    let tasks;
    let projects = taskManager.allProjects()
    if (projects.length > 0){
    projects.forEach(project => {
        const taskListItem = document.createElement('li');
        const taskListProject = document.createElement('h3');
        taskListItem.classList.add = 'task-list-item'
        taskListProject.textContent = project;
        taskListProject.classList.add = "project-header"
        taskListItem.appendChild(taskListProject);

        tasks = taskManager.tasksOfProject(project);
        for (const task in Object.values(tasks.values)) {
            const taskInList = document.createElement('span');
            taskInList.classList.add = 'task';
            taskInList.textContent = task.title;
            taskListItem.appendChild(taskInList);
        }
        taskList.appendChild(taskListItem);
        
    })}
}

function displayTask () {

}

function displayProject () {

}