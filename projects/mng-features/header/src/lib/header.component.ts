import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'mng-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() drawer: any;

  headerTitle = 'My Finance';
  mobileQuery: MediaQueryList = this.media.matchMedia(Breakpoints.Handset);
  mobileQueryListener = () => this.changeDetectorRef.detectChanges();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  isDashboard = true;
  
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private location: Location,
  ) {}

  ngOnInit() {
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      console.log('event', event);
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
