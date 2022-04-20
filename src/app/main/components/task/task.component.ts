import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  dificulty: any;

  @Input() task: Task | undefined;

  constructor() { }

  ngOnInit(): void {
    this.dificulty = Array(this.task!.dificulty).fill('1');
  }

}
