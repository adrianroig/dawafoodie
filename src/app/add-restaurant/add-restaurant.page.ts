import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurants';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  visited:boolean = false;

  name:string;
  district:string;
  type:string;
  price:string;
  comments:string;
  opinion:string;
  favorite:boolean;

  new_restaurant:Restaurant;

  
  constructor(private router:Router, private restaurantService:RestaurantService) { }

  ngOnInit() {
  }

  ionChange(detail: boolean, index: number){
    if(detail == true){
      this.visited = true;
      this.favorite = true;
    }else{
      this.visited = false;
      this.favorite = false
    }
  }

  ionChange1(detail: boolean, index: number){
    if(detail == true){
      this.favorite = true;
      console.log(this.favorite);
    }else{
      this.favorite = false
      console.log(this.favorite);
    }
  }

   add_restaurant(){
    this.new_restaurant = {
      id:"",
      name: this.name,
      district: this.district,
      type: this.type,
      price: this.price,
      comments: this.comments,
      opinion: this.opinion,
      visited:this.visited,
      favorite: this.favorite
    } 

    this.restaurantService.add_Restaurant(this.new_restaurant);
    this.router.navigateByUrl("tabs");
  }

}