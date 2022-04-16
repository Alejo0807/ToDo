import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  items = [1,2,3,4,5,6,7,8]

  ngOnInit(): void {
  }

  openLabels() {
    
  }

  logout() {

  }

}
