import { Injectable } from '@angular/core';
import { ApiService }  from 'src/app/api.service';
// import {BehaviorSubject} from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private apiService: ApiService, private location: Location){}

  logout() {
    this.location.replaceState('/logout');
    this.apiService.logout();
  }
}
