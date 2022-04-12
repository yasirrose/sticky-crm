import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  affiliates: any;
  gateway: any;
  columns: any;
  public affiliatesGetResponse = new BehaviorSubject([]);
  public deleteResponse = new BehaviorSubject([]);
  public columnsResponse = new BehaviorSubject([]);

  affiliatesGetResponse$ = this.affiliatesGetResponse.asObservable();
  deleteResponse$ = this.deleteResponse.asObservable();
  columnsResponse$ = this.columnsResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getAffiliates(filters): Promise<any> {
    await this.apiService.getData(`affiliates?start_date=${filters.start}&end_date=${filters.end}&fields=${filters.all_fields}&values=${filters.all_values}&search=${filters.search}`).then(res => res.json()).then((data) => {
      this.affiliates = data;
      // this.affiliatesGetResponse.next(data);
    });
    return this.affiliates;
  }
  async deleteData(id): Promise<any> {
    await this.apiService.getData(`destroy_affiliates?id=${id}`).then(res => res.json()).then((data) => {
      this.deleteResponse.next(data);
    });
  }
  async getColumns(): Promise<any> {
    await this.apiService.getData(`columns/${'affiliates'}`).then(res => res.json()).then((data) => {
      this.columns = data;
      this.columnsResponse.next(data);
    });
    return this.columns;
  }
}
