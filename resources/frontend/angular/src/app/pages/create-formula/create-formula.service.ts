import { Injectable } from '@angular/core';
import { ApiService }  from 'src/app/api.service';
import {BehaviorSubject} from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CreateFormulaService {

  public saveFormulaResponse = new BehaviorSubject({});
  public getCampaignsResponse = new BehaviorSubject([]);
  public getCampaignsColumnsResponse = new BehaviorSubject([]);

  saveFormulaResponse$ = this.saveFormulaResponse.asObservable();
  getCampaignsResponse$ = this.getCampaignsResponse.asObservable();
  getCampaignsColumnsResponse$ = this.getCampaignsColumnsResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async saveFormula(data):Promise<any> {
    await this.apiService.postData('formulas',data).then(res=> res.json()).then((data) =>{
        this.saveFormulaResponse.next(data);
    });
  } 
  async getCampaigns():Promise<any> {
    await this.apiService.getData(`get_campaigns`).then(res=> res.json()).then((data) =>{
        this.getCampaignsResponse.next(data);
   });
  }
  async getCampaignColumns(campaign):Promise<any> {
    await this.apiService.getData(`get_campaign_columns/${campaign}`).then(res=> res.json()).then((data) =>{
        this.getCampaignsColumnsResponse.next(data);
   });
  }
  // async deleteProduct(id):Promise<any> {
  //   await this.apiService.deleteData(`product_info/${id}`).then(res=> res.json()).then((data) =>{
  //       this.userInfoDeleteResponse.next(data);
  //  });
  // }
  // async updateProduct(data):Promise<any> {
  //   await this.apiService.updateData(`product_info/${data[0].id}`, data[0]).then(res=> res.json()).then((data) =>{
  //       this.userInfoUpdateResponse.next(data);
  //  });
  // }
}
