import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable()
export class CustomerService {
  details: any;
  gateway: any;
  public customerDetailGetResponse = new BehaviorSubject([]);

  customerDetailGetResponse$ = this.customerDetailGetResponse.asObservable();

  constructor(private apiService: ApiService) { }
  async getCustomerDetail(id): Promise<any> {
    await this.apiService.getData(`get_customer_detail?id=${id}`)
    .then(res => res.json()).then((data) => {
      this.details = data;
    });
    return this.details;
  }
}
