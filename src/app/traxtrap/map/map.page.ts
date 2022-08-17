import { Component, ElementRef, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { GoogleMap,Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from 'src/app/modal/modal.page';
/* import { WebsocketsService } from '../services/websockets.service'; */
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit,OnDestroy {

  locations;
  currentLocation;
  //private _locSub:Subscription


  @ViewChild('map')mapRef:ElementRef;
  map:GoogleMap;


  constructor(private modalCtrl:ModalController,private socket:Socket) { }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('set-name', 'ionicapp');

    /* this.locations = this.socketService.getLocations();
    this._locSub = this.socketService.currentLocation.subscribe(loc=>this.currentLocation=loc.idlocation); */
  }

  ngOnDestroy() {
   /*  this._locSub.unsubscribe(); */
  }


  ionViewDidEnter(){

    this.createMap();

  }
//map stuff
  async createMap() {
    this.map = await GoogleMap.create({
      id:'my-map',
      apiKey:environment.mapsKey,
      element:this.mapRef.nativeElement,
      forceCreate:true, //normal scenario you probably don't want to use forceCreate
      config:{
        center:{
          lat:33.6,
          lng:-117.9
        },
        zoom:8
      }
    });
    await this.addMarkers();
    //this.addmarker(); create only one marker
  }

/*   async addmarker(){
    await this.map.addMarker({
      coordinate:{
        lat:33.7,
        lng:117.8
      },
      title: 'localhost',
      snippet: 'Best place on earth'
    })

  } */

  async addMarkers(){
    const markers: Marker[] = [
      {
        coordinate:{
          lat:33.7,
          lng:-117.8
        },
        title: 'localhost',
        snippet: 'Best place on earth'
      },
      {
        coordinate:{
          lat:33.7,
          lng:-117.2
        },
        title: 'random place on earth',
        snippet: 'not sure'
      }

    ];

    const result = await this.map.addMarkers(markers);
    console.log(result);

    //click listener for marker
    this.map.setOnMarkerClickListener(async(marker)=>{
      console.log(marker);
      const modal = await this.modalCtrl.create({
        component:ModalPage,
        componentProps:{
          marker,
        },
        breakpoints:[0,0.3],
        initialBreakpoint:0.3,

      });
      modal.present();
    });

  }

  

}
