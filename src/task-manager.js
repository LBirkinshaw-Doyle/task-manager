import Task from "./task";

const taskManager = function () {

    let currentTasks = {};

    function getTaskIndex (task) {
        return task.title + task.description[0] + task.dueDate;
    }
    function storageAvailable() {
        let storage;
        try {
            storage = window['localStorage'];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    };
    // Check for tasks in local storage and populate currentTasks
    if (storageAvailable()) {
        // We can use localStorage
        let storage = window['localStorage'];
        if (storage.length > 0) {
            let keys = [];
            for (let i = 0; i < storage.length; i++){
                currentTasks[storage.key(i)] = JSON.parse(storage.getItem(storage.key(i)));
            }
        }
    };
    function allTasks () {
        return currentTasks;
    };
    function allProjects () {
        let projectList = [];
        for (const task in currentTasks.values()) {
            if (!projectList.includes(task.project)) projectList.push(task.project)
        }
        return projectList;
    };
    function tasksOfProject (project) {
        let projectTasks = {};
        for (const task in currentTasks.values()) {
            if (task.project === project) {
                projectTasks[getTaskIndex(task)] = task
            }
        }
        return projectTasks;
    };
    function addNewTask (title, description, dueDate, priority, complete, project) {
        const newTask = new Task(title, description, dueDate, priority, complete, project);
        // add task to currentTasks and storage if applicable
        currentTasks[getTaskIndex(newTask)] = newTask;
        if (storageAvailable()) {
            let storage = window['localStorage'];
            storage.setItem(getTaskIndex(newTask), JSON.stringify(newTask));
        }
    };
    function removeTask (taskToRemove) {
        if (currentTasks[getTaskIndex(taskToRemove)]) {
            if (storageAvailable()) {
                let storage = window['localStorage'];
                storage.removeItem(getTaskIndex(taskToRemove));
            }
            delete currentTasks[getTaskIndex(taskToRemove)];
        }
        else {return 'No such task'}
        
    };
    function updateTask (oldTask, newTask) {
        removeTask(oldTask);
        addNewTask(newTask.title, newTask.description, newTask.dueDate, newTask.priority, newTask.complete, newTask.project);
    }
    

    return {
        allTasks,
        allProjects,
        tasksOfProject,
        addNewTask,
        removeTask,
        updateTask,
    }
}();

export default taskManager;