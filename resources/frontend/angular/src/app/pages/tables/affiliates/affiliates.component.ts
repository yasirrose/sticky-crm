import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject, observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { FormGroup, FormControl } from '@angular/forms';
import { Affiliate } from './affiliates.model';
import { AffiliatesService } from './affiliates.service';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Notyf } from 'notyf';

@Component({
  selector: 'fury-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class AffiliatesComponent implements OnInit {
  subject$: ReplaySubject<Affiliate[]> = new ReplaySubject<Affiliate[]>(1);
  data$: Observable<Affiliate[]> = this.subject$.asObservable();

  affiliates: Affiliate[];
  getSubscription: Subscription;
  deleteSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filters = {};
  address = [];
  search = '';
  notyf = new Notyf();
  name: string;
  id: number;
  idArray = [];
  allIdArray = [];
  timer: any;
  isChecked = false;

  @Input()
  columns: ListColumn[] = [
    { name: 'Network Affiliate Id', property: 'network_affiliate_id', visible: true, isModelProperty: true },
    { name: 'Network Id', property: 'network_id', visible: true, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Account Status', property: 'account_status', visible: true, isModelProperty: true },
    { name: 'Network Employee Id', property: 'network_employee_id', visible: true, isModelProperty: true },
    { name: 'Internal Notes', property: 'internal_notes', visible: true, isModelProperty: true },
    { name: 'Has Notifications', property: 'has_notifications', visible: true, isModelProperty: true },
    { name: 'Network Traffic Source Id', property: 'network_traffic_source_id', visible: true, isModelProperty: true },
    { name: 'Account Executive Id', property: 'account_executive_id', visible: true, isModelProperty: true },
    { name: 'Adress Id', property: 'adress_id', visible: true, isModelProperty: true },
    { name: 'Default Currency Id', property: 'default_currency_id', visible: true, isModelProperty: true },
    { name: 'Is Contact Address Enabled', property: 'is_contact_address_enabled', visible: true, isModelProperty: true },
    { name: 'Enable Media Cost Tracking Links', property: 'enable_media_cost_tracking_links', visible: true, isModelProperty: true },
    { name: 'Time Created', property: 'time_created', visible: true, isModelProperty: true },
    { name: 'Time Saved', property: 'time_saved', visible: true, isModelProperty: true },
    { name: 'Relationship', property: 'relationship', visible: true, isModelProperty: true },
    { name: 'Referrer Id', property: 'referrer_id', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },

  ] as ListColumn[];
  dataSource: MatTableDataSource<Affiliate>;
  selection = new SelectionModel<Affiliate>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private affiliatesService: AffiliatesService) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  mapData() {
    return of(this.affiliates.map(midGroup => new Affiliate(midGroup)));
  }

  ngOnInit(): void {
    // this.getSubscription = this.affiliateservice.customersGetResponse$.subscribe(data => this.manageGetResponse(data));
    // this.deleteSubscription = this.affiliateservice.deleteResponse$.subscribe(data => this.manageDeleteResponse(data));

    this.getData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((affiliates) => {
      this.affiliates = affiliates;
      this.dataSource.data = affiliates;
    });
  }

  ngAfterViewInit(): void {
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
    this.isChecked = false;
    this.filters = {
      "currentPage": this.currentPage,
      "pageSize": this.pageSize,
      "search": this.search,
    }
    await this.affiliatesService.getAffiliates()
      .then(affiliates => {
        this.allIdArray = [];
        this.affiliates = affiliates.data;
        this.dataSource.data = affiliates.data;
        this.mapData().subscribe(affiliates => {
          this.subject$.next(affiliates);
        });
        setTimeout(() => {
          // this.paginator.pageIndex = this.currentPage;
          // this.paginator.length = affiliates.pag.count;
        });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      // this.affiliateservice.deleteResponse.next([]);
      // this.deleteSubscription.unsubscribe();
    }
  }
}