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
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogModel } from '../../confirmation-dialog/confirmation-dialog';
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
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filters = {};
  address = [];
  networks = [];
  all_fields = [];
  all_values = [];
  search = '';
  notyf = new Notyf();
  name: string;
  id: number;
  idArray = [];
  allIdArray = [];
  timer: any;
  isChecked = false;
  start_date = '';
  end_date = '';
  columns: any = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  @Input()
  // columns: ListColumn[] = [
  //   // { name: 'Checkbox', property: 'checkbox', visible: true },
  //   { name: 'Network Affiliate Id', property: 'network_affiliate_id', visible: true, isModelProperty: true },
  //   { name: 'Network Id', property: 'network_id', visible: true, isModelProperty: true },
  //   { name: 'Name', property: 'name', visible: true, isModelProperty: true },
  //   { name: 'Account Status', property: 'account_status', visible: true, isModelProperty: true },
  //   { name: 'Network Employee Id', property: 'network_employee_id', visible: true, isModelProperty: true },
  //   { name: 'Internal Notes', property: 'internal_notes', visible: false, isModelProperty: true },
  //   { name: 'Has Notifications', property: 'has_notifications', visible: false, isModelProperty: true },
  //   { name: 'Network Traffic Source Id', property: 'network_traffic_source_id', visible: false, isModelProperty: true },
  //   { name: 'Account Executive Id', property: 'account_executive_id', visible: false, isModelProperty: true },
  //   { name: 'Adress Id', property: 'adress_id', visible: false, isModelProperty: true },
  //   { name: 'Default Currency Id', property: 'default_currency_id', visible: true, isModelProperty: true },
  //   { name: 'Is Contact Address Enabled', property: 'is_contact_address_enabled', visible: false, isModelProperty: true },
  //   { name: 'Enable Media Cost Tracking Links', property: 'enable_media_cost_tracking_links', visible: false, isModelProperty: true },
  //   { name: 'Time Created', property: 'time_created', visible: false, isModelProperty: true },
  //   { name: 'Time Saved', property: 'time_saved', visible: false, isModelProperty: true },
  //   { name: 'Relationship', property: 'relationship', visible: false, isModelProperty: true },
  //   { name: 'Referrer Id', property: 'referrer_id', visible: false, isModelProperty: true },
  //   { name: 'Actions', property: 'actions', visible: true },

  // ] as ListColumn[];
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
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    this.isChecked = false;
    if(this.range.get('start').value != null){
      this.start_date = formatDate(this.range.get('start').value, 'yyyy/MM/dd', 'en')
    }
    if(this.range.get('end').value != null){
      this.end_date = formatDate(this.range.get('end').value, 'yyyy/MM/dd', 'en')
    }
    this.filters = {
      "search": this.search,
      "start": this.start_date,
      "end": this.end_date,
      'all_fields': this.all_fields,
      'all_values': this.all_values,
    }
    await this.affiliatesService.getColumns().then(columns => {
      this.columns = columns.data;
    });
    await this.affiliatesService.getAffiliates(this.filters)
    .then(affiliates => {
      this.allIdArray = [];
      this.affiliates = affiliates.data.affiliates;
      this.dataSource.data = affiliates.data.affiliates;
      this.networks = affiliates.data.networks;
      console.log('Affiliates are ',this.affiliates)
        this.mapData().subscribe(affiliates => {
          this.subject$.next(affiliates);
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
  commonFilter(value, field) {
    if (this.all_fields.indexOf(field) === -1) {
      this.all_fields.push(field);
      this.all_values.push(value);
    } else {
      let index = this.all_fields.indexOf(field);
      this.all_values[index] = value;
    }
    // this.getData();
  }


  viewDetails(id){
    console.log(id);
  }

  handleDeleteAction(id) {
    const dialogData = new ConfirmationDialogModel('Confirm Delete', 'Are you sure you want to delete this redord?');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      disableClose: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.affiliatesService.deleteData(id);
        this.getData();
        this.notyf.success('Affiliate deleted successfuly!');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      // this.affiliateservice.deleteResponse.next([]);
      // this.deleteSubscription.unsubscribe();
    }
  }
  selectDate(param) {
    var startDate = new Date();
    var endDate = new Date();
    if (param == 'today') {
      this.range.get('start').setValue(new Date());
      this.range.get('end').setValue(new Date());
    } else if (param == 'yesterday') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 1)));
      this.range.get('end').setValue(new Date(endDate.setDate(endDate.getDate() - 1)));
    } else if (param == 'thisMonth') {
      this.range.get('start').setValue(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
      this.range.get('end').setValue(new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0));
    } else if (param == 'pastWeek') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 7)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'pastTwoWeek') {
      this.range.get('start').setValue(new Date(startDate.setDate(startDate.getDate() - 14)));
      this.range.get('end').setValue(new Date());
    } else if (param == 'lastMonth') {
      this.range.get('start').setValue(new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1));
      this.range.get('end').setValue(new Date(endDate.getFullYear(), endDate.getMonth(), 0));
    } else if (param == 'lastThreeMonths') {
      this.range.get('start').setValue(new Date(startDate.getFullYear(), startDate.getMonth() - 3, 1));
      this.range.get('end').setValue(new Date(endDate.getFullYear(), endDate.getMonth(), 0));
    } else if (param == 'lastSixMonths') {
      this.range.get('start').setValue(new Date(startDate.getFullYear(), startDate.getMonth() - 6, 1));
      this.range.get('end').setValue(new Date(endDate.getFullYear(), endDate.getMonth(), 0));
    }
  }
}
