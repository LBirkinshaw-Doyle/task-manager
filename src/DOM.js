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
    clearContainer(document.getElementById('content-display'));
    updateTaskList();
    const taskListContainer = document.getElementById('task-list-container');
    if (taskListContainer.style.display === "block") {
        taskListContainer.style.display = "none";
    }
    else {
        taskListContainer.style.display = "block";
    }
}

function clearContainer (container) {
    while (container.firstChild != null) {
        container.removeChild(container.firstChild);
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
    const formTitle = document.createElement('h2');
    formTitle.id = "form-title";
    formTitle.textContent = "Create New Task";

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
    titleInput.setAttribute('required', '');
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
    descriptionInput.setAttribute('required', '');
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
    dateInput.setAttribute('required', '');
    dateFormContainer.append(dateLabel, dateInput);

    // Add form priority
    const priorityFormContainer = document.createElement('fieldset');
    const priorityFormLegend = document.createElement('legend');
    priorityFormLegend.textContent = "Priority:";

    const priortyGroupOne = document.createElement('div')
    const priorityOneLabel = document.createElement('label');
    priorityOneLabel.textContent = " High";
    const priorityOneInput = document.createElement('input');
    priorityOneInput.id = "priorityOne";
    priorityOneInput.type = "radio";
    priorityOneInput.name = "priority";
    priorityOneInput.value = "1";
    priorityOneLabel.prepend(priorityOneInput);
    priortyGroupOne.append(priorityOneLabel);

    const priortyGroupTwo = document.createElement('div')
    const priorityTwoLabel = document.createElement('label');
    priorityTwoLabel.textContent = " Medium";
    const priorityTwoInput = document.createElement('input');
    priorityTwoInput.id = "priorityTwo";
    priorityTwoInput.type = "radio";
    priorityTwoInput.name = "priority";
    priorityTwoInput.value = "2";
    priorityTwoLabel.prepend(priorityTwoInput);
    priortyGroupTwo.append(priorityTwoLabel);

    const priortyGroupThree = document.createElement('div')
    const priorityThreeLabel = document.createElement('label');
    priorityThreeLabel.textContent = " Low";
    const priorityThreeInput = document.createElement('input');
    priorityThreeInput.id = "priorityThree";
    priorityThreeInput.type = "radio";
    priorityThreeInput.name = "priority";
    priorityThreeInput.value = "2";
    priorityThreeLabel.prepend(priorityThreeInput);
    priortyGroupThree.append(priorityThreeLabel);

    priorityFormContainer.append(priorityFormLegend, priortyGroupOne, priortyGroupTwo, priortyGroupThree);

    // Add task project
    const projectList = taskManager.allProjects()
    const projectDataList = document.createElement('datalist');
    projectDataList.id = "projectList";
    if (projectList.length > 0) {
        projectList.forEach(project => {
            const dataListOption = document.createElement('option');
            dataListOption.value = project;
            projectDataList.append(dataListOption);
        })
    }

    const projectFormContainer = document.createElement('p');
    const projectLabel = document.createElement('label');
    projectLabel.for = "project";
    projectLabel.textContent = "Project ";
    const projectInput = document.createElement('input');
    projectInput.id = "project";
    projectInput.type = 'text';
    projectInput.setAttribute("list", "projectList");
    projectInput.name = "project";
    projectFormContainer.append(projectLabel, projectInput, projectDataList);

    // Add submit button
    const formSubmitButton = document.createElement('button');
    formSubmitButton.id = "submit-form";
    formSubmitButton.type = "button";
    formSubmitButton.textContent = "Create";
    formSubmitButton.addEventListener('click', submitForm);

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

function submitForm () {
    //check to see if title, description and date are filled, then submit form, otherwise do nothing
    if (document.getElementById('title').value &&
        document.getElementById('description').value &&
        document.getElementById('date').value) 
        {
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let date = document.getElementById('date').value;
        

        let priority;
        document.getElementById('priorityOne').checked ?
            priority = "1" :
            document.getElementById('priorityTwo').checked ?
            priority = "2" :
            document.getElementById('priorityThree').checked ?
            priority = "3" :
            priority = "1";
        let project;
        if (document.getElementById('project').value) {project = document.getElementById('project').value;}
        else {project = "-"}
        

        taskManager.addNewTask(title, description, date, priority, false, project);
        clearContainer(document.getElementById('content-display'));
    }
}

function updateTaskList () {
    const taskList = document.getElementById('task-list');
    clearContainer(taskList);
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
        Object.values(tasks).forEach(task => {
            const taskInList = document.createElement('p');
            taskInList.classList.add = 'task';
            taskInList.textContent = task.title;
            taskListItem.appendChild(taskInList);
        })
        taskList.appendChild(taskListItem);
        
    })}
}

function displayTask () {

}

function displayProject () {

}