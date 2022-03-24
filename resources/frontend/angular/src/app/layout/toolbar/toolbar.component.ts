import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ThemeService } from '../../../@fury/services/theme.service';

@Component({
  selector: 'fury-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  @HostBinding('class.no-box-shadow')
  hasNavigation: boolean;

  @Output() openSidenav = new EventEmitter();
  @Output() openQuickPanel = new EventEmitter();
  @Output() openConfigPanel = new EventEmitter();

  
  constructor(private themeService: ThemeService) {
  }
  topNavigation$ = this.themeService.config$.pipe(map(config => config.navigation === 'top'));

  ngOnInit() { }

  toggleConfigPanel(){
    this.openConfigPanel.emit();
  }
}
