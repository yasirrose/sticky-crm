import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { ThemeService } from '../@fury/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { SplashScreenService } from '../@fury/services/splash-screen.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private sidenavService: SidenavService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private platform: Platform,
    private route: ActivatedRoute,
    private splashScreenService: SplashScreenService) {
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.themeService.setStyle(queryParamMap.get('style')));

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.themeService.theme$.subscribe(theme => {
      if (theme[0]) {
        this.renderer.removeClass(this.document.body, theme[0]);
      }

      this.renderer.addClass(this.document.body, theme[1]);
    });

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.sidenavService.addItems([
      {
        name: 'APPS',
        position: 5,
        type: 'subheading',
        customClass: 'first-subheading'
      },
      {
        name: 'Dashboard',
        routeOrFunction: '/',
        icon: 'dashboard',
        position: 6,
        pathMatchExact: true
      },
      {
        name: 'customers',
        routeOrFunction: '/customers',
        icon: 'group',
        badgeColor: '#2196F3',
        position: 7,
      },
      {
        name: 'All in one table',
        routeOrFunction: '/tables/all-in-one-table',
        icon: 'assignment',
        badgeColor: '#2196F3',
        position: 7,
      },
      {
        name: 'Orders',
        routeOrFunction: '/tables/orders',
        icon: 'assignment',
        badgeColor: '#2196F3',
        position: 8,
      },
      {
        name: 'Formula Section',
        position: 9,
        type: 'subheading',
      },
      {
        name: 'Formulas Builder',
        routeOrFunction: '/create/formula',
        icon: 'functions',
        badgeColor: '#2196F3',
        position: 10,
      },
      {
        name: 'View Formulas',
        routeOrFunction: '/view/formulas',
        icon: 'assignment',
        badgeColor: '#2196F3',
        position: 11,
      },
      {
        name: 'Campaigns Section',
        type: 'subheading',
        position: 30
      },
      {
        name: 'All Campaigns',
        icon: 'star',
        position: 31,
        subItems: [
          {
            name: 'Golden Ticket',
            routeOrFunction: '/campaigns/golden-ticket',
            position: 12
          },
          {
            name: 'Golden STicket(Daily)',
            routeOrFunction: '/campaigns/sticket-daily',
            position: 13
          },
          {
            name: 'Golden STicket(Weekly)',
            routeOrFunction: '/campaigns/sticket-weekly',
            position: 14
          },
          {
            name: 'Golden STicket(Monthly)',
            routeOrFunction: '/campaigns/sticket-monthly',
            position: 15
          }
        ]
      },
      {
        name: 'USER INTERFACE',
        type: 'subheading',
        position: 35
      },
      {
        name: 'Components',
        routeOrFunction: '/components',
        icon: 'layers',
        position: 40
      },
      {
        name: 'Forms',
        icon: 'description',
        position: 45,
        subItems: [
          {
            name: 'Form Elements',
            routeOrFunction: '/forms/form-elements',
            position: 10
          }
        ]
      },
      {
        name: 'Drag & Drop',
        routeOrFunction: '/drag-and-drop',
        icon: 'mouse',
        position: 55
      },
      {
        name: 'PAGES',
        type: 'subheading',
        position: 65
      },
      {
        name: 'Authentication',
        icon: 'lock',
        position: 66,
        subItems: [
          {
            name: 'Login Page',
            routeOrFunction: '/login',
            position: 5
          },
          {
            name: 'Register Page',
            routeOrFunction: '/register',
            position: 10
          },
          {
            name: 'Forgot Password',
            routeOrFunction: '/forgot-password',
            position: 15
          }
        ]
      },
      {
        name: 'Blank',
        routeOrFunction: '/blank',
        icon: 'picture_in_picture',
        position: 69
      },
      {
        name: 'Material Icons',
        routeOrFunction: '/icons',
        icon: 'grade',
        position: 75
      }
    ]);
  }
}
