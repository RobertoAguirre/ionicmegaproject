import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
import { GpsService } from '../services/gps.service';

declare const google;

@Component({
  selector: 'app-mapjs',
  templateUrl: './mapjs.page.html',
  styleUrls: ['./mapjs.page.scss'],
})
export class MapjsPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  myMap: any;
  mapOptions;
  locations;
  public markers = [];
  markersCreated;

  //This is from the tutorial, possibly not using it
  currentMapTrack = null;
  isTracking = false;
  tracketRoute = [];
  prviousRoute = [];
  positionSubscription: Subscription;

  constructor(
    private gpsService: GpsService,
    private socket: Socket,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private plt: Platform,
    private alertCtrl: AlertController
  ) {
    this.markersCreated = false;
  }

  ngOnInit() {
    // Listen for incoming GPS coordinates from the server
    this.gpsService.onCoordinatesReceived().subscribe((data: any) => {
      console.log('Received GPS coordinates:', data);
      // Update the map with the new coordinates

      const { latitude, longitude } = data;
      const position = new google.maps.LatLng(latitude, longitude);
      /*       this.map.setCenter(position);
      this.marker.setPosition(position); */
    });
  }
  ionViewWillEnter() {}

  ionViewDidEnter() {
    this.createMap();
  }

  //ai generated
  // Send the user's current location to the server
  sendLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.gpsService.sendCoordinates(latitude, longitude);
    });
  }
  //

  socketConnection(_map) {
    console.log('SOCKET STARTING');
    this.socket.connect();
    this.socket.emit('set-name', 'ionicapp');
    this.socket.emit(
      'get-last-locations',
      'probably useless message',
      (response) => {
        console.log(response.locations);
      }
    );

    // client-side
    this.socket.on('respond-last-locations', (data) => {
      console.log('got locations');
      let _locations;
      _locations = data;
      this.locations = _locations.locations;
      console.log(this.locations);
      if (this.markersCreated === false) {
        //this.addMarkers(_map);
        this.turnLocationsIntoMarkers(_map, this.markers);
        this.markersCreated = true;
        this.addMarkersToMap(_map);
        //console.log(this.markers.length);
      } else {
        this.updateMarkersPositions(_map);
      }
    });

    console.log('SOCKET STARTED');
  }

  createMap() {
    console.log('map creating started');
    this.mapOptions = {
      zoom: 16,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: false,
    };
    this.myMap = new google.maps.Map(
      this.mapRef.nativeElement,
      this.mapOptions
    );
    let latLng = new google.maps.LatLng(28.692453, -106.153953);
    this.myMap.setCenter(latLng);
    this.myMap.setZoom(16);
    console.log('map created');
    this.socketConnection(this.myMap);
  }

  formatDate(_date) {
    return moment(_date).format('YYYY-MM-DD HH:mm:ss');
  }

  turnLocationsIntoMarkers(_map, _markers) {
    Object.values(this.locations.locations).forEach(function (value: any) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      let position = new google.maps.LatLng(
        value.lastrecord.latitude,
        value.lastrecord.longitude
      );
      let mapMarker = new google.maps.Marker({
        position: position,
        title: value._id,
        latitude: value.lastrecord.latitude,
        longitude: value.lastrecord.longitude,
        imei: value._id,
        id: value._id,
        date: moment(value.lastrecord.date).format('YYYY-MM-DD HH:mm:ss'),
      });

      _markers.push(mapMarker);

      //mapMarker.setMap(_map);
    });

    console.log(this.markers.length);
  }

  addMarkersToMap(_map) {
    console.log(this.markers.length);

    for (let marker of this.markers) {
      marker.setMap(this.myMap);
      //marker.setPosition(marker.position);
      this.addInfoWindowToMarker(marker);
    }
  }

  addInfoWindowToMarker(marker) {
    marker.addListener('click', async () => {
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

  updateMarkersPositions(_map) {
    console.log(this.markers.length);
    console.log('updating markers positions');
    for (let marker of this.markers) {
      //force converting in array
      let _locs = [];
      _locs = Array.from(this.locations.locations);
      console.log(_locs);

      let currentMarker = _locs.find((element) => {
        if (element._id === marker.id) {
          return true;
        }
        return false;
      });

      console.log(currentMarker);

      let latlng = new google.maps.LatLng(
        currentMarker.lastrecord.latitude,
        currentMarker.lastrecord.longitude
      );
      marker.setPosition(latlng);
    }
  }
}
