import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast: any

  constructor(private toastController:ToastController) { }

  createToast(texto:string){
    this.toast = this.toastController.create({
      message: texto,
      duration: 3000
    }).then ((toastData)=>{
      console.log(toastData);
      toastData.present();
    })
  }

}
