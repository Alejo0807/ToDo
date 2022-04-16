import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  items = [1,2,3,4,5,6,7,8]

  constructor() { }

  ngOnInit(): void {
  }

}
