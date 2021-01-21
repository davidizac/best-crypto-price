import { Component } from '@angular/core';
import { SocketService } from '../app/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  newSymbol = ''
  ticker

  constructor(private socketService: SocketService){}

  sendMessage() {
    this.socketService.sendSymbol(this.newSymbol);
    this.newSymbol = '';
  }
  
  ngOnInit() {
    this.socketService
      .getBestTickerAsObservable()
      .subscribe((ticker) => {
        this.ticker = ticker
      });
  }
}
