import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModel } from '../../confirmation-dialog/confirmation-dialog';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { GroupDialogModel } from './group-dialog/group-dialog';
import { MidGroupsComponent } from '../mid-groups/mid-groups.component';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';
import { MidsService } from './mids.service';
import { Mid } from './mid.model';
import { Notyf } from 'notyf';

@Pipe({ name: 'tooltipList' })
export class TooltipListPipe implements PipeTransform {

  transform(lines: string[]): string {
    let list: string = '';
    lines.forEach(line => {
      list += '• ' + line + '\n';
    });
    return list;
  }
}
@Component({
  selector: 'fury-mids',
  templateUrl: './mids.component.html',
  styleUrls: ['./mids.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [MidGroupsComponent],
})
export class MidsComponent implements OnInit, AfterViewInit, OnDestroy {

  subject$: ReplaySubject<Mid[]> = new ReplaySubject<Mid[]>(1);
  data$: Observable<Mid[]> = this.subject$.asObservable();
  mids: Mid[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  getSubscription: Subscription;
  refreshSubscription: Subscription;
  assignSubscription: Subscription;
  unAssignSubscription: Subscription;
  bulkUpdateSubscription: Subscription;
  columnsSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  all_fields = [];
  all_values = [];
  filterData: any = [];
  filters = {};
  endPoint = '';

  skeletonLoader = true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  notyf = new Notyf({ types: [{ type: 'info', background: '#6495ED', icon: '<i class="fa-solid fa-clock"></i>' }] });
  totalMids: number = 0;
  assignedMids: number = 0;
  unAssignedMids: number = 0;
  unInitializedMids: number = 0;
  selectedRows: Mid[] = [];
  selectAll: boolean = false;
  isBulkUpdate: boolean = false;
  columns: any = [];

  // @Input()

  // columns: ListColumn[] = [
  // { name: 'Checkbox', property: 'checkbox', visible: true },
  // { name: 'Id', property: 'id', visible: false, isModelProperty: false },
  // // { name: 'router_id', property: 'router_id', visible: true, isModelProperty: true },
  // { name: 'Gateway Id', property: 'gateway_id', visible: true, isModelProperty: true },
  // { name: 'Gateway Alias', property: 'gateway_alias', visible: true, isModelProperty: true },
  // { name: 'Group Name', property: 'mid_group_name', visible: true, isModelProperty: false },
  // { name: 'Mid Count', property: 'mid_count', visible: true, isModelProperty: false },
  // { name: 'Router Date In', property: 'router_date_in', visible: false, isModelProperty: true },
  // { name: 'Router Desc', property: 'router_desc', visible: false, isModelProperty: true },
  // { name: 'Mid Group Setting Id', property: 'mid_group_setting_id', visible: false, isModelProperty: true },
  // { name: 'Mid Group Setting', property: 'mid_group_setting', visible: false, isModelProperty: true },
  // { name: 'Strict Preserve', property: 'is_strict_preserve', visible: false, isModelProperty: true },
  // { name: 'Campaign Id', property: 'campaign_id', visible: false, isModelProperty: true },
  // { name: 'Global Monthly Cap', property: 'global_monthly_cap', visible: true, isModelProperty: true },
  // { name: 'Current Monthly Amount', property: 'current_monthly_amount', visible: true, isModelProperty: false },
  // { name: 'Processing Percent', property: 'processing_percent', visible: true, isModelProperty: true },
  // { name: '3d Routed', property: 'is_three_d_routed', visible: false, isModelProperty: true },
  // { name: 'Created On', property: 'created_on', visible: true, isModelProperty: true },
  // { name: 'Actions', property: 'actions', visible: true },

  // ] as ListColumn[];
  // pageSize = 20000;
  dataSource: MatTableDataSource<Mid> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MidGroupsComponent) MidGroupsComponent: MidGroupsComponent;

  // @ViewChild(MidGroupsComponent, { static: true }) MidGroupComponent: MidGroupsComponent;

  constructor(private dialog: MatDialog, private midsService: MidsService, private apiService: ApiService, private router: Router, public midGroupComponent: MidGroupsComponent) {
    this.endPoint = environment.endpoint;
  }

  ngOnInit() {
    this.notyf.dismissAll();
    this.refreshSubscription = this.midsService.refreshResponse$.subscribe(data => this.manageRefreshResponse(data))
    this.assignSubscription = this.midsService.assignGroupResponse$.subscribe(data => this.manageAssignResponse(data))
    this.unAssignSubscription = this.midsService.unAssignGroupResponse$.subscribe(data => this.manageUnassignResponse(data))
    this.unAssignSubscription = this.midsService.assignBulkGroupResponse$.subscribe(data => this.manageBulkGroupResponse(data))
    // this.columnsSubscription = this.midsService.columnsResponse$.subscribe(data => this.manageColumnsResponse(data))

    this.getData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((mids) => {
      this.mids = mids;
      this.dataSource.data = mids;
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
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

  async getData() {
    this.isLoading = true;
    this.filters = {
      "start": formatDate(this.range.get('start').value, 'yyyy/MM/dd', 'en'),
      "end": formatDate(this.range.get('end').value, 'yyyy/MM/dd', 'en'),
    }
    await this.midsService.getColumns().then(columns => {
      this.columns = columns.data;
      console.log('this.columns :', this.columns);
    });
    await this.midsService.getMids(this.filters).then(mids => {
      console.log('paginate data is: ', mids.data);
      this.mids = mids.data
      this.totalMids = mids.data.length
      console.log(' this.totalMids :', this.totalMids);
      this.mapData().subscribe(mids => {
        this.subject$.next(mids);
      });
      this.skeletonLoader = false;
      this.isLoading = false;
      this.selectAll = false;
      this.isBulkUpdate = false;
      this.selectedRows = [];
    }, error => {
      this.skeletonLoader = false;
      this.isLoading = false;
    });
    this.countContent();
  }

  countContent() {
    this.assignedMids = 0;
    this.unAssignedMids = 0;
    this.unInitializedMids = 0;

    this.mids.forEach((mid) => {
      if (mid.current_monthly_amount == '0.00') {
        this.unInitializedMids++;
      }
      else if (!mid.mid_group_name) {
        this.unAssignedMids++;
      } else {
        this.assignedMids++;
      }
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

  manageAssignResponse(data) {
    if (data.status) {
      this.getData();
      this.notyf.success(data.message);
      this.midGroupComponent.refresh();
    }
  }

  manageUnassignResponse(data) {
    if (data.status) {
      this.getData();
      this.notyf.success(data.message);
      this.midGroupComponent.refresh();
    }
  }

  manageBulkGroupResponse(data) {
    if (data.status) {
      this.getData();
      this.notyf.success(data.message);
      this.midGroupComponent.refresh();
      this.isBulkUpdate = false;
    }
  }

  // manageColumnsResponse(data) {
  //   if (data.status) {
  //     this.columns = data.data;
  //     console.log('this.columns  :', this.columns);
  //   }
  // }

  manageRefreshResponse(data) {
    if (data.status) {
      this.notyf.success(data.data.new_mids + ' New Mids Found and ' + data.data.updated_mids + ' Mids Updated');
      this.getData();
      this.midGroupComponent.refresh();
    }
  }

  onFilterChange(value) {
    console.log('value :', value);
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  viewMidDetails(alias) {
    this.router.navigate(['mid-view', alias]);
  }

  refresh() {
    this.isLoading = true;
    this.midsService.refresh();
  }

  handleDeleteAction(alias) {
    const dialogData = new ConfirmationDialogModel('Confirm Delete', 'Are you sure to remove this from group?');
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
  selectDate(param) {
    var startDate = new Date();
    var endDate = new Date();
    if (param == 'today') {
      this.range.get('start').setValue(new Date());
      this.range.get('end').setValue(new Date());
    } else if (param == 'yesterday') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 1)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'thisMonth') {
      this.range.get('start').setValue(new Date(startDate.setMonth(startDate.getMonth() - 1)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'pastWeek') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 7)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'pastTwoWeek') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 14)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'lastMonth') {
      this.range.get('start').setValue(new Date(startDate.setMonth(startDate.getMonth() - 2)));
      this.range.get('end').setValue(new Date(endDate.setMonth(endDate.getMonth() - 1)));
    } else if (param == 'lastThreeMonths') {
      this.range.get('start').setValue(new Date(startDate.setMonth(startDate.getMonth() - 4)));
      this.range.get('end').setValue(new Date(endDate.setMonth(endDate.getMonth() - 1)));
    } else if (param == 'lastSixMonths') {
      this.range.get('start').setValue(new Date(startDate.setMonth(startDate.getMonth() - 7)));
      this.range.get('end').setValue(new Date(endDate.setMonth(endDate.getMonth() - 1)));
    }
  }

  handleBulkDeleteAction() {
    const dialogData = new ConfirmationDialogModel('Confirm Delete', 'Are you sure to remove these mids from group?');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.midsService.assignBulkGroup('', this.selectedRows);
        this.selectedRows = [];
      }
    });
  }

  openAssignDialog(alias) {
    const dialogData = new GroupDialogModel('Assign New Group to: ' + alias, 'Please select Mid-Group from the following options.', []);
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(groupName => {
      if (groupName) {
        console.log(groupName);
        this.midsService.assignGroup(alias, groupName);
      }
    });
  }

  updateCheck() {
    console.log(this.selectAll);
    if (this.selectAll === true) {
      this.mids.map((mid) => {
        mid.checked = true;
        this.selectedRows.push(mid);
        this.isBulkUpdate = true;
      });

    } else {
      this.mids.map((mid) => {
        mid.checked = false;
        this.isBulkUpdate = false;
      });
      this.selectedRows = [];
      this.isBulkUpdate = false;
    }
  }

  assignBulkGroup() {
    console.log(this.selectedRows);
    const dialogData = new GroupDialogModel('Assign New Group to: ', 'Please select Mid-Group from the following options.', this.selectedRows);
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(groupName => {
      if (groupName) {
        console.log(groupName);
        this.midsService.assignBulkGroup(groupName, this.selectedRows);
        this.selectedRows = [];
      }
    });
  }

  updateCheckedRow(event: any, row) {
    console.log('row :', row.checked);
    if (event.checked) {
      row.checked = true;
      this.selectedRows.push(row);
      console.log(' this.selectedRows :', this.selectedRows);
      this.isBulkUpdate = true;
    } else {
      row.checked = false;
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
      if (this.selectedRows.length === 0) {
        this.isBulkUpdate = false;
      }
    }
  }

  displayChange(event: any, row) {
    console.log('row :', row);
    console.log('event :', event);

  }
  async refreshColumns() {
    await this.midsService.getColumns().then(columns => {
      this.columns = columns.data;
      console.log('this.columns :', this.columns);
    });
  }

  ngOnDestroy() {
    if (this.getSubscription) {
      this.midsService.getResponse.next([]);
      this.getSubscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.midsService.refreshResponse.next([]);
      this.refreshSubscription.unsubscribe();
    }
    if (this.assignSubscription) {
      this.midsService.assignGroupResponse.next([]);
      this.assignSubscription.unsubscribe();
    }
    if (this.bulkUpdateSubscription) {
      this.midsService.unAssignGroupResponse.next([]);
      this.bulkUpdateSubscription.unsubscribe();
    }
  }
}