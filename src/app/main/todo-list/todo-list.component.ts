import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLabelDialogComponent } from '../components/new-label-dialog/new-label-dialog.component';
import { NewTaskDialogComponent } from '../components/new-task-dialog/new-task-dialog.component';
import { LabelsService } from '../services/labels.service';
import { Label } from '../interfaces/interfaces';
import { pipe, map, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from 'src/app/auth/interfaces/user.interface';

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

  items = [1,2,3,4,5,6,7,8]

  user: User  = {email: ''};

  labels: Label[] = [{id: {}},{id: {}},{id: {}},{id: {}}];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService,
              private labelService: LabelsService) { }

  ngOnInit(): void {
    this.userService.getUserByToken()
      .subscribe(resp => {
        if(resp) {
          this.user = resp;
          this.getLabels();
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

  newTask() {
    const newTask = this.dialog.open(NewTaskDialogComponent, {
      width: '350px'
    });

    newTask.afterClosed().subscribe(result => {
      console.log(result);
    });
    
  }

  logout() {
    this.authService.logout();

  }

}
