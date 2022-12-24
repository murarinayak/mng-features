import { Component, OnInit } from '@angular/core';
import { CommonService } from 'mng-features/shared';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  appName: string;
  appVersion = 'environment.version';
  
  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.appName = this.commonService.getAppName();
  }

}
