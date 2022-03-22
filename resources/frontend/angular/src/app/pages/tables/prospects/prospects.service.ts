import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';


@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  prospects: any;
  gateway: any;
  public GetProspectsResponse = new BehaviorSubject([]);
  public deleteResponse = new BehaviorSubject([]);
  public deleteAllResponse = new BehaviorSubject([]);

  getProspectResponse$ = this.GetProspectsResponse.asObservable();
  deleteResponse$ = this.deleteResponse.asObservable();
  deleteAllResponse$ = this.deleteAllResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getProspects(filters): Promise<any> {
    await this.apiService.getData(`prospects?page=${filters.currentPage}&per_page=${filters.pageSize}&search=${filters.search}`)
      .then(res => res.json()).then((data) => {
        this.prospects = data;
        this.GetProspectsResponse.next(data);
      });
    return this.prospects;
  }

  async deleteProposal(id): Promise<any> {
    await this.apiService.deleteData(`prospects/${id}`).then(res => res.json()).then((data) => {
        this.deleteResponse.next(data);
      });
  }

  async deleteAll(data): Promise<any> {
    await this.apiService.postData(`delete_prospects`, data).then(res => res.json()).then((data) => {
      this.deleteAllResponse.next(data);
    });
  }
}
