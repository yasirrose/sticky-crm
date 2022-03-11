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
  public refreshResponse = new BehaviorSubject([]);

  getResponse$ = this.getResponse.asObservable();
  refreshResponse$ = this.refreshResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMidGroups(): Promise<any> {
    await this.apiService.getData(`mid-groups`).then(res => res.json()).then((data) => {
        this.midGroups = data;
        this.getResponse.next(data);
      });
    return this.midGroups;
  }

  async refresh(): Promise<any> {
    await this.apiService.getData(`refresh_mids_groups`).then(res => res.json()).then((data) => {
      this.refreshResponse.next(data);
    });
  }
}
