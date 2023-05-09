import { Component } from '@angular/core';
import { startWith } from 'rxjs';
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
  start:string;
  end:string;
  status="Completed";
  options=["Completed","In Progress","Not Completed"]
  // For Date
  today= new Date();
  date=this.today.getDate()+"/"+(this.today.getMonth()+1)+"/"+this.today.getFullYear()
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
  dateReverse(value:string){
    value = value.split('-').reverse().join('/')
    return value
    
    
  }
  addTask(){
    
    if (this.isEditing) {
      this.tasks[this.editIndex] = this.newTask;
      this.isEditing = false;
    } else {
      console.log(this.dateReverse(this.newTask.start));
      this.tasks.push(this.newTask);
    }
    this.start = this.newTask.start;
    this.end = this.newTask.end;
    this.status = this.newTask.status;
    this.newTask={
      task:"",
      effort:"",
      start:this.start,
      end:this.end,
      status:this.status,
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
        this.dateReverse(task.start).replace(',',''),
        this.dateReverse(task.end).replace(',',''),
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
    window.scroll(0,0)
    let taskToEdit = this.tasks[index];
    this.newTask = { ...taskToEdit };
    this.editIndex = index;
    this.isEditing = true;
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    // document.getElementById('table')?.style.display=='block'

  }
  // copyTable() {
  //   // Get the table element
  //   const table = document.querySelector('table');
  
  //   // Get the table headers
  //   const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText);
  
  //   // Get the table rows
  //   const rows = Array.from(table.querySelectorAll('tr')).slice(1);
  
  //   // Format the table data as CSV
  //   const csv = [headers.join(',')];
  //   rows.forEach(row => {
  //     const cells = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
  //     csv.push(cells.join(','));
  //   });
  
  //   // Create a new clipboard object
  //   const clipboard = navigator.clipboard;
  
  //   // Copy the CSV data to the clipboard
  //   clipboard.writeText(csv.join('\n'))
  //     .then(() => {
  //       console.log('Table copied to clipboard');
  //     })
  //     .catch((error) => {
  //       console.error('Error copying table to clipboard:', error);
  //     });
  // }
  // copyTable() {
  //   // Get the table element
  //   const table = document.querySelector('table');
  
  //   // Generate the HTML for the table
  //   const tableHtml = table.outerHTML;
  
  //   // Create a new clipboard object
  //   const clipboard = navigator.clipboard;
  
  //   // Copy the HTML data to the clipboard
  //   clipboard.writeText(tableHtml)
  //     .then(() => {
  //       console.log('Table copied to clipboard');
  //     })
  //     .catch((error) => {
  //       console.error('Error copying table to clipboard:', error);
  //     });
  // }
  // copyTable() {
  //   // Get the table element
  //   const table = document.querySelector('table');
  
  //   // Create a new table element
  //   const tableCopy = document.createElement('table');
  
  //   // Copy the table headers
  //   const tableHeaders = table.querySelectorAll('th');
  //   const tableHeadersCopy = document.createElement('thead');
  //   const tableHeadersRowCopy = document.createElement('tr');
  //   for (let i = 0; i < tableHeaders.length; i++) {
  //     const headerCellCopy = document.createElement('th');
  //     headerCellCopy.innerText = tableHeaders[i].innerText;
  //     tableHeadersRowCopy.appendChild(headerCellCopy);
  //   }
  //   tableHeadersCopy.appendChild(tableHeadersRowCopy);
  //   tableCopy.appendChild(tableHeadersCopy);
  
  //   // Copy the table rows
  //   const tableRows = table.querySelectorAll('tbody tr');
  //   const tableRowsCopy = document.createElement('tbody');
  //   for (let i = 0; i < tableRows.length; i++) {
  //     const tableRowCopy = document.createElement('tr');
  //     const tableCells = tableRows[i].querySelectorAll('td');
  //     for (let j = 0; j < tableCells.length; j++) {
  //       const tableCellCopy = document.createElement('td');
  //       tableCellCopy.innerText = tableCells[j].innerText;
  //       tableRowCopy.appendChild(tableCellCopy);
  //     }
  //     tableRowsCopy.appendChild(tableRowCopy);
  //   }
  //   tableCopy.appendChild(tableRowsCopy);
  
  //   // Create a new clipboard object
  //   const clipboard = navigator.clipboard;
  
  //   // Copy the HTML data to the clipboard
  //   clipboard.writeText(tableCopy.outerHTML)
  //     .then(() => {
  //       console.log('Table copied to clipboard');
  //     })
  //     .catch((error) => {
  //       console.error('Error copying table to clipboard:', error);
  //     });
  // }
  // copyTable() {
  //   const table = document.getElementById('table');
  //   const range = document.createRange();
  //   range.selectNodeContents(table);
  //   const selection = window.getSelection();
  //   selection.removeAllRanges();
  //   selection.addRange(range);
  //   document.execCommand('copy');
  //   alert('Table data copied to clipboard!');
  // }
  // copyTable() {
  //   const table = document.getElementById('table');
  //   const range = document.createRange();
  //   range.selectNode(table);
  //   const selection = window.getSelection();
  //   selection.removeAllRanges();
  //   selection.addRange(range);
    
  //   navigator.clipboard.writeText(table.outerHTML)
  //     .then(() => {
  //       alert('Table data copied to clipboard!');
  //       selection.removeAllRanges();
  //     })
  //     .catch(err => {
  //       console.error('Failed to copy table data: ', err);
  //     });
  // }
  // copyTable() {
  //   const table = document.getElementById('table');
  //   const rows = Array.from(table.querySelectorAll('tr'));
  //   const csv = rows.map(row => Array.from(row.children).map(cell => cell.textContent).join(',')).join('\n');
  //   const data = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', data);
  //   link.setAttribute('download', 'table.csv');
  //   link.click();
  // }
  
  
  
  
  

}

