import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  currentLocation = this.socket.fromEvent<Location>('location');
  locations = [];

  constructor(private socket:Socket) { }

  getLocations() {
    this.locations = this.socket.emit('get-last-location');
  }



}
