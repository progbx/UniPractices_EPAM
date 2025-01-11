import { Task } from './Task.js';

export class User {
    firstName;
    lastName;
    age = 1;
    tasks = [];
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    setAge(newAge) {
        if (typeof newAge === 'number' && isFinite(newAge) && newAge > 0) {
            this.age = newAge;
        }
    }
    addTasks(newTasks) {
        newTasks.forEach(task => {
            if (task instanceof Task) {
                this.tasks.push(task);
            }
        });
    }
    getTasksCount() {
        return this.tasks.length;
    }
}