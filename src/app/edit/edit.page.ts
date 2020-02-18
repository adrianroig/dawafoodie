import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  restaurant:any;
  name:string;
  district: string;
  type: string;
  price:string;
  comments:string;
  visited:boolean;
  opinion:string;
  favorite:boolean

  constructor( private router:Router, private route:ActivatedRoute, private db:AngularFirestore) { }

  ngOnInit() {
    console.log("entro");
     this.route.params.subscribe(params => {
      this.restaurant = JSON.parse(params['restaurant']);
      this.name = this.restaurant.name;
      this.district = this.restaurant.district;
      this.type = this.restaurant.type;
      this.price = this.restaurant.price;
      this.comments = this.restaurant.comments;
      this.opinion = this.restaurant.opinion;
      this.visited = this.restaurant.visited;
      this.favorite = this.restaurant.favorite;
    });
  }

  ionChange(detail: boolean, index: number){
    if(detail == true){
      this.visited = true;
    }else{
      this.visited = false;
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

  edit_restaurant(){
    this.db.doc('restaurants/'+this.restaurant.id).
    update({name: this.name, district: this.district, type: this.type, price: this.price, comments: this.comments, visited: this.visited, opinion: this.opinion, favorite: this.favorite})
    this.router.navigateByUrl("tabs");

  }

}
