import { Component } from '@angular/core';
import { TodoService } from '../../services/list.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodolistComponent {
  tasks: any[] = [];
  newTaskName: string = '';

  constructor(private todoService: TodoService) {}

  loadTasks(): void {
    this.todoService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle attività:', error);
      }
  });
  }

  addTask(): void {
    if (this.newTaskName.trim()) {
      this.todoService.addTask(this.newTaskName).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.newTaskName = '';
        },
        error: (error) => {
          console.error('Errore nella creazione dell\'attività:', error);
        }
      });
    }
  }

  toggleTask(task: any): void {
    this.todoService.toggleTask(task.id).subscribe({
     next: () => {
        task.completed = !task.completed;
      },
     error: (error) => {
        console.error('Errore nel modificare lo stato dell\'attività:', error);
      }
   });
  }


  deleteTask(taskId: number): void {
    this.todoService.deleteTask(taskId).subscribe({
      next: () => {this.tasks = this.tasks.filter(task => task.id !== taskId);},
      error: (err) => {console.error('Errore nell\'eliminazione dell\'attività:', err);},
    })
  }
}
