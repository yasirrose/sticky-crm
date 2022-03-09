import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class MidGroupsService {

  midGroups: any;
  gateway: any;
  public getResponse = new BehaviorSubject([]);

  getResponse$ = this.getResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMidGroups(): Promise<any> {
    await this.apiService.getData(`mid-groups`)
      .then(res => res.json()).then((data) => {
        this.midGroups = data;
        this.getResponse.next(data);
      });
    return this.midGroups;
  }
  async getCampaigns(): Promise<any> {
    await this.apiService.getData(`campaigns`).then(res => res.json()).then((data) => {
      // this.getCampaignsResponse.next(data);
    });
  }
  async getProducts(): Promise<any> {
    await this.apiService.getData(`products`).then(res => res.json()).then((data) => {
      // this.getProductsResponse.next(data);
    });
  }


}
