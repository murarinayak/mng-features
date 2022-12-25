import { Inject, Injectable } from '@angular/core';
import { getServerTimestamp } from '../common/utils';
import { IDocumentModel, IEnvironment } from '../models/common.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    @Inject('env') private environment: IEnvironment,
    private userService: UserService,
    // private authService: AuthService
  ) {}

  getApiUrl() { return this.environment.API_URL; }
  getAppName() { return this.environment.appName; }

  getDefaultDoc(): IDocumentModel {
    return {
      v: 1,
      uidCreatedBy: this.userService.getLoggedInUserID(),
      uidUpdatedBy: this.userService.getLoggedInUserID(),
      tsCreatedAt: getServerTimestamp(),
      tsUpdatedAt: getServerTimestamp()
    };
  }
}