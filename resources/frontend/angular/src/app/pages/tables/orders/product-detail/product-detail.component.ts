import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailService } from './product-detail.service';
import { Subscription, Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDetailModel } from './product-detail.model';

@Component({
  selector: 'fury-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductDetailService]
})
export class ProductDetailComponent implements OnInit {
  details: [];
  product_data: any;
  getSubscription: Subscription;
  message: string = ""
  isLoading = false;
  cancelButtonText = "Cancel";
  subject$: ReplaySubject<ProductDetailModel[]> = new ReplaySubject<ProductDetailModel[]>(1);
  data$: Observable<ProductDetailModel[]> = this.subject$.asObservable();
  products: ProductDetailModel[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Product ID', property: 'product_id', visible: true, isModelProperty: true },
    { name: 'Product SKU', property: 'sku', visible: true, isModelProperty: true },
    { name: 'Price', property: 'price', visible: true, isModelProperty: true },
    { name: 'QTY', property: 'product_qty', visible: true, isModelProperty: true },
    { name: 'Product Name', property: 'product_name', visible: true, isModelProperty: true },
    { name: 'Is Recurring', property: 'is_recurring', visible: true, isModelProperty: true },
    { name: 'Is Terminal', property: 'is_terminal', visible: true, isModelProperty: true },
    { name: 'Subsciption ID', property: 'subscription_id', visible: true, isModelProperty: true },
    { name: 'Billing Model Discount', property: 'billing_model_discount', visible: true, isModelProperty: true },
    { name: 'Is ADD ON', property: 'is_add_on', visible: true, isModelProperty: true },
    { name: 'Is Trial', property: 'is_in_trial', visible: true, isModelProperty: true },
    { name: 'Step Number', property: 'step_number', visible: true, isModelProperty: true },
    { name: 'Is Shippable', property: 'is_shippable', visible: true, isModelProperty: true },
    { name: 'Refund Amount', property: 'refund_amount', visible: true, isModelProperty: true },
    { name: 'Hold Date', property: 'hold_date', visible: true, isModelProperty: true },
    { name: 'Biling Model Name', property: 'billing_model_name', visible: true, isModelProperty: true },
    { name: 'Billing Model Description', property: 'billing_model_description', visible: true, isModelProperty: true },
    { name: 'Offer Name', property: 'offer_name', visible: true, isModelProperty: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<ProductDetailModel> | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ProductDetailComponent>, private ProductDetailService: ProductDetailService) {
    if (data) {
      this.isLoading = true;
      this.ProductDetailService.getProductDetail(data.id)
        .then(data => {
          this.product_data = data.data;
          // this.mapData().subscribe(products => {
          //   this.subject$.next(products);
          // });
          this.isLoading = false;
        })
    }
    // this.dialogRef.updateSize('300vw','300vw')
  }
  // get visibleColumns() {
  //   return this.columns.filter(column => column.visible).map(column => column.property);
  // }

  // mapData() {
  //   return of(this.product_data.map(product => new ProductDetailModel(product)));
  // }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(data => !!data)
    ).subscribe((products) => {
      console.log("products:", products);
      this.products = products;
      this.dataSource.data = products;
    });
  };

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
