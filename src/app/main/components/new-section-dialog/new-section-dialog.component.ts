import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Section } from '../../interfaces/interfaces';

@Component({
  selector: 'app-new-section-dialog',
  templateUrl: './new-section-dialog.component.html',
  styleUrls: ['./new-section-dialog.component.css']
})
export class NewSectionDialogComponent implements OnInit {

  section: Section = {name: ''};

  newSectionForm = this.fb.group({
    sectionName: ['', [Validators.required, Validators.maxLength(10)]]
  });

  constructor(private newSectionDialog: MatDialogRef<NewSectionDialogComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.newSectionDialog.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
          this.onCancel();
      }
    });

    this.newSectionDialog.backdropClick().subscribe(event => {
        this.onCancel();
    });
  }

  onCancel() {
    this.newSectionDialog.close();
  }

  onSave() {
    const { sectionName } = this.newSectionForm.value;
    this.section.name = sectionName;
    this.newSectionDialog.close(this.section);
  }

}
