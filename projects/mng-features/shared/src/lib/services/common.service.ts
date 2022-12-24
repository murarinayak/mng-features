import { Inject, Injectable } from '@angular/core';
import { AuthService } from 'mng-features/auth';
import { getServerTimestamp } from '../common/utils';
import { IDocumentModel, IEnvironment } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    @Inject('env') private environment: IEnvironment,
    private authService: AuthService
  ) {}

  getApiUrl() { return this.environment.API_URL; }
  getAppName() { return this.environment.appName; }

  getDefaultDoc(): IDocumentModel {
    return {
      v: 1,
      uidCreatedBy: this.authService.getUID(),
      uidUpdatedBy: this.authService.getUID(),
      tsCreatedAt: getServerTimestamp(),
      tsUpdatedAt: getServerTimestamp()
    };
  }
}