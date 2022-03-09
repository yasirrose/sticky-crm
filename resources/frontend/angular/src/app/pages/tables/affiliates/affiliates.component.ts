import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { Affiliate } from './affiliates.model';
import { AffiliatesService } from './affiliates.service';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Notyf } from 'notyf';


@Component({
  selector: 'fury-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class AffiliatesComponent implements OnInit {
  networks: [];

  //customer coding
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
  // @Input() public customerId;
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: true },
    { name: 'Affiliate Id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Email', property: 'email', visible: true, isModelProperty: true },
    { name: 'First Name', property: 'first_name', visible: true, isModelProperty: true },
    { name: 'Last Name', property: 'last_name', visible: true, isModelProperty: true },
    { name: 'Phone', property: 'phone', visible: true, isModelProperty: true },
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

  ngOnInit(): void {
    // this.getSubscription = this.networkService.customersGetResponse$.subscribe(data => this.manageGetResponse(data));
    // this.deleteSubscription = this.networkService.deleteResponse$.subscribe(data => this.manageDeleteResponse(data));
    this.getData();
    this.dataSource = new MatTableDataSource();
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
      .then(networks => {
        this.allIdArray = [];
        this.networks = networks.data;
        this.dataSource.data = networks.data;
        setTimeout(() => {
          // this.paginator.pageIndex = this.currentPage;
          // this.paginator.length = networks.pag.count;
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
      // this.networkService.deleteResponse.next([]);
      // this.deleteSubscription.unsubscribe();
    }
  }
}