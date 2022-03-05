import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MidGroup } from './mid-groups.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { MidGroupsService } from './mid-groups.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'fury-mid-groups',
  templateUrl: './mid-groups.component.html',
  styleUrls: ['./mid-groups.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MidGroupsComponent implements OnInit {

  subject$: ReplaySubject<MidGroup[]> = new ReplaySubject<MidGroup[]>(1);
  data$: Observable<MidGroup[]> = this.subject$.asObservable();
  midGroups: MidGroup[];

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
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @Input()
  columns: ListColumn[] = [

    // { name: 'Actions', property: 'actions', visible: true },
    // { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    // { name: 'router_id', property: 'router_id', visible: true, isModelProperty: true },
    { name: 'Group Name', property: 'group_name', visible: true, isModelProperty: true },
    { name: 'Group Alias', property: 'group_alias', visible: true, isModelProperty: true },
    { name: 'Assigned Mids', property: 'assigned_mids', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: true },
    { name: 'Updated_at', property: 'updated_at', visible: true, isModelProperty: true },
    // { name: 'MidGroup Group Setting', property: 'mid_group_setting', visible: false, isModelProperty: true },
    // { name: 'Strict Preserve', property: 'is_strict_preserve', visible: false, isModelProperty: true },
    // { name: 'Campaign Id', property: 'campaign_id', visible: false, isModelProperty: true },
    // { name: 'Global Monthly Cap', property: 'global_monthly_cap', visible: true, isModelProperty: true },
    // { name: 'Current Monthly Amount', property: 'current_monthly_amount', visible: true, isModelProperty: true },
    // { name: 'Processing Percent', property: 'processing_percent', visible: true, isModelProperty: true },
    // { name: '3d Routed', property: 'is_three_d_routed', visible: false, isModelProperty: true },
    // { name: 'Created On', property: 'created_on', visible: true, isModelProperty: true },

  ] as ListColumn[];
  // pageSize = 20000;
  dataSource: MatTableDataSource<MidGroup> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MidGroupsComponent, { static: true }) MidGroupComponent: MidGroupsComponent;

  constructor(private dialog: MatDialog, private midGroupService: MidGroupsService, private apiService: ApiService) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    // this.getCampaignsSubscription = this.midGroupService.getCampaignsResponse$.subscribe(data => this.manageCampaignsResponse(data))
    // this.getProductsSubscription = this.midGroupService.getProductsResponse$.subscribe(data => this.manageProductsResponse(data))

    this.getData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((midGroups) => {
      this.midGroups = midGroups;
      this.dataSource.data = midGroups;
    });
  }

  mapData() {
    return of(this.midGroups.map(midGroup => new MidGroup(midGroup)));
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
    // this.isLoading = true;
    this.midGroupService.getMidGroups()
      .then(midGroups => {
        console.log('paginate data is: ', midGroups.data);
        this.midGroups = midGroups.data
        this.dataSource.data = midGroups.data;
        /* todo: un-comment the above two lines  to get the data*/
        // setTimeout(() => {
        //   this.paginator.pageIndex = this.currentPage;
        //   this.paginator.length = midGroups.pag.count;
        // });
        this.mapData().subscribe(midGroups => {
          this.subject$.next(midGroups);
        });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  manageGetResponse(midGroups) {
    if (midGroups.status) {
      // this.midGroups = midGroups.data;
      // this.dataSource.data = midGroups.data;
      // setTimeout(() => {
      //   this.paginator.pageIndex = this.currentPage;
      //   this.paginator.length = midGroups.pag.count;
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