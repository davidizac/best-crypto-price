import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NgxSpinnerService } from "ngx-spinner"; 
declare var TweenMax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  newSymbol = ''
  ticker
  bestExchanges

  constructor(private appService: AppService, private SpinnerService: NgxSpinnerService){}

  sendMessage() {
    const symbol1 = this.newSymbol.split('/')[0].toUpperCase()
    const symbol2 = this.newSymbol.split('/')[1].toUpperCase()
    console.log(this.newSymbol)
    this.SpinnerService.show();  
    this.appService.getBestPrice(symbol1, symbol2)
    .subscribe((res: any) => {
      this.SpinnerService.hide();  
      this.ticker = res.ticker
      this.bestExchanges = res.bestExchanges
    })
  }

  getImagePath(exchange){ 
    return `../assets/images/${exchange}.png`
  }

  ngOnInit(){
    var $button = document.querySelector('.button');
    var self = this
    $button.addEventListener('click', function() {
      var duration = 0.3,
          delay = 0.08;
      TweenMax.to($button, duration, {scaleY: 1.6, ease: Expo.easeOut});
      TweenMax.to($button, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
      TweenMax.to($button, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
      self.sendMessage()
    });
  }
  
}
