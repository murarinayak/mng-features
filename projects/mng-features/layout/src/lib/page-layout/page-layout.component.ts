import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { CommonService, IMenuItem } from 'mng-features/shared';
// import { Location } from '@angular/common';
// import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html'
})
export class PageLayoutComponent {

  @Input() title = '';

  appVersion: string;
  links: Array<IMenuItem>;
  mobileQuery: MediaQueryList;
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  // isDashboard = true;
  private _mobileQueryListener: () => void;

  get sections() {
    return []; // SECTIONS;
  }

  get sectionKeys() {
    return []; // SECTIONS_KEYS;
  }

  constructor(
    // private router: Router,
    // private location: Location,
    // private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    // private appService: AppService
    private commonService: CommonService,
  ) {
    this.mobileQuery = media.matchMedia(Breakpoints.Handset);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.appVersion = this.commonService.getAppVersion();
    this.links = this.commonService.getMenuItems();
    // // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
    //   console.log('event', event);
    //   this.isDashboard = event.urlAfterRedirects === '/dashboard/list';
    // });
  }

  ngOnInit() {
    // this.appService.appTitle$.subscribe((title: string) => this.headerTitle = title ?? 'My Finance v3');
  }

  onNavListClick(drawer: any) {
    if (this.mobileQuery.matches) {
      drawer.close();
    }
  }

  // onBackClick() {
  //   this.location.back();
  // }

  // logout() {
  //   localStorage.clear();
  //   this.router.navigate(['auth/login']);
  // }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
