import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable()
export class CustomersService {

  customers: any;
  gateway: any;
  public customersGetResponse = new BehaviorSubject([]);
  public deleteResponse = new BehaviorSubject([]);

  customersGetResponse$ = this.customersGetResponse.asObservable();
  deleteResponse$ = this.deleteResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getCustomers(filters): Promise<any> {
    await this.apiService.getData(`customers?pageno=${filters.currentPage}&per_page=${filters.pageSize}`)
      .then(res => res.json()).then((data) => {
        this.customers = data;
        this.customersGetResponse.next(data);
      });
    return this.customers;
  }
  async deleteData(id): Promise<any> {
    await this.apiService.deleteData(`customers/${id}`)
      .then(res => res.json()).then((data) => {
        this.deleteResponse.next(data);
      });
  }
}
