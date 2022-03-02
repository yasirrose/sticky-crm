import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
// import { Order } from './order.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

//self imports
import { FormGroup, FormControl } from '@angular/forms';
import { ViewFormulasService } from './view-formulas.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'fury-view-formulas',
  templateUrl: './view-formulas.component.html',
  styleUrls: ['./view-formulas.component.scss']
})
export class ViewFormulasComponent implements OnInit {

  formulas: [];

  //customer coding
  getSubscription: Subscription;
  isLoading = false;
  totalRows = 0;
  pageSize = 25;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filters = {};

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Shortcut', property: 'shortcut_name', visible: true, isModelProperty: true },
    { name: 'Campaign', property: 'campaign_name', visible: true, isModelProperty: true },
    { name: 'Column Name', property: 'column_name', visible: true, isModelProperty: true },
    { name: 'Expression', property: 'expression', visible: true, isModelProperty: true },
    { name: 'created At', property: 'created_at', visible: false, isModelProperty: true },

  ] as ListColumn[];
  dataSource: MatTableDataSource<null>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private viewFormulasService: ViewFormulasService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */

  ngOnInit() {
    this.getSubscription = this.viewFormulasService.formulasGetResponse$
      .subscribe(data => this.manageGetResponse(data));
    this.getData();
    // this.getDropData();

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
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
    await this.viewFormulasService.getFormulas()
      .then(formulas => {
        this.formulas = formulas.data;
        this.dataSource.data = formulas.data;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = formulas.pag.count;
        });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }
  manageGetResponse(formulas) {
    if (formulas.status) {
      this.formulas = formulas.data;
      this.dataSource.data = formulas.data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = formulas.pag.count;
      });
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
  ngOnDestroy() {
  }
}