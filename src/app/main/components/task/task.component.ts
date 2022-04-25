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

  stateMap = new Map();
  currentState: number = 0
  colorState: string = ''

  @Input() task: Task | undefined;
  @Output() editTaskEvent = new EventEmitter<Task>();
  @Output() deleteTaskEvent = new EventEmitter<Task>();
  @Output() updateStateTaskEvent = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
    this.dificulty = Array(this.task!.dificulty).fill('1');
    this.stateMap.set(1, {state: 'To-Do', color: '#D9840D'});
    this.stateMap.set(2, {state: 'In-Progress', color: '#F0E31A'});
    this.stateMap.set(3, {state: 'Done', color: '#12EC28'});
    if (this.task?.state == 'To-Do') {
      this.currentState = 1;
      this.colorState = '#D9840D';
    } else if (this.task?.state == 'In-Progress') {
      this.currentState = 2;
      this.colorState = '#F0E31A';
    } else {
      this.currentState = 3;
      this.colorState = '#12EC28';
    }
  }

  onClickState() {
    if (this.currentState != 3) {
      this.currentState++
    } else {
      this.currentState = 1;
    }
    this.task!.state = this.stateMap.get(this.currentState).state;
    this.colorState = this.stateMap.get(this.currentState).color;
    this.updateStateTaskEvent.emit(this.task!);
  }
  
  editTaskDialog() {
    this.editTaskEvent.emit(this.task!);
  }

  deleteTaskDialog() {
    this.deleteTaskEvent.emit(this.task!);
  }


}
