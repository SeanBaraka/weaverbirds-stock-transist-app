import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  authLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // loading and error state variables
  loading = false;
  errorConnecting = false;

  // login error message
  errorLogin: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginAttempt(): void {
    this.loading = true;
    this.authService.authenticate(this.authLogin.value).subscribe((response) => {
      console.log('respones, ', response)
      if (response) {
        this.authLogin.reset();
        this.loading = false;
        if (response.token) {
          this.authService.saveUser(response.token);
          this.router.navigate(['']);
        }
      }
    }, (error) => {
      console.log('err', error);
      
      if (error.status !== 404) {
        this.loading = false;
        this.errorConnecting = true;
      } else {
        this.errorLogin = error.error;
        this.loading = false;
        this.authLogin.reset();
        this.errorConnecting = false;
      }
    });
  }

  retryEntry(): void {
    this.errorConnecting = false;
    this.loading = false;
  }
}
