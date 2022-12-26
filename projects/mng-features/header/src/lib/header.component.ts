import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'mng-features/auth';
import { CommonService } from 'mng-features/shared';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'mng-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() drawer: any;

  headerTitle = 'App';
  isLoggedIn = false;
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  isHandset$: Observable<boolean>;
  isDashboard = true;
  
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private location: Location,
    private authService: AuthService,
    private commonService: CommonService,
  ) {
    this.headerTitle = this.commonService.getAppName();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.mobileQuery = this.media.matchMedia(Breakpoints.Handset);
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  }

  ngOnInit() {
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      // console.log('event', event);
      this.isDashboard = event.urlAfterRedirects === '/dashboard/list';
    });
  }

  onMenuIconClick() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  onBackClick() {
    this.location.back();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
