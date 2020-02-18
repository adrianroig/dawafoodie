import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  datos:any;
  name:string;
  district:string;
  type:string;
  price:string;
  comments:string;
  visitado:boolean = false;
  opinion:string;


  constructor(private router:Router, private route: ActivatedRoute, private restaurantService:RestaurantService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.datos = JSON.parse(params['datos']);

      this.name = this.datos.name;
      this.district = this.datos.district;
      this.type = this.datos.type;
      this.price = this.datos.price;
      this.comments = this.datos.comments;

      if(this.datos.visited == true){
        this.visitado=true;
      }else{
        this.visitado=false;
      }

      this.opinion = this.datos.opinion;
  
    });
  }


}
