import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  constructor(private newTask: MatDialogRef<NewTaskDialogComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.newTask.close();
  }

  save() {

  }

}
