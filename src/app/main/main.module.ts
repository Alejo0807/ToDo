import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MaterialModule } from '../material/material.module';
import { TaskComponent } from './components/task/task.component';
import { NewLabelDialogComponent } from './components/new-label-dialog/new-label-dialog.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSectionDialogComponent } from './components/new-section-dialog/new-section-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TaskComponent,
    NewLabelDialogComponent,
    NewTaskDialogComponent,
    NewSectionDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class MainModule { }
