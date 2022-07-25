import './normalize.css';
import './style.css';
import {createStatic} from './DOM.js';
import Task from './task.js';
import TaskManager from './task-manager.js'
//import * as Module2 from './module2.js';

createStatic();
let storage = TaskManager;
console.log(storage.allTasks());
storage.addNewTask('Burger time', 'Eat Burgers', '12/1/1224', 2);
