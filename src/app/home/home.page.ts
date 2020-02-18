import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  registrer(){
    this.router.navigateByUrl('register');
  }

  login(){
    this.router.navigateByUrl('login');
  }

  facebookLogIn(){
    this.authenticationService.loginFacebook()
  }

}
