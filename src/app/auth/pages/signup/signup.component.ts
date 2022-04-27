import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
    `
    .welcome {
      padding: 50px 0px 0px 0px;
      display:flex;
    }

    .login-field-form {
      padding: 0px 50px 0px 50px;
    }
    #loading{
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      margin-left: -50px;
      margin-top: -50px;
    }
    `
  ]
})
export class SignupComponent implements OnInit {

  showLoader = false;

  signupForm: FormGroup = this.fb.group({
    name:            [{value: '', disabled: this.showLoader},[Validators.required, Validators.maxLength(100)],],
    lastname:        [{value: '', disabled: this.showLoader},[Validators.required, Validators.maxLength(100)],],
    email:           [{value: '', disabled: this.showLoader},[Validators.required, Validators.email]],
    password:        [{value: '', disabled: this.showLoader},[Validators.required]],
    confirmPassword: [{value: '', disabled: this.showLoader},[Validators.required]]
  })

  user =
  {
    name:     '',
    lastname: '',
    email:    '',
    password: ''
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  signup() {
    const {name, lastname, email, password} = this.signupForm.value;
    this.user.name     = name;
    this.user.lastname = lastname;
    this.user.email    = email;
    this.user.password = password;

    this.showLoader = true

    this.authService.signup(this.user)
      .subscribe(resp => {
        if (resp === true) {
          this.router.navigateByUrl('/login');
        } else {
          this.showLoader = false;
          console.log(resp);
        }
      });
    
  }

}
