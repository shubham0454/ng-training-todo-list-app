import { CommonModule } from '@angular/common';
import { Component , ElementRef,OnInit,ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  @ViewChild('deleteModal') deleteModal: ElementRef | undefined;
  taskObj: TaskModel = new TaskModel();
  taskList: TaskModel[] = [];
  taskToDelete: TaskModel | null = null;

  
  ngOnInit(): void {
    this.getTaskList();
  }

  openModel() {
    if (this.modal) this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    if (this.modal) this.modal.nativeElement.style.display = 'none';
    this.taskObj = new TaskModel();  // Reset form
  }
  openDeleteModal(task: TaskModel) {
    this.taskToDelete = task;
    if (this.deleteModal) this.deleteModal.nativeElement.style.display = 'block';
  }

  onSaveTask() {
    this.taskObj.id = this.taskList.length + 1;
    this.taskList.push({ ...this.taskObj });
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
    this.closeModal();
    this.getTaskList();
  }

  onUpdateTask() {
    const taskIndex = this.taskList.findIndex(task => task.id === this.taskObj.id);
    if (taskIndex !== -1) {
      this.taskList[taskIndex] = { ...this.taskObj };
      localStorage.setItem('tasks', JSON.stringify(this.taskList));
      this.closeModal();
      this.getTaskList();
    }
  }
  

  onEditTask(task: TaskModel) {
    this.taskObj = { ...task };
    this.openModel();
  }
  closeDeleteModal() {
    if (this.deleteModal) this.deleteModal.nativeElement.style.display = 'none';
  }
  

  onDeleteTask(task: TaskModel | null) {
    if (!task) {
      console.error('No task selected for deletion.');
      return;
    }
  
    this.taskList = this.taskList.filter(t => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
    this.getTaskList();
    this.closeDeleteModal();
  }
  

  getTaskList() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.taskList = JSON.parse(storedTasks);
    }
  }
}

// taskList = [ 
//   // Sample task data
//   { assignedTo: 'User 1', status: 'Completed', dueDate: new Date('2024-12-10'), priority: 'Low', comments: 'This task is good' },
//   { assignedTo: 'User 2', status: 'In Progress', dueDate: new Date('2024-09-14'), priority: 'High', comments: 'This task is good' },
//   { assignedTo: 'User 3', status: 'Not Started', dueDate: new Date('2024-08-18'), priority: 'Low', comments: 'This task is good' },
//   { assignedTo: 'User 4', status: 'In Progress', dueDate: new Date('2024-06-12'), priority: 'Normal', comments: 'This task is good' }
// ];

// // Pagination properties
// currentPage: number = 1;
// pageSize: number = 2; // Number of tasks per page
// totalPages: number = Math.ceil(this.taskList.length / this.pageSize);

// // Search property
// searchQuery: string = '';

// // Get filtered tasks based on search query
// get filteredTasks() {
//   return this.taskList.filter(task =>
//     task.assignedTo.toLowerCase().includes(this.searchQuery.toLowerCase())
//   );
// }

// // Get the tasks for the current page
// get paginatedTasks() {
//   const startIndex = (this.currentPage - 1) * this.pageSize;
//   return this.filteredTasks.slice(startIndex, startIndex + this.pageSize);
// }

// // Pagination methods
// nextPage() {
//   if (this.currentPage < this.totalPages) {
//     this.currentPage++;
//   }
// }

// prevPage() {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//   }
// }

// goToFirstPage() {
//   this.currentPage = 1;
// }

// goToLastPage() {
//   this.currentPage = this.totalPages;
// }

// isPageActive(pageNumber: number): boolean {
//   return this.currentPage === pageNumber;
// }

// // Reset current page on search
// onSearchTask(event: Event) {
//   this.searchQuery = (event.target as HTMLInputElement).value;
//   this.currentPage = 1; // Reset to first page on search
// }


class TaskModel {
  id: number = 0;
  assignedTo: string = '';
  status: string = '';
  dueDate: string = '';
  priority: string = '';
  comments: string = '';
}