import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  prospects: any;
  gateway: any;
  public GetProspectsResponse = new BehaviorSubject([]);
  public deleteResponse = new BehaviorSubject([]);

  getProspectResponse$ = this.GetProspectsResponse.asObservable();
  deleteResponse$ = this.deleteResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getProspects(filters): Promise<any> {
    await this.apiService.getData(`prospects?pageno=${filters.currentPage}&per_page=${filters.pageSize}
    &start_date=${filters.start}&end_date=${filters.end}&fields=${filters.all_fields}&values=${filters.all_values}`)
      .then(res => res.json()).then((data) => {
        this.prospects = data;
        this.GetProspectsResponse.next(data);
      });
    return this.prospects;
  }

  async deleteProposal(id): Promise<any> {
    await this.apiService.deleteData(`prospects/${id}`)
      .then(res => res.json()).then((data) => {
        this.deleteResponse.next(data);
      });
  }
}
