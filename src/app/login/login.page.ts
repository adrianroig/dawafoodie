import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  error:string = ""

  constructor(private authenticationService: AuthenticationService, private router:Router, private toastService: ToastService) { }

  ngOnInit() {
  }

  login(){
    this.authenticationService.loginUser(this.email, this.password)
    .then(() => {
      this.toastService.createToast("Usuario Correcto");
      this.router.navigateByUrl('/tabs');

    },error => {
      console.log(error);
      this.error = "Usuario o contraseña incorrecto"
    })
  }


}
