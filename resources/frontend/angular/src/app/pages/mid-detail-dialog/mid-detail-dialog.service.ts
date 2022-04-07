import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class MidDialogDetailService {

    detail: any;
  constructor(private apiService: ApiService) { }

  async getMidCountDetail(filters): Promise<any> {
    await this.apiService.getData(`get_mid_count_detail?gateway_id=${filters.gateway_id}&start_date=${filters.start}&end_date=${filters.end}`)
      .then(res => res.json()).then((data) => {
        this.detail = data;
      });
    return this.detail;
  }
}