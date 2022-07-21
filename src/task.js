export default class Task {
    constructor (title, description, dueDate, priority = 1, complete = false, project = "") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
        this.project = project;
    };
    toggleComplete () {
        this.complete ? this.complete = false : this.complete = true;
    };
}