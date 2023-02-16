import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  constructor(private socket: Socket) {}

  // Send GPS coordinates to the server
  sendCoordinates(latitude: number, longitude: number) {
    this.socket.emit('gpsCoordinates', { latitude, longitude });
  }

  // Listen for incoming GPS coordinates from the server
  onCoordinatesReceived() {
    return this.socket.fromEvent('gpsCoordinates');
  }

  // Connect to the server
  connect() {
    this.socket.connect();
  }

  // Disconnect from the server
  disconnect() {
    this.socket.disconnect();
  }
}
