import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getBestPrice(symbol1, symbol2){
    return this.http.get(`${environment.serverUrl}/${symbol1}/${symbol2}`)
  }

}