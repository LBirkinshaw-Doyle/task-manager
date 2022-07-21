import './normalize.css';
import './style.css';
import {createStatic} from './DOM.js';
import Task from './task.js';
//import * as Module2 from './module2.js';

createStatic();
let goShopping = new Task('Go Shopping', '', 'tomorrow');
console.log(goShopping.title);