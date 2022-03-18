import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() current: string;
  @Input() crumbs: any[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openLink(crumb){
    this.router.navigate(['./'+ crumb]);
  }

}
