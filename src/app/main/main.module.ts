import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MaterialModule } from '../material/material.module';
import { TaskComponent } from './components/task/task.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
