import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string ="";
  password:string ="";
  password2:string = "";
  erroremail:string = "";
  errorpass:string = "";
  passdistinto:string = "";

  constructor(private router:Router, private authenticationService: AuthenticationService, private toastService: ToastService) { }

  ngOnInit() {
  }

  register(){
    if(this.email.trim() != "" && this.password.trim() != "" && this.password2.trim() != "" ){
      if (this.password === this.password2){
        this.authenticationService.register(this.email, this.password)
        .then(() =>{
          console.log("Usuario creado correctamente");
      this.toastService.createToast("Usuario creado correctamente");
      this.router.navigateByUrl('home');
    },error => {
      console.log(error);
        });
      }
    }
  }
}
