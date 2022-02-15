import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  data: any;
  gateway: any;
  public ticketsGetResponse = new BehaviorSubject([]);
  public addNewMonthResponse = new BehaviorSubject([]);
  public sticketDailyResponse = new BehaviorSubject([]);
  public sticketWeeklyResponse = new BehaviorSubject([]);
  public sticketMonthlyResponse = new BehaviorSubject([]);

  ticketsGetResponse$ = this.ticketsGetResponse.asObservable();
  addNewMonthResponse$ = this.addNewMonthResponse.asObservable();
  sticketDailyResponse$ = this.sticketDailyResponse.asObservable();
  sticketWeeklyResponse$ = this.sticketWeeklyResponse.asObservable();
  sticketMonthlyResponse$ = this.sticketMonthlyResponse.asObservable();

  constructor(private apiService: ApiService) { }

  async getGoldenTicketData(): Promise<any> {
    await this.apiService.getData('golden-ticket').then(res => res.json()).then((data) => {
      this.data = data;
      this.ticketsGetResponse.next(data);
    });
    return this.data;
  }
  async filterGoldenTicket(month, year): Promise<any> {
    await this.apiService.getData(`filter-golden-ticket/${month}/${year}`).then(res => res.json()).then((data) => {
      this.data = data;
      // this.ticketsGetResponse.next(data);
    });
    return this.data;
  }
  async addCurrentMonth(month, year): Promise<any> {
    await this.apiService.getData(`golden-ticket/create/${month}/${year}`).then(res => res.json()).then((data) => {
      this.data = data;
      this.addNewMonthResponse.next(data);
    });
    return this.data;
  }
  async getDailySticket(): Promise<any> {
    await this.apiService.getData(`STicket-daily`).then(res => res.json()).then((data) => {
      this.data = data;
      this.sticketDailyResponse.next(data);
    });
    return this.data;
  }
  async getWeeklySticket(): Promise<any> {
    await this.apiService.getData(`STicket-weekly`).then(res => res.json()).then((data) => {
      this.data = data;
      this.sticketWeeklyResponse.next(data);
    });
    return this.data;
  }
  async getMonthlySticket(): Promise<any> {
    await this.apiService.getData(`STicket-monthly`).then(res => res.json()).then((data) => {
      this.data = data;
      this.sticketMonthlyResponse.next(data);
    });
    return this.data;
  }
  
}