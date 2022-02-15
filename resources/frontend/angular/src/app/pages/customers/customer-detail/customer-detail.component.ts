import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from './customer-detail.service';
import { Subscription } from 'rxjs';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'fury-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [CustomerService]
})
export class CustomerDetailComponent implements OnInit {
  details : [];
  address_data : [];
  getSubscription: Subscription;
  message: string = "";
  isLoading = false;
  cancelButtonText = "Cancel";

  @Input()
  columns: ListColumn[] = [
    { name: 'Creator Name/Email', property: 'creator', visible: true, isModelProperty: true },
    { name: 'Country', property: 'country', visible: true, isModelProperty: true },
    { name: 'City', property: 'city', visible: true, isModelProperty: true },
    { name: 'State', property: 'state', visible: true, isModelProperty: true },
    { name: 'Street', property: 'street', visible: true, isModelProperty: true },
    { name: 'Zip', property: 'zip', visible: true, isModelProperty: true },
    { name: 'Created At', property: 'created_at', visible: true, isModelProperty: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<null>;
  // visibleColumn: string[] = ['customColumn'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CustomerDetailComponent>, private customersService: CustomerService) {
    if (data) {
      this.getData(data.id);
    }
    this.dialogRef.updateSize('300vw','300vw')
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  
  async getData(id){
    await this.customersService.getCustomerDetail(id)
    .then(data => {
      this.details = data.data;
      this.address_data = data.address_data;
      this.dataSource.data = data.address_data;
      console.log(this.details);
      console.log(this.address_data);
    })
  }
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }
}
