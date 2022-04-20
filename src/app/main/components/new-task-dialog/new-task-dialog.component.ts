import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label, Task } from '../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  labelsDialog: Label[] = [];

  newTaskForm: FormGroup = this.fb.group({
    title:       ['', [Validators.required]],
    description: ['', []],
    dueDate:     ['', [Validators.required]],
    dificulty:   [1, [Validators.required]],
    label1:      ['', []],
    label2:      ['', []],
    label3:      ['', []],
    label4:      ['', []]
  })


  constructor(private newTaskDialog: MatDialogRef<NewTaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private labels: Label[],
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.labelsDialog = {...this.labels};

    this.newTaskDialog.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onCancel();
      }
    });

    this.newTaskDialog.backdropClick().subscribe(event => {
        this.onCancel();
    });
  }

  onCancel() {
    this.newTaskDialog.close();
  }

  onSave() {
    const {title, description, dueDate, dificulty, label1, label2, label3, label4} = this.newTaskForm.value;
    const task: Task = {
      title,
      description,
      dueDate: this.datePipe.transform(dueDate, 'yyyy-MM-dd')!,
      dificulty,
      state: 'To-Do',
      labels: this.changeValue(label1)+''+this.changeValue(label2)+''+this.changeValue(label3)+''+this.changeValue(label4)
    }
    // console.log(this.datePipe.transform(dueDate, 'yyyy-MM-dd'));
    this.newTaskDialog.close(task);
  }

  changeValue(isChecked: boolean): string {
    return isChecked? '1' : '0';
  }

}
