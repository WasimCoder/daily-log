import { Component } from '@angular/core';
interface task{
  task:string,
  effort: string,
  start:any,
  end:any,
  status:string,
  remark:string
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // For Date
  today= new Date();
  date=this.today.getDate()+"-"+(this.today.getMonth()+1)+"-"+this.today.getFullYear()
  // For edit
  public editIndex:number=0;
  public isEditing:boolean=true;
  // Initializing Task Object
  tasks: task[]= [];
  newTask: task = {
    task:"",
  effort:"",
  start:"",
  end:"",
  status:"",
  remark:"",
  }

  addTask(){
    if (this.isEditing) {
      this.tasks[this.editIndex] = this.newTask;
      this.isEditing = false;
    } else {
      this.tasks.push(this.newTask);
    }
    this.newTask={
      task:"",
      effort:"",
      start:"",
      end:"",
      status:"",
      remark:"",
    };
  }
  saveTasks() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let headerRow = ['Task Description', 'Effort Spent', 'Start Date', 'End Date','Status','Remarks'];
    csvContent += headerRow.join(',') + '\r\n';

    this.tasks.forEach(task => {
      let taskRow = [
        task.task.replace(',',''),
        task.effort.replace(',',''),
        task.start.replace(',',''),
        task.end.replace(',',''),
        task.status.replace(',',''),
        task.remark.replace(',','')
      ];
      csvContent += taskRow.join(',') + '\r\n';
    });
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', (this.date+'.csv'));
    document.body.appendChild(link);
    link.click();
  }
  editTask(index: number) {
    let taskToEdit = this.tasks[index];
    this.newTask = { ...taskToEdit };
    this.editIndex = index;
    this.isEditing = true;
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    // document.getElementById('table')?.style.display=='block'

  }

}

