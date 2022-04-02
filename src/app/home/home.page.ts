import { Component } from '@angular/core';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { NuevaPizzaPage } from '../modales/nueva-pizza/nueva-pizza.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  carrito = [];
  subtotal: number;
  mostrarCarro = false;
  iva;
  total;
  keys;
  slideOpts = {
    freeMode: true,
    slidesPerView: 1.5,
    spaceBetween: 10,
  };
  categories = [
    { img: 'assets/imgs/promociones/promo.jpg' },
    {
      img: 'assets/imgs/promociones/promo2.jpg',
    },
  ];
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    const carroGuardado = localStorage.getItem('carro');
    if (carroGuardado) {
      this.mostrarCarro = true;
      this.carrito = JSON.parse(carroGuardado);
      this.keys = Object.keys(this.carrito[0]);
      const precios = [];
      this.carrito.forEach((item) => {
        this.keys.forEach((key) => {
          if (item[key].precio) {
            precios.push(item[key].precio);
          }
        });
        if (item.complementos.length > 0) {
          item.complementos.forEach((complemento) => {
            precios.push(complemento.precio);
          });
        }
      });
      this.subtotal = precios.reduce((a, b) => a + b);
      this.iva = this.subtotal * 0.16;
      this.total = parseFloat(this.subtotal + this.iva).toFixed(2);
      this.iva = this.iva.toFixed(2);
    }
  }

  async add() {
    const modal = await this.modalCtrl.create({
      component: NuevaPizzaPage,
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data.cerrado) {
      this.carrito.push(data.orden);
      this.keys = Object.keys(this.carrito[0]);
      const precios = [];
      this.carrito.forEach((item) => {
        this.keys.forEach((key) => {
          if (item[key].precio) {
            precios.push(item[key].precio);
          }
        });
        if (item.complementos.length > 0) {
          item.complementos.forEach((complemento) => {
            precios.push(complemento.precio);
          });
        }
      });
      this.subtotal = precios.reduce((a, b) => a + b);
      this.iva = this.subtotal * 0.16;
      this.total = parseFloat(this.subtotal + this.iva).toFixed(2);
      this.iva = this.iva.toFixed(2);
      localStorage.setItem('carro', JSON.stringify(this.carrito));
    }
    this.mostrarCarro = true;
  }
  comprar() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          this.toastCtrl
            .create({
              message: 'Compra realizada con éxito',
              duration: 2000,
              color: 'success',
            })
            .then((toast) => {
              toast.present();
            });
        }, 2000);
      });
  }
  limpiar() {
    this.mostrarCarro = false;
    this.carrito = [];
    this.subtotal = null;
    localStorage.clear();
  }
}
