import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  
  private restaurantes:any = []
  
  constructor(private router:Router, private restaurantService:RestaurantService, private db:AngularFirestore, private alert: AlertController) {
  }

  ngOnInit(){
    this.restaurantService.getRestaurantes().subscribe(restaurants =>{
      this.restaurantes = [];
        for(let i = 0; i<restaurants.length; i++){
          if (restaurants[i].visited == false){
            this.restaurantes.push(restaurants[i]);
          }
        }
    })
  }

  press_button_add(){
    this.router.navigateByUrl('/add-restaurant');
  }

  restaurant_details(restaurant){
    this.router.navigate(['/restaurant-details', {datos: JSON.stringify(restaurant)}]);
  }


  async eliminar(id) {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: "You're going to delete this restaurant, are you sure?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.restaurantService.delete_Restaurant(id);
          }
        }
      ]
    });
    await alert.present();
  }

  edit(restaurant){
    this.router.navigate(['/edit', {restaurant: JSON.stringify(restaurant)}]);
  }

}