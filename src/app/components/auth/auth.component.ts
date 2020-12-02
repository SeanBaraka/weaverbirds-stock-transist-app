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

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginAttempt(): void {
    this.authService.authenticate(this.authLogin.value).subscribe((response) => {
      if (response) {
        if (response.token) {
          this.authService.saveUser(response.token);
          this.router.navigate(['']);
        }
      }
    });
  }
}
