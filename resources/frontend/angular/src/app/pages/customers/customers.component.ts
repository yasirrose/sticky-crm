import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from '../../../@fury/shared/list/list-column.model';
// import { Order } from './order.model';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { CustomersService } from './customers.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@Component({
  selector: 'fury-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit, OnDestroy {

  // subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  // data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: [];

  //customer coding
  getSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filters = {};
  address = [];


  @Input()
  // @Input() public customerId;
  
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: true },
    { name: 'Customer Id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Email', property: 'email', visible: true, isModelProperty: true },
    { name: 'First Name', property: 'first_name', visible: true, isModelProperty: true },
    { name: 'Last Name', property: 'last_name', visible: true, isModelProperty: true },
    { name: 'Phone', property: 'phone', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<null>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private customersService: CustomersService) { }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {
    this.getSubscription = this.customersService.customersGetResponse$
      .subscribe(data => this.manageGetResponse(data));
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
    this.filters = {
      "currentPage": this.currentPage,
      "pageSize": this.pageSize,
    } 
    await this.customersService.getCustomers(this.filters)
      .then(customers => {
        this.customers = customers.data;
        this.dataSource.data = customers.data;
        console.log('Customers data is: ', customers.data);
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = customers.pag.count;
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
  manageGetResponse(customers){
    if(customers.status){
      this.customers = customers.data;
      this.dataSource.data = customers.data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = customers.pag.count;
      });
      this.isLoading = false;
    }else {
      this.isLoading = false;
    }
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(CustomerDetailComponent,{
      data : {id : id}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  ngOnDestroy(): void {
  }
}

