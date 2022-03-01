import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { FormGroup, FormControl } from '@angular/forms';
import { SticketDaily } from './sticket-daily.model';
import { SticketDailyService } from './sticket-daily.service';
import { CampaignService } from './../campaign.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { Notyf } from 'notyf';

@Component({
  selector: 'fury-sticket-daily',
  templateUrl: './sticket-daily.component.html',
  styleUrls: ['./sticket-daily.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class SticketDailyComponent implements OnInit {

  subject$: ReplaySubject<SticketDaily[]> = new ReplaySubject<SticketDaily[]>(1);
  data$: Observable<SticketDaily[]> = this.subject$.asObservable();
  tickets: SticketDaily[];

  //customer coding
  getSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filters = {};
  notyf = new Notyf({ types: [{ type: 'info', background: '#6495ED', icon: '<i class="fa-solid fa-clock"></i>' }] });

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Date', property: 'date', visible: true, isModelProperty: true },
    // { name: 'Year', property: 'year', visible: true, isModelProperty: false },
    { name: 'Initials', property: 'initials', visible: true, isModelProperty: true },
    { name: 'Decline', property: 'decline', visible: true, isModelProperty: true },
    { name: 'Decline %', property: 'decline_percentage', visible: true, isModelProperty: true },
    { name: 'Scrub %', property: 'scrub_per', visible: true, isModelProperty: true },
    { name: 'EOT Declines', property: 'EOT_declines', visible: true, isModelProperty: true },
    { name: 'EOT Approved', property: 'EOT_approved', visible: true, isModelProperty: true },
    { name: 'EOT %', property: 'EOT_per', visible: true, isModelProperty: true },

  ] as ListColumn[];
  dataSource: MatTableDataSource<SticketDaily> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private goldenTicketService: SticketDailyService, private campaignService: CampaignService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.getSubscription = this.campaignService.sticketDailyResponse$.subscribe(data => this.manageGetResponse(data));
    this.getData();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((tickets) => {
      this.tickets = tickets;
      this.dataSource.data = tickets;
    });
  }

  mapData() {
    return of(this.tickets.map(ticket => new SticketDaily(ticket)));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    await this.campaignService.getDailySticket()
      .then(tickets => {
        this.tickets = tickets.data;
        this.dataSource.data = tickets.data;
        setTimeout(() => {
          // this.paginator.pageIndex = this.currentPage;
          // this.paginator.length = tickets.pag.count;
        });
        this.mapData().subscribe(tickets => {
          this.subject$.next(tickets);
        });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  manageGetResponse(tickets) { }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  async refreshToday() {
    this.notyf.open({ type: 'info', message: 'Records will be refreshed soon...' });
    this.isLoading = true;
    await this.campaignService.refreshDailySticket()
      .then(tickets => {
        this.tickets = tickets.data;
        this.dataSource.data = tickets.data;
        this.notyf.success('Records are updated successfully');
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  async refreshAll() {
    this.notyf.open({ type: 'info', message: 'Records will be refreshed soon...' });
    this.isLoading = true;
    await this.campaignService.refreshAllDailySticket()
      .then(tickets => {
        this.tickets = tickets.data;
        this.dataSource.data = tickets.data;
        this.notyf.success('Records are updated successfully');
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
  }
}