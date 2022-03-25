import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ToolbarService } from '../toolbar.service';
import { SidenavService } from '../../sidenav/sidenav.service';
import { Subscription } from 'rxjs';
import { SidebarDirective } from '../../../../@fury/shared/sidebar/sidebar.directive';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  // @ViewChild('configPanel', { static: true }) configPanel: SidebarDirective;
  @Output() toggleConfigPanel = new EventEmitter();

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

  openConfigPanel() {
    this.toggleConfigPanel.emit(null);
  }

  closeSidenav() {
    this.sidenavService.close();
  }

  openSidenav() {
    this.sidenavService.open();
  }

}
