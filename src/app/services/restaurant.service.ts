import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurants';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private db:AngularFirestore) { 
  }

  getRestaurantes(){
   return this.db.collection('restaurants').snapshotChanges().pipe(map(restaurants => {
    return restaurants.map(a => {
      const data = a.payload.doc.data() as Restaurant;
      data.id = a.payload.doc.id;
      return data;
    })
   }))
  }

  createId(){
    return this.db.createId();
  }

  add_Restaurant(restaurant:Restaurant){
    console.log(restaurant.visited);
    if(restaurant.visited == false){
      restaurant.opinion = "";
      restaurant.favorite = false;
    }
    this.db.collection("restaurants").add({
      name: restaurant.name,
      district: restaurant.district,
      type: restaurant.type,
      price: restaurant.price,
      comments: restaurant.comments,
      opinion: restaurant.opinion,
      visited: restaurant.visited,
      favorite: restaurant.favorite
    })
  }


  delete_Restaurant(id:string){
    return this.db.doc('restaurants/'+id).delete();
  }





}