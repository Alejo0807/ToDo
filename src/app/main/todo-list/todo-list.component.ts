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
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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
  flteredTask: Task[] = [];

  sections: Section[] = [{name: 'New Section'}];
  currentSection: Section = {name: ''};
  currentSectionIndex: number = 0;

  taskToEdit: Task | undefined;

  constructor(private router: Router,
              private dialog: MatDialog,
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
          this.getSections();
          this.getLabels();
        }
      });
  }
    
  getLabels() {
    this.labelService.getLabelsByUserId(this.user.userId!)
      .subscribe(resp => {
        if (resp.length > 0) {
          resp.map((label, index) => {
            this.labels[index].id.labelId = label.id.labelId!;
            this.labels[index].id.userId = label.id.userId!;
            this.labels[index].labelName = label.labelName!;
          })
        } else {
          for (let i = 0; i < 4; i++) {
            this.labels[i].id.labelId = i+1;
            this.labels[i].id.userId = this.user.userId;
            this.labels[i].labelName = ''
          }
          this.openLabelsDialog();
        }
      })
  }

  getSections() {
    this.sectionService.getSectionsByUserId(this.user.userId!)
      .subscribe(res => {
        if (res.length > 0) {
          this.sections = res;
          this.currentSection = this.sections[0];
          this.getTasksBySectionId(this.currentSection.sectionId!);
        } else {
          this.addSection(true);
        }
      });
  }

  getTasksBySectionId(sectionId: number) {
    this.taskSerivce.getTasksBySectionId(sectionId)
      .subscribe( res => {
        this.tasks = res;
        this.flteredTask = res;
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

  newTaskDialog(edit: boolean) {
    this.taskToEdit = edit? this.taskToEdit : undefined;
    const newTaskDialog = this.dialog.open(NewTaskDialogComponent, {
      width: '350px',
      data: { labels : this.labels,
              task   : this.taskToEdit }
    });

    newTaskDialog.afterClosed().subscribe((result:Task) => {
      console.log(result)
      if (result) {
        this.taskSerivce.saveTaskBySectionId(this.currentSection.sectionId!, result)
          .subscribe(res => {
            if (!edit) {
              this.tasks.push(res);
            } else {
              this.tasks[this.tasks.indexOf(this.taskToEdit!)] = res;
            }
          })
      }
    });
    
  }

  editTask(task: Task) {
    this.taskToEdit = task;
    this.newTaskDialog(true);
  }

  deleteTask(task: Task) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.taskSerivce.deleteTask(task.taskId!)
          .subscribe( res => {
            if (res.ok) {
              this.tasks.splice(this.tasks.indexOf(task!),1);
            }
          })
      }
    })
  }

  updateStateTask(task: Task) {
    this.taskSerivce.saveTaskBySectionId(this.currentSection.sectionId!, task)
          .subscribe()
  }

  addSection(isFirstSection: boolean) {
    const newSectionDialog = this.dialog.open(NewSectionDialogComponent, {
      width: '350px'
    });
    newSectionDialog.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.saveSection(this.user.userId!, result)
          .subscribe(res => {
            if(isFirstSection) this.sections[0] = res;
            else this.sections.push(res);
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

  deleteSection(sectionId: number) {
    const sectionToDelete = this.sections.find(sec => sec.sectionId! === sectionId)!;
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.deleteSection(sectionId)
          .subscribe(res => {
            if (res.ok) {
              this.sections.splice(this.sections.indexOf(sectionToDelete),1);
              this.currentSection = this.sections[0];
              this.currentSectionIndex = 0;
              this.getTasksBySectionId(this.currentSection.sectionId!);
            }
          })
      }
    })
  }

  isLabelsFiltered: boolean[] = [false,false,false,false];
  labelsTransparent: string[] = ['transparent','transparent','transparent','transparent'];
  labelsColors: string[] = ['#0FF3FC','#A3D90D','#F07A1A','#B10DD9'];

  filterByLabel(labelIndex: number, isFiltered: boolean) {
    this.isLabelsFiltered = [false,false,false,false];
    this.labelsTransparent = ['transparent','transparent','transparent','transparent'];
    this.isStateFiltered = [false,false,false];
    this.statesTransparent = ['transparent','transparent','transparent'];
    if (!isFiltered) {
      this.flteredTask = this.tasks.filter(task => 
        task.labels[labelIndex].match('1')
      )
      this.isLabelsFiltered[labelIndex] = true
      this.labelsTransparent[labelIndex] = this.labelsColors[labelIndex];
    } else {
      this.flteredTask = this.tasks;
    }
  }

  filterByLabel1(isFiltered: boolean) {
    this.filterByLabel(0, isFiltered);
  }
  
  filterByLabel2(isFiltered: boolean) {
    this.filterByLabel(1, isFiltered);
  }
  
  filterByLabel3(isFiltered: boolean) {
    this.filterByLabel(2, isFiltered);
  }
  
  filterByLabel4(isFiltered: boolean) {
    this.filterByLabel(3, isFiltered);
  }

  isStateFiltered: boolean[] = [false,false,false,false];
  statesTransparent: string[] = ['transparent','transparent','transparent'];
  statesColors: string[] = ['#D9840D','#F0E31A','#12EC28'];
  
  filterByState(stateIndex: number, state: string, isFiltered: boolean) {
    this.isStateFiltered = [false,false,false];
    this.statesTransparent = ['transparent','transparent','transparent'];
    this.isLabelsFiltered = [false,false,false,false];
    this.labelsTransparent = ['transparent','transparent','transparent','transparent'];
    if (!isFiltered) {
      this.flteredTask = this.tasks.filter(task => 
        task.state.match(state)
      )
      this.isStateFiltered[stateIndex] = true
      this.statesTransparent[stateIndex] = this.statesColors[stateIndex];
    } else {
      this.flteredTask = this.tasks;
    }
  }

  filterByStateToDo(isFiltered: boolean) {
    this.filterByState(0,'To-Do', isFiltered);
  }
  
  filterByStateInProgress(isFiltered: boolean) {
    this.filterByState(1,'In-Progress', isFiltered);
  }
  
  filterByStateDone(isFiltered: boolean) {
    this.filterByState(2,'Done', isFiltered);
  }
  

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login')
  }

}
