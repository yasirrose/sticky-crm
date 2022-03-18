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
  public addGroupResponse = new BehaviorSubject([]);
  public deleteGroupResponse = new BehaviorSubject([]);

  getResponse$ = this.getResponse.asObservable();
  refreshResponse$ = this.refreshResponse.asObservable();
  addGroupResponse$ = this.addGroupResponse.asObservable();
  deleteGroupResponse$ = this.deleteGroupResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getMidGroups(filters): Promise<any> {
    await this.apiService.getData(`mid-groups?start_date=${filters.start}&end_date=${filters.end}`).then(res => res.json()).then((data) => {
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
  
  async addGroup(data): Promise<any> {
    await this.apiService.postData(`mid-groups`, data).then(res => res.json()).then((data) => {
      this.addGroupResponse.next(data);
    });
  }

  async updateGroup(data): Promise<any> {
    await this.apiService.updateData(`mid-groups/${data.id}`, data).then(res => res.json()).then((data) => {
      this.addGroupResponse.next(data);
    });
  }

  async deleteGroup(data): Promise<any> {
    await this.apiService.deleteData(`mid-groups/${data.id}`).then(res => res.json()).then((data) => {
      this.deleteGroupResponse.next(data);
    });
  }
  
}
