import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSlides,
  LoadingController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-nueva-pizza',
  templateUrl: './nueva-pizza.page.html',
  styleUrls: ['./nueva-pizza.page.scss'],
})
export class NuevaPizzaPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;
  slideOpt = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  tamanios = [
    {
      nombre: 'Personal $20',
      precio: 20,
    },
    {
      nombre: 'Chica $40',
      precio: 40,
    },
    {
      nombre: 'Mediana $60',
      precio: 60,
    },
    {
      nombre: 'Grande $80',
      precio: 80,
    },
    {
      nombre: 'Extra $100',
      precio: 100,
    },
  ];
  bordes = [
    {
      nombre: 'Queso $15',
      precio: 15,
    },
    {
      nombre: 'Ajonjolí $10',
      precio: 10,
    },
    {
      nombre: 'Normal $5',
      precio: 5,
    },
  ];
  bebidas = [
    {
      nombre: 'Pepsi 1L $40',
      precio: 40,
    },
    {
      nombre: 'Manzana 1L $35',
      precio: 35,
    },
    {
      nombre: 'Fuze tea 1L $38',
      precio: 38,
    },
  ];
  ingredientes = [
    {
      nombre: 'Pepperoni $30',
      precio: 30,
    },
    {
      nombre: 'Hawaiana $45',
      precio: 45,
    },
    {
      nombre: 'Cuatro quesos $40',
      precio: 40,
    },
  ];
  entregas = [
    {
      nombre: 'Domicilio $60',
      precio: 60,
    },
    {
      nombre: 'Establecimiento $0',
      precio: 0,
    },
    {
      nombre: 'Punto medio $40',
      precio: 40,
    },
  ];
  tamanio = 'Personal $20';
  borde = 'Normal $5';
  nSlide = 0;
  bebida = 'Pepsi 1L $40';
  ingrediente = 'Pepperoni $30';
  entrega = 'Domicilio $60';
  complementos = [];
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}
  ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => {
          loading.dismiss();
        }, 2000);
      });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      cerrado: 'si',
    });
  }
  swipeNext() {
    this.nSlide++;
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.nSlide);
    this.slides.lockSwipes(true);
  }
  swipePrev() {
    this.nSlide--;
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.nSlide);
    this.slides.lockSwipes(true);
  }
  agregar(evento) {
    if (evento.detail.checked) {
      let precioF = 0;
      if (evento.detail.value === 'papas') {
        precioF = 25;
      } else if (evento.detail.value === 'pan') {
        precioF = 20;
      } else {
        precioF = 15;
      }
      //Pedir cantidad del complemento por alerta
      this.alertCtrl
        .create({
          header: 'Cantidad',
          backdropDismiss: false,
          inputs: [
            {
              name: 'cantidad',
              type: 'number',
              placeholder: 'Cantidad',
              min: 1,
              value: 1,
            },
          ],
          buttons: [
            {
              text: 'Agregar',
              handler: (data) => {
                this.complementos.push({
                  nombre: evento.detail.value,
                  cantidad: parseInt(data.cantidad, 10),
                  precio: precioF,
                });
              },
            },
          ],
        })
        .then((alert) => {
          alert.present();
        });
      //this.complementos.push({ nombre: evento.detail.value, precio: precioF });
    } else {
      this.complementos = this.complementos.filter(
        (item) => item.nombre !== evento.detail.value
      );
    }
  }
  terminar() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => {
          loading.dismiss();
        }, 2000);
      });
    const pizza = {
      tamanio: {
        nombre: this.tamanio,
        precio: this.tamanios.find((item) => item.nombre === this.tamanio)
          .precio,
      },
      borde: {
        nombre: this.borde,
        precio: this.bordes.find((item) => item.nombre === this.borde).precio,
      },
      bebida: {
        nombre: this.bebida,
        precio: this.bebidas.find((item) => item.nombre === this.bebida).precio,
      },
      ingrediente: {
        nombre: this.ingrediente,
        precio: this.ingredientes.find(
          (item) => item.nombre === this.ingrediente
        ).precio,
      },
      entrega: {
        nombre: this.entrega,
        precio: this.entregas.find((item) => item.nombre === this.entrega)
          .precio,
      },
      complementos: this.complementos,
    };
    this.modalCtrl.dismiss({
      orden: pizza,
    });
  }
}
