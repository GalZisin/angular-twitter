import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  error!: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.error = "";
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
      ])
    })
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(event: any) {
    event.preventDefault();
    const { email, password } = this.loginForm?.value;

    this.authService.login({ email, password }).subscribe(
      data => {
        this.loginForm = new FormGroup({
          email: new FormControl(''),
          password: new FormControl('')
        })
        this.authService.setUser(data)
        this.authService.authenticate();
        this.router.navigate(['/home'])
      },
      error => {
        this.error = error;
      }
    );
  }
}
