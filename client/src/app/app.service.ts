import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getBestPrice(symbol1, symbol2){
    return this.http.get(`http://localhost:3000/${symbol1}/${symbol2}`)
  }

}