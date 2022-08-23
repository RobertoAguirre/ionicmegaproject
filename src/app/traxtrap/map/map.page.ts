import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
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
export class MapPage implements OnInit, OnDestroy {

  locations;
  currentLocation;
  markers = [];
  mapAlreadyCreated;

  //private _locSub:Subscription


  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;


  constructor(private modalCtrl: ModalController, private socket: Socket) {
    this.mapAlreadyCreated = false;

  }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('set-name', 'ionicapp');
    this.socket.emit('get-last-locations', 'probably useless message');

    this.socket.fromEvent('respond-last-locations').subscribe(data => {
      console.log("got locations");
      let _locations;
      _locations = data;
      this.locations = _locations.locations;
      console.log(this.locations);
      if (this.mapAlreadyCreated === false) {
        this.createMap();
        this.mapAlreadyCreated = true;
      } else {
        this.addMarkers();
      }

    });

    /* this.locations = this.socketService.getLocations();
    this._locSub = this.socketService.currentLocation.subscribe(loc=>this.currentLocation=loc.idlocation); */
  }

  ngOnDestroy() {
    /*  this._locSub.unsubscribe(); */
  }


  ionViewDidEnter() {

    //this.createMap();

  }

  getLastLocations() {
    this.socket.emit('get-last-locations', 'probably useless message');

    this.socket.fromEvent('respond-last-locations').subscribe(data => {
      let _locations;
      _locations = data;
      this.locations = _locations.locations;
      console.log(this.locations);
      //alert("got new locations");

      //this.addMarkers();
    });
  }



  //map stuff
  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true, //normal scenario you probably don't want to use forceCreate
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    });
    this.addMarkers();
    //this.addmarker(); create only one marker
  }

  async addMarkers() {

    console.log(this.markers);

    let _markers = [];


    Object.values(this.locations.locations).forEach(function (value: any) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object 
      let mkr = {
        id: value._id,
        coordinate: {
          lat: value.lastrecord.latitude,
          lng: value.lastrecord.longitude
        },
        title: 'localhost',
        snippet: 'Best place on earth'
      }


      _markers.push(mkr);
      console.log(value);
      console.log("i am here in the foreach");
    });



    const result = await this.map.addMarkers(_markers);
    console.log(result);

    //click listener for marker
    this.map.setOnMarkerClickListener(async (marker) => {
      console.log(marker);
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,

      });
      modal.present();
    });

  }



}
