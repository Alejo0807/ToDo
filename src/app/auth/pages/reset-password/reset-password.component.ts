import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [`
    .welcome {
      padding: 50px 0px 0px 0px;
      display:flex;
    }

    .login-field-email {
      padding: 0px 50px 25px 50px;
    }
    .login-field-rememberme {
      padding: 0px 50px 25px 50px;
    }
    .login-field-password {
      padding: 0px 50px 0px 50px;
      margin-bottom: 0px;
      padding-bottom: 0px;
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
export class ResetPasswordComponent implements OnInit {

  showLoader = false;

  passwordUpdated = false;

  resetToken: string = '';
  userId: string = '';

  resetPasswordForm: FormGroup = this.fb.group({
    password:         [{value: '', disabled: this.showLoader}, [Validators.required]],
    confirmPassword:  [{value: '', disabled: this.showLoader}, [Validators.required]],
  },{validator: this.passwordMatch.bind(this) });

  invalidAuth = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(({ token }) => {
      this.resetToken = token;
      if(token) {
        this.authService.forgotPasswordValidateToken(token)
          .subscribe({
            next: response => this.handleSuccessRequest(response),
            error: err => this.handleErrorRequest(err)
          });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  reset() {
    const { password } = this.resetPasswordForm.value;
    this.showLoader = true;


    this.authService.resetPassword(this.resetToken, password)
      .subscribe({
        next: response => this.handleSuccessResertPassword(response),
        error: err => this.handleErrorResetPassword(err)
      });
  }

  passwordMatch(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password')!;
    const { value: confirmPassword } = formGroup.get('confirmPassword')!;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  handleSuccessRequest(response: Response) {
    this.showLoader = false;
  }
  
  
  handleErrorRequest(errorResponse: HttpErrorResponse) {
    const { error } = errorResponse;
    if(error) this.router.navigate(['/login']);
  }

  handleErrorResetPassword(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
  }

  handleSuccessResertPassword(response: Response) {
    console.log(response);
    this.passwordUpdated = true;
    this.showLoader = false
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }

}
