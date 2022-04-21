import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../interfaces/interfaces';
import { TaskSerivce } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  dificulty: any;

  @Input() task: Task | undefined;
  @Output() editTaskEvent = new EventEmitter<Task>();
  @Output() deleteTaskEvent = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
    this.dificulty = Array(this.task!.dificulty).fill('1');
  }


  
  editTaskDialog() {
    this.editTaskEvent.emit(this.task!);
  }

  deleteTaskDialog() {
    this.deleteTaskEvent.emit(this.task!);
  }


}
