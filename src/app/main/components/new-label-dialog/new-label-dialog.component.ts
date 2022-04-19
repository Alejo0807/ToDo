import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label } from '../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-label-dialog',
  templateUrl: './new-label-dialog.component.html',
  styleUrls: ['./new-label-dialog.component.css']
})
export class NewLabelDialogComponent implements OnInit {

  labelsForm: FormGroup = this.fb.group({
    label1: ['', [Validators.maxLength(15)]],
    label2: ['', [Validators.maxLength(15)]],
    label3: ['', [Validators.maxLength(15)]],
    label4: ['', [Validators.maxLength(15)]]
  })

  labelsDialog: Label[] = [];

  constructor(private labelsNames: MatDialogRef<NewLabelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private labels: Label[],
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.labelsDialog = {...this.labels};

    this.labelsNames.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onCancel();
      }
    });

    this.labelsNames.backdropClick().subscribe(event => {
        this.onCancel();
    });
  }

  onCancel() {
    this.labelsNames.close({ labels: this.labels, hasChanged: false});
  }

  save() {
    const {label1, label2, label3, label4} = this.labelsForm.value;
    this.labelsDialog[0].labelName = label1.trim() || this.labelsDialog[0].labelName;
    this.labelsDialog[1].labelName = label2.trim() || this.labelsDialog[1].labelName;
    this.labelsDialog[2].labelName = label3.trim() || this.labelsDialog[2].labelName;
    this.labelsDialog[3].labelName = label4.trim() || this.labelsDialog[3].labelName;

    this.labelsNames.close({ 
      labels: this.labelsDialog, 
      hasChanged: this.labelsDialog != this.labels
    });
  }

}
