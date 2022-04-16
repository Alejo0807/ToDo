import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-label-dialog',
  templateUrl: './new-label-dialog.component.html',
  styleUrls: ['./new-label-dialog.component.css']
})
export class NewLabelDialogComponent implements OnInit {

  constructor(private labelsNames: MatDialogRef<NewLabelDialogComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.labelsNames.close();
  }

  save() {

  }

}
