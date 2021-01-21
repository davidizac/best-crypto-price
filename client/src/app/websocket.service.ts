import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs'
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class SocketService {
  message:''
  bestTicker: Subject<any> = new Subject<any>();

  constructor(private socket: Socket) {
    socket.on('bestTicker', (message) => {
      this.setBestTicker(message)
    });
  }

  setBestTicker(message) {
    this.bestTicker.next(message);
  }

  sendSymbol(symbol){
    this.socket.emit('sendSymbol', symbol);
  }

  getBestTickerAsObservable() {
    return this.bestTicker.asObservable();
  }
}
