import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { User } from '../models/users'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFirestore) { }

  createUser(newUser:User){
    newUser.id=this.db.createId();
    this.db.doc('users/'+newUser.id).set({newUser});
  }
  
}
