import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-tweet-app';
  constructor(
    private translateService: TranslateService,
    private cookie: CookieService
  ) {
  }
  ngOnInit(): void {
    const language = this.cookie.get('lang');
    this.translateService.use(language);
  }

}