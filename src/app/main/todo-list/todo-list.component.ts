import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLabelDialogComponent } from '../components/new-label-dialog/new-label-dialog.component';
import { NewTaskDialogComponent } from '../components/new-task-dialog/new-task-dialog.component';
import { LabelsService } from '../services/labels.service';
import { Label } from '../interfaces/interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  items = [1,2,3,4,5,6,7,8]

  labels: Label[] = [];

  constructor(private dialog: MatDialog,
              private label: LabelsService) { }

  ngOnInit(): void {
    this.label.getLabels()
      .subscribe(console.log);
  }

  openLabels() {
    const labelsNames = this.dialog.open(NewLabelDialogComponent, {
      width: '350px'
    });

    labelsNames.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  newTask() {
    const newTask = this.dialog.open(NewTaskDialogComponent, {
      width: '350px'
    });

    newTask.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }

  logout() {

  }

}
