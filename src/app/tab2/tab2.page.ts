import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  
  private restaurantes:any = []
  
  filtro:boolean;
  favorite:boolean;
  
  constructor(private router:Router, private restaurantService:RestaurantService, private db:AngularFirestore, private alert: AlertController) {
  }

  ngOnInit(){
    this.restaurantService.getRestaurantes().subscribe(restaurants =>{
      this.restaurantes = [];
        for(let i = 0; i<restaurants.length; i++){
          if (restaurants[i].visited == true){
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

  search(){
    if(this.filtro == false){
      this.filtro = true;
    }else{
      this.filtro = false;
    }
  }

  ionChange(detail: boolean, index: number){
    if(detail == true){
      this.restaurantService.getRestaurantes().subscribe(restaurants =>{
        this.restaurantes = [];
          for(let i = 0; i<restaurants.length; i++){
            if (restaurants[i].visited == true && restaurants[i].favorite == true){
              this.restaurantes.push(restaurants[i]);
            }
          }
      })
    }else{
      console.log(detail);
      this.ngOnInit()
    }
  }

}