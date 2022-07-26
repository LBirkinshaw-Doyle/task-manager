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
    taskListContainer.classList.add('task');
    taskListHeader.id = 'task-list-header';
    taskListHeader.textContent = 'Tasks:';
    taskListHeader.classList.add('task');
    taskList.id = "task-list";
    taskList.classList.add('task');

    taskListContainer.append(taskListHeader, taskList)

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

}