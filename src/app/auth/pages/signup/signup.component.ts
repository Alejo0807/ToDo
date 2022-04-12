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
    `
  ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    name:            [,[Validators.required]],
    lastname:        [,[Validators.required]],
    email:           [,[Validators.required, Validators.email]],
    password:        [,[Validators.required]],
    confirmPassword: [,[Validators.required]]
  })

  user: User =
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

    this.authService.signup(this.user)
    .subscribe(console.log);
    
  }

}
