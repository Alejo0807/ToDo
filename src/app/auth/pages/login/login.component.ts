import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
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
    `
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email:         ['', [Validators.required]],
    password:      ['', [Validators.required]],
    rememberme:    ['', []]
  });

  invalidAuth = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
    
    
  ngOnInit(): void {
  }
  login() {
    const {email, password} = this.loginForm.value;
    
    this.authService.login(email, password)
      .subscribe( ok => {
        if (ok === true) {
          this.router.navigateByUrl('/main')
        } else {
          this.loginForm.get('password')?.reset();
        }
      });
  }



}
