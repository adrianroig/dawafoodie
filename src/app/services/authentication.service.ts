import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/users';
import { UserService } from './user.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users = { id: '', name: '', mail: '', picture: { data: { url: '' } } };
  user:User = {
    id:"",
    mail:"",
    password:""
  }

  constructor(private afAuth:AngularFireAuth, private userService: UserService, private fb:Facebook, private router:Router) { }

  async register(email:string, pass:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
     .then((newCredential:firebase.auth.UserCredential)=> {
       this.user.mail=email;
       this.user.password=pass;
       this.userService.createUser(this.user);
       console.log(newCredential);
     })
     .catch(error => {
      console.log(error);
      throw new Error(error);
     });
   }

  loginUser(mail:string, pass:string ){
    return this.afAuth.auth.signInWithEmailAndPassword(mail,pass);
  }

   loginFacebook() {

     this.fb.login(['mail'])
      .then((response: FacebookLoginResponse) => {
        let user = {
          mail: this.users.mail
        };
        sessionStorage.setItem("users", JSON.stringify(user));
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error)
      });
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.afAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/tabs"]);
      })
  } 
}
