// import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
// import { NAV_LINKS } from '../../../helpers/constants';
// import { environment } from 'src/environments/environment';
// import { filter, map, Observable } from 'rxjs';
// import { AppService } from '../../services/app.service';
// import { Location } from '@angular/common';

import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent { // implements OnInit, OnDestroy {

  // @Input() title;

  // headerTitle = 'My Finance v2';

  // appVersion = environment.version;
  // links = NAV_LINKS;
  // mobileQuery: MediaQueryList;

  // isHandset$: Observable<boolean>;
  // isDashboard = true;
  
  // private _mobileQueryListener: () => void;

  // get sections() {
  //   return []; // SECTIONS;
  // }

  // get sectionKeys() {
  //   return []; // SECTIONS_KEYS;
  // }

  // constructor(
  //   private router: Router,
  //   private location: Location,
  //   private breakpointObserver: BreakpointObserver,
  //   changeDetectorRef: ChangeDetectorRef,
  //   media: MediaMatcher,
  //   private appService: AppService
  // ) {
  //   this.mobileQuery = media.matchMedia(Breakpoints.Handset);
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   this.mobileQuery.addEventListener('change', this._mobileQueryListener);

  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
  //     console.log('event', event);
  //     this.isDashboard = event.urlAfterRedirects === '/dashboard/list';
  //   });
  // }

  // ngOnInit() {
  //   this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  //   this.appService.appTitle$.subscribe((title: string) => this.headerTitle = title ?? 'My Finance v3');
  // }

  // onNavListClick(drawer) {
  //   if (this.mobileQuery.matches) {
  //     drawer.close();
  //   }
  // }

  // onBackClick() {
  //   this.location.back();
  // }

  // logout() {
  //   localStorage.clear();
  //   this.router.navigate(['auth/login']);
  // }

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  // }

}
