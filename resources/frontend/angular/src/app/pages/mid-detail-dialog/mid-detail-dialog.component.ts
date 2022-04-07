import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Inject, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MidDetailDialogModel } from './mid-detail-dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MidDialogDetailService } from './mid-detail-dialog.service';
import { environment } from '../../../environments/environment';
import { ListColumn } from '../../../@fury/shared/list/list-column.model';
import { MidDetailModel } from './mid-detail-dialog.model';
import { ListService } from 'src/@fury/shared/list/list.service';
import { ListComponent } from 'src/@fury/shared/list/list.component';


// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { formatDate } from '@angular/common';
// import { FormGroup, FormControl } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSort } from '@angular/material/sort';
// import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
// import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
// import { Pipe, PipeTransform } from '@angular/core';
// import { ApiService } from 'src/app/api.service';
// import { Notyf } from 'notyf';

@Component({
  selector: 'fury-mid-detail-dialog',
  templateUrl: './mid-detail-dialog.component.html',
  styleUrls: ['./mid-detail-dialog.component.scss']
})
export class MidDetailDialogComponent {
  subject$: ReplaySubject<MidDetailModel[]> = new ReplaySubject<MidDetailModel[]>(1);
  data$: Observable<MidDetailModel[]> = this.subject$.asObservable();
  details: MidDetailModel[];

  id : string;
  gateway_id : string;
  start_date : string;
  end_date : string;
  endPoint = '';
  filters = {};
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<MidDetailDialogComponent>, private MidDialogDetailService: MidDialogDetailService,
    @Inject(MAT_DIALOG_DATA) public data: MidDetailDialogModel) {
      // this.id = data.id;
      this.gateway_id = data.gateway_id;
      this.start_date = data.start_date;
      this.end_date = data.end_date;
      this.endPoint = environment.endpoint;
      this.getData(this.id);
    }
  
    @Input()
    columns: ListColumn[] = [
      { name: 'Name', property: 'name', visible: true, isModelProperty: true },
      { name: 'Count', property: 'total_count', visible: false, isModelProperty: true },
      { name: 'Percentage', property: 'count_percentage', visible: false, isModelProperty: true },
    ] as ListColumn[];

    dataSource: MatTableDataSource<MidDetailModel> | null;
    @ViewChild(ListComponent, { static: true }) ListComponent: ListComponent;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  }

  mapData() {
    return of(this.details.map(mid => new MidDetailModel(mid)));
  }

  async getData(id) {
    this.filters = {
      "start": this.start_date,
      "end": this.end_date,
      'gateway_id': this.gateway_id
    }
    this.MidDialogDetailService.getMidCountDetail(this.filters)
      .then(data => {
        this.isLoading = true;
        this.details = data.data;
        this.dataSource.data = data.data;
      });
    }
}
