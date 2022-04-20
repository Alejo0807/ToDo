import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLabelDialogComponent } from '../components/new-label-dialog/new-label-dialog.component';
import { NewTaskDialogComponent } from '../components/new-task-dialog/new-task-dialog.component';
import { LabelsService } from '../services/labels.service';
import { Label, Task, Section } from '../interfaces/interfaces';
import { pipe, map, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { TaskSerivce } from '../services/task.service';
import { SectionService } from '../services/section.service';
import { NewSectionDialogComponent } from '../components/new-section-dialog/new-section-dialog.component';

interface localLabel {
  labelId  : number,
  labelName: string
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  user: User  = {email: ''};

  labels: Label[] = [{id: {}},{id: {}},{id: {}},{id: {}}];

  tasks: Task[] = [];

  sections: Section[] = [{name: 'Loading'}];
  currentSection: Section = {name: ''};
  currentSectionIndex: number = 0;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService,
              private labelService: LabelsService,
              private taskSerivce: TaskSerivce,
              private sectionService: SectionService) { }

  ngOnInit(): void {
    this.userService.getUserByToken()
      .subscribe(resp => {
        if(resp) {
          this.user = resp;
          this.getLabels();
          this.getSections();
        }
      });
  }
    
  getLabels() {
    this.labelService.getLabelsByUserId(this.user.userId!)
      .subscribe(resp => {
        if (resp) {
          resp.map((label, index) => {
            this.labels[index].id.labelId = label.id.labelId!;
            this.labels[index].id.userId = label.id.userId!;
            this.labels[index].labelName = label.labelName!;
          })
        }
      })
  }

  getSections() {
    this.sectionService.getSectionsByUserId(this.user.userId!)
      .subscribe(res => {
        this.sections = res;
        this.getTasksBySectionId(this.sections[0].sectionId!);
      });
  }

  getTasksBySectionId(sectionId: number) {
    this.taskSerivce.getTasksBySectionId(sectionId)
      .subscribe( res => {
        this.tasks = res;
      })
  }

  openLabelsDialog() {
    const labelsNames = this.dialog.open(NewLabelDialogComponent, {
      width: '350px',
      data: this.labels
  });

    labelsNames.afterClosed().subscribe(result => {
      if (result.labels != this.labels && result.hasChanged) {
        this.labelService.updateLabels(result.labels)
          .subscribe(res => {
            this.labels = res;
          });
      }
    });

  }

  newTaskDialog() {
    const newTaskDialog = this.dialog.open(NewTaskDialogComponent, {
      width: '350px',
      data: this.labels
    });

    newTaskDialog.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
    
  }

  // newSectionDialog() {
  //   const newSectionDialog = this.dialog.open(NewSectionDialogComponent, {
  //     width: '350px'
  //   });
  // }

  addSection() {
    // this.newSectionDialog();
    const newSectionDialog = this.dialog.open(NewSectionDialogComponent, {
      width: '350px'
    });
    newSectionDialog.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.saveSection(this.user.userId!, result)
          .subscribe(res => {
            this.sections.push(res);
          })
      }
    });
  }

  changeSection(sectionId: number) {
    this.tasks = [];
    this.currentSection = this.sections.find(sec => sec.sectionId! === sectionId)!;
    this.currentSectionIndex = this.sections.indexOf(this.currentSection);
    this.getTasksBySectionId(sectionId);
  }

  logout() {
    this.authService.logout();

  }

}
