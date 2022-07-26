import task from './task.js';

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
    const treeImage =document.createElement('span');
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


    taskListContainer.append(addTaskButton, taskListHeader, taskList);

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

}

function addNewTaskForm () {
    
}