import { AuthService } from 'projects/mng-features/auth/services/auth.service';
import { getServerTimestamp } from '../common/utils';
import { IDocumentModel } from '../models/common.model';

export class CommonService {

  constructor(private authService: AuthService) {}

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