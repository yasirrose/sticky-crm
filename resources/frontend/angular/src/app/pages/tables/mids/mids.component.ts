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

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { MidsService } from './mids.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ApiService } from 'src/app/api.service';


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

  //customer coding
  getSubscription: Subscription;
  getCampaignsSubscription: Subscription;
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
  fontStyleControl = new FormControl('mids');
  fontStyle?: string;

  @Input()
  columns: ListColumn[] = [

    // { name: 'Actions', property: 'actions', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'router_id', property: 'router_id', visible: true, isModelProperty: true },
    { name: 'gateway_alias', property: 'gateway_alias', visible: true, isModelProperty: true },
    { name: 'router_date_in', property: 'router_date_in', visible: true, isModelProperty: true },
    { name: 'router_desc', property: 'router_desc', visible: true, isModelProperty: true },
    { name: 'mid_group_setting_id', property: 'mid_group_setting_id', visible: false, isModelProperty: true },
    { name: 'mid_group_setting', property: 'mid_group_setting', visible: false, isModelProperty: true },
    { name: 'is_three_d_routed', property: 'is_three_d_routed', visible: true, isModelProperty: true },
    { name: 'is_strict_preserve', property: 'is_strict_preserve', isModelProperty: true },
    { name: 'created_on', property: 'created_on', visible: true, isModelProperty: true },
    { name: 'campaign_id', property: 'campaign_id', visible: true, isModelProperty: true },
    { name: 'gateway_id', property: 'gateway_id', visible: true, isModelProperty: true },
    { name: 'global_monthly_cap', property: 'global_monthly_cap', visible: true, isModelProperty: true },
    { name: 'current_monthly_amount', property: 'current_monthly_amount', visible: true, isModelProperty: true },
    { name: 'processing_percent', property: 'processing_percent', visible: true, isModelProperty: true },

  ] as ListColumn[];
  // pageSize = 20000;
  dataSource: MatTableDataSource<Mid> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private midsService: MidsService, private apiService: ApiService) {
    this.endPoint = environment.endpoint;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    // this.getCampaignsSubscription = this.midsService.getCampaignsResponse$.subscribe(data => this.manageCampaignsResponse(data))
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
        // this.dataSource.data = mids.data;
        // setTimeout(() => {
        //   this.paginator.pageIndex = this.currentPage;
        //   this.paginator.length = mids.pag.count;
        // });
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
      // setTimeout(() => {
      //   this.paginator.pageIndex = this.currentPage;
      //   this.paginator.length = mids.pag.count;
      // });
      this.isLoading = false;
    } else {
      this.isLoading = false;
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

  // openDialog(id) {
  //   const dialogRef = this.dialog.open(ProductDetailComponent, {
  //     data: { id: id }
  //   });
  //   dialogRef.updateSize('1000px');
  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }
  ngOnDestroy() {
  }
}