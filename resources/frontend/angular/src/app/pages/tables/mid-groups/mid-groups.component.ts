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
import { MidsDetailComponent } from './mids-detail/mids-detail.component';

@Component({
  selector: 'fury-mid-groups',
  templateUrl: './mid-groups.component.html',
  styleUrls: ['./mid-groups.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MidGroupsComponent implements OnInit {

  subject$: ReplaySubject<MidGroup[]> = new ReplaySubject<MidGroup[]>(1);
  data$: Observable<MidGroup[]> = this.subject$.asObservable();
  midGroups: any;

  getSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  all_fields = [];
  all_values = [];
  filterData: any = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  toolTipMids: [];

  @Input()
  columns: ListColumn[] = [

    // { name: 'Actions', property: 'actions', visible: true },
    // { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    // { name: 'router_id', property: 'router_id', visible: true, isModelProperty: true },
    { name: 'Group Name', property: 'group_name', visible: true, isModelProperty: true },
    { name: 'Assigned Mids', property: 'assigned_mids', visible: true, isModelProperty: false },
    { name: 'Gross Revenue', property: 'gross_revenue', visible: true, isModelProperty: true },
    { name: 'Bank %', property: 'bank_per', visible: true, isModelProperty: true },
    { name: 'Target Bank Balance', property: 'target_bank_balance', visible: true, isModelProperty: true },
    { name: 'Updated_at', property: 'updated_at', visible: true, isModelProperty: true },

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
    this.getSubscription = this.midGroupService.getResponse$
      .subscribe(data => this.manageGetResponse(data));
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

  async getData() {
    this.isLoading = true;
    await this.midGroupService.getMidGroups()
      .then(midGroups => {
        console.log('paginate data is: ', midGroups.data);
        this.midGroups = midGroups.data;
        this.dataSource.data = midGroups.data;
        this.mapData().subscribe(midGroups => {
          this.subject$.next(midGroups);
        });
        // for (let i = 0; i < this.midGroups.length; i++) {
        //   this.midGroups[i].mids_data.forEach(function (mid) {
        //     this.toolTipMids[0] = mid.alias;
        //   });
        //   console.log('this.toolTipMids :', this.toolTipMids);
        // }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }

  manageGetResponse(data) {
    console.log('manage get data :', data);
    this.midGroups = data.data;
    console.log('mange get this.midGroups :', this.midGroups);
    for (let i = 0; i < this.midGroups.length; i++) {
      this.midGroups[i].mids_data.forEach(function (mid) {
        this.toolTipMids[i] = mid.alias;
      });
    }
    console.log('manage status true this.toolTipMids :', this.toolTipMids);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  refresh() {

    console.log('refreshed');
  }

  openDialog(mids) {
    const dialogRef = this.dialog.open(MidsDetailComponent, {
      data: { mids: mids }
    });
    // dialogRef.updateSize('1000px');
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
  }
}