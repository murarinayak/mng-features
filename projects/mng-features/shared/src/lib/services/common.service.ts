import { Inject, Injectable } from '@angular/core';
import { getServerTimestamp } from '../common/utils';
import { IDocumentModel, ILibraryConfig } from '../models/common.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    @Inject('config') private config: ILibraryConfig,
    private userService: UserService,
  ) {}

  getAppName() { return this.config.environment.appName; }
  getAppVersion() { return this.config.environment.appVersion; }
  getAppNamespace() { return this.config.environment.appNamespace; }
  getApiUrl() { return this.config.environment.apiUrl; }
  getMenuItems() { return this.config.menu; }
  getShowLeftNav() { return this.config.showLeftNav; }

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
    const text: string = summary + `\nJoin ${this.getAppName()} by downloading from https://play.google.com/store/apps/details?id=${this.getAppNamespace()}\n\n`;
    const shareData: ShareData = { title, text };
    navigator.share(shareData);
  }
}