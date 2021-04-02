'use strict'

// Tasks definition (no db for this lab)
const TASKS = [
//  id | description  | important | private | deadline
    [1, "Complete Lab 3", false, true, "2021-03-29T14:30:00"],
    [2, "Buy some groceries", false, false, "2021-03-30T14:00:00"],
    [3, "Read a good book!", true, true],
    [4, "Learn French (lol)", true, true, "2021-09-28T20:30:00"]
  ];


  /**
 * Constructor for a Task object.
 * @param {number} id required
 * @param {string} description required
 * @param {boolean} urgent Optional field, default: false
 * @param {boolean} priv Optional field, default: true
 * @param {dayjs} deadline Optional field, default: undefined
 */
function Task(id, description, urgent = false, priv = true, deadline) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    
    this.deadline = (deadline == undefined) ? undefined : dayjs(deadline);
    
    this.toString = () => {
      return `Id: ${this.id}, 
              Description: ${this.description}, 
              Urgent: ${this.urgent}, Private: ${this.priv},
              Deadline: ${this.deadline ? this.deadline.format('DD/MM/YYYY') : '<undef>'}`;
    }

    // notice the usage of '?' to "protect" from undefined
    this.deadlineToday = () => {
       const today = dayjs();
       return this.deadline?.format('YYYY-MM-DD') == today.format('YYYY-MM-DD');
    }
    
    // notice the usage of '?' to "protect" from undefined
    this.deadline7days = () => {
       return this.deadline?.isBefore(dayjs().add(7, 'day')) 
                && 
              this.deadline?.isAfter(dayjs().add(1, 'day'));
    }

    
}


function TaskList(){
    this.tasklist = [];
    
    // pushes a new task to tasklist
    this.addTask = (task) => {
      this.tasklist.push(task);
    }

    // retrieves a copy of all tasks
    this.filterAll = () => {
    return [...this.tasklist]; 
    }

    // retrieves tasks marked as important 
    this.filterImportant = () => {
    return this.tasklist.filter(t => t.important);
    }

    // retrives tasks scheduled for today
    this.filterToday = () => {    
    return this.tasklist.filter(t => t.deadlineToday());
    }

    // retrieves tasks schedules in the following 7 days
    this.filterNext7Days = () => {
    return this.tasklist.filter(t => t.deadline7days());
    }

    // retrieves tasks marked as private
    this.filterPrivate = () => {
    return this.tasklist.filter(t => t.priv);
    }
}

/**
 * loads tasks from the task list
 * @param {*} task object
 */
function createTasks(task){
    
}

/**
 * displays tasks in the web page
 * @param {*} tlist: list of tasks 
 */
function displayTasks(tlist) {

}

/**
 * filter tasks with given callback
 * @param {*} callback 
 */
function filterTasks(callback){
}



function main () {
    const tl = new TaskList();

    // loading tasks from data structure
    
    
    // event listeners


}

main();