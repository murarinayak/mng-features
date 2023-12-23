import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'mng-features/auth';
import { MNGBrowserStorageService, CommonService, IMenuItem, LocalStorageCommonKeys } from 'mng-features/shared';
import { filter, map, Observable } from 'rxjs';
import { MNGThemePickerService } from './theme-picker/theme-picker.service';
import { IThemeOption } from './theme-picker/option.model';

@Component({
  selector: 'mng-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() drawer: any;

  headerTitle = 'App';
  showLeftNav = false;
  isLoggedIn = false;
  menuItems: Array<IMenuItem>;
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  isHandset$: Observable<boolean>;
  isDashboard = true;
  themeOptions: Array<IThemeOption> = [];
  
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private location: Location,
    private authService: AuthService,
    private commonService: CommonService,
    private browserStorageService: MNGBrowserStorageService,
    private readonly themeService: MNGThemePickerService,
  ) {
    this.headerTitle = this.commonService.getAppName();
    this.showLeftNav = this.commonService.getShowLeftNav();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.mobileQuery = this.media.matchMedia(Breakpoints.Handset);
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  }
  
  ngOnInit() {
    this.menuItems = this.commonService.getMenuItems();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      // console.log('event', event.urlAfterRedirects);
      this.isDashboard = event.urlAfterRedirects === this.browserStorageService.getItem(LocalStorageCommonKeys.APP_DEFAULT_URL);
    });

    
    this.themeService.getThemeOptions().subscribe({
      next: (response: Array<IThemeOption>) => {
        console.log('t', response);
        this.themeOptions = response ?? [];
      }
    });
    this.themeService.setTheme('deeppurple-amber');
  }

  onMenuIconClick() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  onMenuItemClick(item: IMenuItem) {
    if (item.path) {
      void this.router.navigate([item.path]);
    }
  }

  onBackClick() {
    this.location.back();
  }

  onLoginClick() {
    void this.router.navigate(['auth']);
  }

  onShareClick() {
    this.commonService.share();
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
