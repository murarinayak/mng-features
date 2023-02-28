import { Inject, Injectable } from '@angular/core';
import { ConfirmationDialogComponent, ModalService } from 'mng-features/modals';
import { AuthUserType } from '../common/constants';
import { getServerTimestamp } from '../common/utils';
import { IAuthUser, IDocumentModel, ILibraryConfig, IMenuItem } from '../models/common.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  user: IAuthUser;

  constructor(
    @Inject('config') private config: ILibraryConfig,
    private userService: UserService,
    private modalService: ModalService,
  ) {
    this.user = this.userService.getLoggedInUser();
  }

  getAppName() { return this.config.environment.appName; }
  getAppVersion() { return this.config.environment.appVersion; }
  getAppNamespace() { return this.config.environment.appNamespace; }
  getApiUrl() { return this.config.environment.apiUrl; }
  getFirebaseConfig() { return this.config.environment.firebase; }
  getShowLeftNav() { return this.config.showLeftNav; }
  getMenuItems() {
    let menuItems: Array<IMenuItem> = [];
    if (this.user) { menuItems = this.config.menu.filter(item => item.roles?.length ? item.roles.includes(this.user.userType) : true); }
    return menuItems;
  }
  isSuperAdmin() { return this.user?.userType === AuthUserType.SUPER_ADMIN; }
  isAdmin() { return this.user?.userType === AuthUserType.ADMIN || this.user?.userType === AuthUserType.SUPER_ADMIN; }

  getDefaultDoc(): IDocumentModel {
    return {
      v: 1,
      uidCreatedBy: this.userService.getLoggedInUserID(),
      uidUpdatedBy: this.userService.getLoggedInUserID(),
      tsCreatedAt: getServerTimestamp(),
      tsUpdatedAt: getServerTimestamp()
    };
  }

  share(summary = '', title = '') { // 
    if (!title) { title = `Share ${this.getAppName()} App`; }
    if (!summary) { summary = `I found an awesome ${this.getAppName()} App!`; }
    const text: string = summary + `\nJoin ${this.getAppName()} by downloading from https://play.google.com/store/apps/details?id=${this.getAppNamespace()}`;
    const shareData: ShareData = { title, text };
    console.log('share', typeof navigator.share, typeof navigator.canShare)
    // if (navigator.canShare && navigator.canShare()) {
    if (typeof navigator.share === 'function') {
      navigator.share(shareData);
    } else {
      // alert('Sharing not supported on device. Copy the following instead. \n\n' + text);

      this.modalService.openDialog(ConfirmationDialogComponent, { data: { title, content: text } }).afterClosed().subscribe(
        response => {
          console.log('clo', response);
        }
      );
    }
  }
}