'use strict'

// Tasks definition (no db for this lab)
const TASKS = [
//  id | description  | important | private | deadline
    [1, "Complete Lab 3", false, true, "2021-03-29T14:30:00"],
    [2, "Buy some groceries", false, false, "2021-04-11T14:00:00"],
    [3, "Survive this semester!", true, true],
    [4, "Learn French (lol)", true, true, "2021-09-28T20:30:00"],
    [5, "Start big lab", true, true, "2021-04-12T20:30:00"]
  ];

  //Include required dayjs plugins
dayjs.extend(window.dayjs_plugin_calendar);


/**
 * Constructor for a Task object.
 * @param {number} id required
 * @param {string} description required
 * @param {boolean} urgent Optional field, default: false
 * @param {boolean} priv Optional field, default: true
 * @param {dayjs} deadline Optional field, default: undefined
 */
function Task(id, description, important = false, priv = true, deadline) {
    this.id = id;
    this.description = description;
    this.important = important;
    this.priv = priv;
    
    this.deadline = (deadline == undefined) ? undefined : dayjs(deadline);


    // notice the usage of '?' to "protect" from undefined
    this.deadlineToday = () => {
      // dayjs() retrieves today's date
       return this.deadline?.isSame(dayjs(), 'day');
    }
    
    // notice the usage of '?' to "protect" from undefined
    this.deadline7days = () => {
       return this.deadline?.isBefore(dayjs().add(7, 'day')) 
                && 
              this.deadline?.isAfter(dayjs().add(1, 'day'));
    }

    this.getHTML = () => {
        const important = this.important ? "important" : "";

        const priv = !this.priv ? `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>`: "";

        const deadline = this.deadline !== undefined ?
            `<small>${this.deadline.calendar(null, {
                sameDay: '[Today at] H:mm', 
                nextDay: '[Tomorrow at] H:mm', 
                lastDay: '[Yesterday at] H:mm', 
                sameElse: 'dddd D MMMM YYYY [ at ] H:mm' 
            })}</small>` : "";
        
        return `<li class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="check-t${this.id}">
            <label class="custom-control-label ${important}" for="check-t${this.id}">${this.description}</label>
          </div> ${priv} ${deadline}</div>
        </li>`;
    }
    
}


function TaskList() {
    this.tl = [];

    this.add = (task) => {
        this.tl.push(task);
    }
    
    // gets all tasks' HTML code and adds it to ul  
    this.loadAll = (ul) => {
        let HTML = "";
        this.tl.forEach(task => HTML += task.getHTML());
        ul.innerHTML = HTML;
    }

    // gets important tasks' HTML code and adds it to ul  
    this.loadImportant = (ul) => {
        let HTML = "";
        this.tl.filter(task => task.important).forEach(task => HTML += task.getTaskHTML());
        ul.innerHTML = HTML;
    }

    // gets today tasks' HTML code and adds it to ul  
    this.loadToday = (ul) => {
        let HTML = "";
        this.tl.filter(task => task.deadlineToday())
               .forEach(task => HTML += task.getHTML());
        ul.innerHTML = HTML;
    }

    // gets weekly tasks' HTML code and adds it to ul  
    this.loadWeek = (ul) => {
        let HTML = "";
    
        this.tl.filter(task => task.deadline7days())
               .forEach((task) => HTML = HTML + task.getHTML());
        ul.innerHTML = HTML;
    }
    
    // gets private tasks' HTML code and adds it to ul  
    this.loadPrivate = (ul) => {
        let HTML = "";
        this.tl.filter(task => task.priv).forEach(task => HTML += task.getHTML());
        ul.innerHTML = HTML;
    }
}

/**
* destroys the unordered list of tasks
*/
function clearListTasks() {
  const currTasks = document.getElementById("list-tasks");
  currTasks.innerHTML = '';
}

/**
* Function to manage task filtering in the web page.
* @param {string}   filterId:  filter node id.
* @param {string}   titleText: text to put in the task list h1 header.
* @param {function} callback: filtering callback
*/
function displayFiltered( filterId, titleText, callback, ul) {
  document.querySelectorAll('#left-sidebar div a ').forEach( node => node.classList.remove('active'));
  document.getElementById("filter-title").innerText = titleText;
  document.getElementById(filterId).classList.add('active');
  clearListTasks();
  callback(ul);
}



function main() {
  let taskl = new TaskList();

  // loading tasks from data structure
  TASKS.forEach(t => taskl.add(new Task(...t)));

  const ul = document.querySelector('#list-tasks');
  //Load all tasks 
  taskl.loadAll(ul);

  // filters event listeners 
  document.getElementById("filter-all").addEventListener( 'click', event => 
  displayFiltered( 'filter-all', 'All', taskl.loadAll, ul)
  );

  document.getElementById("filter-important").addEventListener( 'click', event => 
  displayFiltered( 'filter-important', 'Important', taskl.loadImportant,ul )
  );

  document.getElementById("filter-today").addEventListener( 'click', event => 
  displayFiltered( 'filter-today', 'Today', taskl.loadToday,ul )
  );

  document.getElementById("filter-week").addEventListener( 'click', event => 
  displayFiltered( 'filter-week', 'Next 7 Days', taskl.loadWeek, ul)
  );

  document.getElementById("filter-private").addEventListener( 'click', event => 
  displayFiltered( 'filter-private', 'Private', taskl.loadPrivate, ul)
  );
 
}

main();