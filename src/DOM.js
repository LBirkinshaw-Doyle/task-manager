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
    const addProjectButton = document.createElement('button');
    addProjectButton.id = 'add-project-button';
    addProjectButton.textContent = 'New Project';
    addProjectButton.classList.add = 'add-button';


    taskListContainer.append(addTaskButton, addProjectButton, taskListHeader, taskList);

    treeImage.id = 'tree-image';

    displaySelector.appendChild(treeImage);
    navBar.append(displaySelector);
    header.append(navBar);

    titleContainer.append(logoImage, title);
    header.append(titleContainer);

    content.append(header, taskListContainer);

    displaySelector.addEventListener('click', () => {
        if (taskListContainer.style.display === "block") {
            taskListContainer.style.display = "none";
        }
        else {
            taskListContainer.style.display = "block";
        }
    });
    addTaskButton.addEventListener('click', addNewTaskForm);
    addProjectButton.addEventListener('click', addNewProjectForm);

    updateTaskList();

}

function addNewTaskForm () {

}

function addNewProjectForm () {
    
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