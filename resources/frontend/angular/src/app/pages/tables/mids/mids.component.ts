import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { Mid } from './mid.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { MidsService } from './mids.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/api.service';
import { Notyf } from 'notyf';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModel } from '../../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'fury-mids',
  templateUrl: './mids.component.html',
  styleUrls: ['./mids.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MidsComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<Mid[]> = new ReplaySubject<Mid[]>(1);
  data$: Observable<Mid[]> = this.subject$.asObservable();
  mids: Mid[];

  getSubscription: Subscription;
  refreshSubscription: Subscription;
  getProductsSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  all_fields = [];
  all_values = [];
  filterData: any = [];
  filters = {};
  endPoint = '';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  notyf = new Notyf({ types: [{ type: 'info', background: '#6495ED', icon: '<i class="fa-solid fa-clock"></i>' }] });

  @Input()
  columns: ListColumn[] = [

    { name: 'Actions', property: 'actions', visible: true },
    { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    // { name: 'router_id', property: 'router_id', visible: true, isModelProperty: true },
    { name: 'Gateway Id', property: 'gateway_id', visible: true, isModelProperty: true },
    { name: 'Gateway Alias', property: 'gateway_alias', visible: true, isModelProperty: true },
    { name: 'Group Name', property: 'mid_group_name', visible: true, isModelProperty: true },
    { name: 'Router Date In', property: 'router_date_in', visible: false, isModelProperty: true },
    { name: 'Router Desc', property: 'router_desc', visible: false, isModelProperty: true },
    { name: 'Mid Group Setting Id', property: 'mid_group_setting_id', visible: false, isModelProperty: true },
    { name: 'Mid Group Setting', property: 'mid_group_setting', visible: false, isModelProperty: true },
    { name: 'Strict Preserve', property: 'is_strict_preserve', visible: false, isModelProperty: true },
    { name: 'Campaign Id', property: 'campaign_id', visible: false, isModelProperty: true },
    { name: 'Global Monthly Cap', property: 'global_monthly_cap', visible: true, isModelProperty: true },
    { name: 'Current Monthly Amount', property: 'current_monthly_amount', visible: true, isModelProperty: true },
    { name: 'Processing Percent', property: 'processing_percent', visible: true, isModelProperty: true },
    { name: '3d Routed', property: 'is_three_d_routed', visible: false, isModelProperty: true },
    { name: 'Created On', property: 'created_on', visible: true, isModelProperty: true },

  ] as ListColumn[];
  // pageSize = 20000;
  dataSource: MatTableDataSource<Mid> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MidGroupsComponent, { static: true }) MidGroupComponent: MidGroupsComponent;

  constructor(private dialog: MatDialog, private midsService: MidsService, private apiService: ApiService, private router: Router) {
    this.endPoint = environment.endpoint;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.refreshSubscription = this.midsService.refreshResponse$.subscribe(data => this.manageRefreshResponse(data))
    // this.getProductsSubscription = this.midsService.getProductsResponse$.subscribe(data => this.manageProductsResponse(data))

    this.getData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((mids) => {
      this.mids = mids;
      this.dataSource.data = mids;
    });
  }

  mapData() {
    return of(this.mids.map(mid => new Mid(mid)));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log(this.pageSize)
    console.log(this.currentPage)
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.midsService.getMids()
      .then(mids => {
        console.log('paginate data is: ', mids.data);
        this.mids = mids.data
        this.mapData().subscribe(mids => {
          this.subject$.next(mids);
        });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  async getDropData() {
    const response = fetch(`${this.endPoint}/api/getDropDownContent`)
      .then(res => res.json()).then((data) => {
        this.filterData = data;
        console.log('Drop Data is: ', this.filterData);
      });
  }

  manageGetResponse(mids) {
    if (mids.status) {
      this.mids = mids.data;
      this.dataSource.data = mids.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  manageRefreshResponse(data) {
    if (data.status) {
      this.notyf.success(data.data.new_mids + ' New Mids Found and ' + data.data.updated_mids + ' Mids Updated');
      this.getData();
    }
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  viewMidDetails(alias){
    this.router.navigate(['mid-view', alias]);
  }

  refresh() {
    this.isLoading = true;
    this.midsService.refresh();
  }

  handleDeleteAction(alias) {
    const dialogData = new ConfirmationDialogModel('Confirm Delete', 'In Progress...');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.midsService.deleteData(alias);
        // this.isLoading = true;
        // this.dataSource.data = [];
        // this.idArray = [];
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.midsService.refreshResponse.next([]);
      this.refreshSubscription.unsubscribe();
    }
  }
}