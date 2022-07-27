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
            for (let i = 0; i < storage.length; i++){
                currentTasks[i] = JSON.parse(storage.getItem(i));
            }
        }
    };
    function allTasks () {
        return currentTasks;
    };
    function allProjects () {
        let projectList = [];
        for (task in currentTasks) {
            if (!projectList.includes(task.project)) projectList.push(task.project)
        }
        return projectList;
    };
    function tasksOfProject (project) {
        let projectTasks = {};
        for (const task in currentTasks) {
            if (task.project === project) {
                projectTasks[projectTasks.length] = task
            }
        }
        return projectTasks;
    };
    function addNewTask (title, description, dueDate, priority, complete, project) {
        const newTask = new Task(title, description, dueDate, priority, complete, project);
        let newTaskIndex = Object.keys(currentTasks).length;
        // add task to currentTasks and storage if applicable
        currentTasks[newTaskIndex] = newTask;
        if (storageAvailable()) {
            let storage = window['localStorage'];
            storage.setItem(newTaskIndex, JSON.stringify(newTask));
        }
    };
    function removeTask (taskToRemove) {
        Object.values(currentTasks).forEach((value, key) => {
            if (value === taskToRemove) {
                if (storageAvailable()) {
                    let storage = window['localStorage'];
                    storage.removeItem(key);
                }
                delete currentTasks[key];
            }
        })
    };
    function updateTask (oldTask, newTask) {

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