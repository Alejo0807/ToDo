import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [`
      .welcome {
        padding: 30px 0px 0px 0px;
        display:flex;
      }

      #loading{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        margin-left: -50px;
        margin-top: -50px;
      }
  `]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup = this.fb.group({
    email: [[],[Validators.required, Validators.email]]
  });

  showLoader: boolean = false;
  emailSent: boolean = false;
  errorMessage: string = "";

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.forgotPasswordForm.valueChanges.subscribe(value => this.errorMessage = '');
  }


  verify() {
    const { email } = this.forgotPasswordForm.value;
    
    this.showLoader = true;
    this.authService.forgotPassword(email)
      .subscribe({
        next: response => this.handleSuccessReponse(response),
        error: error => this.handleErrorReponse(error)
      })
  }

  handleSuccessReponse(response: Response) {
    const { ok } = response;

    this.emailSent = ok;
    this.showLoader = false;
  }

  handleErrorReponse(errorResponse: HttpErrorResponse) {
    this.errorMessage = errorResponse.error;
    this.showLoader = false;
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }

}
