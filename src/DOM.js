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
    const taskListHeader = document.createElement('h3');
    const taskList = document.createElement('ul');

    taskListHeader.id = 'task-list-header';
    taskListHeader.textContent = 'Tasks:';
    taskList.id = "task-list";
    taskListHeader.classList.add('task');
    taskList.classList.add('task');
    treeImage.id = 'tree-image';

    displaySelector.appendChild(treeImage);
    navBar.append(displaySelector, taskListHeader, taskList);
    header.append(navBar);

    titleContainer.append(logoImage, title);
    header.append(titleContainer);
    content.append(header);
}