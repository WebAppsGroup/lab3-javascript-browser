'use strict';
// DONOT PUT REQUIRE HERE OR IT WONOT WORK
function Task(id, description, isUrgent = false, isPrivate = true, deadline = '') {
  this.id = id;
  this.description = description;
  this.urgent = isUrgent;
  this.private = isPrivate;
  // saved as dayjs object
  this.deadline = deadline && dayjs(deadline);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.private}, ` +
    `Deadline: ${this._formatDeadline('LLL')}`;
  }

  this._formatDeadline = (format) => {
    return this.deadline ? this.deadline.format(format) : '<not defined>';
  }
}

function TaskList() {
  this.list = [];

  this.add = (task) => {
    if(!this.list.some(t => t.id == task.id))
      this.list = [...this.list, task];
    else throw new Error('Duplicate id');
  };

  this.sortByDeadline = () => {
    return [...this.list]
      .sort((a, b) => {
        const t1 = a.deadline, t2 = b.deadline;
        if(t1 === t2) return 0; // works also for null === null
        else if(t1 === null || t1 === '') return 1;    // null/empty deadline is the lower value
        else if(t2 === null || t2 === '') return -1;
        else return t1.diff(t2)
      });
  };

  this.filterByUrgent = () => {
    return this.list
      .filter( (task) => task.urgent );
  }

}

// check current time is ok
// console.log('Current date and time: ' + dayjs().format('LLL'));

function sortAndPrint(taskList){
  console.log("****** Tasks sorted by deadline (most recent first): ******");
  // use sort function
  taskList.sortByDeadline()
    .forEach( (task) => console.log(task.toString()) );
}

function filterAndPrint(taskList){
  console.log("****** Tasks filtered, only (urgent == true): ******");
  // use filter function
  taskList.filterByUrgent()
  .forEach( (task) => console.log(task.toString()) );
}

function changeBlue(event) {
  imp.classList.toggle('bg-primary');
}
///////////////////////////////////////////////////////////////////////////////////////
function showelement1(event) {
  imptask.classList.toggle('collapse');

}
function showelement2(event) {

  document.getElementById('check-t2').classList.toggle('collapse');
}
function showelement3(event) {

  document.getElementById('check-t3').classList.toggle('collapse');
}

function showelement4(event) {

  document.getElementById('check-t4').classList.toggle('collapse');
}

function main(data) {
  // create some dummy tasks
  const t1 = new Task(1, "laundry", 0, 1)
  const t2 = new Task(2, "monday lab", 0, 0, "2021-03-16T09:00:00.000Z")
  const t3 = new Task(3, "phone call", 1, 0, "2021-03-08T15:20:00.000Z")

  // create the task list and add the dummy tasks
  const taskList = new TaskList();
  taskList.add(t1);
  taskList.add(t2);
  taskList.add(t3);
  

//document.querySelector('main').getElementsByTagName('ul')[0].innerHTML +='<p id = 5>'+taskList.list[0]+'</p>' ;
for(let i=0;i<taskList.list.length;i++){  
document.querySelector('main').getElementsByTagName('ul')[0].innerHTML +='<li class="list-group-item">'+
'<div class="d-flex w-100 justify-content-between"> '+'<div class="custom-control custom-checkbox">'+'<input type="checkbox" class="custom-control-input" id="check-t'+(i+4)+'">'
+'<label class="custom-control-label" for="check-t'+(i+4)+'">'+taskList.list[i].description+'</label>'+'</div>'+'<small>'+taskList.list[i].deadline+'</small>'+'</div>'+'</li>' ;
}

  //sort by deadline and print the taskList
  //sortAndPrint(taskList);

  //filter urgent tasks and print the taskList
  //filterAndPrint(taskList);

  debugger;
}

main()

const imptask = document.getElementsByClassName('important')[0];
//const imptask = document.getElementById('main ul') ;
//document.getElementById('imp').addEventListener('click', changeBlue) ;
document.getElementById('imp').addEventListener('click', showelement1) ;
document.getElementById('tod').addEventListener('click', showelement2) ;
document.getElementById('next').addEventListener('click', showelement3) ;
document.getElementById('pri').addEventListener('click', showelement4) ;


