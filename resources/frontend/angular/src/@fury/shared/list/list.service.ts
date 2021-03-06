import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  data: any;
  //   gateway: any;
  public changeColumnResponse = new BehaviorSubject([]);
  public searchResponse = new BehaviorSubject([]);

  changeColumnResponse$ = this.changeColumnResponse.asObservable();
  searchResponse$ = this.searchResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async changeColumn(table, column, value): Promise<any> {
    await this.apiService.postData(`change_column?value=${value}&&table=${table}`, column).then(res => res.json()).then((data) => {
      this.data = data;
      this.changeColumnResponse.next(data);
    });
    return this.data;
  }

  async search(table, value): Promise<any> {
    await this.apiService.getData(`${table}?search=${value}`).then(res => res.json()).then((data) => {
      this.data = data;
      this.searchResponse.next(data);
    });
    return this.data;
  }
}

