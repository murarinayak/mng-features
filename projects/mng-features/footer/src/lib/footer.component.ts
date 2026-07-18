import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonService } from 'mng-features/shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FooterComponent {

  appName: string;
  appVersion: string;
  
  constructor(
    private commonService: CommonService,
  ) {
    this.appName = this.commonService.getAppName();
    this.appVersion = this.commonService.getAppVersion();
  }

}
