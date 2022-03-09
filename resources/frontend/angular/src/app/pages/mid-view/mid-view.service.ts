import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class MidViewService {

  mid: any;
  // public ordersGetResponse = new BehaviorSubject([]);

  // ordersGetResponse$ = this.ordersGetResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMid(alias): Promise<any> {
    await this.apiService.getData(`mids/${alias}`)
      .then(res => res.json()).then((data) => {
        this.mid = data;
        // this.ordersGetResponse.next(data);
      });
    return this.mid;
  }
  // async getCampaigns(): Promise<any> {
  //   await this.apiService.getData(`campaigns`).then(res => res.json()).then((data) => {
  //     // this.getCampaignsResponse.next(data);
  //   });
  // }
  // async getProducts(): Promise<any> {
  //   await this.apiService.getData(`products`).then(res => res.json()).then((data) => {
  //     // this.getProductsResponse.next(data);
  //   });
  // }


}
