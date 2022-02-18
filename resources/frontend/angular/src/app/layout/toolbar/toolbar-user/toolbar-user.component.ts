import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../toolbar.service';
import { SidenavService } from '../../sidenav/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;
  userName: string;
  userDetailsSubscription: Subscription;

  constructor(public toolbarService: ToolbarService, private sidenavService: SidenavService) { }

  ngOnInit() {
    this.userDetailsSubscription = this.sidenavService.userDetailsResponse$.subscribe(data => this.userName = data['name']);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
}
