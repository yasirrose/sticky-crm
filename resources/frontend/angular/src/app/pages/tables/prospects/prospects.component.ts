import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { Prospect } from './prospect.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { ProspectsService } from './prospects.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../../../../environments/environment';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ApiService } from 'src/app/api.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'fury-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ProspectsComponent implements OnInit {
  subject$: ReplaySubject<Prospect[]> = new ReplaySubject<Prospect[]>(1);
  data$: Observable<Prospect[]> = this.subject$.asObservable();
  prospects: Prospect[];

  //customer coding
  getSubscription: Subscription;
  getCampaignsSubscription: Subscription;
  getProductsSubscription: Subscription;
  deleteSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  all_fields = [];
  all_values = [];
  filterData: any = [];
  filters = {};
  endPoint = '';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  notyf = new Notyf({ types: [{ type: 'info', background: '#6495ED', icon: '<i class="fa-solid fa-clock"></i>' }] });


  //mat date range selector
  selected = "transactionCreatedDate";
  campaign = "allCampaigns";
  campaignCategory = "allCategories";
  product = "allProducts";
  productCategory = "allCategories";
  campaignProduct = "allCampaignProducts";
  affiliate = "allAffiliates";
  callCenter = "allCallCenters";
  billType = "allBillings";
  billingCycle = "all";
  recycleNo = "all";
  txnType = "all";
  currency = "allCurrencies";
  country = "allCountries";
  state = "allStates";
  gateway = "all";
  ccType = "all";
  is_3d_protected = "all";
  gatewayCategory = "allGatewayCategories";
  gatewayType = "all";
  creditOrDebit = "all";

  campaignOptions: [];
  productOptions: [];
  search= '';
  timer : any;
  cardOptions: string[] = ['visa', 'master'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // stateOptions: any = (states as any).default;

  @Input()
  columns: ListColumn[] = [
    { name: 'Actions', property: 'actions', visible: true },
    { name: 'Id', property: 'id', isModelProperty: true },
    // { name: 'campaign_id', property: 'campaign_id', visible: true, isModelProperty: false },
    { name: 'First Name', property: 'first_name', visible: true, isModelProperty: true },
    { name: 'Last Name', property: 'last_name', visible: true, isModelProperty: true },
    { name: 'Email', property: 'email', visible: true, isModelProperty: true },
    { name: 'Address', property: 'address', visible: true, isModelProperty: true },
    // { name: 'address2', property: 'address2', visible: true, isModelProperty: true },
    { name: 'City', property: 'city', visible: true, isModelProperty: true },
    { name: 'State Id', property: 'state_id', visible: true, isModelProperty: true },
    { name: 'Zip', property: 'zip', visible: true, isModelProperty: true },
    { name: 'Country', property: 'country', visible: true, isModelProperty: true },
    { name: 'Ip Address', property: 'ip_address', visible: true, isModelProperty: true },
    // { name: 'Month Created', property: 'month_created', visible: true, isModelProperty: true },
    // { name: 'Year Created', property: 'year_created', visible: true, isModelProperty: true },
    // { name: 'Date Created', property: 'date_created ', visible: true, isModelProperty: true },
    { name: 'Risk Flag', property: 'risk_flag', visible: true, isModelProperty: true },
    { name: 'Affiliate', property: 'affiliate', visible: true, isModelProperty: true },
    { name: 'Sub Affiliate', property: 'sub_affiliate', visible: true, isModelProperty: true },
    // { name: 'notes', property: 'notes', visible: true, isModelProperty: true },
  ] as ListColumn[];
  // pageSize = 20000;
  dataSource: MatTableDataSource<Prospect> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private prospectsService: ProspectsService, private apiService: ApiService) {
    this.endPoint = environment.endpoint;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    // this.prospectsService.getCampaigns();
    // this.prospectsService.getProducts();
    // this.getCampaignsSubscription = this.prospectsService.getProspectResponse$.subscribe(data => this.manageCampaignsResponse(data))
    this.deleteSubscription = this.prospectsService.deleteResponse$.subscribe(data => this.manageDeleteResponse(data));
    // this.getProductsSubscription = this.prospectsService.getProductsResponse$.subscribe(data => this.manageProductsResponse(data))

    this.getData();
    // this.getDropData();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((prospects) => {
      this.prospects = prospects;
      this.dataSource.data = prospects;
    });
  }
  mapData() {
    return of(this.prospects.map(prospect => new Prospect(prospect)));
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
    this.filters = {
      "currentPage": this.currentPage,
      "pageSize": this.pageSize,
      "start": formatDate(this.range.get('start').value, 'yyyy/MM/dd', 'en'),
      "end": formatDate(this.range.get('end').value, 'yyyy/MM/dd', 'en'),
      'all_fields': this.all_fields,
      'all_values': this.all_values,
      'search': this.search
    }
    this.prospectsService.getProspects(this.filters)
      .then(prospects => {
        console.log('paginate data is: ', prospects.data.data);
        this.prospects = prospects.data.data;
        // this.dataSource.data = prospects.data.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = prospects.pag.count;
        });
        this.mapData().subscribe(prospects => {
          this.subject$.next(prospects);
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

  manageGetResponse(prospects) {
    if (prospects.status) {
      this.prospects = prospects.data.data;
      this.dataSource.data = prospects.data.data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = prospects.pag.count;
      });
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  manageDeleteResponse(data) {
    if (data.status) {
      this.notyf.success(data.message);
      this.getData();
    }
    // else if(!data.status) {
    //   this.notyf.error(data.message);
    // }
  }

  manageCampaignsResponse(data) {
    if (data.status) {
      this.campaignOptions = data.data;
    }
    console.log('campaign data', this.campaignOptions);
  }

  manageProductsResponse(data) {
    if (data.status) {
      this.productOptions = data.data;
    }
    console.log('campaign data', this.productOptions);
  }

  onFilterChange(value) {
    // if (!this.dataSource) {
    //   return;
    // }
    // value = value.trim();
    // value = value.toLowerCase();
    // this.dataSource.filter = value
    value = value.toLowerCase();
    this.search = value;
    clearTimeout(this.timer); 
    this.timer = setTimeout(() => { this.getData() }, 500)
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

  deleteProspect(id) {
    this.prospectsService.deleteProposal(id);
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
    if (this.deleteSubscription) {
      this.prospectsService.deleteResponse.next([]);
      this.deleteSubscription.unsubscribe();
    }
  }
}