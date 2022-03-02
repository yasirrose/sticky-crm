import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class MidsService {

  mids: any;
  gateway: any;
  public ordersGetResponse = new BehaviorSubject([]);
  public getCampaignsResponse = new BehaviorSubject([]);
  public getProductsResponse = new BehaviorSubject([]);

  ordersGetResponse$ = this.ordersGetResponse.asObservable();
  getCampaignsResponse$ = this.getCampaignsResponse.asObservable();
  getProductsResponse$ = this.getProductsResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMids(): Promise<any> {
    await this.apiService.getData(`mids`)
      .then(res => res.json()).then((data) => {
        this.mids = data;
        this.ordersGetResponse.next(data);
      });
    return this.mids;
  }
  async getCampaigns(): Promise<any> {
    await this.apiService.getData(`campaigns`).then(res => res.json()).then((data) => {
      this.getCampaignsResponse.next(data);
    });
  }
  async getProducts(): Promise<any> {
    await this.apiService.getData(`products`).then(res => res.json()).then((data) => {
      this.getProductsResponse.next(data);
    });
  }


}
