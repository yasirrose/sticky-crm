import { Component, OnInit, Inject, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from './customer-detail.service';
import { Subscription } from 'rxjs';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'fury-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [CustomerService]
})
export class CustomerDetailComponent implements OnInit, AfterViewInit {
  customerDetails: any;
  addresses: any;
  getSubscription: Subscription;
  message: string = "";
  isLoading = false;
  cancelButtonText = "Cancel";

  // @Input()
  // columns: ListColumn[] = [
  //   { name: 'Creator Name/Email', property: 'creator', visible: false, isModelProperty: false },
  //   { name: 'Country', property: 'country', visible: true, isModelProperty: true },
  //   { name: 'City', property: 'city', visible: true, isModelProperty: true },
  //   { name: 'State', property: 'state', visible: true, isModelProperty: true },
  //   { name: 'Street', property: 'street', visible: true, isModelProperty: true },
  //   { name: 'Zip', property: 'zip', visible: true, isModelProperty: true },
  //   { name: 'Created At', property: 'created_at', visible: true, isModelProperty: true },
  // ] as ListColumn[];
  // dataSource: MatTableDataSource<null>;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // visibleColumn: string[] = ['customColumn'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CustomerDetailComponent>, private customersService: CustomerService) {
    if (data) {
      this.getData(data.id);
    }
    // this.dialogRef.updateSize('300vw', '300vw')
  }
  // get visibleColumns() {
  //   return this.columns.filter(column => column.visible).map(column => column.property);
  // }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  async getData(id) {
    await this.customersService.getCustomerDetail(id)
      .then(data => {
        this.customerDetails = data.data;
        this.addresses = data.address_data;
        // this.dataSource.data = data.data;
      })
  }

  onFilterChange(value) {
    // if (!this.dataSource) {
    //   return;
    // }
    // value = value.trim();
    // value = value.toLowerCase();
    // this.dataSource.filter = value;
  }

}
