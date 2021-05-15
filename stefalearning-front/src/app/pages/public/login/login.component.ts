import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  login() {
    const credencial = {
      email: this.loginForm.get('email')?.value,
      senha: this.loginForm.get('senha')?.value,
    };
    this.authService.auth(credencial.email, credencial.senha).subscribe(
      (login) => {
        this.authService.setToken(login.token);
        this.authService.setUsuario(login.usuario);
        this.router.navigate(['']);
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }
}
