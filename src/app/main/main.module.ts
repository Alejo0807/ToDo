import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MaterialModule } from '../material/material.module';
import { TaskComponent } from './components/task/task.component';
import { NewLabelDialogComponent } from './components/new-label-dialog/new-label-dialog.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TaskComponent,
    NewLabelDialogComponent,
    NewTaskDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
