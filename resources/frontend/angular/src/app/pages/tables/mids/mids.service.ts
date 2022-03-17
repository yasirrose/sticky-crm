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
  public refreshResponse = new BehaviorSubject([]);
  public getProductsResponse = new BehaviorSubject([]);

  ordersGetResponse$ = this.ordersGetResponse.asObservable();
  refreshResponse$ = this.refreshResponse.asObservable();
  getProductsResponse$ = this.getProductsResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMids(filters): Promise<any> {
    await this.apiService.getData(`mids?start_date=${filters.start}&end_date=${filters.end}`).then(res => res.json()).then((data) => {
        this.mids = data;
        this.ordersGetResponse.next(data);
      });
    return this.mids;
  }

  async refresh(): Promise<any> {
    await this.apiService.getData(`pull_payment_router_view`).then(res => res.json()).then((data) => {
      this.refreshResponse.next(data);
    });
  }

  async deleteData(alias): Promise<any> {
    await this.apiService.deleteData(`mids/${alias}`).then(res => res.json()).then((data) => {
      this.getProductsResponse.next(data);
    });
  }


}
